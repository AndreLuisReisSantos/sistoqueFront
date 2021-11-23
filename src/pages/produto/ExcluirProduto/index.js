import Botoes from "../../../components/Botoes";
import { SelectProdutos } from "../../../components/SelectProduto"

import { inputs, buscarProduto } from "./model";
import { useState } from "react";
import Swal from 'sweetalert2';
import { useMutation } from "@apollo/client";
import { DELETAR_PRODUTO } from './../../../mutation/produto';
import { TODOS_PRODUTOS } from './../../../components/SelectProduto/index';
const ExcluirProduto = () => {
  const botoes = [
    {
      nome: "Excluir",
      classe: "botaoExcluir",
      onClick: (e) => confirmarCamposReact(e),
    },
  ];

  const [inputsReact, setInputReact] = useState(inputs);
  const [produtoId, setProdutoId] = useState("")
  const [deletarProduto, { data, error }] = useMutation(DELETAR_PRODUTO, {
    refetchQueries: [
      { query: TODOS_PRODUTOS}
    ]
  })

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
      setProdutoId(Number(produto.id))
      setInputReact((old) => old.map((input) => ({
        ...input,
        value: produto[input.name] || "",
      })))

    }


    const confirmarCamposReact = async (e) => {
      e.preventDefault();
      Swal.fire({
          title: "Produto excluido",
          icon: "success"
      })
    
        try{
          await deletarProduto({
            variables: {
              produtoId
            }
          })
          Swal.fire({
            title: "Produto excluido!",
            icon: "success"
          })
          setInputReact(
            inputsReact.map((input) => ({
              ...input,
              value: "" ,
            })))
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
      <h2>Editar Produto</h2>
      <fieldset>
        <SelectProdutos onSelectProduto={setInfo}></SelectProdutos>
      </fieldset>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
      <Botoes botoes={botoes} />
    </div>
  );
};

export default ExcluirProduto;