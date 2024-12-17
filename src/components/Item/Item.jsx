import classes from './Item.module.css'
import CircleButton from '../CircleButton/CircleButton'
import { useState } from 'react'
import NewItemForm from '../NewItemForm/NewItemForm'

const Item = (item)=>{
    const [showBtn, setShowBtn] = useState(false)
    const [showItemForm, setShowItemForm] = useState(false)
    
    const handleButtonClick = ()=>{
        setShowItemForm(prev => !prev)
        console.log("Show/NoShow");
        
    }
    
    return(
        <div className={classes.itemContainer}  onMouseEnter={()=>{setShowBtn(true) }} onMouseLeave={()=>{setShowBtn(false) }} >

            <h1>{item.date} </h1>
            <h2>{item.description}</h2>
            {
                showBtn ? <CircleButton action={"Mod"} handleAction = {handleButtonClick} position= {{right: "-15px", top: "45%"}}  /> : <></>
            }
            {
                showItemForm ? <NewItemForm handleButtonClick = {handleButtonClick} itemInfo={item} /> : <></>
            }
        </div>
        
    )
}


export default Item