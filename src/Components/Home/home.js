import React, { useState, useEffect } from 'react';
import {Redirect} from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

const Home = () => {
    registerLocale('es', es);
    setDefaultLocale('es');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const logged_storage = localStorage.getItem('logged');
    if(logged_storage !== "true"){
        return(<Redirect  to="/login"/>)
    }



    return (
    <div>
        <h1>Dashboard</h1>
        <div style={{backgroundColor: '#f2f9ff'}}>
            <div>
                <label>
                    Desde:
                    <DatePicker locale="es" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                </label>
                <label>
                Hasta:
                    <DatePicker locale="es" dateFormat="dd/MM/yyyy" selected={endDate} onChange={(date) => setEndDate(date)} />
                </label>
            </div>
            <div>
                <ReactApexChart options={{
                chart: {
                    height: 350,
                    type: 'line',
                },
                colors: ['#CAA7F3', '#93D9F8', '#C4FEAC'],
                stroke: {
                    width: [0, 4]
                },
                title: {
                    text: ''
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
                xaxis: {
                    type: 'datetime'
                },
                yaxis: [{
                    title: {
                    text: 'Website Blog',
                    },
                
                }, {
                    opposite: true,
                    title: {
                    text: 'Social Media',
                    }
                }]
                }} series={[{
                name: 'Cantidad de unidades completas por los usuarios en un día',
                type: 'column',
                data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
                }, {
                name: 'Cantidad de accesos a la aplicación en el día',
                type: 'line',
                data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
                }]} type="line" height={350} />
            </div>
        </div>
    </div>
    )
}

export default Home;
