import classes from './Item.module.css'
import CircleButton from '../CircleButton/CircleButton'
import { useState } from 'react'
import NewItemForm from '../NewItemForm/NewItemForm'

const Item = (item)=>{
    
    const [showItemFormUpdate, setShowItemFormUpdate] = useState(false)
    
    const handleButtonClick = ()=>{
        console.log("HBC");
        
        setShowItemFormUpdate(prev => !prev)
        
        
    }
    
    return(
        <div className={classes.itemContainer} style={item.type == 0 ? {borderColor:"green"} : {borderColor:"rgb(124, 0, 0)"}} onClick={handleButtonClick} >
            
            <h1 className={classes.date}>{item.date} </h1>
            <h2 className={classes.description}>{item.description}</h2>
            

            {
                showItemFormUpdate ? <NewItemForm handleButtonClick = {handleButtonClick} itemInfo={item} /> : <></>
            }
        </div>
        
    )
}


export default Item