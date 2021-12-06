import React, {useState} from "react";
import ChallengeModel from "../Models/Challenge";
import {saveChallenge} from "../Communication/challenge_controller";
import Button from "@material-ui/core/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PublishedModal({unpublish, data, update, closeModal, setData}) {
    const [actualData, setActualData] = useState(new ChallengeModel(data["name"], data["units"], data["challenge_id"], data["published"]));
    const [publishConfirmation, setPublishConfirmation] = useState(true);

  
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
        }).catch((error) => {
            console.log("error al publicar", error);
        } );
        setData(actualData);
        update();
        handlePublishConfirmationClose();
    }
 
    return (<div>
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