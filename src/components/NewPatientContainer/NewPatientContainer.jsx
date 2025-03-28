import classes from './NewPatientContainer.module.css'

import PatientsList from '../PatientsList/PatientsList'


const NewPatientContainer = ()=>{



    return(
        <div className={classes.componentContainer}>
            <h1 className={classes.titulo}>Agregar Paciente</h1>
            {/* <Form setFilters={setFilters}/> */}
            <h2>Pacientes</h2>
            <PatientsList patients={patients} />

        </div>
        
    )
}


export default NewPatientContainer