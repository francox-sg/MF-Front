import classes from './Form.module.css'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import lupa from '../../assets/lupa.png'

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
        <form className={classes.container}>
            <div className={classes.buscador}>
                <img src={lupa} alt="" />
                <p>Buscador</p>
            </div>
            <div className={classes.filtros}>
                <div className={classes.name}>
                    <label htmlFor="">Nombre</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("nombre")} />
                </div>
                <div className={classes.lastname}>
                    <label htmlFor="">Apellido</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("apellido")} />
                </div>
                <div className={classes.dni}>
                    <label htmlFor="">DNI</label>
                    <input className={classes.inputs} type="text" placeholder='' {...register("dni")} />
                </div>
            </div>
        </form>
        
    )
}


export default Form