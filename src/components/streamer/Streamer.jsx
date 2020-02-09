import React, { Component } from 'react'
import initialState from '../initialState';
import styled from 'styled-components';
import Monitor from '../Monitor';
import {DragDropContext} from 'react-beautiful-dnd';
import uuid from 'uuid/v4';

const Container = styled.div`
    display:flex;
    background-color:#Fcd7C59F;
    margin:auto;
    width:92.17%;
    overflow-x:overlay;
`;

export class Streamer extends Component {
    state = initialState;

    handleCheckUnique(finish,dragged){
        console.log('handleCheckunique',finish,dragged);
        let result = true;
        finish.detectionIds.forEach((detection) => {
            if(detection.target === dragged.target){
                console.log('caution',detection.target,dragged.target);
                console.log('only unique');
                result = false;
            }
        })
        return result;
    }

    handleCheckUniqueForAddDetection(newDetectionIds,detectionId){
        let result = true;
        newDetectionIds.forEach((detection) => {
            if(detection.target === detectionId){
                console.log('only unique');
                result = false;
            }
        })
        return result;

    }

    addDetection = (monitorId,detectionId) => {
        const monitor = this.state.monitors[monitorId];
        const newDetectionIds = [...monitor.detectionIds];
        console.log('detectionIds',newDetectionIds);
 
        let isUnique = this.handleCheckUniqueForAddDetection(newDetectionIds,detectionId);
        if(isUnique){
            newDetectionIds.push({id:uuid(),target:detectionId});
    
            const newMonitor = {
                ...monitor,
                detectionIds:newDetectionIds
            }
            const newState = {
                ...this.state,
                monitors:{
                    ...this.state.monitors,
                    [newMonitor.id]:newMonitor
                }
            }
            this.setState(newState);
        }
    }

    handleRemoveDetection = (e) => {
        const monitorid = e.currentTarget.attributes.getNamedItem('monitorid').value;
        const detectionid = e.currentTarget.attributes.getNamedItem('detectionid').value;
        const monitor = this.state.monitors[monitorid];
        const newDetectionIds = [...monitor.detectionIds];

        newDetectionIds.forEach((value,index) =>{
            if(value.id === detectionid) {
                newDetectionIds.splice(index,1);
            }
        })
       
        const newMonitor = {
            ...monitor,
            detectionIds:newDetectionIds
        }
        const newState = {
            ...this.state,
            monitors:{
                ...this.state.monitors,
                [newMonitor.id]:newMonitor
            }
        }
        console.log(newState);
        this.setState(newState);
        return;
    }

    onDragEnd = result=> {
        console.log('result',result);
        const {destination,source,draggableId} = result;
        // console.log('res',result)
        // console.log('source',source);
        // console.log('destination',destination);
        if(!destination){
            return;
        }

        if(source.droppableId === destination.droppableId && source.index === destination.index){
            return;
        }

        //for the column
        const start = this.state.monitors[source.droppableId];
        const finish = this.state.monitors[destination.droppableId];
        // col should have unique detection
        const newDragged = [...start.detectionIds];
        let dragged = newDragged.splice(source.index,1);
        dragged = dragged[0];
        console.log('dragged>>',dragged);
        const isUnique = this.handleCheckUnique(finish,dragged);
        //reorderin  same col
        if(source.droppableId === destination.droppableId){
            const newDetectionIds = [...start.detectionIds]
            newDetectionIds.splice(source.index,1)
            // console.log('draggingid',draggableId);
            // console.log('ids',start.detectionIds);
            start.detectionIds.forEach( detection => {
                if(draggableId === detection.id){
                    newDetectionIds.splice(destination.index, 0 , {'id':draggableId,'target': detection.target})
                }
            });
            // newDetectionIds.splice(destination.index, 0 , {'id':draggableId,'target': newTarget})
            const newMonitor = {
                ...start,
                detectionIds:newDetectionIds
            }
            
            const newState = {
                ...this.state,
                monitors:{
                    ...this.state.monitors,
                    [newMonitor.id]:newMonitor,
                }
            }
            this.setState(newState)
            return;
        }

        if(isUnique){
            //moving detection from one col to another
            const startDetectionIds = [...start.detectionIds];
            let draggedDetection = startDetectionIds.splice(source.index,1);
            const newStart = {
                ...start,
                detectionIds:startDetectionIds
            }
    
            const finishDetectionIds = [...finish.detectionIds];
            finishDetectionIds.splice(destination.index,0,{ 'id':draggableId, 'target': draggedDetection[0].target});
    
            const newFinish = {
                ...finish, 
                detectionIds:finishDetectionIds
            }
    
            const newState = {
                ...this.state,
                monitors:{
                    ...this.state.monitors,
                    [newStart.id]:newStart,
                    [newFinish.id]:newFinish
                }
            }
            console.log(newState);
            this.setState(newState);
            return;
        }
    }

    render() {
        console.log('state>>',this.state);
        return(
            <DragDropContext
            onDragEnd = {this.onDragEnd}
            >
            <Container>
                {
                    this.state.monitorOrder.map(monitorId => {
                        const monitor = this.state.monitors[monitorId];
                        // const detections = monitor.detectionIds.map(detectionId => this.state.detections[detectionId]);
                        const detections = monitor.detectionIds;
                        return <Monitor key = {monitor.id} monitor = {monitor} detections = {detections} allDetections = {this.state.detections} handleRemoveDetection = {this.handleRemoveDetection} addDetection = {this.addDetection}> </Monitor>
                    })
                }
            </Container>
            </DragDropContext>
        )
        
    }
}

export default Streamer
