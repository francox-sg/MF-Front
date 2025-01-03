import { createContext } from "react"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const PatientContext = createContext()

const calcularEdad =(fechaNacimiento) => {
    
    const fechaHora = fechaNacimiento.split(" ")
    const fecha = fechaHora[0]
    const fechaPartida = fecha.split("/")
    const fechaNacJS = `${fechaPartida[2]}/${fechaPartida[1]}/${fechaPartida[0]}`

    const hoy = new Date(); // Fecha actual
    const nacimiento = new Date(fechaNacJS); // Convertir la fecha de nacimiento a un objeto Date
    console.log({nacimiento});
    
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); // Restamos el año actual con el de nacimiento
    
    const mes = hoy.getMonth() - nacimiento.getMonth(); // Comparamos los meses
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--; // Si el mes es anterior o estamos antes de la fecha de cumpleaños en el mes, restamos 1
    }

    console.log({edad});
    
    
    return edad; // Retornamos la edad calculada
}



const PatientProvider = ({children}) => {
    //Logica y Hooks
    const [patient, setPatient] = useState({})
    const [clinicalHistory, setClinicalHistory] = useState([])
    const {pid} = useParams()
    
    //Informacion del Paciente
    useEffect(()=>{
        fetch(`http://localhost:8080/patient/${pid}`)
        .then((resp)=> resp.json())
        .then((response)=>{
            //console.log(response.data);
            let  patient = response.data
            patient.birth && (patient.age = calcularEdad(patient.birth))

            setPatient(patient)
            }
        )

    //Historia Clinica del Paciente
        fetch(`http://localhost:8080/clinicalHistory/patient/${pid}`)
        .then((resp)=> resp.json())
        .then((response)=>{
            
            setClinicalHistory(response.data)
            }
        )

    },[])

    const actualizarInformacion = () => {
        fetch(`http://localhost:8080/patient/${pid}`)
        .then((resp)=> resp.json())
        .then((response)=>{
            //console.log(response.data);
            let  patient = response.data
            patient.birth && (patient.age = calcularEdad(patient.birth))

            setPatient(patient)
            }
        )

        //Historia Clinica del Paciente
        fetch(`http://localhost:8080/clinicalHistory/patient/${pid}`)
        .then((resp)=> resp.json())
        .then((response)=>{
            
            setClinicalHistory(response.data)
            }
        )
    }

    const agregarItemContext = (newItem)=>{

            newItem.patient_id = patient.id

            fetch("http://localhost:8080/clinicalHistory",{
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(newItem)
                })
                .then((resp)=> resp.json())
                .then((response)=>{
                    console.log("Respuesta del Back", response.data);
                    
                    
        
                    if(!response.data){
                        console.log("Error al Agregar Item, Campos erroneos", newItem);
                        return
                    }
        
                    if(response.data == -1){
                        console.log("Error al Agregar Item, error: -1", newItem);
                        return
                    }
        
                    
                    console.log("Se agregó el Item", newItem);
                    
                    actualizarInformacion()
                    
                    
                    }
                )
    }
    const actualizarItemContext = (updatedItem)=>{

            updatedItem.patient_id = patient.id
            console.log({updatedItem});
            

            fetch("http://localhost:8080/clinicalHistory",{
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updatedItem)
                })
                .then((resp)=> resp.json())
                .then((response)=>{
                    console.log("Respuesta del Back", response.data);
                    
                    
        
                    if(!response.data){
                        console.log("Error al Agregar Item, Campos erroneos", updatedItem);
                        return
                    }
        
                    if(response.data == -1){
                        console.log("Error al Agregar Item, error: -1", updatedItem);
                        return
                    }
        
                    
                    console.log("Se Modificó el Item", updatedItem);
                    
                    actualizarInformacion()
                    
                    
                    }
                )
    }

    const eliminarItemContext = async(itemId)=>{

        await fetch(`http://localhost:8080/clinicalHistory/${itemId}`,{
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        })
        .then((resp)=> resp.json())
        .then((response)=>{
            console.log("Respuesta del Back", response.data);
            
            

            if(!response.data){
                console.log("Error al eliminar Item, Campos erroneos");
                return null
            }

            if(response.data == -1){
                console.log("Error al eliminar Item, error: -1");
                return -1
            }

            
            console.log("Se Eliminó el Item");
            actualizarInformacion()
            return response.data
            
            
            }
        )

    }

    return(
        <PatientContext.Provider value ={{patient, actualizarInformacion, clinicalHistory, agregarItemContext, actualizarItemContext, eliminarItemContext}}>
            {children}
        </PatientContext.Provider>
    )
}

export default PatientProvider