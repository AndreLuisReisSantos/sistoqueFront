import { inputs, buscarProduto } from "./model";
import { useState } from "react";

const ConsultarProduto = () => {

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
  inputsReact.map((inputAtual) => (
      <div className="itemFormulario">
        <label for={inputAtual.name}>{inputAtual.label}:</label>
        <br />
        {
          inputAtual.type !== 'select' && inputAtual.type !== "textarea" ? (
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
          ) : 
          inputAtual.type === 'textarea' ? (
            <textarea 
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
            ></textarea>
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
              (inputAtual.options || []).map((option) => (<option value={option.value}> {option.text} </option>))
            }</select>
          )
        }
      </div>
    ));

    const renderizarCamposBuscarProdutoReact = () =>
      (buscarProduto || []).map((BuscarProdutoAtual) => (
        <div className="itemFormulario">
          <label for={BuscarProdutoAtual.name}>{BuscarProdutoAtual.label}:</label>
          <br />
          <select
            placeholder={BuscarProdutoAtual.placeholder}
            name={BuscarProdutoAtual.name}
            id={BuscarProdutoAtual.id}
            className={BuscarProdutoAtual.classe}
            required={BuscarProdutoAtual.required}
            value={BuscarProdutoAtual.value}
            disabled={BuscarProdutoAtual.disabled}
          />
        </div>
      ));
  
  return (
    <div className="Formulario">
      <fieldset>
        {renderizarCamposBuscarProdutoReact()}
      </fieldset>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
    </div>
  );
};

export default ConsultarProduto;