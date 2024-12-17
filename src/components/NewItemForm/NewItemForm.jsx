import classes from './NewItemForm.module.css'
import { useForm } from 'react-hook-form'
import {  useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { PatientContext } from '../../context/PatientContext'


const NewItemForm = ({ handleButtonClick, itemInfo = null})=>{
    
    const {patient, agregarItemContext, actualizarItemContext} = useContext(PatientContext)

    const date = new Date()

    const {register, formState:{errors}, handleSubmit, reset, watch} = useForm({
        defaultValues:{
            date:        itemInfo ? itemInfo.date        : `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
            type:        itemInfo ? itemInfo.type : 0,
            description: itemInfo ? itemInfo.description : ""
        }
    }) 

    

    const agregarItem =  ()=>{
        let newItem = {}

        watch("date") != ""                    && (newItem.date = watch("date"))
        watch("type") != ""                    && (newItem.type = watch("type"))
        watch("description") != ""             && (newItem.description = watch("description"))
        
        console.log(newItem);
        
        agregarItemContext(newItem)
        //navigate(`/Paciente/${patient.id}`)
        handleButtonClick()
    }

    const actualizarItem =  ()=>{
        let updatedItem = {}

        updatedItem.id = itemInfo.id

        //const date = new Date()
        //updatedItem.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        watch("type") != ""                    && (updatedItem.type = watch("type"))
        watch("description") != ""             && (updatedItem.description = watch("description"))
        
        console.log("ANTES DE ENVIAR",updatedItem);
        
        actualizarItemContext(updatedItem)
        
        handleButtonClick()
    }

    return(
        <div className={classes.modalContainer}>
            <div className={classes.cerrar} onClick={handleButtonClick} >Cerrar</div>
            <h1 className={classes.titulo}>Agregar Item a Paciente {patient.name} {patient.lastname}</h1>
            <form onSubmit={handleSubmit( itemInfo ? actualizarItem : agregarItem)} className={classes.gridContainer}>
    
                    <div className={classes.gridName}>
                        <label htmlFor="">Fecha</label>
                        <input className={classes.inputs} type="text" placeholder='DD/MM/AAAA' {...register("date", {required: true, minLength: 10})} />
                        {
                            errors.date?.type === "required" && (
                                <p>Ingrese una fecha Valida DD/MM/AAAA</p>
                            )
                        }
                    </div>
                    <div className={classes.gridLastname}>
                        <label htmlFor="">Tipo</label>
                        <select name="select" {...register("type", {required:true})} >
                            <option value={0}  selected >Consulta</option>
                            <option value={1} >Intervencion</option>
                        </select>
                        {
                            errors.type?.type === "required" && (
                                <p>Ingrese un tipo de Item</p>
                            )
                        }
                    </div>
                    <div className={classes.gridDni}>
                        <label htmlFor="">Descripcion</label>
                        <input className={classes.inputs} type="text" placeholder='Descripcion' {...register("description", {required: true, minLength: 5})} />
                        {
                            errors.description?.type === "required" && (
                                <p>Ingrese una descripcion</p>
                            )
                        }
                    </div>
                    
                    
                    <button type='submit' className={classes.btnAgregar} >{itemInfo? "Modificar" : "Agregar"}</button>
            </form>
        </div>
    )
}


export default NewItemForm