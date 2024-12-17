import classes from './PatientItem.module.css'



const PatientItem = ({name, lastname, dni, handleClickPatient })=>{
    
    
    
    return(
        <div className={classes.patientContainer} onClick={handleClickPatient}>

            <h1>{lastname} {name}</h1>
            <h2>{dni}</h2>

        </div>
        
    )
}


export default PatientItem