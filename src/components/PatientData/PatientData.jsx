import classes from './PatientData.module.css'
import CircleButton from '../CircleButton/CircleButton';
import DataStatic from '../DataStatic/DataStatic';
import DataModify from '../DataModify/DataModify';
import { useState } from 'react';
import { useContext } from 'react';
import { PatientContext } from '../../context/PatientContext';
import zIndex from '@mui/material/styles/zIndex';

const PatientData = ()=>{
    const [modifyPatient, setModifyPatient] = useState (false)
    const {patient} = useContext(PatientContext)
    
    
        return(
            <div className={classes.container}>

                {
                    modifyPatient ? <DataModify patient={patient} setModifyPatient={setModifyPatient} /> :<DataStatic patient={patient}/>
                }

                <CircleButton  action={modifyPatient ? "Volver" : "Modificar"} position= {{right: "-30px", top: "45%"}} handleAction={()=>{setModifyPatient(prev => !prev)}}/>
            </div>
            
        )
}


export default PatientData