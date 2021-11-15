
import { inputs, inputsEndereco } from "./model";
import { SelectFornecedor } from "../../../components/SelectFornecedor"

import { useState } from "react";

const ConsultarFornecedor = () => {

  const [fornecedorFields, setFornecedorFields] = useState(inputs);
  const [enderecoFields, setEnderecoFields] = useState(inputsEndereco)

  const renderizarCamposReact = () =>
    fornecedorFields.map((inputAtual) => (
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
        />
      </div>
    ));

  const renderizarCamposEnderecoReact = () =>
    enderecoFields.map((inputEnderecoAtual) => (
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
        />
      </div>
    ));

  const setFornecedorInfo = (fornecedor) => {
    if(!fornecedor) {
      setFornecedorFields(inputs)
      setEnderecoFields(inputsEndereco)
      return 
    }
    setEnderecoFields(
      enderecoFields.map((field) => ({
        ...field,
        value: fornecedor[field.id] || ''
      }))
    )

    setFornecedorFields(
      fornecedorFields.map(
        (field) => {
          if(field.id.includes('representante')) {
            return ({
              ...field,
              value: field.id === 'representante' ? fornecedor.Representante.nome : fornecedor.Representante.celular
            })    
          }
        return ({
          ...field,
          value: fornecedor[field.id] || ''
        })
      })
    )
  }
  

  return (
    <div className="Formulario">
      <fieldset>
        <SelectFornecedor
          onSelectFornecedor={setFornecedorInfo}
        />
      </fieldset>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
      <h3>
        <span>Endereço</span>
      </h3>
      <fieldset>
        {renderizarCamposEnderecoReact()}
      </fieldset>
    </div>
  );
};

export default ConsultarFornecedor;