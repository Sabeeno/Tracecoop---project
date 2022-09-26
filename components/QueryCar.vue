<template>
    <div class="posts">
        <h1>Query Car Key</h1>
        <select v-model="car.carKey">
            <option v-bind:key="carEntry.Key" v-for="carEntry in carKeys">{{ carEntry.Key }}</option>
        </select>
        <br />
        <br />
        <button v-on:click="qCar()">Query</button>
        <br />
        <span v-if="response"><b>{{ response }}</b></span>
    </div>
</template>

<script>
import PostsService from '@/services/apiService'
export default {
    name: 'response',
    data () {
        return {
            car: {},
            carKeys:[],
            selectedOption: null,
            response: null
        }
    },
    mounted () {
        this.load(),
        this.selectedOption = this.value
    },
    methods: {
        async load(){
            const apiResponse = await PostsService.queryAllCars()
            this.carKeys = apiResponse.data
        },
        async qCar() {
            const apiResponse = await PostsService.queryCar(this.car.carKey)
            this.response = apiResponse.data

            console.log('Query')
            console.log(this.car)
        }
    }
}
</script>
