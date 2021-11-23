import { gql } from '@apollo/client'

export const CRIAR_USUARIO = gql`
    mutation CriarUsuario($usuario: CriarUsuario!) {
        criarUsuario(usuario: $usuario) {
            cpf
            senha
        }
    }

`

export const EDITAR_USUARIO = gql`
    mutation EditarUsuario($usuario: EditarUsuario!, $usuarioId: String!) {
        editarUsuario(usuario: $usuario, usuarioId: $usuarioId) {
            cpf
        }
    }

`

export const DELETAR_USUARIO = gql`
    mutation DeletarUsuario($usuarioId: String!) {
        deletarUsuario(usuarioId: $usuarioId) {
            cpf
        }
    }

`