import classes from './NewPatientForm.module.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Slider from '../slider/Slider'

const NewPatientForm = ({handleButtonClick})=>{

    const [gender, setGender] = useState(true)

    const {register, formState:{errors}, handleSubmit, setValue, reset, watch} = useForm({
        defaultValues:{
            name:"",
            lastname:"",
            dni:"",
            birth:"",
            social_security:"",
            social_security_number:"",
            gender:"",
            phone:"",
            email:"",
            address:"",
            country:"",
            postal_code:"",
        }
    }) 

    const navigate = useNavigate()

    const handlerGender = (e) =>{
        setGender(prev=>!prev) 
    }

    
    
    const agregarBarra = (e) => {
        let fecha = watch("birth")
        let largoCadena = fecha.length;
        let tecla = e.key
        
        
        console.log("Fecha Inicial: ", fecha);
        console.log("Largo:: ", largoCadena);
        console.log("Nuevo Caracter: ", tecla);
        

        let string = fecha.replaceAll("/","")
        let cantChar = string.length

        let fechaFinal=""

        if (cantChar <= 2) {
            fechaFinal = string.substring(0, cantChar);
        } else if (cantChar <= 4) {
            fechaFinal = string.substring(0, 2);
            fechaFinal += "/";
            fechaFinal += string.substring(2, cantChar);
        } else if (cantChar >= 5) {
            fechaFinal = string.substring(0, 2);
            fechaFinal += "/";
            fechaFinal += string.substring(2, 4);
            fechaFinal += "/";
            fechaFinal += string.substring(4, cantChar);
        }


    setValue("birth",`${fechaFinal}`)
    }

    const agregarPaciente =  ()=>{
        let newPatient = {}

        watch("name") != ""                    && (newPatient.name = watch("name"))
        watch("lastname") != ""                && (newPatient.lastname = watch("lastname"))
        watch("dni") != ""                     && (newPatient.dni = watch("dni"))
        watch("birth") != ""                   && (newPatient.birth = watch("birth"))
        watch("social_security") != ""         && (newPatient.social_security = watch("social_security"))
        watch("social_security_number") != ""  && (newPatient.social_security_number = watch("social_security_number"))
        newPatient.gender = gender ? 1: 2;
        watch("phone") != ""                   && (newPatient.phone = watch("phone"))
        watch("email") != ""                   && (newPatient.email = watch("email"))
        watch("address") != ""                 && (newPatient.address = watch("address"))
        watch("country") != ""                 && (newPatient.country = watch("country"))
        watch("postal_code") != ""             && (newPatient.postal_code = watch("postal_code"))

        fetch("http://localhost:8080/patient",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPatient)
        })
        .then((resp)=> resp.json())
        .then((response)=>{
            console.log("Respuesta del Back", response.data);
            
            

            if(!response.data){
                console.log("Error al Agregar PAciente, Campos erroneos", newPatient);
                return
            }

            if(response.data == -1){
                console.log("El paciente con ese dni ya existe", newPatient);
                return
            }

            if(response.data.id){
                console.log("Se agregó el paciente", newPatient);
                navigate(`/Paciente/${response.data.id}`)
            }
            
            
            }
        )
        
    }

    return(
        <div className={classes.modalContainer}>
            <div className={classes.cerrar} onClick={handleButtonClick} >Cerrar</div>
            <h1 className={classes.titulo}>Agregar Paciente</h1>
            <form onSubmit={handleSubmit(agregarPaciente)} className={classes.gridContainer}>
                <h2 className={classes.datosBasicosTitle}>Datos Basicos</h2>
                <h2 className={classes.obraSocialTitle}>Informacion de Obra Socal</h2>
                <h2 className={classes.contactoTitle}>Contacto</h2>
                <div className={classes.gridName}>
                    <label htmlFor="">Nombre*</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("name", {required: true, minLength: 2})} />
                    {
                        errors.name?.type === "required" && (
                            <p>Ingrese un Nombre</p>
                        )
                    }
                </div>
                <div className={classes.gridLastname}>
                    <label htmlFor="">Apellido*</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("lastname", {required: true, minLength: 2})} />
                    {
                        errors.lastname?.type === "required" && (
                            <p>Ingrese un Apellido</p>
                        )
                    }
                </div>
                <div className={classes.gridDni}>
                    <label htmlFor="">DNI*</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("dni", {required: true, minLength: 5})} />
                    {
                        errors.dni?.type === "required" && (
                            <p>Ingrese un DNI</p>
                        )
                    }
                </div>
                <div className={classes.gridBirth}>
                    <label htmlFor="">Nacimiento</label>
                    <input onKeyUp={agregarBarra} className={classes.inputs} type="text" placeholder='DD/MM/AAAA' {...register("birth")} />
                </div>
                <div className={classes.gridSocial_security}>
                    <label htmlFor="">Obra Social</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("social_security")} />
                </div>
                <div className={classes.gridSocial_security_number}>
                    <label htmlFor="">Num. Afiliado</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("social_security_number")} />
                </div>
                <div className={classes.gridGender}>
                    <label htmlFor="">Genero</label>
                    <Slider value = {gender} handlerValue = {handlerGender} colorTrue='#007bff' colorFalse='#ff006a' letterTrue='M' letterFalse='F'/>
                </div>
                <div className={classes.grideEmail}>
                    <label htmlFor="">Email</label>
                    <input className={classes.inputs} type="text" placeholder='Email@MF.com' {...register("email",{pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })} />
                    {
                        errors.email?.type === "pattern" && (watch("email") != "") && (
                            <p>Ingrese un email valido</p>
                        )
                    }
                </div>
                <div className={classes.gridPhone}>
                    <label htmlFor="">Telefono</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("phone")} />
                </div>
                <div className={classes.gridAddress}>
                    <label htmlFor="">Direccion</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("address")} />
                </div>
                
                <div className={classes.gridCountry}>
                    <label htmlFor="">Localidad</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("country")} />
                </div>
                
                <div className={classes.gridPostal_code}>
                    <label htmlFor="">Codigo Postal</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("postal_code")} />
                </div>
                
                <button type='submit' className={classes.btnAgregar} >Guardar</button>
            </form>
        </div>
    )
}


export default NewPatientForm