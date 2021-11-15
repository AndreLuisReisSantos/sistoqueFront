import { gql } from '@apollo/client'

export const EDITAR_FORNECEDOR = gql`
    mutation editarFornecedor($fornecedorId: Int!, $fornecedor: EditarFornecedor!) {
        editarFornecedor(fornecedorId: $fornecedorId, fornecedor: $fornecedor) {
            id
            razaoSocial
            cnpj
        }
    }

`