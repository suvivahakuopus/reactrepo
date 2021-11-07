import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';

const URL = 'http://localhost/ostoslista/index.php';

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');

  function save(e) {
    e.prevenDefault();
    const json = JSON.stringify({description:item})
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    } )

    .then((response) => {
      setItems(items => [ ...items,response,])
      setItem('');
    }).catch (error => {
      alert(error.response.data.error)
    });
  }


 

  useEffect(() => {
    axios.get(URL)
    .then((response)=> {
      console.log(response.data);
      setItem(response.data);
    }).catch(error => {
      alert(error);
    })
  },[])

 
  return (
    <div className="container">
      <h3>Shopping list</h3>
      <form onSubmit={save}>
        <label className="new">New item</label>
        <input value={items} onChange={e => setItems(e.target.value)} />
        </form>
        <form onSubmit={save}>
        <label></label>
        <input value={item} onChange={e => setItem(e.target.value)} />
        <button>Add</button>
      </form>

      <ol>
      {items?.map(items => (
      <li key={items.id}>{items.description}</li>
      ))}
    </ol>

    </div>
);
}

    
export default App;

