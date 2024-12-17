import classes from './DataModify.module.css'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { PatientContext } from '../../context/PatientContext'

const DataModify = ({patient, setModifyPatient})=>{
    const {register, formState:{errors}, handleSubmit, reset, watch} = useForm({
        defaultValues:{
            name :patient.name,
            lastname :patient.lastname,
            dni :patient.dni,
            birth :patient.birth,
            social_security :patient.social_security,
            social_security_number :patient.social_security_number,
            gender :patient.gender,
            phone :patient.phone,
            email :patient.email,
            address :patient.address
        }
    }) 
    
    const {actualizarInformacion} = useContext(PatientContext)


    const modificarPaciente =  ()=>{
        let updatedPatient = {}

        watch("name") != ""                    && (updatedPatient.name = watch("name"))
        watch("lastname") != ""                && (updatedPatient.lastname = watch("lastname"))
        watch("dni") != ""                     && (updatedPatient.dni = watch("dni"))
        watch("birth") != ""                   && (updatedPatient.birth = watch("birth"))
        watch("social_security") != ""         && (updatedPatient.social_security = watch("social_security"))
        watch("social_security_number") != ""  && (updatedPatient.social_security_number = watch("social_security_number"))
        watch("gender") != ""                  && (updatedPatient.gender = watch("gender"))
        //watch("phone") != ""                   && (updatedPatient.phone = watch("phone"))
        //watch("email") != ""                   && (updatedPatient.email = watch("email"))
        //watch("address") != ""                 && (updatedPatient.address = watch("address"))

        fetch("http://localhost:8080/patient",{
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedPatient)
        })
        .then((resp)=> resp.json())
        .then((response)=>{
            console.log("Respuesta del Back", response.data);
            
            

            if(!response.data){
                console.log("Error al Agregar PAciente, Campos erroneos", updatedPatient);
                return
            }

            if(response.data == -1){
                console.log("El paciente con ese dni ya existe", updatedPatient);
                return
            }

            if(response.data.id){
                console.log("Se Modificó el paciente",  updatedPatient);
                actualizarInformacion()
                setModifyPatient()

            }
            
            
            }
        )
        
    }

    return(
        <div className={classes.modalContainer}>
            
            <h1 className={classes.titulo}>Agregar Paciente</h1>
            <form onSubmit={handleSubmit(modificarPaciente)} className={classes.gridContainer}>
    
                    <div className={classes.gridName}>
                        <label htmlFor="">Nombre*</label>
                        <input className={classes.inputs} type="text" placeholder='Nombre' {...register("name", {required: true, minLength: 2})} />
                        {
                            errors.name?.type === "required" && (
                                <p>Ingrese un Nombre</p>
                            )
                        }
                    </div>
                    <div className={classes.gridLastname}>
                        <label htmlFor="">Apellido*</label>
                        <input className={classes.inputs} type="text" placeholder='Apellido' {...register("lastname", {required: true, minLength: 2})} />
                        {
                            errors.lastname?.type === "required" && (
                                <p>Ingrese un Apellido</p>
                            )
                        }
                    </div>
                    <div className={classes.gridDni}>
                        <label htmlFor="">DNI*</label>
                        <input className={classes.inputs} type="text" placeholder='DNI' {...register("dni", {required: true, minLength: 5})} />
                        {
                            errors.dni?.type === "required" && (
                                <p>Ingrese un DNI</p>
                            )
                        }
                    </div>
                    <div className={classes.gridBirth}>
                        <label htmlFor="">Nacimiento</label>
                        <input className={classes.inputs} type="text" placeholder='DD/MM/AAAA' {...register("birth")} />
                    </div>
                    <div className={classes.gridSocial_security}>
                        <label htmlFor="">Obra Social</label>
                        <input className={classes.inputs} type="text" placeholder='Obra Social' {...register("social_security")} />
                    </div>
                    <div className={classes.gridSocial_security_number}>
                        <label htmlFor="">Num. Afiliado</label>
                        <input className={classes.inputs} type="text" placeholder='# Afiliado' {...register("social_security_number")} />
                    </div>
                    <div className={classes.gridGender}>
                        <label htmlFor="">Genero</label>
                        <input className={classes.inputs} type="text" placeholder='Genero' {...register("gender")} />
                    </div>
                    <div className={classes.gridPhone}>
                        <label htmlFor="">Telefono</label>
                        <input className={classes.inputs} type="text" placeholder='Telefono' {...register("phone")} />
                    </div>
                    <div className={classes.grideEmail}>
                        <label htmlFor="">Email</label>
                        <input className={classes.inputs} type="text" placeholder='Email@MF.com' {...register("email",{pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })} />
                        {
                            errors.email?.type === "pattern" && (watch("email") != "") && (
                                <p>Ingrese un email validao</p>
                            )
                        }
                    </div>
                    <div className={classes.gridAddress}>
                        <label htmlFor="">Direccion</label>
                        <input className={classes.inputs} type="text" placeholder='Direccion' {...register("address")} />
                    </div>
                    
                    <button type='submit' className={classes.btnModificar} >Modificar</button>
            </form>
        </div>
    )
}


export default DataModify