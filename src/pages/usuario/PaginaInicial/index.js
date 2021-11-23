import { SelectUsuario } from '../../../components/SelectUsuario'
import { inputs } from "./model";
import { useState } from "react";

const ConsultarUsuario = () => {

  const [inputsReact, setInputReact] = useState(inputs);


  const renderizarCamposReact = () =>
    inputsReact.map((inputAtual) => (
      <div className="itemFormulario">
        <label for={inputAtual.name}>{inputAtual.label}:</label>
        <br />{
          (
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
          ) 
        }
      </div>
    ));
    const format = (date) => 
    `${date.getFullYear()}-${date.getMonth() + 1 < 9 ?  `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() + 1 < 9 ?  `0${date.getDate() + 1}` : date.getDate() + 1}`
  
    const setInfo = (usuario) => {
      const formatedUser = {
        ...usuario,
        dataNascimento: format(new Date(usuario.dataNascimento))
      }
      setInputReact(
        inputsReact.map((input) => ({
          ...input,
          value: input.name == "tipoUsuario" ? usuario.tipoUsuario.id  : formatedUser[input.name] || "",
          options:  input.name == "tipoUsuario" ? input.options.map(option => ({ 
            ...option,
            selected: option.value == usuario.tipoUsuario.id
          })) : []
        }))
      )
     
    }
  return (
    <div className="Formulario">
      <fieldset>
        <SelectUsuario onSelectUsuario={setInfo}/>
      </fieldset>
      <fieldset>
        {renderizarCamposReact()}
      </fieldset>
    </div>
  );
};

export default ConsultarUsuario;