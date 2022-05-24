import { Layout } from 'components/Layout';
import { MainProvider } from 'context/roomContext';
import { SocketProvider } from 'context/socketContext';
import { ToolProvider } from 'context/toolContext';
import { UsersProvider } from 'context/usersContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'style.css'
import { App } from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UsersProvider>
      <SocketProvider>
        <MainProvider>
          <ToolProvider>
          <BrowserRouter>
            <Layout>
            <App/>
            </Layout>
          </BrowserRouter>
        </ToolProvider>
        </MainProvider>
      </SocketProvider>
    </UsersProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
