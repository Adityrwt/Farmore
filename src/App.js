import logo from './logo.svg';
import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import Features from './components/Features';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <main className="main-content">
        <h1 className="main-heading">Welcome to Farmore</h1>
        <p className="main-subtitle">Smart Crop Recommendations & Yield Predictions</p>
        <div className="hero-description">
          <p>Empowering farmers with AI-driven insights for better crop decisions</p>
        </div>
        <About />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
