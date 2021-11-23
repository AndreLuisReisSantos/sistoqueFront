import { SelectProdutos } from "../../../components/SelectProduto"
import { inputs } from "./model";
import { useState } from "react";

const ConsultarProduto = () => {

const [inputsReact, setInputReact] = useState(inputs);

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
              style={{ border: !inputAtual.valid ? '1px solid red' : '', backgroundColor:!inputAtual.valid ? '#FFC0CB' : ''}}
            />
          ) : (
            <textarea 
              placeholder={inputAtual.placeholder}
              name={inputAtual.name}
              id={inputAtual.id}
              type={inputAtual.type}
              required={inputAtual.required}
              value={inputAtual.value}
              disabled={inputAtual.disabled}
              className={inputAtual.classe}
              style={{ border: !inputAtual.valid ? '1px solid red' : '', backgroundColor:!inputAtual.valid ? '#FFC0CB' : ''}}
            ></textarea>
          )
        }
      </div>
    ));

    const setInfo = (produto) => {
      setInputReact((old) => old.map((input) => ({
        ...input,
        value: produto[input.name] || "",
      })))

    }

  return (
    <div className="Formulario">
      <fieldset>
        <SelectProdutos onSelectProduto={setInfo}></SelectProdutos>
      </fieldset>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
    </div>
  );
};

export default ConsultarProduto;