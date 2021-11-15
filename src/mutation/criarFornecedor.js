import { gql } from '@apollo/client'

export const CRIAR_FORNECEDOR = gql`
    mutation CriarFornecedor($representanteId: Int!, $fornecedor: CriarFornecedor!) {
        criarFornecedor(representanteId: $representanteId, fornecedor: $fornecedor) {
            id
            razaoSocial
            cnpj
        }
    }

`