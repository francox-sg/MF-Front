import classes from './PatientDetailContainer.module.css'
import ClinicalHistoryContainer from '../ClinicalHistoryContainer/ClinicalHistoryContainer'
import PatientData from '../PatientData/PatientData'
import PatientProvider from '../../context/PatientContext'



const PatientDetailContainer = ()=>{


    return(
        <div className={classes.componentContainer}>
            <PatientProvider>
                <h1 className={classes.titulo}>Detalle de Paciente</h1>
                <PatientData />
                <h2 className={classes.titulo}> Historia Clinica</h2>
                <ClinicalHistoryContainer/>
            </PatientProvider>

        </div>
        
    )
}


export default PatientDetailContainer