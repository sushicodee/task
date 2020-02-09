export const addDetectionStyles = () => ({
    root:{
    },
    list:{
        overflowY: "auto",
        margin: 0,
        padding: 0,
        listStyle: "none",
        height: "100%",
        
        '&::-webkit-scrollbar': {
          width: '5px'
        },
        '&::-webkit-scrollbar-track': {
          background:'#f1f1f1',
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          background:'#555', 
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
    }
  })