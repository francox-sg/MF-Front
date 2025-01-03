import classes from './NewItemForm.module.css'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { PatientContext } from '../../context/PatientContext'


const NewItemForm = ({ handleButtonClick, itemInfo = null})=>{
    const [showEliminar, setShowEliminar] = useState(false)
    const {agregarItemContext, actualizarItemContext, eliminarItemContext} = useContext(PatientContext)

    const date = new Date()

    const {register, formState:{errors}, handleSubmit, reset, watch} = useForm({
        defaultValues:{
            date:        itemInfo ? itemInfo.date        : `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:00`,
            type:        itemInfo ? itemInfo.type : 0,
            description: itemInfo ? itemInfo.description : ""
        }
    }) 

    const cerrar = (event)=>{
        event.stopPropagation()
        handleButtonClick()
    }

    const agregarItem =  ()=>{
        
        let newItem = {}

        watch("date") != ""                    && (newItem.date = watch("date"))
        watch("type") != ""                    && (newItem.type = watch("type"))
        watch("description") != ""             && (newItem.description = watch("description"))
        
        console.log(newItem);
        
        agregarItemContext(newItem)
        
        handleButtonClick()
    }

    const actualizarItem =  ()=>{
        
        let updatedItem = {}

        updatedItem.id = itemInfo.id



        watch("type") != ""                    && (updatedItem.type = watch("type"))
        watch("description") != ""             && (updatedItem.description = watch("description"))
        watch("date") != ""                    && (updatedItem.date = watch("date"))
        
        
        
        actualizarItemContext(updatedItem)
        
        handleButtonClick()
    }

    const eliminarItem = async ()=>{
        const respuesta = await eliminarItemContext(itemInfo.id)
        console.log("Item Eliminado, respuesta: ",respuesta);
        handleButtonClick()
    }

    return(
        <div className={classes.modalContainer}>
            <div className={classes.cerrar} onClick={cerrar} >Cerrar</div>
            <h1 className={classes.titulo}>Nueva Historia Clinica {/* de  {patient.name} {patient.lastname} */}</h1>
            <form onSubmit={handleSubmit( itemInfo ? actualizarItem : agregarItem)} className={classes.gridContainer}>
    
                    <div className={classes.gridDate}>
                        <label htmlFor="">Fecha</label>
                        <input className={classes.inputs} type="text" placeholder='DD/MM/AAAA HH:MM:SS' {...register("date", {required: true, minLength: 10})} />
                        {
                            errors.date?.type === "required" && (
                                <p>Ingrese una fecha Valida DD/MM/AAAA</p>
                            )
                        }

                    </div>
                    <div className={classes.gridType}>
                        <label htmlFor="">Tipo</label>
                        <select name="select" {...register("type", {required:true})} >
                            <option value={0}  selected >Consulta</option>
                            <option style={{backgroundColor:"rgb(124, 0, 0)"}} value={1} >Intervencion</option>
                        </select>
                        {
                            errors.type?.type === "required" && (
                                <p>Ingrese un tipo de Item</p>
                            )
                        }
                    </div>
                    <div className={classes.gridDescription}>
                        <label htmlFor="">Descripcion</label>
                        <textarea className={classes.inputs} type="text" placeholder='' {...register("description", {required: true, minLength: 5})} />
                        {
                            errors.description?.type === "required" && (
                                <p>Ingrese una descripcion</p>
                            )
                        }
                    </div>
                    
                    
                    <button type='submit' className={classes.btnAgregar} >{itemInfo? "Modificar" : "Agregar"}</button>
            </form>
            
            {
                itemInfo
                ?
                (showEliminar 
                    ? 
                    
                    (
                        <div className={classes.confirmacionEliminar}>
                            <button onClick={eliminarItem} style={{backgroundColor:"#921f03"}}>SI</button>
                            <div>¿Está Seguro?</div> 
                            <button onClick={()=>{setShowEliminar(false)}}  style={{backgroundColor:"#03920f"}}>NO</button>
                        </div>
                    )
                    
                    :
                    
                    <button className={classes.btnEliminar} onClick={()=>{setShowEliminar(true)}} >Eliminar</button>)
                :
                <></>
            }
        </div>
    )
}


export default NewItemForm