import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


export const Login = () => {
    const history = useHistory();

    const onLogin = (e) => {
        e.preventDefault();

        const email = document.querySelector("#txt_email").value
        const password = document.querySelector("#txt_password").value

        if(email === '' || password === '') {
            
            Swal.fire({
                title: 'Preencha os campos',
                icon: 'error',
                confirmButtonText: 'Tente novamente'
              })
            return 
        }
        
        history.push('/sistema');
    }

    return (
        <div className='paginaLogin'>
        <div className='areaLogin'>
            <figure className='logotipoLogin'><img src='../img/logo1.png' alt='Logotipo Kokimbos'></img></figure>
            <input type="email" id="txt_email" placeholder='Digite seu Login' /> <br />
            <input type="password" id="txt_password" placeholder='Digite sua Senha' /><br />
            <input type="submit" value="Confirmar" className='botaoCadastrar' onClick={onLogin} />
        </div>
        </div>
    );
}