import Botoes from "../../../components/Botoes";
import { inputs, buscarRelatorio } from "./model";
import { useState } from "react";

const ConsultarRelatorio = () => {

    const botoes = [
        {
          nome: "Baixar",
          classe: "botaoCadastrar",
          onClick: (e) => confirmarCamposReact(e),
        },
        {
          nome: "Limpar",
          classe: "botaoLimpar",
          onClick: (e) => limparCamposReact(e),
        },
      ];

const [inputsReact, setInputReact] = useState(inputs);


const mudarValueInput = (e, input) => {
  const htmlInputs = e.target;
  input.value = htmlInputs.value;
  const inputsAtualizados = inputsReact.map((inputsReactAtual) => {
    if (inputsReactAtual.id === input.id) return input;
    else return inputsReactAtual;
  });
  console.log("chamou")
  setInputReact(inputsAtualizados)
};


const renderizarCamposReact = () =>
  inputsReact.map((inputAtual) => (
      <div className="itemFormulario">
        <label for={inputAtual.name}>{inputAtual.label}:</label>
        <br />
        <input
          placeholder={inputAtual.placeholder}
          name={inputAtual.name}
          id={inputAtual.id}
          type={inputAtual.type}
          required={inputAtual.required}
          value={inputAtual.value}
          className={inputAtual.classe}
          disabled={inputAtual.disabled}
          onChange={(e) => mudarValueInput(e, inputAtual)}
        />
      </div>
    ));

const renderizarCamposBuscarRelatorioReact = () =>
      buscarRelatorio.map((BuscarRelatorioAtual) => (
        <div className="itemFormulario">
          <label for={BuscarRelatorioAtual.name}>{BuscarRelatorioAtual.label}:</label>
          <br />
          <select
            placeholder={BuscarRelatorioAtual.placeholder}
            name={BuscarRelatorioAtual.name}
            id={BuscarRelatorioAtual.id}
            required={BuscarRelatorioAtual.required}
            value={BuscarRelatorioAtual.value}
            className={BuscarRelatorioAtual.classe}
            disabled={BuscarRelatorioAtual.disabled}
  
          />
        </div>
      ));
  

const limparCamposReact = (e) => {
      e.preventDefault();
      const camposAtualizados = inputsReact.map((input) => ({...input, value : ''}))
      setInputReact(camposAtualizados)
    }

    const confirmarCamposReact = (e) => {
      e.preventDefault();
      const validarCampos = inputsReact.map((input) => ({...input, valid : input.required ? input.value !== '' : true}))
      setInputReact(validarCampos)
    }

return (
    <div className="Formulario">
      <fieldset>
        {/*renderizarCampos()*/}
        {renderizarCamposBuscarRelatorioReact()}
      </fieldset>
      <fieldset>
        {/*renderizarCampos()*/}
        {renderizarCamposReact()}
      </fieldset>
      {<Botoes botoes={botoes} />}
    </div>
  );
};

export default ConsultarRelatorio;