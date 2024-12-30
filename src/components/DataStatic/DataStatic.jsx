import classes from './DataStatic.module.css'


const DataStatic = ({patient})=>{




        return(
            <div className={classes.container}>
                <div className={classes.gridContainer}>
                    
                    <h1 className={classes.gridName}>{patient.lastname}, {patient.name} {patient.age &&(`(${patient.age} años)`)}</h1>
                    <p className={classes.gridSocial_secure}>Obra Social: {patient.social_security}</p>
                    <p className={classes.gridDni}>DNI: {patient.dni}</p>
                    <p className={classes.gridSocial_secure_number}>N° Afiliado: {patient.social_security_number}</p>
                    <p className={classes.gridBirth}>Fecha de Nacimiento: {patient.birth}</p>
                    <p className={classes.gridPhone}>Telefono: {patient.phone}</p>
                    <p className={classes.gridEmail}>email: {patient.email}</p>
                    <p className={classes.gridAddress}>Direccion: {patient.address}</p>
                    <p className={classes.gridGender}>Genero: {patient.gender == 1 ? "H" : "F"}</p>
                </div>
                
            </div>
            
        )
}


export default DataStatic