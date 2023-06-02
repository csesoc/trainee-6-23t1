import React from 'react';
import LandingPage from './components/landing/landing';
import RegisterPage from './components/register-login/register';
import LoginPage from './components/register-login/login';
import InterestPage from './components/register-login/interests';
import GenderPage from './components/register-login/genders';
import PrefPage from './components/register-login/preferences';
import AvailabilityPage from './components/register-login/availability';
import Socials from './components/register-login/socials';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gender" element={<GenderPage />} />
        <Route path="/preference" element={<PrefPage />} />
        <Route path="/interest" element={<InterestPage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/social" element={<Socials />} />
      </Routes>
    </Router>
  );
}

export default App;
