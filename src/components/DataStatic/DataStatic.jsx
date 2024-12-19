import classes from './DataStatic.module.css'


const DataStatic = ({patient})=>{
/*     const [showNewPatient, setShowNewPatient] = useState (false)

    const navigate = useNavigate()
 */
    
    
    //console.log("PACIENTE: ",patient.gender);
    
/*     const handleButtonClick = ()=>{
        //navigate('/NuevoPaciente')
        console.log("Nuevo Paciente");
        
        setShowNewPatient(prev =>!prev)
    } */


        return(
            <div className={classes.container}>
                <div className={classes.gridContainer}>
                    
                    <h1>{patient.lastname}, {patient.name}</h1>
                    <p>DNI: {patient.dni}</p>
                    <p>Obra Social: {patient.social_secure}</p>
                    <p>Numero de Afiliado: {patient.social_secure_number}</p>
                    <p>Fecha de Nacimiento: {patient.birth}</p>
                    <p>Edad: {patient.age}</p>
                    <p>Telefono: {patient.phone}</p>
                    <p>email: {patient.email}</p>
                    <p>Direccion: {patient.address}</p>
{/*                     <p>Genero: {patient.gender}</p> */}
                </div>
                
            </div>
            
        )
}


export default DataStatic