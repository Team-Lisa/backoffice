import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import Modal from "react-modal";
import {Redirect, useHistory} from "react-router-dom";
import ChallengeModel from "../Models/Challenge";
import {saveChallenge} from "../Communication/challenge_controller";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ChallengeTile({color, data, update}) {
  const history = useHistory();
  const [actualData, setActualData] = useState(new ChallengeModel(data["name"], data["units"], data["challenge_id"], data["published"]));
  const handleClick = () => {
    localStorage.setItem("challenge_is_new", "false");
    localStorage.setItem("actualColor", color);
    actualData.save()
    history.push('/units')
  };
  const [publishConfirmation, setPublishConfirmation] = useState(false);
  const [unpublishConfirmation, setUnpublishConfirmation] = useState(false);

  const handleClickPublishConfirmation = () => {
    setPublishConfirmation(true);
  };

  const handlePublishConfirmationClose = () => {
    setPublishConfirmation(false);
  };

  const handleClickUnpublishConfirmation = () => {
    setUnpublishConfirmation(true);
  };

  const handleUnpublishConfirmationClose = () => {
    setUnpublishConfirmation(false);
  };

  const publishChallenge = async () => {
      actualData.publish();
      let data = ChallengeModel.getActualChallengeJSON()
      let response = await saveChallenge(actualData.challenge_id, data);
      console.log(response, "RESPONSE")
      if (!response) {
        console.log("error al publicar");
      }
      console.log(response)
      setActualData(actualData);
      update();
      handlePublishConfirmationClose();
  }

  const unpublishChallenge = async () => {
    actualData.unpublish();
    let data = ChallengeModel.getActualChallengeJSON()
    let response = await saveChallenge(actualData.challenge_id, data);
    console.log(response, "RESPONSE")
    if (!response) {
      console.log("error al publicar");
    }
    console.log(response)
    setActualData(actualData);
    update();
    handleUnpublishConfirmationClose();
}


  const publishButton = () => {
    if (actualData.published) {
      return (
        <Button variant="contained" style={{
          color: '#203F58',
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: 10,
          width: 150,
          fontFamily: 'Montserrat',
        }}
          onClick={
            handleClickUnpublishConfirmation
          }
        >
          Publicado
        </Button>
      )
    } else {
      return (
        <Button variant="contained" style={{
          color: '#CEEDE8',
          backgroundColor: '#203F58',
          borderRadius: 10,
          width: 150,
          fontFamily: 'Montserrat'
        }}
          onClick={
            handleClickPublishConfirmation
          }
        >
          Publicar
        </Button>
        )
    }
  }

  return (
    <div style={{
      width: '95%',
      height: 80,
      backgroundColor: color,
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '20px',
      paddingLeft: 20,
      paddingRight: 20
    }}>
      <h2 style={{fontFamily: 'Montserrat', color: '#203F58'}}>
        Desafio {actualData.challenge_id[1]} - {actualData.name}
      </h2>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <h4 style={{fontFamily: 'Montserrat', color: '#203F58', paddingRight: 20, paddingLeft: 20}}>
          {actualData.units.length} Unidades
        </h4>
        <div>
          <Button variant="contained" style={{
            color: '#203F58',
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: 10,
            fontFamily: 'Montserrat',
            width: 150,
            marginRight: 20
          }} onClick={handleClick}>
            Ver
          </Button>
          {publishButton()}
        </div>
        <div>
          <Dialog
              open={publishConfirmation}
              onClose={handlePublishConfirmationClose}
              centered style={{
                content: {
                  height: '55%',
                  width: '60%',
                  borderRadius: 30,
                  top: '5%',
                  left: '20%',
                  right: 'auto',
                  bottom: 'auto',
                  alignItems: 'center'
                }
          }}
            >
            <DialogTitle style={{
              fontFamily: 'Work Sans',
              color: '#203F58',
              fontSize: 25,
              margin: 0,
              paddingBottom: 20,
              fontWeight: 'bold'
            }}>
              {"¿Estás seguro que quieres publicar el desafío '" + actualData.name + "'?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{
                fontFamily: 'Work Sans',
                color: '#1c384f',
                fontSize: 20,
                margin: 0,
                paddingBottom: 10
              }}>
                Una vez publicado no podrás agregar más unidades ni lecciones.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button style={{
                color: '#203F58',
                backgroundColor: '#C4FEAC',
                borderRadius: 10,
                width: 150,
                height: 50,
                fontFamily: 'Montserrat',
                marginTop: 10,
                fontWeight: 'bold',
                marginBottom: 12,
                marginRight: 5
              }}
              onClick={publishChallenge} autoFocus>
                Publicar
              </Button>
              <Button style={{
                color: '    #FFFFFF',
                backgroundColor: '#ff3939',
                borderRadius: 10,
                width: 150,
                height: 50,
                fontFamily: 'Montserrat',
                marginTop: 10,
                fontWeight: 'bold',
                marginBottom: 12,
                marginRight: 5
              }}
              onClick={handlePublishConfirmationClose}>Cancelar</Button>
            </DialogActions>
          </Dialog>
          </div>
          <div>
          <Dialog
              open={unpublishConfirmation}
              onClose={handleUnpublishConfirmationClose}
              centered style={{
                content: {
                  height: '55%',
                  width: '60%',
                  borderRadius: 30,
                  top: '5%',
                  left: '20%',
                  right: 'auto',
                  bottom: 'auto',
                  alignItems: 'center'
                }
          }}
            >
            <DialogTitle style={{
              fontFamily: 'Work Sans',
              color: '#203F58',
              fontSize: 25,
              margin: 0,
              paddingBottom: 20,
              fontWeight: 'bold'
            }}>
              {"¿Estás seguro que quieres despublicar el desafío '" + actualData.name + "'?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{
                fontFamily: 'Work Sans',
                color: '#1c384f',
                fontSize: 20,
                margin: 0,
                paddingBottom: 10
              }}>
                Una vez despublicado no le aparecera a los usuarios de la aplicacion.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button style={{
                color: '#203F58',
                backgroundColor: '#C4FEAC',
                borderRadius: 10,
                width: 150,
                height: 50,
                fontFamily: 'Montserrat',
                marginTop: 10,
                fontWeight: 'bold',
                marginBottom: 12,
                marginRight: 5
              }}
              onClick={unpublishChallenge} autoFocus>
                Despublicar
              </Button>
              <Button style={{
                color: '    #FFFFFF',
                backgroundColor: '#ff3939',
                borderRadius: 10,
                width: 150,
                height: 50,
                fontFamily: 'Montserrat',
                marginTop: 10,
                fontWeight: 'bold',
                marginBottom: 12,
                marginRight: 5
              }}
              onClick={handleUnpublishConfirmationClose}>Cancelar</Button>
            </DialogActions>
          </Dialog>
          </div>
      </div>
    </div>
  )
}
