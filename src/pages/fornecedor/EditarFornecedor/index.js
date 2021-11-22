import Botoes from "../../../components/Botoes";
import { SelectFornecedor, TODOS_FORNECEDORES } from "../../../components/SelectFornecedor"
import { inputs, inputsEndereco } from "./model";
import { useState } from "react";
import Swal from 'sweetalert2'
import { useMutation } from '@apollo/client';
import { EDITAR_FORNECEDOR } from "../../../mutation/editarFornecedor";

const EditarFornecedor = () => {
  const botoes = [
    {
      nome: "Confirmar",
      classe: "botaoCadastrar",
      onClick: (e) => confirmarCamposReact(e),
    } 
  ];

  const [fornecedorFields, setFornecedorFields] = useState(inputs);
  const [enderecoFields, setEnderecoFields] = useState(inputsEndereco);
  const [editarFornecedor, { data, error }] = useMutation(EDITAR_FORNECEDOR, {
    refetchQueries: [
      { query: TODOS_FORNECEDORES}
    ]
  })
  const [ fornecedorId, setFornecedorId] = useState(null)
  const mudarValueInput = (e, input) => {
    const htmlInputs = e.target;
    input.value = htmlInputs.value;
    const inputsAtualizados = fornecedorFields.map((inputsReactAtual) => {
      if (inputsReactAtual.id === input.id) return input;
      else return inputsReactAtual;
    });
    setFornecedorFields(inputsAtualizados)
  };

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
          onChange={(e) => mudarValueInput(e, inputAtual)}
        />
      </div>
    ));

  const mudarValueInputEndereco = (e, input) => {
      const htmlInputs = e.target;
      input.value = htmlInputs.value;
      const inputsAtualizados = enderecoFields.map((inputsReactAtual) => {
        if (inputsReactAtual.id === input.id) return input;
        else return inputsReactAtual;
      });
      setEnderecoFields(inputsAtualizados)
    };

const buscarCep = async (cep) => {

      if(cep === '' || cep.length < 8 || cep.length > 9) {
        return 
      }
      try {
        const retornoViaCep = 
        await fetch("https://viacep.com.br/ws/" + cep + "/json/")
        const jsonViaCep = await retornoViaCep.json()
        const enderecoCompleto = enderecoFields.map((input) => ({
            ...input,
            value: jsonViaCep[input.name] || ""
          }))
          setEnderecoFields(enderecoCompleto);
      } catch (e) {
        console.log(e);
      }
    }

  const renderizarCamposEnderecoReact = () =>
    enderecoFields.map((inputEnderecoAtual) => (
      <div className="itemFormulario" key={inputEnderecoAtual.id}>
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
          onChange={(e) => {
            mudarValueInputEndereco(e, inputEnderecoAtual)
            if(inputEnderecoAtual.name === 'cep') {
              buscarCep(inputEnderecoAtual.value)
            }
          }}
          style={{ border: !inputEnderecoAtual.valid ? '1px solid red' : '', backgroundColor:!inputEnderecoAtual.valid ? '#FFC0CB' : ''}}

        />
      </div>
    ));

    const confirmarCamposReact = async (e) => {
      if(!fornecedorId) {
        return Swal.fire({
          title: "Ops!",
          text: "Por favor selecione o fornecedor que deseja editar",
          icon: "error"
        })
      }
      const validarCampos = fornecedorFields.map((input) => ({...input, valid: input.required ? input.value !== '' : true}))
      setFornecedorFields(validarCampos)
      const validarEnderecoCampos = enderecoFields.map((input) => ({...input, valid: input.required ? input.value !== '' : true }))
      setEnderecoFields(validarEnderecoCampos)

      const isAllFieldsValid = validarCampos.every((input) => input.valid) 
        && validarEnderecoCampos.every((input) => input.valid)



      if(!isAllFieldsValid) {
        return Swal.fire({
          title: "Ops!",
          text: "Por favor preencha todos os campos obrigatórios",
          icon: "error"
        })
      }
      const fieldsValue = {
        ...fornecedorFields.reduce((formatedValue, input) => ({
          ...formatedValue,
          [input.id]: input.value
        }), {}),
        ...enderecoFields.reduce((formatedValue, input) => ({
          ...formatedValue,
          [input.id]: input.value
        }), {})
      }

      delete fieldsValue.representante
      delete fieldsValue.celular_representante

      try {
        await editarFornecedor({
          variables: {
            fornecedorId: Number(fornecedorId),
            fornecedor: fieldsValue
          }
        })
        
        Swal.fire({
          title: 'Parabens!',
          text: 'Fornecedor editado!',
          icon: 'success'
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
        setFornecedorId(null)
        setFornecedorFields(inputs)
        setEnderecoFields(inputsEndereco)
        return 
      }
      setFornecedorId(Number(fornecedor.id))
      setEnderecoFields(
        enderecoFields.map((field) => ({
          ...field,
          value: fornecedor[field.id] || '',
          disabled: false,
        }))
      )
        console.log({ fornecedor })
      setFornecedorFields(
        fornecedorFields.map(
          (field) => ({
            ...field,
            value: field.name.includes('representante') ? 
                field.name === "celular_representante" ? 
                  fornecedor.Representante.celular : 
                  fornecedor.Representante.nome
              : (fornecedor[field.id] || ''),
            disabled: field.name.includes('representante'),
          })))
      
    }




  return (
    <div className="Formulario">
      <h2>Editar Fornecedor</h2>
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
      <Botoes botoes={botoes} />
    </div>
  );
};

export default EditarFornecedor;
