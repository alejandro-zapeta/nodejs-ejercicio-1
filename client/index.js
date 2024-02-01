import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from "../src/components/App.jsx"

hydrateRoot(document.getElementById('root'), <App />);