import React, { useState, useEffect } from 'react';
import NumeroComentarios from './components/NumeroComentarios';
import TendenciasInteraccion from './components/TendenciasInteraccion';
import ComentariosMes from './components/ComentariosMes';
import './Reportes.css';

const Reportes = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState('numero_comentarios');

  useEffect(() => {
    fetch('https://www.mrkt21.com/comentarios/reportes/API/', {
      method: 'GET',
      credentials: 'include' 
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setData(result); // result contiene las propiedades: horas_data, horas_labels, meses_data, meses_labels, publicaciones_data
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const publicacionesData = data.publicaciones_data || [];
  const horasData = { data: data.horas_data, labels: data.horas_labels };
  const mesesData = { data: data.meses_data, labels: data.meses_labels };

  return (
    <div className="reportes-container">
      <h1 className="principal-title">Reportes</h1>

      {/* Contenedor de botones */}
      <div className="buttons-container">
        <button
          onClick={() => handleButtonClick('numero_comentarios')}
          className={`reportes-button ${
            selectedButton === 'numero_comentarios' ? 'selected' : ''
          }`}
        >
          Número Comentarios
        </button>

        <button
          onClick={() => handleButtonClick('tendencias_interaccion')}
          className={`reportes-button ${
            selectedButton === 'tendencias_interaccion' ? 'selected' : ''
          }`}
        >
          Tendencias Interacción
        </button>

        <button
          onClick={() => handleButtonClick('comentarios_2025')}
          className={`reportes-button ${
            selectedButton === 'comentarios_2025' ? 'selected' : ''
          }`}
        >
          Comentarios Mes
        </button>
      </div>

      {/* Renderizado condicional de cada componente */}
      {selectedButton === 'numero_comentarios' && <NumeroComentarios data={publicacionesData} />}
      {selectedButton === 'tendencias_interaccion' && <TendenciasInteraccion />}
      {selectedButton === 'comentarios_2025' && <ComentariosMes />}
    </div>
  );
};

export default Reportes; 