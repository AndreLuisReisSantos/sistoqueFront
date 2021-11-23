import { gql, useQuery } from "@apollo/client"

export const TODOS_USUARIO = gql`   
    query TodosUsuarios {
    todosUsuarios {
        cpf
        rg
        nome
        dataNascimento
        celular
        tipoUsuario {
            id
            nome
        }
    }
}
`

export const SelectUsuario = ({
    onSelectUsuario,

}) => {

    const { loading, error, data } = useQuery(TODOS_USUARIO)
    console.log({
        error,
        loading,
        data
    })
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log({ data })
    const usuarios = data.todosUsuarios

    return (
        <>
            <label for="selecionar_usuario">Selecione um Usuario:</label>
            <br />
            <select 
                className="input_tamanho1" 
                id="selecionar_usuario"
                onChange={
                    (selected) => {
                        const selectedId = selected.target.value
                        onSelectUsuario(
                            usuarios.filter((usuario) => usuario.cpf === selectedId)[0]
                        )
                    }
                }
            > 
                <option value="none"></option>
                {
                    usuarios.map((usuario) => (
                        <option value={usuario.cpf} key={usuario.cpf}>{usuario.nome}</option>
                    ))
                }
            </select>
        
        </>
        
    )
    
}