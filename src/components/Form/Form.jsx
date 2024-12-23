import classes from './Form.module.css'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const Form = ({setFilters})=>{


    const {register, formState:{errors}, handleSubmit, reset, watch} = useForm({
        defaultValues:{
            nombre:"",
            apellido:"",
            dni:""
        }
    })

    useEffect(()=>{
        setFilters({
            name: watch("nombre"),
            lastname: watch("apellido"),
            dni: watch("dni")
        })
        
    },[watch("nombre"), watch("apellido"), watch("dni")])


    return(
        <form className={classes.gridContainer}>

                <div className={classes.gridName}>
                    <label htmlFor="">Nombre</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("nombre")} />
                </div>
                <div className={classes.gridLastname}>
                    <label htmlFor="">Apellido</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("apellido")} />
                </div>
                <div className={classes.gridDni}>
                    <label htmlFor="">DNI</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("dni")} />
                </div>
        </form>
        
    )
}


export default Form