import uuid from "uuid";

const initialState = {
    detections:{
        'detection-1':{
            id:'detection-1',
            detectionName:'Helmet',
            color:'#53A2BE'
        },
        'detection-2':{
                id:'detection-2',
                detectionName:'Danger Zone',
                color:'#FF6B35'

         },
        'detection-3':{
                id:'detection-3',
                detectionName:'Dump truck',
                color:'#0A2239'

        },
        'detection-4':{
            id:'detection-4',
            detectionName:'Progress',
            color:'#BFB5AF'

        },
        'detection-5':{
            id:'detection-5',
            detectionName:'illegal Dumping',
            color:'#FB3640'
        }
    },
    
    monitors:{
        'monitor-1':{
            id:'monitor-1',
            ipAddress:'192.168.192',
            zoneName:'A',
            detectionIds:[{id:uuid(),target:'detection-2'},{id:uuid(),target:'detection-3'}]
        },
        'monitor-2':{
            id:'monitor-2',
            ipAddress:'192.198.193',
            zoneName:'A',
            detectionIds:[{id:uuid(),target:'detection-2'}]
        },
        'monitor-3':{
            id:'monitor-3',
            ipAddress:'192.168.192',
            zoneName:'A',
            detectionIds:[{id:uuid(),target:'detection-2'},{id:uuid(),target:'detection-3'},{id:uuid(),target:'detection-1'}]
        },
        'monitor-4':{
            id:'monitor-4',
            ipAddress:'192.168.192',
            zoneName:'A',
            detectionIds:[]
            // detectionIds:['detection-2','detection-3','detection-5','detection-4']
        },
        'monitor-5':{
            id:'monitor-5',
            ipAddress:'192.168.192',
            zoneName:'A',
            detectionIds:[]
            // detectionIds:['detection-2','detection-3']
        },
    },
    monitorOrder:['monitor-1','monitor-2','monitor-3','monitor-4','monitor-5']
    // 'monitor-3','monitor-4','monitor-5'
}
export default initialState;