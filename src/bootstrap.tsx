/// <reference path="./index.d.ts" />

import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegisteration from './scripts/serviceWorker/serviceWorkerRegisteration';

const root = ReactDOM.createRoot(document.getElementById('_container-service') as HTMLElement);
root.render(<App />);

serviceWorkerRegisteration.register();
