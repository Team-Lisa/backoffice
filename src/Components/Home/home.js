import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {getMetrics} from "../../Communication/metrics_controller";
import moment from "moment";

const Home = () => {
  const [startDate, setStartDate] = useState(moment().format('YYYY/MM/DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY/MM/DD'));
  const color = "#203F58";
  const [newAccess, setNewAccess] = useState([]);
  const [unitsCompleted, setUnitsCompleted] = useState([]);

  const [labels, setLabels] = useState([]);

  const logged_storage = localStorage.getItem('logged');

  if (logged_storage !== "true") {
    return (<Redirect to="/login"/>)
  }

  let metricsBetweenDays = function(startDate, endDate, metrics) {
    let now = startDate.clone(), dates = [], new_access = [], unit_completed = [];
    let new_access_metric = metrics["new_access"];
    let unit_completed_metric = metrics['unit_completed'];
    let pushedItNewAccess = false;
    let pushedItUnitCompleted = false;

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('MM/DD/YY'));
        for(let i = 0; i < new_access_metric.length; i++) {
          if (now.format('YYYY/MM/DD') === new_access_metric[i].date) {
            new_access.push(new_access_metric[i].access_amount);
            pushedItNewAccess = true;
            console.log(pushedItNewAccess)
            break;
          }
        }
        console.log(pushedItNewAccess)
        if (pushedItNewAccess === false) {
          new_access.push(0);
        }
        pushedItNewAccess = false;
        for(let i = 0; i < unit_completed_metric.length; i++) {
          if (now.format('YYYY/MM/DD') === unit_completed_metric[i].date) {
            unit_completed.push(unit_completed_metric[i].units_completed_amount);
            pushedItUnitCompleted = true;
            break;
          }
        }
        if (pushedItUnitCompleted === false) {
          unit_completed.push(0);
        }
        pushedItUnitCompleted = false;
        now.add(1, 'days');
    }
    setLabels(dates);
    setNewAccess(new_access);
    setUnitsCompleted(unit_completed);
  };

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
              onChange={(date) => {
                setStartDate(moment(date).format('YYYY/MM/DD'))
                }}
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
              onChange={(date) => setEndDate(moment(date).format('YYYY/MM/DD'))}
              renderInput={(params) => <TextField {...params} sx={{
                svg: {color},
                input: {color},
                label: {color}
              }}/>}
            />
          </LocalizationProvider>
        </label>
        <Button variant="contained" style={{
          color: '#CEEDE8',
          backgroundColor: '#203F58',
          borderRadius: 10,
          width: 150,
          fontFamily: 'Montserrat'
        }}
        onClick={
          async () => {
            let response = await getMetrics(startDate, endDate);
            console.log(response)
            if (!response || response.detail === "internal server error") {
              console.log("error al publicar");
              return
            }
            metricsBetweenDays(moment(startDate), moment(endDate), response.metrics);
          }
        }>
          Buscar
        </Button>
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
      <div style={{backgroundColor: 'rgb(240,240,240)', borderRadius: 20, paddingTop:10}}>
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
            data: unitsCompleted
          }, {
            name: 'Cantidad de accesos a la aplicación en el día',
            type: 'line',
            data: newAccess
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
    justifyContent: 'space-around',
    marginBottom: 10
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
