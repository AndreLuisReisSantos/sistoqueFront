import { gql } from '@apollo/client'

export const CRIAR_PRODUTO = gql`
    mutation CriarProduto($produto: CriarProduto!) {
        criarProduto(produto: $produto) {
            id
            nome
        }
    }

`

export const EDITAR_PRODUTO = gql`
    mutation EditarProduto($produto: EditarProduto!, $produtoId: Int!) {
        editarProduto(produto: $produto, produtoId: $produtoId) {
            id
        }
    }

`

export const DELETAR_PRODUTO = gql`
    mutation DeletarProduto($produtoId: Int!) {
        deletarProduto(produtoId: $produtoId) {
            id
            nome
        }
    }

`