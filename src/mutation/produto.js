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
    mutation EditarProduto($produtoId: Int!, $produto: EditarProduto!) {
        editarProduto(produtoId: $produtoId, produto: $produto) {
            id
            nome
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