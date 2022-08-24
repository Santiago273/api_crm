import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { object } from 'yup'
import Spiner from '../components/Spiner'

const VerCliente = () => {
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)
    const {id} = useParams()

    useEffect(()=>{
        
        const obtenerClienteAPI = async ()=>{
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            
            setCargando(!cargando)  
            
        }
        obtenerClienteAPI()
    },[])
    
  return (
    cargando ? <p><Spiner/></p> : 
        Object.keys(cliente).length === 0 ? 
        <p>No hay resultados</p> :
        (
            <div>
                    
                <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
                    <p className='mt-3'>Informacion del cliente</p>

                {cliente.nombre && (
                    <p className='text-4xl text-gray-500 mt-10'>
                    <span className='text-gray-800 uppercase font-bold'> Cliente: </span>
                    {cliente.nombre}</p>
                )}
                        
                {cliente.email && (
                    <p className='text-2xl text-gray-500 mt-4'>
                    <span className='text-gray-800 uppercase font-bold'> E-mail: </span>
                    {cliente.email}</p>
                )}
                        
                {cliente.telefono && (
                    <p className='text-2xl text-gray-500 mt-4'>
                    <span className='text-gray-800 uppercase font-bold'> Telefono: </span>
                    {cliente.telefono}</p>
                )}
                        
                {cliente.empresa && (
                    <p className='text-2xl text-gray-500 mt-4'>
                    <span className='text-gray-800 uppercase font-bold'> Empresa: </span>
                    {cliente.empresa}</p>
                )}
                        

                {cliente.notas && (
                    <p className='text-2xl text-gray-500 mt-4'>
                    <span className='text-gray-800 uppercase font-bold'> Notas: </span>
                    {cliente.notas}</p>
                )}

            </div>
        )
  )
}

export default VerCliente
