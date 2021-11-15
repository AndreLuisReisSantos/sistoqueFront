import { gql } from '@apollo/client'

export const DELETAR_FORNECEDOR = gql`
    mutation DeletarFornecedor($fornecedorId: Int!) {
        deletarFornecedor(fornecedorId: $fornecedorId) {
            id
            razaoSocial
            cnpj
        }
    }

`