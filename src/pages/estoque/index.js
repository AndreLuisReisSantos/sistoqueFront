import{
    BrowserRouter,
    Switch,
    Route,
    useRouteMatch,
} from 'react-router-dom'

import Cabecalho from '../../components/Cabecalho';
import PaginaInicial from './PaginaInicial';
import AdicionarProduto from './AdicionarProduto';
import RetirarProduto from './RetirarProduto';

export const Estoque = () => {
    const { path } = useRouteMatch();
    const links = [
        {
            to: `${path}/paginaInicial`,
            active: window.location.pathname === `${path}/paginaInicial`,
            iconName: '_paginaInicial'
        },
        {
            to: `${path}/adicionarProduto`,
            active: window.location.pathname === `${path}/adicionarProduto`,
            iconName: '_adicionar'
        },
        {
            to: `${path}/retirarProduto`,
            active: window.location.pathname === `${path}/retirarProduto`,
            iconName: '_excluir'
        },
        
    ]

    return (
        <div className="Conteudo">
            <Cabecalho
                nomeCabecalho="Estoque"
                links={links}
            />
            <Switch>
                <Route exact path={`${path}/paginaInicial`}>
                    <PaginaInicial/>
                </Route>
                <Route exact path={`${path}/adicionarProduto`}>
                    <AdicionarProduto/>
                </Route>
                <Route exact path={`${path}/retirarProduto`}>
                    <RetirarProduto/>
                </Route>
            </Switch>
        </div>
    )
}