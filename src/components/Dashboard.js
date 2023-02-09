import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import ProductService from '../service/ProductService';
import EventService from '../service/EventService';

const chartData = {
    labels: ['01', '02', '03', '04', '05', '06', '07','08', '09', '10', '11', '12'],
    datasets: [{
        label: '工單資料同步筆數',
        data: [2023, 1234, 4221, 2312, 2342, 2144, 4122, 1234,2314,2211,512,1876],
        borderColor: [
            '#7E57C2',
        ],
        borderWidth: 3,
        // borderDash: [5, 5],
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
                text: '月份'
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: '筆數'
            }
        }
    }
};

const Dashboard = () => {

    const [carpm, setCarPm] = useState([]);
    const [carrepaire, setCarRepaire] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const productService = new ProductService();
        const eventService = new EventService();
        // productService.getProducts().then((data) => setProducts(data));
        productService.getPmCars().then((data) => setCarPm(data));
        productService.getRepaireCars().then((data) => setCarRepaire(data));
        eventService.getEvents().then((data) => setEvents(data));
    }, []);

    return (
        <div className="layout-dashboard">
            <div className="grid">
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box sales">
                        <i className="overview-icon pi pi-search"></i>
                        <span className="overview-title">已同步資料筆數</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">
                            233,1232,2 筆
                        </div>
                        <div className="overview-subinfo">
                        2023-02-07 23:59:59
                        </div>
                    </div>
                </div>                
                <div className="col-12 lg:col-6">
                    <div className="card card-w-title statistics">
                        <h5>各月份資料同步歷程</h5>
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                </div>                
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Dashboard, comparisonFn);
