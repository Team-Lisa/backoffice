import React, {useState} from "react";
import UnitsTile from "./UnitsTile";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {IconButton} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Add} from "@material-ui/icons";
import SaveIcon from "@mui/icons-material/Save";

export default function UnitScreen() {
  const actualColor = localStorage.getItem('actualColor');
  const actualData = JSON.parse(localStorage.getItem('actualData'));
  const [subtitle, setSubtitle] = useState(actualData.name);
  const units = actualData.units;
  const history = useHistory();

  const onChangeSubtitle = (event) => {
    setSubtitle(event.target.value);
    actualData.name = event.target.value;
    localStorage.setItem("actualData", JSON.stringify(actualData));
  }

  const handleBack = () => {
    history.push('/content')
  }

  const header = () => {
    return (
      <div style={{
        width: '100%',
        height: 80,
        paddingBottom: 20,
        position: 'fixed',
        top: 0,
        backgroundColor: 'rgba(255,255,255,0.9)'
      }}>
        <div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{paddingTop: 20}}>
              <IconButton style={{padding: 0, margin: 0}} onClick={handleBack}>
                <ChevronLeftIcon fontSize="inherit" style={{height: 50, width: 50, color: '#203F58'}}/>
              </IconButton>
            </div>
            <h1 style={{fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, marginBottom: 0, paddingBottom: 10}}>
              Desafío {actualData['challenge_id'][1]} -
            </h1>
            <TextField
              style={{width: "30%", marginTop: 30, alignItems: 'flex-start'}}
              inputProps={{style: {fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, fontWeight: 700}}}
              InputLabelProps={{style: {fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, fontWeight: 700}}}
              size="small"
              variant="outlined"
              margin="normal"
              value={subtitle}
              onChange={onChangeSubtitle}
            />
          </div>
        </div>
      </div>
    )
  }

  const addButtonButton = () => {
    return (
      <IconButton
        style={{padding: 15, margin: 15, position: 'fixed', bottom: 10, right: 10, backgroundColor: actualColor}}>
        <Add fontSize="inherit" style={{height: 30, width: 30, color: '#203F58'}}/>
      </IconButton>
    )
  }

  const saveButton = () => {
    return (
      <IconButton
        style={{padding: 15, margin: 15, position: 'fixed', bottom: 80, right: 10, backgroundColor: actualColor}}>
        <SaveIcon fontSize="inherit" style={{height: 30, width: 30, color: '#203F58'}}/>
      </IconButton>
    )
  }

  return (
    <div>
      <div style={{paddingBottom: 80, paddingTop: 100}}>
        {units.map((value, index) => {
          return (
            <div>
              <UnitsTile key={index} data={value} color={actualColor}/>
            </div>
          )
        })}
      </div>
      {header()}
      {addButtonButton()}
      {saveButton()}
    </div>
  );
}