import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [campo1, setProductName] = useState('');
  const [campo2, setProductBrand] = useState('');
  const [campo3, setProductDate] = useState('');

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      const response = await axios.post('/registerProduct', {
        ProductName: campo1,
        ProductBrand: campo2,
        ProductDate: campo3
      });

      /*console.log(response.data);*/

      if (response.status === 201) {
        toast.success('Producto registrado correctamente');
        setProductName('');
        setProductBrand('');
        setProductDate('');
      }

    } catch (error) {

      if (error.response && error.response.status === 409) {
        toast.error('Este producto ya existe en la bd');
      } else {
        console.error('Error al registrar el producto:', error);
      }

    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de Producto: "
          value={campo1}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Marca de producto: "
          value={campo2}
          onChange={(e) => setProductBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fecha de producto: "
          value={campo3}
          onChange={(e) => setProductDate(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <ToastContainer />
    </div>
  );
}


export default App;