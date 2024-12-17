import classes from './CircleButton.module.css'



const CircleButton = ({action, handleAction, position})=>{
    

    
    return(
        <button style={position} className={classes.circleButton} onClick={handleAction}>
            <p>{action}</p>
        </button>
        
    )
}


export default CircleButton