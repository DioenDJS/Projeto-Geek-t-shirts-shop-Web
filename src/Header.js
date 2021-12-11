import React, {useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ClienteContext } from "./ClienteContext";
import SearchInput from './SearchInput';
import Conecta from "./Conecta";

import "./Header.css";

const Header = () => {

  const [text, setText ] = useState('');
  const cliente = useContext(ClienteContext);

  useEffect(() =>{
    if(text){
        const lista = Conecta.get(`camisetas/pesq/:${text}`)
        console.log(lista.data);
    }
  }, [text]);

  let history = useHistory();

  const loginLogout = () => {
    cliente.setDados({id: null, nome: "", token: ""});
    history.push("/login")
  }

  return (
    <nav className="navbar navbar-expand-sm  navbar-dark bg-style">
      <Link className="navbar-brand  w-25" to="/">
        <img
          src="logo.png"
          alt="logo loja"
          width="100"
          className="float-left mr-2"
        />
        <h3>geek t-shirts shop</h3>
        <h5>Camisetas em Destaque</h5>
      </Link>
      <div className="m-auto  w-50 ">
        <SearchInput value={text} onChange={(search) => setText(search)} />
      </ div>
      <ul className="navbar-nav ml-auto">
        {
          (cliente.dados.id) && <li>
            <Link className="nav-link" to="/graphSale">
              GraficoVendas
            </Link>
          </li>
          
        }
        <li className="nav-item">
          <span className="nav-link" onClick={loginLogout}>
            <i className="fas fa-user-friends mr-2"></i>
            { cliente.dados.nome ? cliente.dados.nome + " (sair)" : "(identifique-se)"}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
