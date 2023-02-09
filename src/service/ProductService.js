import axios from 'axios';

export default class ProductService {

    getProductsSmall() {
        return axios.get('assets/demo/data/products-small.json').then((res) => res.data.data);
    }

    getProducts() {
        return axios.get('assets/demo/data/products.json').then((res) => res.data.data);
    }

    getProductsMixed() {
        return axios.get('assets/demo/data/products-mixed.json').then((res) => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then((res) => res.data.data);
    }

    getPmCars() {
        return axios.get('assets/demo/data/car_pm.json').then((res) => res.data.data);
    }
    getRepaireCars() {
        return axios.get('assets/demo/data/car_repaire.json').then((res) => res.data.data);
    }
}
