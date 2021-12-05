import React, { useState, useEffect } from "react";
import Conecta from "./Conecta";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficoVendas = () => {
  const [marcas, setMarcas] = useState([]);

  const getMarcas = async () => {
    const lista = await Conecta.get("camisetas");
    //    console.log(lista);
    setMarcas(lista.data);
  };

  // define o método que será executado após renderizar o componente
  useEffect(() => {
    getMarcas();
  }, []);

//   const labels = marcas.map((marca) => marca.nome);
//   const data1 = marcas.map((marca) => marca.num);

const labels = marcas.map((marca) => marca.modelo);
const data1 = marcas.map((marca) => marca.ano);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Nº de Camisetas por Marca",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Nº de Camisetas",
        data: data1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div class="d-flex justify-content-center">
      <div style={{ width: "1000px", height: "800px" }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default GraficoVendas;