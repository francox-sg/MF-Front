import classes from './PatientDetailContainer.module.css'
//import { useParams } from 'react-router-dom'
import ClinicalHistoryContainer from '../ClinicalHistoryContainer/ClinicalHistoryContainer'
import PatientData from '../PatientData/PatientData'
//import { useState, useEffect } from 'react'
import PatientProvider from '../../context/PatientContext'
//import { useContext } from 'react'
//import { PatientContext } from '../../context/PatientContext'


const PatientDetailContainer = ()=>{


    return(
        <div className={classes.componentContainer}>
            <PatientProvider>
                <h1 className={classes.titulo}>Detalle de Paciente</h1>
                <PatientData /* patient ={patient} *//>
                <h2>Paciente id: {/* {pid} */}</h2>
                <ClinicalHistoryContainer/>
            </PatientProvider>

        </div>
        
    )
}


export default PatientDetailContainer