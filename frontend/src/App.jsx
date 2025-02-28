
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
        <div className="container">
          
        </div>
        <About />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
