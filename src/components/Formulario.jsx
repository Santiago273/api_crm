import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import *as yup from 'yup'
import Alerta from './Alerta'
import Spiner from './Spiner'

const Formulario = ({cliente, cargando}) => {
    
    const navigate = useNavigate()

    const nuevoClienteSchema = yup.object().shape({
        nombre: yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(15, 'El nombre es muy largo')
                    .required('El nombre es un campo obligatorio'),
        empresa: yup.string()
                    .required('El nombre de la empresa es un campo obligatorio'),
        email: yup.string()
                  .email('E-mail no válido')  
                  .required('El E-mail es un campo obligatorio'),
        telefono: yup.number()
                    .positive('Número no válido')
                    .integer('Número no válido')
                     .typeError('Número no válido'),
        notas: '',
    })

    const handleSubmit = async (valores) => {
        console.log(valores)
        try {

            let respuesta
            if(cliente.id){
                //EDITANDO UN REGISTRO
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }else{
                //CREANDO EL REGISTRO NUEVO
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            }

            await respuesta.json()
            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spiner/> : (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md: w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 
        'Agregar cliente'}</h1>

      <Formik
        initialValues={{
            nombre: cliente?.nombre ?? "",
            empresa: cliente?.empresa ?? "",
            email: cliente?.email ?? "",
            telefono: cliente?.telefono ?? "",
            notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}

        onSubmit = {async(values, {resetForm})=>{
            await handleSubmit(values)
            resetForm()
        }}

        validationSchema = {nuevoClienteSchema}
      >
        {({errors, touched}) =>{
            
            return(
        <Form
            className='mt-10'
        >
            <div className='mb-4'>
                <label
                className='text-gray-800' 
                htmlFor="nombre"
                >Nombre:</label>
                <Field
                    id = "nombre"
                    type = "text"
                    className = "mt-2 block w-full p-3 bg-gray-50"
                    placeholder = "Nombre del cliente"
                    name = "nombre"
                />
                {errors.nombre && touched.nombre ? (
                    <Alerta>{errors.nombre}</Alerta>
                ): null}
            </div>

            <div className='mb-4'>
                <label
                className='text-gray-800' 
                htmlFor="empresa"
                >Empresa:</label>
                <Field
                    id = "empresa"
                    type = "text"
                    className = "mt-2 block w-full p-3 bg-gray-50"
                    placeholder = "Empresa del cliente"
                    name = "empresa"
                />
                {errors.empresa && touched.empresa ? (
                    <Alerta>{errors.empresa}</Alerta>
                ): null}
            </div>
            <div className='mb-4'>
                <label
                className='text-gray-800' 
                htmlFor="email"
                >E-mail:</label>
                <Field
                    id = "nemail"
                    type = "email"
                    className = "mt-2 block w-full p-3 bg-gray-50"
                    placeholder = "E-mail del cliente"
                    name = "email"
                />
                {errors.email && touched.email ? (
                    <Alerta>{errors.email}</Alerta>
                ): null}
            </div>

            <div className='mb-4'>
                <label
                className='text-gray-800' 
                htmlFor="tel"
                >Teléfono:</label>
                <Field
                    id = "tel"
                    type = "tel"
                    className = "mt-2 block w-full p-3 bg-gray-50"
                    placeholder = "Teléfono"
                    name = "telefono"
                />
                {errors.telefono && touched.telefono ? (
                    <Alerta>{errors.telefono}</Alerta>
                ): null}
            </div>

            <div className='mb-4'>
                <label
                className='text-gray-800' 
                htmlFor="notas"
                >Notas:</label>
                <Field
                    as = "textarea"
                    id = "notas"
                    type = "text"
                    className = "mt-2 block w-full p-3 bg-gray-50 h-40"
                    placeholder = "Notas del cliente"
                    name = "notas"
                />
            </div>

            <input 
                type="submit"
                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar cliente'}
                className='mt-5 w-full bg-blue-800 text-white p-3 rounded-md uppercase font-bold text-lg cursor-pointer'
            />
        </Form>
        )}}
      </Formik>
    </div>
    )
  )
}

Formulario.defaultProps = {
    cliente : {}
}

export default Formulario
