import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { ClienteContext } from "./ClienteContext";

import "./Header.css";

const Header = () => {

  const cliente = useContext(ClienteContext);

  return (
    <nav className="navbar navbar-expand-sm  navbar-dark bg-style">
      <Link className="navbar-brand" to="/">
        <img
          src="logo.png"
          alt="logo loja"
          width="100"
          className="float-left mr-2"
        />
        <h3>geek t-shirts shop</h3>
        <h5>Camisetas em Destaque</h5>
      </Link>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            <i className="fas fa-user-friends mr-2"></i>
            { cliente.dados.nome ? cliente.dados.nome + " (sair)" : "(identifique-se)"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
