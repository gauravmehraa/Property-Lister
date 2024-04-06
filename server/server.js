const express = require('express');
const app = express();
app.use(express.json({limit: '30mb'})); // important
app.use(express.urlencoded({limit: '30mb'})) // important
const { getProperties, addProperty, getProperty } = require('./firebase');

app.get("/api/properties", async (req, res) =>{
  const data = await getProperties();
  res.send(JSON.stringify(data));
})

app.post('/api/data', async (req, res) => {
  try {
    const data = req.body; 
    const uploaded = await addProperty(data);
    res.status(200).json({ message: 'Data successfully uploaded to Firestore', uploaded: uploaded });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/properties/:id', async (req, res) =>{
  const data = await getProperty(req.params.id);
  res.send(JSON.stringify(data));
})

app.listen(5000, () => {console.log('Server running on port 5000')});