import { gql } from '@apollo/client'

export const CRIAR_REPRESENTANTE = gql`
    mutation CriarRepresentante($representante: CriarRepresentante!) {
        criarRepresentante(representante: $representante) {
            nome
            id
        }
    }

`