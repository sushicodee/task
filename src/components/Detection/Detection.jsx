import React, { Component } from 'react'
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import CloseIcon from '@material-ui/icons/Close';

const Container = styled.div`
    position:relative;
    padding:16px;
    border-radius:4px;
    text-align:center;
    margin: 1px 10px;
    margin-bottom:8px;
    font-weight:bold;
    border-left:20px solid ${props => props.allDetections[props.detection.target].color};
    border-right:20px solid ${props => props.allDetections[props.detection.target].color};
    -webkit-box-shadow: 0 4px 6px -1px #222;
    -moz-box-shadow: 0 4px 6px -1px #222;
    box-shadow: 0 4px 6px -1px #222;
    background-color:white;
    color: ${props => (props.isDragging ? '#0A2239' :'#0A2239')}
    font-weight:500;
`;
// background-color:${props =>( props.isDragging? 'white' : 'white')};

const ButtonWrapper = styled.span`
position: absolute;
right: 0;
top: 0;
border: none;
background-color: transparent;
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
                                style = {{outline:'inherit',backgroundColor:'inherit',border:'none', zIndex:'5'}} 
                                monitorid = {this.props.monitorId}
                                detectionid = {this.props.detection.id} 
                                onClick = {(e) => this.props.handleRemoveDetection(e)}
                                ><CloseIcon style = {{fontSize:'16px',cursor:'pointer'}}/></button>
                        </ButtonWrapper>
                        {/* {this.props.detection.detectionName} */}
                        {this.props.allDetections[this.props.detection.target].detectionName}
                    </Container>
                )}
            </Draggable>
        )
    }
}

export default Detection;
