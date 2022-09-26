<template>
    <div class="posts">
        <h1>Query Car Make</h1>
        <select v-model="car.carKey">
            <option v-bind:key="carEntry.Key" v-for="carEntry in carKeys">
            {{ carEntry }}
            </option>
        </select>
        <br>
        <br>
        <button v-on:click="qCarMake()">Query</button>
        <br>
        <div v-bind:key="carEntry.Key" v-for="carEntry in response" >
          <p> {{ carEntry.Key }} | {{ carEntry.Record }}  </p>
        </div>
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
            const cars = apiResponse.data
            const vectorMake = new Set()

            for (let i = 0; i<cars.length; i++){

                vectorMake.add(cars[i].Record.make)
                console.log(vectorMake)
            }
            this.carKeys = vectorMake
        },
        async qCarMake() {
            const apiResponse = await PostsService.queryCarMake(this.car.carKey)
            this.response = apiResponse.data

            console.log('Query')
            console.log(this.car)
        }
    }
}
</script>
