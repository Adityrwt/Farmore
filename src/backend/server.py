from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle, joblib, numpy as np

app = Flask(__name__)
# Basic CORS setup (you can remove custom OPTIONS handlers later)
CORS(app)



with open ('yield_Prediction.pkl', 'rb') as f:
    yield_prediction_model = pickle.load(f)
    
model_yield = yield_prediction_model['model']
scaler_yield = yield_prediction_model['scaler']
le_season_yield = yield_prediction_model['le_season']
le_crop_yield = yield_prediction_model['le_crop']
    

try:
    crop_recommendation_model = joblib.load('crop_recommendation_model.pkl')
except:
    print("Warning: Could not load crop recommendation model")
    crop_recommendation_model = None


@app.route('/predict/crop', methods=['POST'])
def recommend_crop():
    data = request.get_json()
    

    features = np.array([[
        float(data.get('nitrogen')),
        float(data.get('phosphorus')),
        float(data.get('potassium')),
        float(data.get('temperature')),
        float(data.get('humidity')),
        float(data.get('ph')),
        float(data.get('rainfall'))
    ]])
    

    if crop_recommendation_model is not None:
        prediction = crop_recommendation_model.predict(features)
        return jsonify({'recommended_crop': prediction[0]})
    else:
        return jsonify({'error': 'Model not available'}), 503

@app.route('/predict/yield', methods=['POST', 'OPTIONS'])
def predict_yield():
    data = request.get_json()
    
    # Get inputs
    temperature = float(data.get('temperature'))
    humidity = float(data.get('humidity'))
    soil_moisture = float(data.get('soil_moisture'))
    area = float(data.get('area'))
    season_num = int(data.get('season'))
    crop = data.get('crop')
    
    # Map numeric input to season names
    season_map = {
        1: 'Kharif',
        2: 'Rabi',
        3: 'Whole Year'
    }
    
    season = season_map.get(season_num)
    if not season:
        return jsonify({'error': 'Invalid season number. Use 1 for Kharif, 2 for Rabi, 3 for Whole Year'}), 400
    
    season_encoded = le_season_yield.transform([season])[0]
    crop_encoded = le_crop_yield.transform([crop])[0]

    # Create input array
    input_data = [[season_encoded, crop_encoded, temperature, 
                humidity, soil_moisture, area]]

    # Scale input
    input_scaled = scaler_yield.transform(input_data)

    # Make prediction
    prediction = model_yield.predict(input_scaled)[0]
    
    if prediction is not None:
        return jsonify({
            'predicted_production_tons': round(prediction, 2),
            'yield_per_acre': round(prediction/area, 2)
        })
    else:
        return jsonify({
            'error': f'No yield data available for crop {crop} in season {season}'
        }), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)