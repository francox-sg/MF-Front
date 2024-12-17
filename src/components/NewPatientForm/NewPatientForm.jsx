import classes from './NewPatientForm.module.css'
import { useForm } from 'react-hook-form'
//import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const NewPatientForm = ({handleButtonClick})=>{

    const {register, formState:{errors}, handleSubmit, reset, watch} = useForm({
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
            address:""
        }
    }) 

    const navigate = useNavigate()

    const agregarPaciente =  ()=>{
        let newPatient = {}

        watch("name") != ""                    && (newPatient.name = watch("name"))
        watch("lastname") != ""                && (newPatient.lastname = watch("lastname"))
        watch("dni") != ""                     && (newPatient.dni = watch("dni"))
        watch("birth") != ""                   && (newPatient.birth = watch("birth"))
        watch("social_security") != ""         && (newPatient.social_security = watch("social_security"))
        watch("social_security_number") != ""  && (newPatient.social_security_number = watch("social_security_number"))
        watch("gender") != ""                  && (newPatient.gender = watch("gender"))
        //watch("phone") != ""                   && (newPatient.phone = watch("phone"))
        //watch("email") != ""                   && (newPatient.email = watch("email"))
        //watch("address") != ""                 && (newPatient.address = watch("address"))

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
                    
                    <button type='submit' className={classes.btnAgregar} >Agregar</button>
            </form>
        </div>
    )
}


export default NewPatientForm