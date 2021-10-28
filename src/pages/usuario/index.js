import {
    BrowserRouter,
    Switch,
    Route,
    useRouteMatch,
} from 'react-router-dom'
import Cabecalho from "../../components/Cabecalho";
import PaginaInicial from './PaginaInicial';
import CadastroUsuario from './CadastroUsuario';
import EditarUsuario from './EditarUsuario';
import ExcluirUsuario from './ExcluirUsuario';
export const Usuario = () => {
    const { path } = useRouteMatch();
    const links = [
        {
            to: `${path}/paginaInicial`,
            active: window.location.pathname === `${path}/paginaInicial`,
            iconName: '_PaginaInicial'
        },
        {
            to: `${path}/cadastro`,
            active: window.location.pathname === `${path}/cadastro`,
            iconName: '_adicionar'
        },
        {
            to: `${path}/editar`,
            active: window.location.pathname === `${path}/editar`,
            iconName: '_editar'
        },
        {
            to: `${path}/excluir`,
            active: window.location.pathname === `${path}/excluir`,
            iconName: '_excluir'

        },
        
    ]

    return (
        <div className="Conteudo">
            <Cabecalho 
                nomeCabecalho="Usuário"
                links={links}
            />

            <Switch>
                <Route exact path={`${path}/paginaInicial`}>
                    <PaginaInicial />
                </Route>
                <Route path={`${path}/cadastro`}>
                    <CadastroUsuario />
                </Route>
                <Route path={`${path}/editar`}>
                    <EditarUsuario />
                </Route>
                <Route path={`${path}/excluir`}>
                    <ExcluirUsuario />
                </Route>
            </Switch>
        </div>
    )
}