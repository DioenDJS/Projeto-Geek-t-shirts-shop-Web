import React, { useState, useEffect, useContext } from "react";
import Conecta from "./Conecta";
import ItemLista from "./ItemLista";
import { ClienteContext } from "./ClienteContext";

const Listagem = () => {
  const [camisetas, setCamisetas] = useState([]);
  const cliente = useContext(ClienteContext);

  const getCamisetas = async () => {
    const lista = await Conecta.get("camisetas");
    //    console.log(lista);
    setCamisetas(lista.data);
  };

  // define o método que será executado após renderizar o componente
  useEffect(() => {
    getCamisetas();
  }, []);

  const jaAvaliou = async (camisetaId) => {
    const like = await Conecta.get(`likes/pesq/${cliente.dados.id}/${camisetaId}`);
    return like.data.length;
  };

  const clienteLike = async (id, index) => {
    if (await jaAvaliou(id)) {
      alert("Ops... você já avaliou essa camiseta");
      return;
    }

    let voto = {
      "usuario_id": cliente.dados.id,
      "camiseta_id": id,
      "gostou": 1,
    };

    await Conecta.post("likes", voto);

    // Obtém o registro (para saber a quantidade de likes da tabela carros)
    const reg = await Conecta.get("camisetas/" + id);
    //console.log(reg)

    let likes = Number(reg.data.likes) + 1;

    // altera a quantidade de likes no WebServices
    await Conecta.put("camisetas/like/" + id);

    // atualiza o array
    let newCamisetas = [...camisetas];
    newCamisetas[index].likes = likes;
    setCamisetas(newCamisetas);

    alert("Ok! Obrigado pela sua participação");
  };

  const clienteDislike = async (id) => {
    if (await jaAvaliou(id)) {
      alert("Ops... você já avaliou essa camiseta");
      return;
    }

    let voto = {
      "usuario_id": cliente.dados.id,
      "camiseta_id": id,
      "gostou": 0,
    };

    await Conecta.post("likes", voto);


    // let dislikes = Number(reg.data.dislikes) + 1;

    await Conecta.put("camisetas/dislike/" + id);

    await getCamisetas();

    alert("Ok! Obrigado pela sua participação");
  };

  return (
    <div className="container">
      <div className="row">
        {camisetas.map((camiseta, index) => (
          <ItemLista
            foto={camiseta.foto}
            modelo={camiseta.modelo}
            marca={camiseta.marca}
            preco={camiseta.preco}
            ano={camiseta.ano}
            likes={camiseta.likes}
            dislikes={camiseta.dislikes}
            likeClick={() => clienteLike(camiseta.id, index)}
            dislikeClick={() => clienteDislike(camiseta.id)}
            key={camiseta.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Listagem;
