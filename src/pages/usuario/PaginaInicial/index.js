import { inputs, buscarUsuario } from "./model";
import Botoes from '../../../components/Botoes';
import { useState } from "react";

const ConsultarUsuario = () => {

  const [inputsReact, setInputReact] = useState(inputs);

  const mudarValueInput = (e, input) => {
    const htmlInputs = e.target;
    input.value = htmlInputs.value;
    const inputsAtualizados = inputsReact.map((inputsReactAtual) => {
      if (inputsReactAtual.id == input.id) return input;
      else return inputsReactAtual;
    });
    setInputReact(inputsAtualizados)
  };

  const renderizarCamposReact = () =>
    inputs.map((inputAtual) => (
      <div className="itemFormulario">
        <label for={inputAtual.name}>{inputAtual.label}:</label>
        <br />{
          inputAtual.type != 'select' ? (
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

const renderizarCamposBuscarUsuarioReact = () =>
      buscarUsuario.map((BuscarUsuarioAtual) => (
        <div className="itemFormulario">
          <label for={BuscarUsuarioAtual.name}>{BuscarUsuarioAtual.label}:</label>
          <br />
          <select
            placeholder={BuscarUsuarioAtual.placeholder}
            name={BuscarUsuarioAtual.name}
            id={BuscarUsuarioAtual.id}
            className={BuscarUsuarioAtual.classe}
            required={BuscarUsuarioAtual.required}
            value={BuscarUsuarioAtual.value}
            disabled={BuscarUsuarioAtual.disabled}
  
          />
        </div>
      ));
  
  return (
    <div className="Formulario">
      <fieldset>
        {renderizarCamposBuscarUsuarioReact()}
      </fieldset>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
    </div>
  );
};

export default ConsultarUsuario;