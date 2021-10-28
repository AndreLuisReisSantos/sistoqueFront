import { inputs, inputsTabela } from "./model";
import Botoes from "../../../components/Botoes";
import { useState } from "react";

const ConsultarEstoque = () =>{

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
      inputsReact.map((inputAtual) => (
          <div className="itemFormulario">
              <label for={inputAtual.name}>{inputAtual.label}:</label>
              <br/>
              {
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
              }
          </div>
      ));
      /*
      const renderizarProdutosNoEstoqueReact = () => 
      inputsTabela.map((inputsTabelaAtual) => (
      <div className="itemFormulario">
              <table>
              <tr>
              {
                  inputsTabelaAtual.tipo == "titulo" (
                  
                    <th>{inputsTabelaAtual.titulo}</th>
                    
                  
                  )
                }
              </tr>
              <tr>
                    <td>Nome do Produto</td>
                    <td>Quantidade</td>
                    <td>Volume</td>
                    <td>Validade</td>
                    <td>Preço</td>
                    <td>Local Armazenamento</td>
                    <td>Vencido</td>
              </tr>
              </table>
          </div>
      ));
*/
const renderizarProdutosNoEstoqueReact = () => 
<div className="itemFormulario">
        <table>
        <tr>
            
              <th>Nome Produto</th>
              <th>Quantidade</th>
              <th>Volume</th>
              <th>Validade</th>
              <th>Preço</th>
              <th>Local Armazenamento</th>
              <th>Vencido</th>

        </tr>
        <tr>
              <td>Nome do Produto</td>
              <td>Quantidade</td>
              <td>Volume</td>
              <td>Validade</td>
              <td>Preço</td>
              <td>Local Armazenamento</td>
              <td>Vencido</td>
        </tr>
        </table>
</div>

    return(
        <div className="Formulario">
            <fieldset>
                {renderizarCamposReact()}
            </fieldset>
            <fieldset>
                {renderizarProdutosNoEstoqueReact()}
            </fieldset>
        </div>
    )
}

export default ConsultarEstoque;