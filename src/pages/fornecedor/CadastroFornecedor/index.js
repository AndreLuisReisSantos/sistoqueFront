import Botoes from "../../../components/Botoes";
import { SelectRepresentante } from '../../../components/SelectRepresentante'
import { CRIAR_FORNECEDOR } from '../../../mutation/criarFornecedor'
import { inputs, inputsEndereco, inputsRepresentante } from "./model";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useMutation } from "@apollo/client";
import { AdicionarRepresentante } from "../../../components/AdicionarRepresentante";
import { TODOS_FORNECEDORES } from './../../../components/SelectFornecedor/index';

const CadastroFornecedor = () => {
  const botoes = [
    {
      nome: "Cadastrar",
      classe: "botaoCadastrar",
      onClick: (e) => confirmarCamposReact(e),
    },
    {
      nome: "Limpar",
      classe: "botaoLimpar",
      onClick: (e) => limparCamposReact(e),
    },
  ];

  const [inputsReact, setInputReact] = useState(inputs);
  const [inputsEnderecoReact, setInputEnderecoReact] = useState(inputsEndereco);
  const [inputsRepresentanteReact, setInputRepresentanteReact] = useState(inputsRepresentante);
  const [representante, setRepresentante] = useState(null);
  const [criarFornecedor, { error }] = useMutation(CRIAR_FORNECEDOR, {
    refetchQueries: [
      { query: TODOS_FORNECEDORES}
    ]
  })

  

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
        {<input
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
        />}
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

  const buscarCep = async (cep) => {
    if(cep === '' || cep.length < 8 || cep.length > 9) {
      return 
    }
    try {
      const retornoViaCep = 
      await fetch("https://viacep.com.br/ws/" + cep + "/json/")
      const jsonViaCep = await retornoViaCep.json()
      const enderecoCompleto = inputsEnderecoReact.map((input) => (
        {
          ...input,
          value: jsonViaCep[input.name] || ""
        }
      ))
      setInputEnderecoReact(enderecoCompleto);
    } catch (e) {
      console.log(e);
    }
  }

  const renderizarCamposEnderecoReact = () =>
    inputsEnderecoReact.map((inputEnderecoAtual) => (
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
          className={inputEnderecoAtual.classe}
          disabled={inputEnderecoAtual.disabled}
          width={inputEnderecoAtual.tamanho}
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


    

    const limparCamposReact = (e) => {
      const camposAtualizados = inputsReact.map((input) => ({...input, value : ''}))
      const camposEnderecoAtualizados = inputsEnderecoReact.map((input) => ({...input, value : ''}))
      const camposRepresentanteAtualizados = inputsRepresentanteReact.map((input) => ({...input, value : ''}))

      setInputReact(camposAtualizados)
      setInputEnderecoReact(camposEnderecoAtualizados)
      setInputRepresentanteReact(camposRepresentanteAtualizados)
    }

    const confirmarCamposReact = async () => {

      if(!representante) {
        return Swal.fire({
          title: "Ops!",
          text: "Por favor selecione o representante",
          icon: "warning"
        })
      }

      const validarCampos = inputsReact.map((input) => ({...input, valid: input.required ?  input.value !== '' : true }))
      setInputReact(validarCampos)
      const validarEnderecoCampos = inputsEnderecoReact.map((input) => ({...input, valid: input.required ? input.value !== '' : true}))
      setInputEnderecoReact(validarEnderecoCampos)
      const validarRepresentanteCampos = inputsRepresentanteReact.map((input) => ({...input, valid: input.required ? input.value !== '' : true}))
      setInputRepresentanteReact(validarRepresentanteCampos)

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
        ...inputsReact.reduce((formatedValue, input) => ({
          ...formatedValue,
          [input.id]: input.value
        }), {}),
        ...inputsEnderecoReact.reduce((formatedValue, input) => ({
          ...formatedValue,
          [input.id]: input.value
        }), {})
      }

      try {
        await criarFornecedor({
          variables: {
            representanteId: Number(representante.id),
            fornecedor: fieldsValue
          }
        })
        
        Swal.fire({
          title: 'Parabens!',
          text: 'Fornecedor cadastrado!',
          icon: 'success'
        })
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
      <h2>Cadastrar novo Fornecedor</h2>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
      <h3>
        <span>Representante</span>
      </h3>
      <fieldset>
        <div>
          <SelectRepresentante onSelectRepresentante={setRepresentante}/>
          <AdicionarRepresentante></AdicionarRepresentante>
        </div>
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


export default CadastroFornecedor;
