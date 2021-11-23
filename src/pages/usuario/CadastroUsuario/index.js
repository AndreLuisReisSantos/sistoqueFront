import Botoes from "../../../components/Botoes";
import { TODOS_USUARIO } from "../../../components/SelectUsuario"
import { CRIAR_USUARIO } from "../../../mutation/usuario"
import { inputs, inputsLogin } from "./model";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useMutation } from '@apollo/client';

const CadastroUsuario = () => {
  const botoes = [
    {
      nome: "Cadastrar",
      classe: "botaoCadastrar",
      onClick: (e) => confirmarCamposReact(e),
    },
    {
      nome: "Limpar",
      classe: "botaoLimpar",
      onClick: (e) => limparCamposReact(e),
    },
  ];

const [usuarioField, setUsuarioField] = useState(inputs);
const [acessoField, setAcessoField] = useState(inputsLogin);
const [criarUsuario, { data, error, loading }] = useMutation(CRIAR_USUARIO, {
  refetchQueries: [{ 
    query: TODOS_USUARIO
  }]
})

  const mudarValueInput = (e, input) => {
    const htmlInputs = e.target;
    input.value = htmlInputs.value;
    const inputsAtualizados = usuarioField.map((usuarioFieldAtual) => {
      if (usuarioFieldAtual.id === input.id) return input;
      else return usuarioFieldAtual;
    });
    setUsuarioField(inputsAtualizados)
  };

  const renderizarCamposReact = () =>
    usuarioField.map((inputAtual) => (
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
              inputAtual.options.map((option) => (<option value={option.value}> {option.text} </option>))
            }</select>
          )
        }
      </div>
    ));

  const mudarValueInputLogin = (e, input) => {
      const htmlInputs = e.target;
      input.value = htmlInputs.value;
      const inputsAtualizados = acessoField.map((usuarioFieldAtual) => {
        if (usuarioFieldAtual.id === input.id) return input;
        else return usuarioFieldAtual;
      });
      setAcessoField(inputsAtualizados)
    };

  const renderizarCamposLoginReact = () =>
    acessoField.map((inputLoginAtual) => (
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
          onChange={(e) => {
            mudarValueInputLogin(e, inputLoginAtual)
          }}
          style={{ border: !inputLoginAtual.valid ? '1px solid red' : '', backgroundColor:!inputLoginAtual.valid ? '#FFC0CB' : ''}}
        />
      </div>
    ));

const limparCamposReact = () => {
      const camposAtualizados = usuarioField.map((input) => ({...input, value : ''}))
      const camposacessoField = acessoField.map((input) => ({...input, value : ''}))
      setUsuarioField(camposAtualizados)
      setAcessoField(camposacessoField)
    }

const confirmarCamposReact = async (e) => {
      e.preventDefault();
      const validarCampos = usuarioField.map((input) => ({...input, valid : input.required ?  input.value !== '' : true}))
      const camposacessoField = acessoField.map((input) => ({...input, valid : input.required ?  input.value !== '' : true}))
      setUsuarioField(validarCampos)
      setAcessoField(camposacessoField)
      
      if(acessoField[0].value !== acessoField[1].value) {
        Swal.fire({
          icon: "warning",
          title: "Ops",
          text: "As senhas não estão iguais"
        })
        return
      }

      const formatedData = usuarioField.reduce((formated, usuario) => ({
        ...formated,
        [usuario.name]: usuario.value,
      }), {})
      
      formatedData.tipoUsuario = Number(formatedData.tipoUsuario)

      if(formatedData.tipoUsuario === 0) {
        Swal.fire({
          icon: "warning",
          title: "Ops",
          text: "Selecione um cargo valido"
        })
        return 
      }
      try {
        await criarUsuario({
          variables: {
            usuario: {
              ...formatedData,
              senha: acessoField[0].value
            }
          }
        })

        Swal.fire({
          title: 'Parabens!',
          text: 'Usuario cadastrado!',
          icon: 'success'
        })
        limparCamposReact()

      } catch( errors ) {
        
        return Swal.fire({
          title: 'Ops!',
          text: error ? error.message : errors.message || errors[0].message,
          icon: 'error'
        })
      
      }
    }

  useEffect(() => {
    setUsuarioField((old) => old.map((f) => ({ ...f, value: ""})))
    setAcessoField((old) => old.map((f) => ({ ...f, value: ""})))

  }, [])

  return (
    <div className="Formulario">
      <h2>Cadastrar novo Usuario</h2>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
      <h3>
        <span>Acesso</span>
      </h3>
      <fieldset>
        {renderizarCamposLoginReact()}
      </fieldset>
      <Botoes botoes={botoes} />
    </div>
  );
};

export default CadastroUsuario;