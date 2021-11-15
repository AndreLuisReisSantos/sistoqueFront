import { gql, useQuery } from "@apollo/client"

export const TODOS_REPRESENTANTES = gql`
    query TodosRepresentantes {
        todosRepresentantes {
            id
            nome
            celular
        }
    }
`

export const SelectRepresentante = ({
    onSelectRepresentante,

}) => {

    const { loading, error, data } = useQuery(TODOS_REPRESENTANTES)
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    
    const representantes = data.todosRepresentantes

    return (
        <>
            <label for="selecionar_representante">Selecione um Representante:</label>
            <br />
            <select 
                className="input_tamanho2" 
                id="selecionar_representante"
                onChange={
                    (selected) => {
                        const selectedId = selected.target.value
                        onSelectRepresentante(
                            representantes.filter((representante) => representante.id === selectedId)[0]
                        )
                    }
                }
            > 
                <option value="none"></option>
                {
                    representantes.map((representante) => (
                        <option value={representante.id} key={representante.id}>{representante.nome}</option>
                    ))
                }
            </select>
        
        </>
        
    )
    
}