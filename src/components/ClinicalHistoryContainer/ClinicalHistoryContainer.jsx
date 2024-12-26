import classes from './ClinicalHistoryContainer.module.css'
import { useState, useContext } from 'react'
import { PatientContext } from '../../context/PatientContext'
import Item from '../Item/Item'
import CircleButton from '../CircleButton/CircleButton'
import NewItemForm from '../NewItemForm/NewItemForm'

const ClinicalHistoryContainer = ()=>{
    const [showNewItem, setShowNewItem] = useState(false)
    const {clinicalHistory} = useContext(PatientContext)
    console.log(clinicalHistory);
    
    const handleButtonClick = ()=>{
        setShowNewItem(prev => !prev)
    }

        return(
            <div className={classes.container}>
                <div className={classes.showItems} >

                    {
                    clinicalHistory != -1  // Clinical History = -1 es que no hay Historia clinica
                    
                    ?

                        clinicalHistory.map((item)=>{
                            return (
                                <Item key={item.id} {...item}  />
                            )
                        })
                    
                    :
                            <p>Historia Clinica Vacia</p>
                    }

                </div>
                    <CircleButton action="Agregar" handleAction = {handleButtonClick} position= {{left: "50%", bottom: "-15px"}} />
                {
                    showNewItem ?

                    <NewItemForm handleButtonClick={handleButtonClick}/>

                    :

                    <></>
                }
            </div>
            
        )
}


export default ClinicalHistoryContainer