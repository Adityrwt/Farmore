import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [showCropForm, setShowCropForm] = useState(false);
  const [showYieldForm, setShowYieldForm] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCropSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.target);
    const data = {
      nitrogen: parseFloat(formData.get('nitrogen')),
      phosphorus: parseFloat(formData.get('phosphorus')),
      potassium: parseFloat(formData.get('potassium')),
      temperature: parseFloat(formData.get('temperature')),
      humidity: parseFloat(formData.get('humidity')),
      ph: parseFloat(formData.get('ph')),
      rainfall: parseFloat(formData.get('rainfall'))
    };

    try {
      const response = await fetch('http://localhost:5010/api/predict/crop', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
  
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setPrediction(result.recommended_crop); // Update to match server response
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleYieldSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const data = {
      area: parseFloat(formData.get('area')),
      rainfall: parseFloat(formData.get('rainfall')),
      temperature: parseFloat(formData.get('temperature')),
      humidity: parseFloat(formData.get('humidity')),
      soil_moisture: parseFloat(formData.get('soil_moisture')),
      season: formData.get('season'),
      crop: formData.get('crop')
    };

    try {
      const response = await fetch('http://localhost:5010/api/predict/yield', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      
        },
        mode: 'cors',
  
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setPrediction(`Production: ${result.predicted_production_tons} tons, Yield per acre: ${result.yield_per_acre}`);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="header">
      <div className="header-overlay"></div>
      <div className="header-content">
        <h1 className="header-title">Farmore</h1>
        <div className="header-tagline">
          <span className="highlight">Revolutionizing Agriculture</span>
          <p className="subtitle">Where Technology Meets Tradition</p>
        </div>
        <div className="header-features">
          <div className="feature-card">
            <h3>Smart Crop Recommendations</h3>
            <p>Leverage AI-powered insights to make informed decisions about your crops.</p>
            <button className="cta-button" onClick={() => setShowCropForm(!showCropForm)}>
              {showCropForm ? 'Hide Form' : 'Get Crop Recommendation'}
            </button>
            {showCropForm && (
              <form onSubmit={handleCropSubmit} className="prediction-form">
                <input type="number" name="nitrogen" placeholder="Nitrogen (N) [0-140]" required step="0.01" />
                <input type="number" name="phosphorus" placeholder="Phosphorus (P) [5-145]" required step="0.01" />
                <input type="number" name="potassium" placeholder="Potassium (K) [5-205]" required step="0.01" />
                <input type="number" name="temperature" placeholder="Temperature (°C) [8-45]" required step="0.01" />
                <input type="number" name="humidity" placeholder="Humidity (%) [14-100]" required step="0.01" />
                <input type="number" name="ph" placeholder="pH value [3.5-10]" required step="0.01" />
                <input type="number" name="rainfall" placeholder="Rainfall (mm) [20-300]" required step="0.01" />
                <button type="submit" disabled={loading}>
                  {loading ? 'Processing...' : 'Get Recommendation'}
                </button>
              </form>
            )}
          </div>
          <div className="feature-card">
            <h3>Precision Yield Predictions</h3>
            <p>Plan your harvest with confidence using our advanced analytics.</p>
            <button className="cta-button" onClick={() => setShowYieldForm(!showYieldForm)}>
              {showYieldForm ? 'Hide Form' : 'Get Yield Prediction'}
            </button>
            {showYieldForm && (
              <form onSubmit={handleYieldSubmit} className="prediction-form">
                <input type="number" name="area" placeholder="Area (hectares)" required step="0.01" />
                <input type="number" name="rainfall" placeholder="Rainfall (mm)" required step="0.01" />
                <input type="number" name="temperature" placeholder="Temperature (°C)" required step="0.01" />
                <input type="number" name="soil_quality" placeholder="Soil Quality (1-10)" required min="1" max="10" step="0.1" />
                <select name="crop" required>
                  <option value="">Select a crop</option>
                  <option value="Rice">Rice</option>
                  <option value="Banana">Banana</option>
                  <option value="Maize">Maize</option>
                  <option value="Moong(Green Gram)">Moong(Green Gram)</option>
                  <option value="Urad">Urad</option>
                  <option value="Arhar/Tur">Arhar/Tur</option>
                  <option value="Cotton(Lint)">Cotton(Lint)</option>
                  <option value="Masoor">Masoor</option>
                  <option value="Grapes">Grapes</option>
                  <option value="Mango">Mango</option>
                  <option value="Orange">Orange</option>
                  <option value="Papaya">Papaya</option>
                </select>
                <input type="text" name='season' placeholder='Enter 1:Kharif, 2:Rabi, 3:Whole Year' required/>
                <input type="number" name="humidity" placeholder="Humidity (%)" required step="0.01" />
                <input type="number" name="soil_moisture" placeholder="Soil Moisture" required step="0.01" />

                <button type="submit" disabled={loading}>
                  {loading ? 'Processing...' : 'Get Prediction'}
                </button>
              </form>
            )}
          </div>
        </div>
        {error && (
          <div className="prediction-error">
            <p>{error}</p>
          </div>
        )}
        {prediction && (
          <div className="prediction-result">
            <h3>Prediction Result:</h3>
            <p>{prediction}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;