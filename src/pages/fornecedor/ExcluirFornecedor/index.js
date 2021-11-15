

import { useState } from "react";
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { SelectFornecedor, TODOS_FORNECEDORES } from "../../../components/SelectFornecedor";
import Botoes from "../../../components/Botoes";
import { DELETAR_FORNECEDOR } from './../../../mutation/deletarFornecedor';
import { inputs } from "./model";

const ExcluirFornecedor = () => {
  
  const [fornecedorFields, setFornecedorFields] = useState(inputs);
  const [fornecedorId, setFornecedorId] = useState(null)
  const [deletarFornecedor, { error }] = useMutation(DELETAR_FORNECEDOR, {
    refetchQueries: [{ query: TODOS_FORNECEDORES }]
  })
  const botoes = [
    {
      nome:"Excluir",
      classe:"botaoExcluir",
      onClick: (e) => excluirFornecedor(e)
    },
  ];

  const renderizarFornecedorFields = () =>
    fornecedorFields.map((inputAtual) => (
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
          onChange={(e) => setFornecedorFields(e, inputAtual)}
        />
      </div>
    ));


  const excluirFornecedor = async () =>  {
    
    if(!fornecedorId) {
      Swal.fire({
        title: "Ops!",
        text: "Por favor, selecione o fornecedor que deseja excluir",
        icon: "warning"
      })
      return
    }


    try {
      await deletarFornecedor({
        variables: {
          fornecedorId
        }
      })

      setFornecedorInfo(null)
      return Swal.fire({
        title: "Parabéns!",
        text: "O fornecedor foi excluido",
        icon: "success"
      })
    } catch( errors ) {
      return Swal.fire({
        title: 'Ops!',
        text: error ? error.message : errors.message || errors[0].message,
        icon: 'error'
      })
    }
    

    
  }

  const setFornecedorInfo = (fornecedor) => {

    if(!fornecedor) {
      setFornecedorFields(inputs)
      setFornecedorId(null)
      return 
    }
    setFornecedorId(Number(fornecedor.id))
    setFornecedorFields(
      fornecedorFields.map(
        (field) => ({
          ...field,
          value: fornecedor[field.id] || ''
        }))
      )
  }

  return (
    <div className="Formulario">
      <h2>Excluir Fornecedor</h2>
      <fieldset>
        <SelectFornecedor onSelectFornecedor={setFornecedorInfo}></SelectFornecedor>
      </fieldset>
      <fieldset>
        {renderizarFornecedorFields()}
      </fieldset>
      <Botoes botoes={botoes} />
    </div>
  );
};

export default ExcluirFornecedor;