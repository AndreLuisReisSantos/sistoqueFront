import Botoes from "../../../components/Botoes";
import { inputs, buscarFornecedor } from "./model";
import { useState } from "react";
import Swal from 'sweetalert2';

const ExcluirFornecedor = () => {
  const botoes = [

  {
    nome:"Excluir",
    classe:"botaoExcluir",
    onClick: (e) => excluirFornecedor(e)
  },
    
  ];

const [inputsReact, setInputReact] = useState(inputs);
const [buscarFornecedorReact] = useState(buscarFornecedor);


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
      <div className="itemFormulario" key={inputAtual.id}>
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

const renderizarCamposBuscarFornecedorReact = () =>
buscarFornecedorReact.map((BuscarFornecedorAtual) => (
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
            style={{ border: !BuscarFornecedorAtual.valid ? '1px solid red' : '', backgroundColor:!BuscarFornecedorAtual.valid ? '#FFC0CB' : ''}}
          />
        </div>
      ));

  const excluirFornecedor = (e) =>  {
    e.preventDefault();
    Swal.fire({
      title: "O fornecedor foi excluido",
      icon: "success"
    })
  }

  return (
    <div className="Formulario">
      <h2>Excluir Fornecedor</h2>
      <fieldset>
        {renderizarCamposBuscarFornecedorReact()}
        {/*renderizarCamposEndereco()*/}
      </fieldset>
      <fieldset>
        {/*renderizarCampos()*/}
        {renderizarCamposReact()}
      </fieldset>
      <Botoes botoes={botoes} />
    </div>
  );
};

export default ExcluirFornecedor;