import classes from './PatientsContainer.module.css'
import { useState, useEffect, useRef } from 'react'
import PatientsList from '../PatientsList/PatientsList'
import Form from '../Form/Form'

const PatientsContainer = ()=>{
    const [patients, setPatients] = useState([])
    const [filters, setFilters] = useState({})


    useEffect(()=>{
        fetch("http://localhost:8080/patient/filter",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(filters)
        })
        .then((resp)=> resp.json())
        .then((response)=>{
            //console.log(response.data);
            
            setPatients(response.data)
            }
        )
    }, [filters])


    return(
        <div className={classes.componentContainer}>
            <h1 className={classes.titulo}>Gestion de Pacientes</h1>
            <Form setFilters={setFilters}/>

            <h2 className={classes.tituloPacientes}>Pacientes</h2>
            <PatientsList patients={patients} />


        </div>
        
    )
}


export default PatientsContainer