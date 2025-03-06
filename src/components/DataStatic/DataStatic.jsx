import classes from './DataStatic.module.css'


const DataStatic = ({patient})=>{




        return(
            <div className={classes.container}>
                <div className={classes.gridContainer}>
                    
                    <h1 className={classes.gridName}>{patient.lastname}, {patient.name} {patient.age &&(`(${patient.age} años)`)}</h1>
                    <p className={classes.gridSocial_secure}><span>Obra </span>Social: {patient.social_security}</p>
                    <p className={classes.gridDni}><span>DNI:</span> {patient.dni}</p>
                    <p className={classes.gridSocial_secure_number}><span>N° Afiliado:</span> {patient.social_security_number}</p>
                    <p className={classes.gridBirth}><span>Fecha de Nacimiento:</span> {patient.birth}</p>
                    <p className={classes.gridPhone}><span>Telefono:</span> {patient.phone}</p>
                    <p className={classes.gridEmail}><span>Email:</span> {patient.email}</p>
                    <p className={classes.gridAddress}><span>Direccion:</span> {patient.address}</p>
                    <p className={classes.gridGender}><span>Genero:</span> {patient.gender == 1 ? "H" : "F"}</p>
                    <p className={classes.gridCountry}><span>Pais:</span> {patient.country}</p>
                    <p className={classes.gridPostal_code}><span>CP:</span> {patient.postal_code}</p>
                </div>
                
            </div>
            
        )
}


export default DataStatic