import './App.css';
import {useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //Estados para inputs
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(0);

  //Lista vacia users
  const [userList, setUserList] = useState([]);

  //Create user
  const addUser = () => {
    Axios.post('http://localhost:3001/create',{
      name:name,
      country:country,
      year:year
    }).then(()=>{
      getUser();
      alert('Usuario registrado!');
    });
  }

  //Obtener lista de usuarios
  const getUser = () => {
    Axios.get('http://localhost:3001/users').then((response)=>{
      setUserList(response.data);
    });
  }

  //Cargar lista al iniciar
  //getUser();

  return (
    <div className='container'>      

      <div className="card text-center">

        <div className="card-header">
          Formulario Usuarios
        </div>

        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text" onChange={(event)=>{
              setName(event.target.value);
            }}  className="form-control" placeholder="Ingrese nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais</span>
            <input type="text"  onChange={(event)=>{
              setCountry(event.target.value);
            }} className="form-control" placeholder="Ingrese país" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad</span>
            <input type="number" onChange = {(event)=>{
              setYear(event.target.value);
            }} className="form-control" placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

        </div>
        <div className="card-footer text-muted">
          <button className='btn btn-success' onClick={addUser} >Registrar</button>
        </div>
      </div>

      {/* LISTA DE USARIOS */}       

      <div className="card text-center">

        <div className="card-header">
          Lista de Usuarios
        </div>

        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr >
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">País</th>
                <th scope="col">Edad</th>
              </tr>
            </thead>
            <tbody>
              {
              userList.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.id}</th>
                        <td>{val.name}</td>
                        <td>{val.country}</td>
                        <td>{val.year}</td>
                      </tr>
              })
              }              
            </tbody>
          </table>
        </div>

        <div className="card-footer text-muted">
          Footer de la lista.
        </div>
      </div>
      
      
    </div>
  );
}

export default App;
