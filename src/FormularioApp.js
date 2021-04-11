import React, { useState } from 'react';
import Swal from 'sweetalert2';  // Se carga la libreria de SweetAlert2 ** npm i sweetAlert2 **

import { useForm } from './hook/useForm';

export const FormularioApp = () => {  // Componente

    const initialState = {
        name: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        password2: '',
    }
    
    // useForm 
    const [ formValues, handleInputChange, reset ] = useForm( initialState )
    
    // Destructuramos
    const { name, apellido, email, telefono,  password, password2 } = formValues;

    // useState para validar el formulario
    const [valid, setValid] = useState( );
    
    // Para obtener los datos del formulario
    const handleLogin = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {

            Swal.fire('Ingresado', "Formulario Correcto", 'success');
            reset( initialState );  // Reiniciar el formulario

        }
    }
    
    const isFormValid = () => {

        if ( name.trim().length === 0 ) {
            setValid('Nombre Requerido');
            return false;
            
        } else if ( apellido.trim().length === 0 ) {
            setValid('Apellido Requerido');
            return false;
            
        } else if ( !validator.isEmail( email ) ) {
            setValid('Email incorrecto, debe llevar @ y .com');
            return false;

        } else if ( telefono.trim().length <= 5 ) {
            setValid('Telefono incorrecto, debe ser mayor a 6 digitos');
            return false;

        } else if ( password !== password2 || password.length < 6 || password2.length < 6  ) {
            setValid('Los passwords son diferentes o son menores a 6 caracteres');
            return false;
        } 
        
        setValid(null); // Reiniciar el mensaje de error
        setChangeType( type.active );   // Oculta nuvamente el formulario de password
        return true;
    }

    const type = {
        active: "password",
        desactive: "text",
    }

    const [changeType, setChangeType] = useState( type.active );

    const handleMostrar = (e) => {
        e.preventDefault();

        if ( changeType === "password" ) {
            setChangeType( type.desactive );
        } else {
            setChangeType( type.active );    
        }
    }

    return (
        
        <div className="contenedor seccion">

            <form onSubmit={ handleLogin } >
                <div className="login-div">

                    <div className="mensaje">
                        {
                            valid &&
                            (
                                <div className="auth__alert-error">
                                        { valid }
                                </div>
                            )
                        }
                    </div>

                    <div className="title">Login</div>
                    <div className="sub-title">Nerv</div>
                    <div className="fields">

                        <div className="name">
                            <input 
                                type="text"
                                placeholder="Nombre"
                                name="name"
                                className="auth__input"
                                autoComplete="off"
                                value={ name }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="apellido">
                            <input 
                                type="text"
                                placeholder="Apellido"
                                name="apellido"
                                className="auth__input"
                                autoComplete="off"
                                value={ apellido }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="email">
                            <input 
                                type="email"
                                placeholder="Correo Electronico"
                                name="email"
                                className="auth__input"
                                autoComplete="off"
                                value={ email }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="telefono">
                            <input 
                                type="tel"
                                placeholder="Telefono"
                                name="telefono"
                                pattern="[0-9]{6}"
                                className="auth__input"
                                autoComplete="off"
                                value={ telefono }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="password">
                            <input 
                                type={ changeType }
                                placeholder="Password"
                                name="password"
                                className="auth__input"
                                autoComplete="off"
                                value={ password }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="password2">
                            <input 
                                type={ changeType }
                                placeholder="Confirmar Password"
                                name="password2"
                                className="auth__input"
                                autoComplete="off"
                                value={ password2 }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="margin">
            
                            <button 
                                type="submit" 
                                className="submit"
                                title="click para mostrar contraseña"
                                onClick={ handleMostrar }
                            >
                                <i className="fas fa-eye"></i>
                            </button> &nbsp;&nbsp;<small>Mostrar Contraseña</small>
                        </div>

                    </div>
                    <button
                        type="submit"
                        className="signin-button"
                    >
                        Login
                    </button>

                </div>
            </form>
        </div>
    )
}
