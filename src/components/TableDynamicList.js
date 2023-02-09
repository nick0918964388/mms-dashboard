import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import CustomerService from '../service/CustomerService';
import ProductService from '../service/ProductService';
import '../css/DataTableDemo.css';

 
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

    const [carDynamic, setCarSynamic] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState(null); 
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'carnum': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'status': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'statusdesc': { value: null, matchMode: FilterMatchMode.IN },
        'worktype': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'actstart': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },        
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const statuses = [
        'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
    ];
        
    const customerService = new CustomerService();
    const productService = new ProductService();

    useEffect(() => {
        setLoading2(true);

        customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        customerService.getCustomersLarge().then(data => { setCustomers2(getCustomers(data)); setLoading2(false); });
        customerService.getCustomersMedium().then(data => setCustomers3(data));
        customerService.getCustomersEmu().then(data => setEmu(data));
        // 加入車輛動態資料
        customerService.getCustomersDynamic().then(data => {setCarSynamic(data); setLoading(false)});
        productService.getProductsWithOrdersSmall().then(data => setProducts(data));
        
        // initFilters1();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getCustomers = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }
    // header template
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">Customers</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    // body template
    const statusBodyTemplate = (rowData) => {
        return <span className={'customer-badge status-${rowData.status}'}>{rowData.status}</span>;
    }

    // status template
    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }
    const statusRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }
    const statusItemTemplate = (option) => {
        return <span className={'customer-badge status-${option}'}>{option}</span>;
    }

    // filter
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }
   


    const header = renderHeader();

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <h5>車輛動態清單</h5>
                    <DataTable value={carDynamic} scrollable scrollHeight="800px" scrollDirection="both" className="mt-3" header={header} 
                         rowHover selection={selectedCustomers} onSelectionChange={e => setSelectedCustomers(e.value)}
                         paginator paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                         rows={10}
                         filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                         globalFilterFields={['carnum', 'status', 'statusdesc', 'worktype', 'actstart']} emptyMessage="無此車輛動態."
                         currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        >
                        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                        <Column field="carnum" header="車組" sortable filter filterPlaceholder="輸入車組篩選"  style={{ flexGrow: 1, flexBasis: '160px' }} frozen></Column>
                        <Column field="status" header="車輛動態代號" sortable filter filterPlaceholder="輸入動態代號篩選" body={statusBodyTemplate} filterElement={statusFilterTemplate} style={{ flexGrow: 1, flexBasis: '150px' }} frozen={idFrozen} alignFrozen="left"></Column>
                        <Column field="statusdesc" header="車輛動態" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                        <Column field="worktype" header="檢修級別" sortable style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                        <Column field="actstart" header="開工時間" sortable style={{ flexGrow: 1, flexBasis: '200px' }} ></Column>
                        <Column field="actfinish" header="完工時間" sortable style={{ flexGrow: 1, flexBasis: '200px' }} ></Column>
                        <Column field="changeby" header="異動人員" sortable style={{ flexGrow: 1, flexBasis: '200px' }} ></Column>
                        <Column field="changedate" header="異動時間" sortable style={{ flexGrow: 1, flexBasis: '200px' }} ></Column>
                        <Column field="deptid" header="單位" sortable style={{ flexGrow: 1, flexBasis: '200px' }} ></Column>
                        <Column field="deptdesc" header="單位名稱" sortable style={{ flexGrow: 1, flexBasis: '200px' }} ></Column>
                    </DataTable>
                </div>
                
            
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(TableDemo, comparisonFn);
