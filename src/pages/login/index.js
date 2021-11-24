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

        fetch('https://kokimbos-backend.herokuapp.com/users/authenticate', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: email,
                senha: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                history.push('/sistema');
            }
            else {
                Swal.fire({
                    title: 'Erro',
                    text: 'Login e/ou senha inválidos!',
                    icon: 'error'
                });
                document.querySelector("#txt_email").value = "";
                const password = document.querySelector("#txt_password").value = "";
            }
        });
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