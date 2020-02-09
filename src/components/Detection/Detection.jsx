import React, { Component } from 'react'
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import CloseIcon from '@material-ui/icons/Close';

const Container = styled.div`
    position:relative;
    padding:16px;
    border-radius:5px;
    margin-left:16px;
    margin-right:14px;
    margin-bottom:11.13px;
    border-left:20px solid ${props => props.allDetections[props.detection.target].color};
    border-right:20px solid ${props => props.allDetections[props.detection.target].color};
    -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color:white;
    color: ${props => (props.isDragging ? '#0A2239' :'#0A2239')}
    height: 60.87px;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
`;
// background-color:${props =>( props.isDragging? 'white' : 'white')};

const ButtonWrapper = styled.span`
position: absolute;
right: 0;
top: 0;
border: none;
background-color: transparent;
`;

const DetectionName = styled.span`
    font-family:Muli;
    font-style:normal;
    font-weight:600;
    font-size:15px;
    line-height:20px;
    display: flex;
    flex-direction:column;
    letter-spacing: 0.2px;
    text-align: center;
    color:#2B518E;
`;
export class Detection extends Component {

    render() {
        return (
            <Draggable
                draggableId = {this.props.detection.id} index = {this.props.index}
            >
                {(provided,snapshot) => (
                    <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref = {provided.innerRef}
                    isDragging = {snapshot.isDragging}
                    detection = {this.props.detection}
                    allDetections = {this.props.allDetections}
                    >
                        <ButtonWrapper>
                            <button  
                                style = {{padding:0,outline:'inherit',backgroundColor:'inherit',border:'none', zIndex:'5'}} 
                                monitorid = {this.props.monitorId}
                                detectionid = {this.props.detection.id} 
                                onClick = {(e) => this.props.handleRemoveDetection(e)}
                                ><CloseIcon style = {{fontSize:'16px',cursor:'pointer',color:'#C4C4C4'}}/></button>
                        </ButtonWrapper>
                        {/* {this.props.detection.detectionName} */}
                        <DetectionName>
                        {this.props.allDetections[this.props.detection.target].detectionName}
                        </DetectionName>
                    </Container>
                )}
            </Draggable>
        )
    }
}

export default Detection;
