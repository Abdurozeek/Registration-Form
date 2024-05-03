import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import RegistrationForm from './components/RegistrationForm';

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                    <h1>Регистрация формасы</h1>
                </header>
                <main>
                    <RegistrationForm />
                </main>
            </div>
        </ApolloProvider>
    );
}

export default App;