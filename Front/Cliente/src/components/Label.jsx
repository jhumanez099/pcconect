import React from 'react';

function Label() {
  return (
    <form>
      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" />
    </form>
  );
}