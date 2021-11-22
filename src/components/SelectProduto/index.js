import { gql, useQuery } from "@apollo/client"

export const TODOS_PRODUTOS = gql`
    query TodosProdutos {
        todosProdutos {
            id
            nome
            descricao
            unidadeMedida
        }
    }
`

export const SelectProdutos = ({
    onSelectProduto,

}) => {

    const { loading, error, data } = useQuery(TODOS_PRODUTOS)
    console.log({
        error,
        loading,
        data
    })
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    
    const produtos = data.todosProdutos

    return (
        <>
            <label for="selecionar_produto">Selecione um Produto:</label>
            <br />
            <select 
                className="input_tamanho1" 
                id="selecionar_produto"
                onChange={
                    (selected) => {
                        const selectedId = selected.target.value
                        onSelectProduto(
                            produtos.filter((produto) => produto.id === selectedId)[0]
                        )
                    }
                }
            > 
                <option value="none"></option>
                {
                    produtos.map((produto) => (
                        <option value={produto.id} key={produto.id}>{produto.nome}</option>
                    ))
                }
            </select>
        
        </>
        
    )
    
}