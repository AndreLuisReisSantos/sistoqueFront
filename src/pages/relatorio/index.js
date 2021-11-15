import {
    Switch,
    Route,
    useRouteMatch,
} from 'react-router-dom'
import Cabecalho from "../../components/Cabecalho";
import PaginaInicial from './PaginaInicial';
export const Relatorio = () => {
    const { path } = useRouteMatch();
    
    return (
        <div className="Conteudo">
            <Cabecalho 
                nomeCabecalho="Relatório"
            />

            <Switch>
                <Route exact path={`${path}/paginaInicial`}>
                    <PaginaInicial/>
                </Route>
            </Switch>

            
        </div>
    )
}
