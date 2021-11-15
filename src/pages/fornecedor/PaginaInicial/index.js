//import Botoes from "../../../components/Botoes";
import { inputs, inputsEndereco, buscarFornecedor } from "./model";
import { useState } from "react";

const ConsultarFornecedor = () => {

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

  const mudarValueInputEndereco = (e, input) => {
      const htmlInputs = e.target;
      input.value = htmlInputs.value;
      const inputsAtualizados = inputsReact.map((inputsReactAtual) => {
        if (inputsReactAtual.id === input.id) return input;
        else return inputsReactAtual;
      });
      setInputReact(inputsAtualizados)
    };

  const renderizarCamposEnderecoReact = () =>
    inputsEndereco.map((inputEnderecoAtual) => (
      <div className="itemFormulario">
        <label for={inputEnderecoAtual.name}>{inputEnderecoAtual.label}:</label>
        <br />
        <input
          placeholder={inputEnderecoAtual.placeholder}
          name={inputEnderecoAtual.name}
          id={inputEnderecoAtual.id}
          type={inputEnderecoAtual.type}
          required={inputEnderecoAtual.required}
          value={inputEnderecoAtual.value}
          disabled={inputEnderecoAtual.disabled}
          className={inputEnderecoAtual.classe}
          onChange={(e) => mudarValueInputEndereco(e, inputEnderecoAtual)}

        />
      </div>
    ));

    const renderizarCamposBuscarFornecedorReact = () =>
      buscarFornecedor.map((BuscarFornecedorAtual) => (
        <div className="itemFormulario">
          <label for={BuscarFornecedorAtual.name}>{BuscarFornecedorAtual.label}:</label>
          <br />
          <select
            placeholder={BuscarFornecedorAtual.placeholder}
            name={BuscarFornecedorAtual.name}
            id={BuscarFornecedorAtual.id}
            required={BuscarFornecedorAtual.required}
            value={BuscarFornecedorAtual.value}
            className={BuscarFornecedorAtual.classe}
            disabled={BuscarFornecedorAtual.disabled}
  
          />
        </div>
      ));
  

  return (
    <div className="Formulario">
      <fieldset>
        {/*renderizarCampos()*/}
        {renderizarCamposBuscarFornecedorReact()}
      </fieldset>
      <fieldset>
        {/*renderizarCampos()*/}
        {renderizarCamposReact()}
      </fieldset>
      <h3>
        <span>Endereço</span>
      </h3>
      <fieldset>
        {renderizarCamposEnderecoReact()}
        {/*renderizarCamposEndereco()*/}
      </fieldset>
      {/* <Botoes botoes={botoes} /> */}
    </div>
  );
};

export default ConsultarFornecedor;