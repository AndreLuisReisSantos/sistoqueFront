import Botoes from "../../../components/Botoes";
import { SelectProdutos } from "../../../components/SelectProduto"

import { inputs, buscarProduto } from "./model";
import { useState } from "react";
import Swal from 'sweetalert2';
const ExcluirProduto = () => {
  const botoes = [
    {
      nome: "Excluir",
      classe: "botaoExcluir",
      onClick: (e) => confirmarCamposReact(e),
    },
  ];

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

    const confirmarCamposReact = (e) => {
      e.preventDefault();
      Swal.fire({
          title: "Produto excluido",
          icon: "success"
      })
    }


  return (
    <div className="Formulario">
      <h2>Editar Produto</h2>
      <fieldset>
        <SelectProdutos onSelectProduto={console.log}></SelectProdutos>
      </fieldset>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
      <Botoes botoes={botoes} />
    </div>
  );
};

export default ExcluirProduto;