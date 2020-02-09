import React, { Component } from 'react'
import styled from 'styled-components';
import Detection from '../Detection';
import {Droppable} from 'react-beautiful-dnd';
import SignalWifi0BarIcon from '@material-ui/icons/SignalWifi0Bar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddDetection from '../../utils/modals';

const Container = styled.div`
    margin:8px;
    width:280px;
    display:flex;
    flex-direction:column;
    background-color:white;
    border-radius:4px;
`;

const Header = styled.h3`
    padding:8px;
    padding-bottom:0px;
    color:#0A2239;
    display:flex;
    justify-content:space-between;
`;

const Zone = styled.h4`
    padding-left:8px;
    color:#0A2239;
    margin:0;
`;


const Video = styled.div`
    height:150px;
    margin:8px;
    background-color:black;
    border-radius:4px;
`;

const DetectionList = styled.div`
    padding:8px;
    background-color: ${props => (props.isDraggingOver ? 'white' : 'white')};
    transition: background-color 0.2s ease;
    flex-grow:1;
    height:180px;
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

export class Monitor extends Component {

    
    shouldComponentUpdate(nextProps) {
        if (this.props.monitor === nextProps.monitor) {
          return false;
        }
        return true;
      }

    render() {
        console.log('monitor component>>',this.props)
        return(
            <Container>
                <Header>
                    <div>
                    {this.props.monitor.ipAddress} <SignalWifi0BarIcon/>
                    </div>
                    <div>
                        <button style = {{backgroundColor:'transparent', border:'none', outline:'none', color:'#0A2239'}}><MoreHorizIcon/></button>
                    </div>
                </Header>
                <Zone>
                    Zone{this.props.monitor.zoneName}
                </Zone>
                <Video>
                </Video>    
                <Droppable
                 droppableId = {this.props.monitor.id}
                >
                    {(provided,snapshot) => (
                    <DetectionList
                    {...provided.droppableProps}
                    ref = {provided.innerRef}
                    isDraggingOver = {snapshot.isDraggingOver}
                    >
                        {this.props.detections.map((detection,index) => (<Detection key = {detection.id} allDetections = {this.props.allDetections} monitorId = {this.props.monitor.id} detection = {detection} index = {index} handleRemoveDetection = {this.props.handleRemoveDetection}/>))}
                        {provided.placeholder}    
                    </DetectionList>
                    
                    )}
                </Droppable>
                <AddDetection monitorId = {this.props.monitor.id} allDetections = {this.props.allDetections} addDetection = {this.props.addDetection}/>
            </Container>
        )
    }
}

export default Monitor;
