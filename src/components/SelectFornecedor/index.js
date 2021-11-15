import { gql, useQuery } from "@apollo/client"

export const TODOS_FORNECEDORES = gql`
    query TodosFornecedores {
        todosFornecedores {
            id
            razaoSocial
            cnpj
            email
            telefone
            site
            nomeFantasia
            cep
            celular
            logradouro
            numero
            complemento
            bairro
            cidade
            estado
            Representante {
                id
                nome
                celular
            }
        }
    }

`

export const SelectFornecedor = ({
    onSelectFornecedor,
}) => {

    const { loading, error, data } = useQuery(TODOS_FORNECEDORES)
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    
    const fornecedores = data.todosFornecedores
        
    return (
        <>
            <label for="selecionar_fornecedor">Selecione um Fornecedor:</label>
            <br />
            <select 
                className="input_tamanho1" 
                id="selecionar_fornecedor"
                onChange={
                    (selected) => {
                        const selectedId = selected.target.value
                        onSelectFornecedor(
                            fornecedores.filter((fornecedor) => fornecedor.id === selectedId)[0]
                        )
                    }
                }
            > 
                <option value="none"></option>
                {
                    fornecedores.map((fornecedor) => (
                        <option value={fornecedor.id} key={fornecedor.id}>{fornecedor.razaoSocial}</option>
                    ))
                }
            </select>
        
        </>
        
    )
    
}