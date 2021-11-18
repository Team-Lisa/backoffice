import React, {useState} from "react";
import UnitsTile from "./UnitsTile";
import TextField from "@material-ui/core/TextField";

export default function UnitScreen() {
  const actualColor = localStorage.getItem('actualColor');
  const actualData = JSON.parse(localStorage.getItem('actualData'));
  const [subtitle, setSubtitle] = useState(actualData.name);
  const units = actualData.units;
  const onChangeSubtitle = (event) => {
    setSubtitle(event.target.value);
  }

  const header = () => {
    return (
      <div style={{width: '100%', height: 120, paddingBottom: 20, marginLeft: 20, marginRight: 20}}>
        <div style={{justifyContent: 'center', display: 'inline'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <h1 style={{fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, marginBottom: 0, paddingBottom: 10}}>
              Desafío {actualData['challenge_id'][1]} -
            </h1>
            <TextField
              style={{width: "30%", marginTop: 30}}
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

  console.log(units);

  return (
    <div>
      {header()}
      {units.map((value, index) => {
        return (
          <UnitsTile key={index} data={value} color={actualColor}/>
        )
      })}
    </div>
  );
}