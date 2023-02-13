import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import CustomerService from '../service/CustomerService';
import ProductService from '../service/ProductService';
import Pivlot from './Pivlot';
import { Dropdown } from 'primereact/dropdown';
import Pivlot3 from './Pivlot3';

const TableDemo = () => {
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

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
                <h5 className="centerText">超過1年呆料分析</h5>
                <div className="field col-12 md:col-3">
                            <label htmlFor="state">年度 : </label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="選擇年度"></Dropdown>
                        </div>
                    {/* <Pivlot type={dropdownItem} charttype={"tym-wocloserate"}/> */}
                    <Pivlot3 />
                </div> 
                <div className="card">
                    
                {/* <h5 className="centerText">工單結案率統計</h5> */}
                <div className="field col-12 md:col-3">
                            {/* <label htmlFor="state">年度 : </label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="選擇年度"></Dropdown> */}
                        </div>
                    {/* <Pivlot type={dropdownItem} charttype={"tym-wocloserate"}/> */}
                </div>  
               
                    
               
                {/* <div className="card">

                    <h5>CM工單(2022年度)</h5>

                    <DataTable value={emu} scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
                        <Column field="工作單" header="工作單" style={{ flexGrow: 1, flexBasis: '160px' }} frozen></Column>
                        <Column field="故障日期" header="故障日期" style={{ flexGrow: 1, flexBasis: '100px' }} frozen={idFrozen} alignFrozen="left"></Column>
                        <Column field="系統" header="系統" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                        <Column field="站別" header="站別" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                        <Column field="故障樣態" header="故障樣態" style={{ flexGrow: 1, flexBasis: '200px' }} ></Column>
                        <Column field="負責單位" header="負責單位" style={{ flexGrow: 1, flexBasis: '200px' }} ></Column>
                    </DataTable>
                </div>
                <div className="card">
                    <h5 className="centerText">站別 vs 故障件數</h5>
                    <Chart data={lineData} />
                </div>                */}
            </div>




        </div>

    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(TableDemo, comparisonFn);
