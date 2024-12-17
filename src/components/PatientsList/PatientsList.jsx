import classes from './PatientsList.module.css'
import PatientItem from '../PatientItem/PatientItem'
import CircleButton from '../CircleButton/CircleButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NewPatientForm from '../NewPatientForm/NewPatientForm';

const PatientsList = ({patients})=>{
    const [showNewPatient, setShowNewPatient] = useState (false)

    const navigate = useNavigate()

    
        
    

    const handleButtonClick = ()=>{
        //navigate('/NuevoPaciente')
        console.log("Nuevo Paciente");
        
        setShowNewPatient(prev =>!prev)
    }


        return(
            <div className={classes.container}>
                <div className={classes.showPatients} >

                    {
                    patients.map((patient)=>{
                        return (
                            <PatientItem key={patient.id} {...patient} handleClickPatient={()=>{navigate(`/Paciente/${patient.id}`)}} />
                        )
                    })
                    }
                </div>
                    <CircleButton action="+" handleAction = {handleButtonClick} position= {{left: "50%", bottom: "-15px"}} />
                {
                    showNewPatient ?

                    <NewPatientForm handleButtonClick={handleButtonClick}/>

                    :

                    <></>
                }
            </div>
            
        )
}


export default PatientsList