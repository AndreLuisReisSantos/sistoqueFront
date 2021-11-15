import { useMutation } from "@apollo/client";
import Swal from 'sweetalert2'
import { CRIAR_REPRESENTANTE } from "../../mutation/criarRepresentante";
import { TODOS_REPRESENTANTES } from '../SelectRepresentante'


export const AdicionarRepresentante = () => {
    const [criarRepresentante, { error: errorRepresentante }] = useMutation(CRIAR_REPRESENTANTE, {
        refetchQueries: [{
          query: TODOS_REPRESENTANTES
        }]
      })
    


    const swalAdicionarRepresentante = async () => {
        const { value: formValues } = await Swal.fire({
          title: "Cadastro de representante",
          html: `
          <div className="itemFormulario">
            <label style="text-align: left; display: block;" for="representante_name">Representante:</label>
            <input style="width: 100%" required id="representante_name" placeholder="Nome do representante">
          </div>
          <div className="itemFormulario">
            <label style="text-align: left; display: block;" for="representante_celular">Celular Representante:</label>
            <input style="width: 100%" required id="representante_celular" placeholder="Celular Representante">
          </div>
          `,
         preConfirm: () => {
           return [
            document.getElementById('representante_name').value,
            document.getElementById('representante_celular').value
           ]
         }
        })
  
        if(formValues.some((value) => value === "")) {
          return Swal.fire({
            icon: "warning",
            title: "Ops!",
            text: "Por favor preencha os campos"
          })
        }
  
        try {
          await criarRepresentante({
            variables: {
              representante: {
                nome: formValues[0],
                celular: formValues[1],
              }
            }
          })
          Swal.fire({
            title: 'Parabens!',
            text: 'Representante cadastrado!',
            icon: 'success'
          })        
  
        } catch( errors ) {
          return Swal.fire({
            title: 'Ops!',
            text: errorRepresentante ? errorRepresentante.message : errors.message || errors[0].message,
            icon: 'error'
          })
        
        }
      }

    return (
        <button className="botaoCadastrar" onClick={() => swalAdicionarRepresentante() }>Cadastrar Novo</button>
    )
}