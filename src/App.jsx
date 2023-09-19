import React, { useState, useEffect } from 'react';
import './app.css';

const UserSearch = () => {
  const [originalUsers, setOriginalUsers] = useState([]); // Lista original de usuarios
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [selectedUsers, setSelectedUsers] = useState([]); // Estado para usuarios seleccionados

  useEffect(() => {
    // Simula cargar los usuarios desde un archivo JSON (ajusta la ruta a tu archivo)
    fetch('usuarios.json')
      .then(response => response.json())
      .then(data => {
        setOriginalUsers(data);
      })
      .catch(error => console.error('Error al cargar los usuarios:', error));
  }, []);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearch = event => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  // Función para manejar la selección de un usuario
  const handleUserSelect = user => {
    const updatedSelectedUsers = [...selectedUsers, user];
    setSelectedUsers(updatedSelectedUsers);
  };

  // Función para eliminar un usuario seleccionado
  const handleRemoveSelectedUser = userToRemove => {
    const updatedSelectedUsers = selectedUsers.filter(user => user.id !== userToRemove.id);
    setSelectedUsers(updatedSelectedUsers);
  };

  // Filtrar la lista original de usuarios solo si hay un término de búsqueda
  const filteredUsers = searchTerm
    ? originalUsers.filter(user =>
        user.nombre.toLowerCase().includes(searchTerm) && !selectedUsers.includes(user)
      )
    : [];

  return (
    <div>
        <div>
        <h1>Buscador de Usuarios</h1>
      <input
        type="text"
     placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredUsers.length > 0 && (
        <div className="user-list">
          {filteredUsers.map(user => (
            <div key={user.id} className="user-card">
              <h2 onClick={() => handleUserSelect(user)}>{user.nombre}</h2>
            </div>
          ))}
        </div>
      )}
        </div>
      {selectedUsers.length > 0 && (
        <div className="selected-users">
          <h2>Usuarios Seleccionados</h2>
          <div className='usuarios'>

          {selectedUsers.map(user => (
            <div key={user.id} className="user-card">
              <p>Nombre: {user.nombre}</p>
              <p>Correo: {user.correo}</p>
              <p>Edad: {user.edad}</p>
              <button onClick={() => handleRemoveSelectedUser(user)}>Eliminar</button>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
    
  );
};

export default UserSearch;
