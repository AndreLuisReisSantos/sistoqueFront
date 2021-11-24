import { Link } from 'react-router-dom'
const MenuPrincipal = () => {
  function sair() {
    localStorage.clear();
  }
  
  return (
    <div id="menu">
      <div>
        <figure className="logotipo"><img src='/img/logo1.png' alt='Logotipo Kokimbos'/></figure>
        <nav>
          <ul>
            <li>
            <Link to="/sistema/usuario/PaginaInicial">
            <span className="icon-Usuário">Usuário</span>
            </Link>
            </li>
            <li>
            <Link to="/sistema/produto/PaginaInicial">
            <span className="icon-Produto">Produto</span>
            </Link>
            </li>
            <li>
            <Link to="/sistema/estoque/PaginaInicial">
            <span className="icon-Estoque">Estoque</span>
            </Link>
            </li>
            {/* <li>
            <Link to="/sistema/receita/PaginaInicial">
            <span className="icon-Receitas">Receita</span>
            </Link>
            </li> */}
            <li>
              <Link to="/sistema/fornecedor/PaginaInicial">
              <span className="icon-Fornecedor">Fornecedores</span>
              </Link>
            </li>
            <li>
            <Link to="/sistema/relatorio/PaginaInicial">
            <span className="icon-Relatorios">Relatório</span>
            </Link>
            </li>
        </ul>
        </nav>
      </div>

      <ul className="menuSair">
        <li>
          <Link to="/login">
          <span className="icon-sair" onClick={sair}>Sair</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuPrincipal;
