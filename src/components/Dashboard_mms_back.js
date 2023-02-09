import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menu } from 'primereact/menu';
import ProductService from '../service/ProductService';
import EventService from '../service/EventService';

const chartData = {
    labels: ['01', '02', '03', '04', '05', '06', '07','08', '09', '10', '11', '12'],
    datasets: [{
        label: '檢修率',
        data: [20, 19, 3, 5, 2, 3, 9,2,1,5,1,3],
        borderColor: [
            '#7E57C2',
        ],
        borderWidth: 3,
        borderDash: [5, 5],
        fill: false,
        pointRadius: 3,
        tension: .4
    }]
};

const chartOptions = {
    responsive: true,
    hover: {
        mode: 'index'
    },
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: 'Month'
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Value'
            }
        }
    }
};

const Dashboard = () => {

    const [carpm, setCarPm] = useState([]);
    const [carrepaire, setCarRepaire] = useState([]);
    const [events, setEvents] = useState([]);


    const items = [
        { label: 'Save', icon: 'pi pi-fw pi-check' },
        { label: 'Update', icon: 'pi pi-fw pi-refresh' },
        { label: 'Delete', icon: 'pi pi-fw pi-trash' }
    ];

    const menuRef = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        const eventService = new EventService();
        // productService.getProducts().then((data) => setProducts(data));
        productService.getPmCars().then((data) => setCarPm(data));
        productService.getRepaireCars().then((data) => setCarRepaire(data));
        eventService.getEvents().then((data) => setEvents(data));
    }, []);

    const menuToggle = (event) => {
        menuRef.current.toggle(event);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

    const priceBodyTemplate = (data) => {
        return (
            <>
                <span className="column-title">Price</span>
                {formatCurrency(data.price)}
            </>
        );
    };

    const bodyTemplate = (data, props) => {
        return (
            <>
                <span className="column-title">{props.header}</span>
                {data[props.field]}
            </>
        );
    };

    const statusBodyTemplate = (data) => {
        if(data.wostatus==='已完成待回報'){
            return (
                <>
                    {/* <span className="column-title">Status</span> */}
                    {/* <span className={`product-badge status-${data.wostatus.toLowerCase()}`}>{data.wostatus}</span> */}                
                    <span className={`product-badge status-instock`}>{data.wostatus}</span>
                </>
            )
        }else if(data.wostatus==='已執行待派工'){
            return (
                <>
                    {/* <span className="column-title">Status</span> */}
                    {/* <span className={`product-badge status-${data.wostatus.toLowerCase()}`}>{data.wostatus}</span> */}                
                    <span className={`product-badge status-lowstock`}>{data.wostatus}</span>
                </>
            )
        }else{
            return (
                <>
                    {/* <span className="column-title">Status</span> */}
                    {/* <span className={`product-badge status-${data.wostatus.toLowerCase()}`}>{data.wostatus}</span> */}                
                    <span className={`product-badge status-outofstock`}>{data.wostatus}</span>
                </>
            )
        }
        
        
    };

    return (
        <div className="layout-dashboard">
            <div className="grid">
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box sales">
                        <i className="overview-icon pi pi-dollar"></i>
                        <span className="overview-title">本日定期檢修車組(輛)數</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">
                            22
                        </div>
                        <div className="overview-subinfo">
                            比昨日增加 21%
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box sales">
                        <i className="overview-icon pi pi-search"></i>
                        <span className="overview-title">本日臨時檢修車組(輛)數</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">
                            15
                        </div>
                        <div className="overview-subinfo">
                        比昨日增加 2%
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box users">
                        <i className="overview-icon pi pi-users"></i>
                        <span className="overview-title">本日可用檢修車組(輛)數</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">
                            230
                        </div>
                        <div className="overview-subinfo">
                            比昨日增加 9 輛
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box checkin">
                        <i className="overview-icon pi pi-map-marker"></i>
                        <span className="overview-title">本日車輛可用率</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">
                            91%
                        </div>
                        <div className="overview-subinfo">
                            比昨日增加 0.31%
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-6">
                    <div className="card card-w-title statistics">
                        <h5>各月份車輛檢修率</h5>
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className="col-12 lg:col-3">
                    <div className="user-card card">
                        <div className="user-card-header">
                            <img src="assets/layout/images/dashboard/bg-header.png" alt="babylon-layout" className="profile-image" />
                        </div>
                        <div className="user-card-content">
                            {/* <img src="assets/layout/images/avatar.png" alt="babylon-layout" /> */}
                            <Menu ref={menuRef} popup model={items} appendTo={document.body} />
                            <Button id="user-button" type="button" icon="pi pi-bars" className="secondary-btn" onClick={menuToggle} />

                            <div className="user-card-name">
                                <span>本日故障通報</span>
                            </div>

                            <div className="user-detail">
                                <ul>
                                    <li className="clearfix">
                                        <i className="pi pi-list"></i>
                                        <span className="project-title">A類故障</span>
                                        <span className="project-detail">1</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '1%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-dollar"></i>
                                        <span className="project-title">B類故障</span>
                                        <span className="project-detail">2%</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '3%' }}></div>
                                        </div>
                                    </li>
                                    {/* <li className="clearfix">
                                        <i className="pi pi-money-bill"></i>
                                        <span className="project-title">Payments</span>
                                        <span className="project-detail">24 new</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '65%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-users"></i>
                                        <span className="project-title">Clients</span>
                                        <span className="project-detail">+80%</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '80%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-money-bill"></i>
                                        <span className="project-title">Sales</span>
                                        <span className="project-detail">+45</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '45%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-chart-bar"></i>
                                        <span className="project-title">Performance</span>
                                        <span className="project-detail">+75</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '75%' }}></div>
                                        </div>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 md:col-5 lg:col-3">
                    <div className="card card-w-title tasks">
                        <h5>本日待修車輛動態..</h5>                       
                        <ul>
                            <li>
                                {/* <Checkbox checked={checked1} onChange={e => setChecked1(e.checked)} /> */}
                                <span>EMU501</span>
                                <span>在段待修</span>
                                <span className="task-badge red"></span>
                            </li>
                            <li>
                                <span>EMU502</span>
                                <span>在段待料</span>
                                <span className="task-badge orange"></span>
                            </li>                            
                        </ul>
                    </div>
                </div>

                <div className="col-12 xl:col-6">
                    <div className="card card-w-title global-sales p-fluid">
                        <h5>待保養車輛清單</h5>
                        <DataTable value={carpm} paginator rows={5} className="p-datatable-products">
                            <Column field="id" header="車組(輛)" sortable body={bodyTemplate}></Column>
                            <Column field="schedstart" header="預計開工日" sortable body={bodyTemplate} ></Column>
                            <Column field="actstart" header="實際開工日" sortable body={bodyTemplate}></Column>
                            <Column field="wostatus" header="Status" sortable body={statusBodyTemplate}></Column>
                            <Column bodyStyle={{ textAlign: 'center' }} body={() => <Button type="button" icon="pi pi-search"></Button>}></Column>
                        </DataTable>
                    </div>

                   
                </div>

                <div className="col-12 xl:col-6">
                    <div className="card card-w-title global-sales p-fluid">
                        <h5>待檢修車輛清單</h5>
                        <DataTable value={carrepaire} paginator rows={5} className="p-datatable-products">
                        <Column field="id" header="車組(輛)" sortable body={bodyTemplate}></Column>
                            <Column field="schedstart" header="預計開工日" sortable body={bodyTemplate} ></Column>
                            <Column field="actstart" header="實際開工日" sortable body={bodyTemplate}></Column>
                            <Column field="wostatus" header="Status" sortable body={statusBodyTemplate}></Column>
                            <Column bodyStyle={{ textAlign: 'center' }} body={() => <Button type="button" icon="pi pi-search"></Button>}></Column>
                        </DataTable>
                    </div>

                   
                </div>

                {/* <div className="col-12 md:col-12 lg:col-3">
                    <div className="card card-w-title resolution-center p-fluid">
                        <h5>Support Request</h5>

                        <label htmlFor="resolution-username">Username</label>
                        <InputText id="resolution-username" type="text" placeholder="Name" />

                        <label htmlFor="resolution-message">Message</label>
                        <InputTextarea id="resolution-message" type="text" placeholder="Message" />

                        <div className="resolution-button-bar">
                            <Button type="button" label="Save Draft" className="p-button-secondary" icon="pi pi-plus" />
                            <Button type="button" label="Send" icon="pi pi-check" />
                        </div>
                    </div>
                </div> */}

                {/* <div className="col-12 md:col-12 lg:col-4">
                    <div className="card card-w-title team">
                        <h5>Team</h5>
                        <ul>
                            <li>
                                <img src="assets/layout/images/avatar.png" alt="babylon-layout" />
                                <div className="team-box">
                                    <span className="team-member">Arlene Welch</span>
                                    <span className="team-member-role">Design</span>
                                </div>
                                <button type="button" className="p-link">
                                    <i className="pi pi-comment"></i>
                                </button>
                                <button type="button" className="p-link">
                                    <i className="pi pi-share-alt"></i>
                                </button>
                            </li>
                            <li>
                                <img src="assets/layout/images/avatar-john.png" alt="babylon-layout" />
                                <div className="team-box">
                                    <span className="team-member">John Swisher</span>
                                    <span className="team-member-role">Development</span>
                                </div>
                                <button type="button" className="p-link">
                                    <i className="pi pi-comment"></i>
                                </button>
                                <button type="button" className="p-link">
                                    <i className="pi pi-share-alt"></i>
                                </button>
                            </li>
                            <li>
                                <img src="assets/layout/images/avatar-julia.png" alt="babylon-layout" />
                                <div className="team-box">
                                    <span className="team-member">Warren Shaw</span>
                                    <span className="team-member-role">Sales</span>
                                </div>
                                <button type="button" className="p-link">
                                    <i className="pi pi-comment"></i>
                                </button>
                                <button type="button" className="p-link">
                                    <i className="pi pi-share-alt"></i>
                                </button>
                            </li>
                            <li>
                                <img src="assets/layout/images/avatar-kevin.png" alt="babylon-layout" />
                                <div className="team-box">
                                    <span className="team-member">Kevin Lane</span>
                                    <span className="team-member-role">Marketing</span>
                                </div>
                                <button type="button" className="p-link">
                                    <i className="pi pi-comment"></i>
                                </button>
                                <button type="button" className="p-link">
                                    <i className="pi pi-share-alt"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div> */}

                {/* <div className="col-12 xl:col-6">
                    <div className="card card-w-title timeline">
                        <h5>Timeline</h5>
                        <ul>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-globe"></i>
                                </div>
                                <div className="timeline-content">
                                    <h3>Notes Added</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit tortor a ipsum vehicula,
                                        in semper sapien auctor.</p>
                                    <div className="timeline-footer">
                                        <i className="pi pi-clock"></i>
                                        <span>3 Sep 2018 at 10:41</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-calendar"></i>
                                </div>
                                <div className="timeline-content">
                                    <h3>Reminder Scheduled</h3>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                                    <div className="timeline-footer">
                                        <i className="pi pi-clock"></i>
                                        <span>4 Sep 2018 at 11:30</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-image"></i>
                                </div>
                                <div className="timeline-content">
                                    <div className="child">
                                        <div>
                                            <span>3 Photos Added to</span>
                                            <span className="colorful">Album-23</span>
                                        </div>
                                        <img src="assets/layout/images/dashboard/image-1.png" alt="babylon-layout" />
                                        <img src="assets/layout/images/dashboard/image-2.png" alt="babylon-layout" />
                                        <img src="assets/layout/images/dashboard/image-3.png" alt="babylon-layout" />
                                        <div className="timeline-footer">
                                            <i className="pi pi-clock"></i>
                                            <span>9 Sep 2018 at 00:44</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-image"></i>
                                </div>
                                <div className="timeline-content">
                                    <div className="child">
                                        <h3>Location Update</h3>
                                        <img src="assets/layout/images/dashboard/antalya.png" alt="babylon-layout" style={{ width: '100%' }} />
                                        <div className="timeline-footer">
                                            <i className="pi pi-clock"></i>
                                            <span>16 Sep 2018 at 20:02</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div> */}

                

                {/* <div className="col-12 md:col-12 lg:col-12">
                    <div className="card card-w-title">
                        <h5>Schedule</h5>
                        <FullCalendar events={events} plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} initialDate='2023-01-01'
                            header={{ left: 'prev,next,today', center: 'title', right: '' }} />
                    </div>
                </div> */}
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Dashboard, comparisonFn);
