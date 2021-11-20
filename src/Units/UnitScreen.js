import React, {useState} from "react";
import UnitsTile from "./UnitsTile";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
      <div style={{
        width: '100%',
        height: 80,
        paddingBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        backgroundColor: 'rgba(255,255,255,0.9)'
      }}>
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

  const addButtonBottom = () => {
    return (
      <Button variant={'contained'}
              style={{
                color: '#203F58',
                backgroundColor: actualColor,
                borderRadius: 50,
                width: 60,
                height: 62,
                fontSize: 35,
                fontFamily: 'Montserrat',
                position: 'fixed',
                bottom: 20,
                right: 20
              }}>
        +
      </Button>
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
      {addButtonBottom()}
    </div>
  );
}