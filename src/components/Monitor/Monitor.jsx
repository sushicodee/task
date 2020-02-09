import React, { Component } from 'react'
import styled from 'styled-components';
import Detection from '../Detection';
import {Droppable} from 'react-beautiful-dnd';
import SignalWifi0BarIcon from '@material-ui/icons/SignalWifi0Bar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddDetection from '../../utils/modals';

const Container = styled.div`
    margin-right:8px;
    // width:261px;
    min-width: 238px;
    height:526px;
    display:flex;
    flex-direction:column;
    background-color:white;
    border-radius:5px;
`;

const Header = styled.h3`
    padding-bottom:0px;
    display:flex;
    justify-content:space-between;
    position:relative;
`;

const Zone = styled.h4`
    padding-left:16px;
    color:#2B518E;
    margin-top:-6px;
    font-size: 14px;
    line-height: 20px;
    padding-bottom:16px;
`;


const Video = styled.div`
    height:150px;
    margin:0 16px 12px;
    background-color:black;
    border-radius:4px;
    margin-bottom:32px;
`;

const DetectionList = styled.div`
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

const Ip = styled.div`
    margin-left:16px;
    width: 150px;
    height: 35px;
    font-family: Muli;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 40px;
    letter-spacing: 0.2px;
    color: #2B518E;
    margin-top:10px;
    &::span{
            font-size:20px;
    }
`;

const SettingsButton = styled.div`
    backgroundColor:transparent;
    border:none;
    outline:none;
    color:#0A2239;
    margin-top:17px;
    margin-right:14px;
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
                    <Ip>
                    IP {this.props.monitor.ipAddress.split('.').join(' ')}
                         <span style ={{position:'absolute', marginTop:'4px',paddingLeft:'10px'}}>
                        <SignalWifi0BarIcon style ={{fontSize:'20px'}}/>
                        </span>
                    </Ip>
                    <div>
                        <SettingsButton backgroundCOlor = ''><MoreHorizIcon/></SettingsButton>
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
