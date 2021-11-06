import Botoes from "../../../components/Botoes";
import { inputs, inputsEndereco, inputsRepresentante, selectRepresentante } from "./model";
import { useState } from "react";

const CadastroFornecedor = () => {
  const botoes = [
    {
      nome: "Cadastrar",
      classe: "botaoCadastrar",
      onClick: (e) => confirmarCamposReact(e),
    } /*
  {
    nome:"Excluir",
    classe:"botaoExcluir",
    onClick: () => excluirCampos(),
  },*/,
    {
      nome: "Limpar",
      classe: "botaoLimpar",
      onClick: (e) => limparCamposReact(e),
    },
  ];

  const [inputsReact, setInputReact] = useState(inputs);
  const [inputsEnderecoReact, setInputEnderecoReact] = useState(inputsEndereco);
  const [inputsRepresentanteReact, setInputRepresentanteReact] = useState(inputsRepresentante);
  const [selectRepresentanteReact, setSelectRepresentanteReact] = useState(selectRepresentante);
  const [deveMostrarFormularioDoRepresentante, setDeveMostrarFormularioDoRepresentante ] = useState(false);

  const mudarValueInput = (e, input) => {
    const htmlInputs = e.target;
    input.value = htmlInputs.value;
    const inputsAtualizados = inputsReact.map((inputsReactAtual) => {
      if (inputsReactAtual.id == input.id) return input;
      else return inputsReactAtual;
    });
    console.log("chamou")
    setInputReact(inputsAtualizados)
  };

  const renderizarCamposReact = () =>
    inputsReact.map((inputAtual) => (
      <div className="itemFormulario" key={inputAtual.id}>
        <label for={inputAtual.name}>{inputAtual.label}:</label>
        <br />
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

const mudarValueInputRepresentante = (e, input) => {
      const htmlInputs = e.target;
      input.value = htmlInputs.value;
      const inputsAtualizados = inputsReact.map((inputsReactAtual) => {
        if (inputsReactAtual.id == input.id) return input;
        else return inputsReactAtual;
      });
      setInputReact(inputsAtualizados)
    };

const renderizarCamposRepresentanteReact = () =>
    inputsRepresentanteReact.map((inputRepresentanteAtual) => (
      <div className="itemFormulario" key={inputRepresentanteAtual.id}>
        <label for={inputRepresentanteAtual.name}>{inputRepresentanteAtual.label}:</label>
        <br />
        {       
        <input
          placeholder={inputRepresentanteAtual.placeholder}
          name={inputRepresentanteAtual.name}
          id={inputRepresentanteAtual.id}
          type={inputRepresentanteAtual.type}
          required={inputRepresentanteAtual.required}
          value={inputRepresentanteAtual.value}
          disabled={inputRepresentanteAtual.disabled}
          className={inputRepresentanteAtual.classe}
          onChange={(e) => {
            mudarValueInput(e, inputRepresentanteAtual)
          }}
          style={{ border: !inputRepresentanteAtual.valid ? '1px solid red' : '', backgroundColor:!inputRepresentanteAtual.valid ? '#FFC0CB' : ''}}
        /> 
          }
      </div>
    ));

const mudarValueSelectRepresentante = (e, input) => {
      const htmlInputs = e.target;
      input.value = htmlInputs.value;
      const inputsAtualizados = inputsReact.map((inputsReactAtual) => {
        if (inputsReactAtual.id == input.id) return input;
        else return inputsReactAtual;
      });
      setInputReact(inputsAtualizados)
    };

const renderizarCamposSelecionarRepresentanteReact = () =>
  selectRepresentanteReact.map((selectRepresentanteAtual) => (
      <div className="itemFormulario" key={selectRepresentanteAtual.id}>
        <label for={selectRepresentanteAtual.name}>{selectRepresentanteAtual.label}:</label>
        <br />
          {
          <select
              placeholder={selectRepresentanteAtual.placeholder}
              name={selectRepresentanteAtual.name}
              id={selectRepresentanteAtual.id}
              required={selectRepresentanteAtual.required}
              value={selectRepresentanteAtual.value}
              disabled={selectRepresentanteAtual.disabled}
              className={selectRepresentanteAtual.classe}
              onChange={(e) => {mudarValueInput(e, selectRepresentanteAtual)}}
              style={{ border: !selectRepresentanteAtual.valid ? '1px solid red' : '', backgroundColor:!selectRepresentanteAtual.valid ? '#FFC0CB' : ''}}
            > {
              (selectRepresentanteAtual.options || []).map((option) => (<option value={option.value}> {option.text} </option>))
            }</select>
          } <button className="botaoCadastrar" onClick={() => setDeveMostrarFormularioDoRepresentante(true) }>Cadastrar Novo</button>
      </div>
    ));

  const mudarValueInputEndereco = (e, input) => {
      const htmlInputs = e.target;
      input.value = htmlInputs.value;
      const inputsAtualizados = inputsReact.map((inputsReactAtual) => {
        if (inputsReactAtual.id == input.id) return input;
        else return inputsReactAtual;
      });
      setInputReact(inputsAtualizados)
    };

  const buscarCep = async (cep) => {

    if(cep == '' || cep.length < 8 || cep.length > 9) {
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
            if(inputEnderecoAtual.name == 'cep') {
              buscarCep(inputEnderecoAtual.value)
            }
          }}
          style={{ border: !inputEnderecoAtual.valid ? '1px solid red' : '', backgroundColor:!inputEnderecoAtual.valid ? '#FFC0CB' : ''}}

        />
      </div>
    ));

    const limparCamposReact = (e) => {
      e.preventDefault();
      const camposAtualizados = inputsReact.map((input) => ({...input, value : ''}))
      const camposEnderecoAtualizados = inputsEnderecoReact.map((input) => ({...input, value : ''}))
      const camposRepresentanteAtualizados = inputsRepresentanteReact.map((input) => ({...input, value : ''}))

      setInputReact(camposAtualizados)
      setInputEnderecoReact(camposEnderecoAtualizados)
      setInputRepresentanteReact(camposRepresentanteAtualizados)


    }

    const confirmarCamposReact = (e) => {
      e.preventDefault();
      const validarCampos = inputsReact.map((input) => ({...input, valid: input.required ?  input.value !== '' : true }))
      setInputReact(validarCampos)
      const validarEnderecoCampos = inputsEnderecoReact.map((input) => ({...input, valid: input.required ? input.value !== '' : true}))
      setInputEnderecoReact(validarEnderecoCampos)
      const validarRepresentanteCampos = inputsRepresentanteReact.map((input) => ({...input, valid: input.required ? input.value !== '' : true}))
      setInputRepresentanteReact(validarRepresentanteCampos)

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
        {renderizarCamposSelecionarRepresentanteReact()}
      </fieldset>
      {deveMostrarFormularioDoRepresentante && (
        <fieldset>
          {renderizarCamposRepresentanteReact()}
        </fieldset>
      )}
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
