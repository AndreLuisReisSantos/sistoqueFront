import Botoes from "../../../components/Botoes";
import { SelectUsuario, TODOS_USUARIO } from '../../../components/SelectUsuario'
import { EDITAR_USUARIO } from "../../../mutation/usuario"
import { inputs, inputsLogin } from "./model";
import Swal from 'sweetalert2'
import { useState } from "react";
import { useMutation } from "@apollo/client";

const EditarUsuario = () => {
  const [inputsReact, setInputReact] = useState(inputs);
  const [acessField, setAcessField] = useState(inputsLogin);
  const [cpf, setCpf] = useState("")
  const [editarUsuario, { data, error }] = useMutation(EDITAR_USUARIO, {
    refetchQueries: [
      { query: TODOS_USUARIO }
    ]
  })
  const mudarValueInput = (e, input) => {
    const htmlInputs = e.target;
    input.value = htmlInputs.value;
    const inputsAtualizados = inputsReact.map((inputsReactAtual) => {
      if (inputsReactAtual.id === input.id) return input;
      else return inputsReactAtual;
    });
    setInputReact(inputsAtualizados)
  };

  const renderizarCamposReact = () =>
    inputsReact.map((inputAtual) => (
      <div className="itemFormulario">
        <label for={inputAtual.name}>{inputAtual.label}:</label>
        <br />
        {
          inputAtual.type !== 'select' ? (
            <input
              placeholder={inputAtual.placeholder}
              name={inputAtual.name}
              id={inputAtual.id}
              type={inputAtual.type}
              required={inputAtual.required}
              value={inputAtual.value}
              disabled={inputAtual.disabled}
              className={inputAtual.classe}
              onChange={(e) => {
                mudarValueInput(e, inputAtual)
              }}
              style={{ border: !inputAtual.valid ? '1px solid red' : '', backgroundColor:!inputAtual.valid ? '#FFC0CB' : ''}}
            />
          ) : (
            <select
              placeholder={inputAtual.placeholder}
              name={inputAtual.name}
              id={inputAtual.id}
              required={inputAtual.required}
              value={inputAtual.value}
              disabled={inputAtual.disabled}
              className={inputAtual.classe}
              onChange={(e) => {mudarValueInput(e, inputAtual)}}
              style={{ border: !inputAtual.valid ? '1px solid red' : '', backgroundColor:!inputAtual.valid ? '#FFC0CB' : ''}}
            > {
              inputAtual.options.map((option) => (<option selected={option.selected} value={option.value}> {option.text} </option>))
            }</select>
          )
        }
      </div>
    ));

  const mudarValueInputLogin = (e, input) => {
      const htmlInputs = e.target;
      input.value = htmlInputs.value;
      const inputsAtualizados = acessField.map((inputsReactAtual) => {
        if (inputsReactAtual.id === input.id) return input;
        else return inputsReactAtual;
      });
      setAcessField(inputsAtualizados)
    };

  const renderizarCamposLoginReact = () =>
    acessField.map((inputLoginAtual) => (
      <div className="itemFormulario">
        <label for={inputLoginAtual.name}>{inputLoginAtual.label}:</label>
        <br />
        <input
          placeholder={inputLoginAtual.placeholder}
          name={inputLoginAtual.name}
          id={inputLoginAtual.id}
          type={inputLoginAtual.type}
          required={inputLoginAtual.required}
          value={inputLoginAtual.value}
          disabled={inputLoginAtual.disabled}
          className={inputLoginAtual.classe}
          onChange={(e) => mudarValueInputLogin(e, inputLoginAtual)}
        />
      </div>
    ));

    const confirmarCamposReact = async () => {
      const validarCampos = inputsReact.map((input) => ({...input, valid : input.value !== ''}))
      setInputReact(validarCampos)

      const formatedData = inputsReact.reduce((formated, usuario) => ({
        ...formated,
        [usuario.name]: usuario.value,
      }), {})
      
      formatedData.tipoUsuario = Number(formatedData.tipoUsuario)

      if(formatedData.tipoUsuario == 0) {
        return  Swal.fire({
          icon: "warning",
          title: "Ops",
          text: "Selecione um cargo valido"
        })
      }
      const cpfId = formatedData.cpf
      try {
        await editarUsuario({
          variables: {
            usuario: {
              ...formatedData
            },
            usuarioId: cpfId
          }
        })
        Swal.fire({
          title: 'Parabens!',
          text: 'Usuario atualizado!',
          icon: 'success'
        })

      } catch( errors ) {
        
        return Swal.fire({
          title: 'Ops!',
          text: error ? error.message : errors.message || errors[0].message,
          icon: 'error'
        })
      
      }
      
    }

  const resetSenha = async () => {

    if(acessField[0].value !== acessField[1].value) {
      Swal.fire({
        icon: "warning",
        title: "Ops",
        text: "As senhas não estão iguais"
      })
      return 
    }

    try {
      await editarUsuario({
        variables: {
          usuario: {
            senha: acessField[0].value
          },
          usuarioId: cpf
        }
      })
      Swal.fire({
        title: 'Parabens!',
        text: 'Senha alterada!',
        icon: 'success'
      })
      setAcessField(
        acessField.map((input) => ({ ...input, value: ""}))
      )
    } catch( errors ) {
      
      return Swal.fire({
        title: 'Ops!',
        text: error ? error.message : errors.message || errors[0].message,
        icon: 'error'
      })
    
    }
  }

  const format = (date) => 
    `${date.getFullYear()}-${date.getMonth() + 1 < 9 ?  `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() + 1 < 9 ?  `0${date.getDate() + 1}` : date.getDate() + 1}`
  
  const setInfo = (usuario) => {
    const formatedUser = {
      ...usuario,
      dataNascimento: format(new Date(usuario.dataNascimento))
    }
    setCpf(usuario.cpf)
    setInputReact(
      inputsReact.map((input) => ({
        ...input,
        value: input.name == "tipoUsuario" ? usuario.tipoUsuario.id  : formatedUser[input.name] || "",
        disabled: false,
        options:  input.name == "tipoUsuario" ? input.options.map(option => ({ 
          ...option,
          selected: option.value == usuario.tipoUsuario.id
        })) : []
      }))
    )
    setAcessField(
      acessField.map((input) => ({ ...input, disabled: false}))
    )
  }

  return (
    <div className="Formulario">
      <h2>Editar Usuario</h2>
      <SelectUsuario onSelectUsuario={setInfo}/>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
      <Botoes botoes={[{
          nome: "Editar",
          classe: "botaoCadastrar",
          onClick: () => confirmarCamposReact(),
        }]} />
      <h3>
        <span>Alteração de senha</span>
      </h3>
      <fieldset>
        {renderizarCamposLoginReact()}
      </fieldset>
      <Botoes botoes={[{
          nome: "Alterar Senha",
          classe: "botaoExcluir",
          onClick: () => resetSenha(),
        }]} />
      
    </div>
  );
};

export default EditarUsuario;