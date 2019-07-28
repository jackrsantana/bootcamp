import React from 'react';

import './App.css';
import image from './assets/image.jpg'

function App() {
    return (
        <div>
            <h1>Hello World</h1>
            <img src={image} width="200"></img>
        </div>
    );
}

export default App;