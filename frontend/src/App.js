import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrapin tyylit mukaan

function App() {
  const [items, setItems] = useState([]); // Tiedot, jotka haluamme näyttää
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Haetaan tiedot backendistä
  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Virhe tiedon haussa:', error));
  }, []); // Tyhjä riippuvuuslista tarkoittaa, että tämä suoritetaan vain kerran komponentin latautuessa

  // Lisää uusi tieto backendiin
  const addItem = () => {
    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    })
      .then(response => response.json())
      .then(data => {
        setItems([...items, data]); // Lisää uusi tieto listaan
        setName('');
        setDescription('');
      })
      .catch(error => console.error('Virhe tiedon lisäämisessä:', error));
  };

  // Poista tieto backendistä
  const deleteItem = (id) => {
    fetch(`http://localhost:3000/items/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setItems(items.filter(item => item.id !== id)); // Poista poistettu tieto listasta
      })
      .catch(error => console.error('Virhe tiedon poistamisessa:', error));
  };

  return (
    <div className="container mt-5">
      <h1>Tiedot</h1>

      {/* Lomake tietojen lisäämiseen */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nimi"
        />
        <input
          type="text"
          className="form-control mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kuvaus"
        />
        <button className="btn btn-primary" onClick={addItem}>Lisää</button>
      </div>

      {/* Näytetään haetut tiedot */}
      <ul className="list-group">
        {items.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <strong>{item.name}</strong>: {item.description}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteItem(item.id)}
            >
              Poista
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




