import Botoes from "../../../components/Botoes";
import { CRIAR_PRODUTO  } from "../../../mutation/produto"
import { inputs, buscarProduto } from "./model";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const CadastroProduto = () => {
  const botoes = [
    {
      nome: "Cadastrar",
      classe: "botaoCadastrar",
      onClick: (e) => confirmarCamposReact(e),
    } ,
    {
      nome: "Limpar",
      classe: "botaoLimpar",
      onClick: (e) => limparCamposReact(e),
    },
  ];

  const [inputsReact, setInputReact] = useState(inputs);
  const [criarProduto, { data, error }] = useMutation(CRIAR_PRODUTO)
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
              onChange={(e) => {
                mudarValueInput(e, inputAtual)
              }}
              style={{ border: !inputAtual.valid ? '1px solid red' : '', backgroundColor:!inputAtual.valid ? '#FFC0CB' : ''}}
            ></textarea>
            )
        }
      </div>
    ));

    const limparCamposReact = () => {
      const camposAtualizados = inputsReact.map((input) => ({...input, value : ''}))
      setInputReact(camposAtualizados)
    }

    const confirmarCamposReact = async (e) => {
      e.preventDefault();
      const validarCampos = inputsReact.map((input) => ({...input, valid : input.required ? input.value !== '' : true}))
      setInputReact(validarCampos)

      if(!inputsReact.every((input) => input.valid)) {
        Swal.fire(({
          title: "Ops!",
          text: "Preencha todos os campos",
          icon: "warning"
        }))
        return
      }

      try {
        await criarProduto({
          variables: {
            produto: {
              ...inputsReact.reduce((formated, input) => ({
                ...formated,
                [input.name]: input.value
              }), {})
            }
          }
        })
        Swal.fire(({
          title: "Parabens!",
          text: "Produto cadastrado",
          icon: "success"
        }))
        limparCamposReact()
      } catch( errors ) {
        
        return Swal.fire({
          title: 'Ops!',
          text: error ? error.message : errors.message || errors[0].message,
          icon: 'error'
        })
      
      }

    }

  return (
    <div className="Formulario">
      <h2>Cadastrar Produto</h2>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
      <Botoes botoes={botoes} />
    </div>
  );
};

export default CadastroProduto;