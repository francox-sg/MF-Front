import classes from './DataModify.module.css'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { PatientContext } from '../../context/PatientContext'
import Slider from '../slider/Slider'

const DataModify = ({patient, setModifyPatient})=>{
    const [gender, setGender] = useState(patient.gender == 2 ? false : true)

    const {register, formState:{errors}, handleSubmit, setValue, reset, watch} = useForm({
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
            address :patient.address,
            address :patient.country,
            address :patient.postal_code
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
        updatedPatient.gender =  gender ? 1: 2;
        watch("phone") != ""                   && (updatedPatient.phone = watch("phone"))
        watch("email") != ""                   && (updatedPatient.email = watch("email"))
        watch("address") != ""                 && (updatedPatient.address = watch("address"))
        watch("country") != ""                 && (updatedPatient.country = watch("country"))
        watch("postal_code") != ""                 && (updatedPatient.postal_code = watch("postal_code"))

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

    const handlerGender = () =>{
        setGender(prev=>!prev)
    }

    const agregarBarra = (e) => {
        
        let fecha = watch("birth")
        let largoCadena = fecha.length;
        let tecla = e.key
        
        console.log({fecha},{largoCadena},{tecla});
        
        
        if(tecla == "Backspace"){
        //Borro Barra
            if(largoCadena == 4 || largoCadena == 7){
                console.log("Seteo",fecha.slice(0,-1));
                
                setValue("birth",`${fecha.slice(0,-1)}`)
            }
        }else{
        //Agrego Barra
        if(largoCadena == 3 || largoCadena == 6){
            let ultimoCaracter = fecha.charAt(fecha.length - 1); // Obtiene el último carácter
            fecha = fecha.slice(0,-1)
            setValue("birth",`${fecha}/${ultimoCaracter}`)
            }
        }
    }

    return(
        <div className={classes.container}>
            
            <form onSubmit={handleSubmit(modificarPaciente)} className={classes.gridContainer}>
    
                    <div className={classes.gridName}>
                        <label className={classes.labels} htmlFor="">Nombre*</label>
                        <input className={classes.inputs} type="text" placeholder='Nombre' {...register("name", {required: true, minLength: 2})} />
                        {
                            errors.name?.type === "required" && (
                                <p>Ingrese un Nombre</p>
                            )
                        }
                    </div>
                    <div className={classes.gridLastname}>
                        <label className={classes.labels} htmlFor="">Apellido*</label>
                        <input className={classes.inputs} type="text" placeholder='Apellido' {...register("lastname", {required: true, minLength: 2})} />
                        {
                            errors.lastname?.type === "required" && (
                                <p>Ingrese un Apellido</p>
                            )
                        }
                    </div>
                    <div className={classes.gridDni}>
                        <label className={classes.labels} htmlFor="">DNI*</label>
                        <input className={classes.inputs} type="text" placeholder='DNI' {...register("dni", {required: true, minLength: 5})} />
                        {
                            errors.dni?.type === "required" && (
                                <p>Ingrese un DNI</p>
                            )
                        }
                    </div>
                    <div className={classes.gridBirth}>
                        <label className={classes.labels} htmlFor="">Nacimiento</label>
                        <input onKeyDown={agregarBarra}  className={classes.inputs} type="text" placeholder='DD/MM/AAAA' {...register("birth")} />
                    </div>
                    <div className={classes.gridSocial_secure}>
                        <label className={classes.labels} htmlFor="">Obra Social</label>
                        <input className={classes.inputs} type="text" placeholder='Obra Social' {...register("social_security")} />
                    </div>
                    <div className={classes.gridSocial_secure_number}>
                        <label className={classes.labels} htmlFor="">N° Afiliado</label>
                        <input className={classes.inputs} type="text" placeholder='# Afiliado' {...register("social_security_number")} />
                    </div>
                    <div className={classes.gridGender}>
                        <label htmlFor="">Genero</label>
                        <Slider value = {gender} handlerValue = {handlerGender} colorTrue='#007bff' colorFalse='#ff006a' letterTrue='M' letterFalse='F'/>
                    </div>
                    <div className={classes.gridPhone}>
                        <label className={classes.labels} htmlFor="">Telefono</label>
                        <input className={classes.inputs} type="text" placeholder='Telefono' {...register("phone")} />
                    </div>
                    <div className={classes.gridEmail}>
                        <label className={classes.labels} htmlFor="">Email</label>
                        <input className={classes.inputs} type="text" placeholder='Email@MF.com' {...register("email",{pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })} />
                        {
                            errors.email?.type === "pattern" && (watch("email") != "") && (
                                <p>Ingrese un email validao</p>
                            )
                        }
                    </div>
                    <div className={classes.gridAddress}>
                        <label className={classes.labels} htmlFor="">Direccion</label>
                        <input className={classes.inputs} type="text" placeholder='Direccion' {...register("address")} />
                    </div>

                    <div className={classes.gridCountry}>
                        <label className={classes.labels} htmlFor="">Pais</label>
                        <input className={classes.inputs} type="text" placeholder='Pais' {...register("country")} />
                    </div>

                    <div className={classes.gridPostal_code}>
                        <label className={classes.labels} htmlFor="">CP</label>
                        <input className={classes.inputs} type="text" placeholder='Codigo Postal' {...register("postal_code")} />
                    </div>
                    
                    <button type='submit' className={classes.btnGuardar} >Guardar</button>
            </form>
        </div>
    )
}


export default DataModify