import { useState } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DetailsPage from './components/DetailsPage';

// Pages : 'home' | 'login' | 'details'

export default function App() {
  const [page, setPage] = useState('home');
  const [guest, setGuest] = useState(null);

  const handleSelectGuest = (g) => {
    setGuest(g);
    setPage('login');
  };

  const handleLogin = () => {
    setPage('details');
  };

  const handleBack = () => {
    setGuest(null);
    setPage('home');
  };

  const handleLogout = () => {
    setGuest(null);
    setPage('home');
  };

  return (
    <>
      {page === 'home' && (
        <HomePage onSelectGuest={handleSelectGuest} />
      )}
      {page === 'login' && guest && (
        <LoginPage guest={guest} onLogin={handleLogin} onBack={handleBack} />
      )}
      {page === 'details' && guest && (
        <DetailsPage guest={guest} onLogout={handleLogout} />
      )}
    </>
  );
}
