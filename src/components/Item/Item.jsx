import classes from './Item.module.css'
import { useState } from 'react'
import NewItemForm from '../NewItemForm/NewItemForm'

const Item = (item)=>{
    
    const [showItemForm, setShowItemForm] = useState(false)
    
    const handleButtonClick = ()=>{
        
        setShowItemForm(prev => !prev)
        
    }
    
    return(
        <>
        <div className={classes.itemContainer} style={item.type == 0 ? {} : {border:"2px solid rgb(124, 0, 0)", backgroundColor:"rgba(233, 120, 120, 0.34)"}} onClick={handleButtonClick} >
            <div className={classes.itemHeader}>
                <h1 className={classes.date}>{item.date} </h1>
                {
                    item.type == 1 
                    ? <p style={{color:" rgb(124, 0, 0)", fontSize: "1.5rem", fontWeight:"bolder"}}>Intervencion</p>
                    :<></>
                }
                
            </div>
            <h2 className={classes.description}>{item.description}</h2>
            

        </div>
        {
            showItemForm ? <NewItemForm handleButtonClick = {handleButtonClick} itemInfo={item} /> : <></>
        }
        
        </>
    )
}


export default Item