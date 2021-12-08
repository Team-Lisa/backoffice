import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import {TextField} from "@material-ui/core";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const color = "#203F58";

  const labels = ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'];

  const logged_storage = localStorage.getItem('logged');
  if (logged_storage !== "true") {
    return (<Redirect to="/login"/>)
  }

  const filters = () => {
    return (
      <div style={styles.filterContainer}>
        <label style={styles.filterLabels}>
          <div style={styles.filterLabelDiv}>
            Desde:
          </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => <TextField {...params} sx={{
                svg: {color},
                input: {color},
                label: {color}
              }}/>}
            />
          </LocalizationProvider>
        </label>
        <label style={styles.filterLabels}>
          <div style={styles.filterLabelDiv}>
            Hasta:
          </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => <TextField {...params} sx={{
                svg: {color},
                input: {color},
                label: {color}
              }}/>}
            />
          </LocalizationProvider>
        </label>
      </div>
    )
  }


  return (
    <div style={{margin: 20}}>
      <h1 style={{
        fontFamily: 'Work Sans',
        color: '#203F58',
        fontSize: 42,
        paddingTop: 10,
        paddingBottom: 10
      }}>Dashboard</h1>
      <div style={{backgroundColor: 'rgb(240,240,240)', borderRadius: 20}}>
        {filters()}
        <div>
          <ReactApexChart options={{
            chart: {
              height: 350,
              type: 'line',
              fontFamily: 'Montserrat',
              foreColor: color,
              toolbar: {
                tools: {
                  download: false,
                  selection: true,
                  zoom: false,
                  zoomin: true,
                  zoomout: true,
                  pan: false,
                  reset: true
                },
              },
            },
            dataLabel: {
              fontFamily: 'Montserrat',
              foreColor: color
            },
            colors: ['#CAA7F3', "#203F58", '#C4FEAC'],
            dataLabels: {
              enabled: true,
              enabledOnSeries: [1]
            },
            labels: labels,
            xaxis: {
              type: 'datetime'
            },
          }} series={[{
            name: 'Cantidad de unidades completas por los usuarios en un día',
            type: 'column',
            data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
          }, {
            name: 'Cantidad de accesos a la aplicación en el día',
            type: 'line',
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
          }]} type="line" height={350}/>
        </div>
      </div>
    </div>
  )
}

export default Home;

const styles = {
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  filterLabels: {
    display: 'flex',
    alignItems: 'center'
  },
  filterLabelDiv: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: "#203F58",
    marginLeft: 20,
    marginRight: 20,
    fontWeight: 700
  }
}
