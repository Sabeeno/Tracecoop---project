import Api from '../services/api'

export default {
    queryAllCars() {
        return Api().get('queryallcars')
    },

    createCar(make, model, color, owner){
        return Api().post('createcar', {
            make: make,
            model: model,
            color: color,
            owner: owner
        })
    },

    changeCarOwner(key, newOwner) {
        return Api().put('changecarowner', {
            key: key,
            newOwner: newOwner
        })
    },
    
    queryCar(key) {
        return Api().get('query/' + key, {
            key: key
        })
    },

    queryCarMake(make) {
        return Api().get('query/make/' + make, {
            make: make
        })
    }
}
