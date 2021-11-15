import {
    Switch,
    Route,
    useRouteMatch,
} from 'react-router-dom'
import Cabecalho from "../../components/Cabecalho";
import PaginaInicial from './PaginaInicial';
import CadastroFornecedor from './CadastroFornecedor';
import EditarFornecedor from './EditarFornecedor';
import ExcluirFornecedor from './ExcluirFornecedor';
export const Fornecedor = () => {
    const { path } = useRouteMatch();
    const links = [
        {
            to: `${path}/paginaInicial`,
            active: window.location.pathname === `${path}/paginaInicial`,
            iconName: '_paginaInicial'
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
                nomeCabecalho="Fornecedor"
                links={links}
            />

            <Switch>
                <Route exact path={`${path}/paginaInicial`}>
                    <PaginaInicial/>
                </Route>
                <Route path={`${path}/cadastro`}>
                    <CadastroFornecedor />
                </Route>
                <Route path={`${path}/editar`}>
                    <EditarFornecedor />
                </Route>
                <Route path={`${path}/excluir`}>
                    <ExcluirFornecedor />
                </Route>
            </Switch>

            
        </div>
    )
}
