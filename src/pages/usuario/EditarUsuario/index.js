import Botoes from "../../../components/Botoes";
import { inputs, inputsLogin, buscarUsuario } from "./model";
import { useState } from "react";

const CadastroUsuario = () => {
  const botoes = [
    {
      nome: "Cadastrar",
      classe: "botaoCadastrar",
      onClick: (e) => confirmarCamposReact(e),
    } /*
  {
    nome:"Excluir",
    classe:"botaoExcluir",
    onClick: () => excluirCampos(),
  },*/,
    // {
    //   nome: "Limpar",
    //   classe: "botaoLimpar",
    //   onClick: () => limparCamposReact(),
    // },
  ];

  const [inputsReact, setInputReact] = useState(inputs);

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
    inputs.map((inputAtual) => (
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
      const inputsAtualizados = inputsReact.map((inputsReactAtual) => {
        if (inputsReactAtual.id === input.id) return input;
        else return inputsReactAtual;
      });
      setInputReact(inputsAtualizados)
    };

  const renderizarCamposLoginReact = () =>
    inputsLogin.map((inputLoginAtual) => (
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

    const confirmarCamposReact = (e) => {
      e.preventDefault();
      const validarCampos = inputsReact.map((input) => ({...input, value : input.valid !== ''}))
      setInputReact(validarCampos)
    }

    const renderizarCamposBuscarUsuarioReact = () =>
      buscarUsuario.map((BuscarUsuarioAtual) => (
        <div className="itemFormulario">
          <label for={BuscarUsuarioAtual.name}>{BuscarUsuarioAtual.label}:</label>
          <br />
          <select
            placeholder={BuscarUsuarioAtual.placeholder}
            name={BuscarUsuarioAtual.name}
            id={BuscarUsuarioAtual.id}
            required={BuscarUsuarioAtual.required}
            value={BuscarUsuarioAtual.value}
            className={BuscarUsuarioAtual.classe}
            disabled={BuscarUsuarioAtual.disabled}
  
          />
        </div>
      ));

  return (
    <div className="Formulario">
      <h2>Editar Usuario</h2>
      <fieldset>
        {/*renderizarCampos()*/}
        {renderizarCamposBuscarUsuarioReact()}
      </fieldset>
      <fieldset>
        {/*renderizarCampos()*/}
        {renderizarCamposReact()}
      </fieldset>
      <h3>
        <span>Login</span>
      </h3>
      <fieldset>
        {renderizarCamposLoginReact()}
        {/*renderizarCamposLogin()*/}
      </fieldset>
      <Botoes botoes={botoes} />
    </div>
  );
};

export default CadastroUsuario;