import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import {IconButton, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {getMetrics} from "../../Communication/metrics_controller";
import moment from "moment";
import Modal from "react-modal";
import {Close, Error} from "@material-ui/icons";

const Home = () => {
  const [startDate, setStartDate] = useState(moment().format('YYYY/MM/DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY/MM/DD'));
  const color = "#203F58";
  const [newAccess, setNewAccess] = useState([]);
  const [unitsCompleted, setUnitsCompleted] = useState([]);
  const [examTime, setExamTime] = useState("00:00");
  const [frequency, setFrequency] = useState(0);
  const [openMsgModal, setOpenMsgModal] = useState(false);

  const [labels, setLabels] = useState([]);

  const logged_storage = localStorage.getItem('logged');

  if (logged_storage !== "true") {
    return (<Redirect to="/login"/>)
  }

  const formatTime = (sec_num) => {
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ':' + seconds;
  }

  let metricsBetweenDays = function (startDate, endDate, metrics) {
    let now = startDate.clone(), dates = [], new_access = [], unit_completed = [];
    let new_access_metric = metrics["new_access"];
    let unit_completed_metric = metrics['unit_completed'];
    let pushedItNewAccess = false;
    let pushedItUnitCompleted = false;

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format('MM/DD/YY'));
      for (let i = 0; i < new_access_metric.length; i++) {
        if (now.format('YYYY/MM/DD') === new_access_metric[i].date) {
          new_access.push(new_access_metric[i].access_amount);
          pushedItNewAccess = true;
          break;
        }
      }
      if (pushedItNewAccess === false) {
        new_access.push(0);
      }
      pushedItNewAccess = false;
      for (let i = 0; i < unit_completed_metric.length; i++) {
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
    const time = formatTime(metrics['exam_resolution_time'].time);
    setExamTime(time);
    setFrequency(metrics['user_frequency'].time);
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
                const dateWithFormat = moment(date).format('YYYY/MM/DD');
                if (endDate <= dateWithFormat) {
                  setEndDate(dateWithFormat);
                }
                setStartDate(dateWithFormat);
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
              onChange={(date) => {
                const dateWithFormat = moment(date).format('YYYY/MM/DD');
                if (startDate >= dateWithFormat) {
                  setStartDate(dateWithFormat);
                }
                setEndDate(dateWithFormat);
              }}
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
                    if (!response || response.detail === "internal server error") {
                      console.log("error al publicar");
                      setOpenMsgModal(true);
                      setTimeout(() => {
                        setOpenMsgModal(false);
                      }, 5000)
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

  const badRequestModal = () => {
    return (
      <Modal isOpen={openMsgModal} centered style={{
        content: {
          height: 40,
          width: '60%',
          borderRadius: 20,
          backgroundColor: '#ff3939',
          top: '5%',
          left: '20%',
          right: 'auto',
          bottom: 'auto',
          alignItems: 'center'
        }
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div
            style={{display: 'flex', alignItems: 'center', fontFamily: 'Montserrat', fontSize: 26, color: 'white'}}>
            <Error fontSize="inherit" style={{height: 30, width: 30, color: 'white', marginRight: 10}}/>
            No se encontraron métricas desde el {startDate} hasta el {endDate}
          </div>
          <IconButton
            onClick={() => {
              setOpenMsgModal(false);
            }}>
            <Close fontSize="inherit" style={{height: 15, width: 15, color: 'white'}}/>
          </IconButton>
        </div>
      </Modal>
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
      <div style={{backgroundColor: 'rgb(250,250,250)', borderRadius: 20, paddingTop: 10}}>
        {filters()}
        <div style={{display: 'flex', width: '100%', justifyContent: 'space-around', paddingTop: 20}}>
          <div style={{width: '70%'}}>
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
                    zoom: true,
                    zoomin: false,
                    zoomout: false,
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
            }]} type="line" height={400}/>
          </div>
          <div style={styles.metrics}>
            <div style={styles.metricContainer}>
              <h3 style={styles.metricTitle}>
                Promedio de resolución de examenes
              </h3>
              <h2 style={styles.metricData}>
                {examTime}
              </h2>
            </div>
            <div style={styles.metricContainer}>
              <h3 style={styles.metricTitle}>
                Frecuencia del usuario
              </h3>
              <h2 style={styles.metricData}>
                {frequency} Días
              </h2>
            </div>
          </div>
        </div>
      </div>
      {badRequestModal()}
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
  },
  metrics: {width: '25%', height: 350},
  metricContainer: {
    alignItems: 'center',
    height: '50%',
    textAlign: 'center',
    backgroundColor: '#CAA7F3',
    borderRadius: 10
  },
  metricTitle: {fontFamily: 'Montserrat', color: '#203F58', paddingTop: 20},
  metricData: {
    fontFamily: 'Montserrat',
    color: '#203F58',
    alignSelf: 'center',
    fontSize: 35
  }
}
