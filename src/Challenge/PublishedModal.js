import React, {useState} from "react";
import ChallengeModel from "../Models/Challenge";
import {saveChallenge} from "../Communication/challenge_controller";
import Button from "@material-ui/core/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from "react-modal";
import {CheckCircle, Close, Error} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

export default function PublishedModal({unpublish, data, update, closeModal, setData}) {
    const [actualData, setActualData] = useState(new ChallengeModel(data["name"], data["units"], data["challenge_id"], data["published"]));
    const [publishConfirmation, setPublishConfirmation] = useState(true);
    const [openMsgModal, setOpenMsgModal] = useState(false);
    const [msgCorrect, setMsgCorrect] = useState(true);
    const [errors, setErrors] = useState([]);

    const handlePublishConfirmationClose = () => {
      closeModal(false);
    };
  
    const publishChallenge = async () => {
        if (unpublish === false) {
            actualData.publish();
            
        } else {
            actualData.unpublish();
        }
        let data = ChallengeModel.getActualChallengeJSON()
        saveChallenge(actualData.challenge_id, data).then((response) => {
            console.log(response);
            console.log([msgCorrect, openMsgModal])
            if (response === true) {
              setData(actualData);
              update();
              setMsgCorrect(true);
              setOpenMsgModal(true);
              console.log([msgCorrect, openMsgModal])
            } else {
              setErrors(response);
              setMsgCorrect(false);
              setOpenMsgModal(true);
              console.log([msgCorrect, openMsgModal])
            }
        }).catch((errors) => {
            console.log("error al publicar", errors);
        } );
        setTimeout(() => {handlePublishConfirmationClose();},15000);
    }

    const modalResponse = () => {
      if (msgCorrect) {
        return (
          <Modal isOpen={openMsgModal} centered style={{
            content: {
              height: 40,
              width: '60%',
              borderRadius: 20,
              backgroundColor: '#C4FEAC',
              top: '5%',
              left: '20%',
              right: 'auto',
              bottom: 'auto',
              alignItems: 'center'
            }
          }}>
            <div style={{display: 'flex',justifyContent: 'space-between', alignItems: 'center'}}>
              <div
                style={{display: 'flex', alignItems: 'center', fontFamily: 'Montserrat', fontSize: 26, color: '#203F58'}}>
                <CheckCircle fontSize="inherit" style={{height: 30, width: 30, color: '#203F58', marginRight: 10}}/>
                {(unpublish !== false) ? 'El desafio se publico exitosamente.' : 'El desafio se despublico exitosamente.'}
              </div>
              <IconButton
                onClick={() => {
                  handlePublishConfirmationClose();
                }}>
                <Close fontSize="inherit" style={{height: 15, width: 15, color: '#203F58'}}/>
              </IconButton>
            </div>
          </Modal>
        )
      } else {
        return (
          <Modal isOpen={openMsgModal} centered style={{
            content: {
              borderRadius: 20,
              width: '60%',
              backgroundColor: '#ff3939',
              top: '5%',
              left: '20%',
              right: 'auto',
              bottom: 'auto',
              alignItems: 'center'
            }
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Error fontSize="inherit" style={{height: 30, width: 30, color: 'white', marginRight: 10}}/>
              <div
                style={{alignItems: 'center', fontFamily: 'Montserrat', fontSize: 22, color: 'white', width: '90%'}}>
                <div
                style={{alignItems: 'center', fontFamily: 'Montserrat', fontSize: 26, color: 'white', fontWeight:700, marginBottom:10}}>
                  Han ocurrido los sguientes errores al publicar :
                </div>
                  {(unpublish === false) ? errors.map((value,index) => {return <li key={index}>{value}</li>}) : 'Ha ocurrido un error al despublicar el desafio.'}
              </div>
  
              <IconButton
                onClick={() => {
                  handlePublishConfirmationClose();
                }}>
                <Close fontSize="inherit" style={{height: 15, width: 15, color: 'white', position:'absolute', top: 10, right: 10}}/>
              </IconButton>
            </div>
          </Modal>
        )
      }
    }
    
    if (openMsgModal) {
      return modalResponse();
    }

    return (
      
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
            {(unpublish === false) ? "¿Estás seguro que quieres publicar el desafío '" + actualData.name + "'?" : "¿Estás seguro que quieres despublicar el desafío '" + actualData.name + "'?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{
              fontFamily: 'Work Sans',
              color: '#1c384f',
              fontSize: 20,
              margin: 0,
              paddingBottom: 10
            }}>
            {(unpublish === false) ? "Una vez publicado no podrás agregar más unidades ni lecciones." : "Una vez despublicado no le aparecera a los usuarios de la aplicacion."}              
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
              {(unpublish === false) ? "Publicar" : "Despublicar"}              
           
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
    )
}