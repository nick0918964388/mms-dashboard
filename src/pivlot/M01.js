import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

import CustomerService from '../service/CustomerService';
import ProductService from '../service/ProductService';
import Pivlot from '../components/Pivlot';
import { Dropdown } from 'primereact/dropdown';

const M01 = () => {
    const [customers1, setCustomers1] = useState(null);
    const [customers2, setCustomers2] = useState([]);
    const [customers3, setCustomers3] = useState([]);
    const [emu, setEmu] = useState([]);
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [emuloading2, setemuLoading2] = useState(true);
    const [idFrozen, setIdFrozen] = useState(false);
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'ALL', code: 'ALL' },
        { name: '2022', code: '2022' },
        { name: '2021', code: '2021' }
    ];


    const customerService = new CustomerService();
    const productService = new ProductService();

    useEffect(() => {
        setLoading2(true);
        console.log("e==>");
        customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        customerService.getCustomersLarge().then(data => { setCustomers2(getCustomers(data)); setLoading2(false); });
        customerService.getCustomersMedium().then(data => setCustomers3(data));
        customerService.getCustomersEmu().then(data => setEmu(data));
        productService.getProductsWithOrdersSmall().then(data => setProducts(data));

        initFilters1();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const getCustomers = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }

 

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'representative': { value: null, matchMode: FilterMatchMode.IN },
            'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
            'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
        });
    }
    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">                    
                <h5 className="centerText">超過1年呆料清單統計</h5>
                <div className="field col-12 md:col-3">
                            {/* <label htmlFor="state">年度 : </label> */}
                            {/* <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="選擇年度"></Dropdown> */}
                        </div>
                    <Pivlot type={dropdownItem} charttype={"m01"}/>
                </div> 
                <div className="card">
               
                    
                </div>                 
            </div>
        </div>

    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(M01, comparisonFn);
