const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS for frontend requests

// Route to handle crop prediction request
app.post("/api/predict/crop", async (req, res) => {
    console.log("Incoming Request Body:", req.body);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/predict/crop',
        {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(req.body),
        }
      )

      const responseData = await response.json(); 
      res.json(responseData);
    } catch (error) {
      console.log(error, "Error Occured");
    }
});

  app.post("/api/predict/yield", async (req, res) => {
    console.log("Incoming Request Body:", req.body);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/predict/yield',
        {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(req.body),
        }
      )

      const responseData = await response.json(); 
      res.json(responseData);
    } catch (error) {
      console.log(error);
    }
  });
  
  

const PORT = 5010;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
