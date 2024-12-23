import classes from './PatientItem.module.css'



const PatientItem = ({name, lastname, dni, edad,  handleClickPatient })=>{
    
    
    
    return(
        <div className={classes.patientContainer} onClick={handleClickPatient}>

            <h2 className={classes.patientFullName}>{lastname} {name}</h2>
            <h2 className={classes.patientDni}>{dni}</h2>
            

        </div>
        
    )
}


export default PatientItem