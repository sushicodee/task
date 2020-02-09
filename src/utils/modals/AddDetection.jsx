import React, { Component } from 'react'
// import { AddDetectionStyles } from './AddDetectionStyles';
// import { withStyles } from "@material-ui/core";
import styled from 'styled-components';
// import { Classes } from "jss";
import Modal from '@material-ui/core/Modal';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from '@material-ui/icons/Add';

const Button = styled.button`
    border:none;
    color:#2B518E;
    background-color:inherit;
    cursor:pointer;
    outline:none;
    padding-bottom:11px;
    padding-top:36px;
`;

const ModalCard = styled.div`
    width:24em;
    margin:auto;
    margin-top:40vh;
    background-color:white;
    border-radius:10px;
    height:300px;
    position:relative;
`;


const ModalContainer = styled.div `
    padding:8px;
    padding-top:10px;
    marginBottom:8px;
    background-color:white;
`;

const DetectionList = styled.ul`
    list-style:none;
    height:120px;
    margin:auto;
    background-color:lightgrey;
    text-align:center;
    overflow-y: overlay;
    margin: 0;
    padding: 0;

    &::-webkit-scrollbar{
    width: 0.4em;
    background-color: #F5F5F5;
    };
    &::-webkit-scrollbar-track{
    boxShadow: inset 0 0 6px rgba(0,0,0,0.00);
    webkitBoxShadow: inset 0 0 6px rgba(0,0,0,0.00);
    background-color: #F5F5F5;
    };
    &::-webkit-scrollbar-thumb{
    backgroundColor: rgba(0,0,0,.1);
    outline: 1px solid slategrey;
    border-radius: 10px;
    background-color: #555;
        
    };
`;

const ListButton = styled.button`
    width:200px;
    border:none;
    cursor:pointer;
    background-color:inherit;
    padding:5px;
    outline:none;
    &:hover{
        background-color:lightblue;
        color:white;
    }

`;

export class AddDetection extends Component {

    state = {
        open:false
    }

    componentDidMount(){
        console.log('props',this.props.allDetections)
        console.log(Object.keys(this.props.allDetections));
        console.log(this.props.monitorId);
    }

     handleOpen = () => {
        this.setState(prevState => ({
            open:!prevState.open
        }))
      }
    
     handleClose = () => {
        this.setState(prevState => ({
            open:!prevState.open
        }))
      }

      handleAddDetection = (e,detectionId) => {
          e.preventDefault();
            console.log('here',detectionId);
          this.props.addDetection(this.props.monitorId,detectionId);
      }

    render() {

        const {allDetections} = this.props;
        const detectionsArray = Object.keys(allDetections);
        console.log(detectionsArray);
        return (
            <ModalContainer>
                <Button style = {{border:'none',color:'#2B518E',backgroundColor:'inherit'}} onClick = {this.handleOpen}>
                    <AddIcon style ={{fontSize:'12px'}}/> Add Detection
                </Button>
                <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                // className={classes.modal}
                open={this.state.open}
                onClose={this.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
                >
                <Fade in={this.state.open}>
                <ModalCard>
                    <h2 id="transition-modal-title" style = {{textAlign:'center',padding:'20px 0'}}>Add Detection</h2>
                    <DetectionList>
                    {detectionsArray.map(detection => (
                        <li key = {allDetections[detection].id}><ListButton
                        onClick = {(e) => this.handleAddDetection(e,allDetections[detection].id)}
                        >{allDetections[detection].detectionName}</ListButton></li>
                        ))}
                    </DetectionList>
                </ModalCard>
                </Fade>
            </Modal>
            </ModalContainer>     
        )
    }
}

export default AddDetection
