import axios from 'axios';

export default class CustomerService {

    getCustomersSmall() {
        return axios.get('assets/demo/data/customers-small.json').then(res => res.data.data);
    }

    getCustomersMedium() {
        return axios.get('assets/demo/data/customers-medium.json').then(res => res.data.data);
    }

    getCustomersLarge() {
        return axios.get('assets/demo/data/customers-large.json').then(res => res.data.data);
    }

    getCustomersXLarge() {
        return axios.get('assets/demo/data/customers-xlarge.json').then(res => res.data.data);
    }
    getCustomersEmu() {
        return axios.get('assets/demo/data/emu-availiable.json').then(res => res.data.data);
    }
    getCustomersTym(type) {
        console.log("getCustomersTym=>"+type)
        if(type!=null){
            console.log("getCustomersTym=>"+type.code)
            if(type.code==="ALL")
                return axios.get('assets/demo/data/tym-g.json').then(res => res.data.data);
            else
                return axios.get('assets/demo/data/tym-g.json').then(res => res.data.data.filter(person => person.年度 === type.code));
        }else
            return axios.get('assets/demo/data/tym-g.json').then(res => res.data.data);
    }
    getCustomersTym_h(type) {
        return axios.get('assets/demo/data/tym-h.json').then(res => res.data.data);            
    }
    getCustomersTym_wocloserate(type) {
        return axios.get('assets/demo/data/tym-3.2-wocloserate.json').then(res => res.data.data);            
    }
    getCustomersTym_srcloserate(type) {
        return axios.get('assets/demo/data/tym-3.2-srcloserate.json').then(res => res.data.data);            
    }
    getCustomersDynamic() {
        return axios.get('assets/demo/data/dynamic-availiable.json').then(res => res.data.data);
    }
}
