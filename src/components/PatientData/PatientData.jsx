import classes from './PatientData.module.css'
import CircleButton from '../CircleButton/CircleButton';
import DataStatic from '../DataStatic/DataStatic';
import DataModify from '../DataModify/DataModify';
import { useState } from 'react';
import { useContext } from 'react';
import { PatientContext } from '../../context/PatientContext';

const PatientData = (/* {patient} */)=>{
    const [modifyPatient, setModifyPatient] = useState (false)
    const {patient} = useContext(PatientContext)
    
    
    

/*     const handleButtonClick = ()=>{
        //navigate('/NuevoPaciente')
        console.log("Nuevo Paciente");
        
        setShowNewPatient(prev =>!prev)
    } */


        return(
            <div className={classes.container}>
                {
                    modifyPatient ? <DataModify patient={patient} setModifyPatient={setModifyPatient} /> :<DataStatic patient={patient}/>
                    }
                <CircleButton className={classes.button}  action={"Mod"} position= {{right: "-15px", top: "45%"}} handleAction={()=>{setModifyPatient(prev => !prev)}}/>
            </div>
            
        )
}


export default PatientData