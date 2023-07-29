import './App.css';
import {useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//sweetalert2
import Swal from 'sweetalert2';

function App() {

  //Estados para inputs
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState();
  const [id, setId] = useState();

  //Variable para controlar la edicion
  const [edit, setEdit] = useState(false);

  //Lista vacia users
  const [userList, setUserList] = useState([]);

  //Crear usuario
  const addUser = () => {
    Axios.post('http://localhost:3001/create',{
      name:name,
      country:country,
      year:year
    }).then(()=>{
      getUser();
      clean();
      Swal.fire({
        title: '<strong>Usuario registrado!</strong>',
        html: '<i>Bienvenido '+name+'</i>',
        icon: 'success',
        timer: 2000
      })
    });
  }

  //Actualizar Usuario
  const updateUser = () => {
    Axios.put('http://localhost:3001/update',{
      id:id,
      name:name,
      country:country,
      year:year
    }).then(()=>{
      getUser();
      clean();
      Swal.fire({
        title: '<strong>Usuario actualizado!</strong>',
        html: '<i>Se actualizo a '+name+'</i>',
        icon: 'success',
        timer: 2000
      })
    });
  }

  //Eliminar usuario
  const deleteUser = (val) => {
    Swal.fire({
      title: '<strong>Eliminar usuario</strong>',
      html: '<i>Desea eliminar a '+val.name+'?</i>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result)=>{
      if(result.isConfirmed){
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
          getUser();
          clean();
          Swal.fire({
            title: '<strong>Usuario eliminado</strong>',
            html: '<i>Se elimino a '+val.name+'</i>',
            icon: 'success',
            timer: 2000
          })          
        });
      }
    })
    
  } 

  //Obtener lista de usuarios
  const getUser = () => {
    Axios.get('http://localhost:3001/users').then((response)=>{
      setUserList(response.data);
    });
  }

  //Funcion para completar el formulario con editar
  const editUser = (val) => {
    setEdit(true);

    setName(val.name);
    setCountry(val.country);
    setYear(val.year);
    setId(val.id);
  }

  const clean = () =>{
    setId('');
    setName('');
    setCountry('');
    setYear('');
    setEdit(false);
  }

  //Cargar lista al iniciar
  //getUser();

  return (
    <div className='container'>      

      <div className="card text-center mt-2">

        <div className="card-header">
          Formulario Usuarios
        </div>

        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text" value={name} onChange={(event)=>{
              setName(event.target.value);
            }}  className="form-control" placeholder="Ingrese nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais</span>
            <input type="text"  value={country} onChange={(event)=>{
              setCountry(event.target.value);
            }} className="form-control" placeholder="Ingrese país" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad</span>
            <input type="number" value={year} onChange = {(event)=>{
              setYear(event.target.value);
            }} className="form-control" placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

        </div>
        <div className="card-footer text-muted">
          {
            edit?
            <div>
              <button className='btn btn-success me-1' onClick={updateUser} >Actualizar</button>
              <button className='btn btn-warning ms-1' onClick={clean} >Cancelar</button>
            </div>
            :<button className='btn btn-success' onClick={addUser} >Registrar</button>
          }
          
        </div>
      </div>

      {/* LISTA DE USARIOS */}       

      <div className="card text-center mt-2">

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
                <th scope="col">Acciones</th>
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
                        <td>
                          <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" 
                            onClick={()=>{
                              editUser(val);
                            }}  
                            class="btn btn-info">Editar</button>
                            <button type="button" onClick={()=>{deleteUser(val);}} class="btn btn-danger">Eliminar</button>
                          </div>                       
                        </td>
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
