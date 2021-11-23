import Botoes from "../../../components/Botoes";
import { SelectUsuario, TODOS_USUARIO } from '../../../components/SelectUsuario'
import {DELETAR_USUARIO } from '../../../mutation/usuario'
import { inputs } from "./model";
import { useState } from "react";
import Swal from 'sweetalert2';
import { useMutation } from "@apollo/client";
const ExcluirUsuario = () => {
  const botoes = [{
    nome:"Excluir",
    classe:"botaoExcluir",
    onClick: (e) => excluirUsuario(e)
  }];

  const [inputsReact, setInputReact] = useState(inputs);
  const [cpf, setCpf] = useState("")
  const [deletarUsuario, { data, error }] = useMutation(DELETAR_USUARIO, {
    refetchQueries: [
      { query: TODOS_USUARIO }
    ]
  })

  const renderizarCamposReact = () =>
    inputsReact.map((inputAtual) => (
      <div className="itemFormulario">
        <label for={inputAtual.name}>{inputAtual.label}:</label>
        <br />
        {
          (
            <input
              placeholder={inputAtual.placeholder}
              name={inputAtual.name}
              id={inputAtual.id}
              type={inputAtual.type}
              required={inputAtual.required}
              value={inputAtual.value}
              disabled={inputAtual.disabled}
              className={inputAtual.classe}
              style={{ border: !inputAtual.valid ? '1px solid red' : '', backgroundColor:!inputAtual.valid ? '#FFC0CB' : ''}}
            />
          ) 
        }
      </div>
    ));

    const setInfo = (usuario) => {
     
      if(usuario != null)
        setCpf(usuario.cpf)
      setInputReact(
        inputsReact.map((input) => ({
          ...input,
          value: input.name == "tipoUsuario" ? usuario ? usuario.tipoUsuario.nome || "" : "" : usuario[input.name] || "" ,
        }))
      )
    }
  
    const excluirUsuario = async () => {
      try{
        await deletarUsuario({
          variables: {
            usuarioId: cpf
          }
        })
        Swal.fire({
          title: "Usuário excluido!",
          icon: "success"
        })
        setInputReact(
          inputsReact.map((input) => ({
            ...input,
            value: "" ,
          })))
      } catch( errors ) {
        return Swal.fire({
          title: 'Ops!',
          text: error ? error.message : errors.message || errors[0].message,
          icon: 'error'
        })
      }
       
    }

  return (
    <div className="Formulario">
      <h2>Excluir Usuario</h2>
      <SelectUsuario onSelectUsuario={setInfo}/>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
      <Botoes botoes={botoes} />
    </div>
  );
};

export default ExcluirUsuario;