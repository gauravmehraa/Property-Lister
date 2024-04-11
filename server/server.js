const express = require('express');
const app = express();

app.use(express.json({limit: '30mb'})); // important
app.use(express.urlencoded({limit: '30mb'})) // important

const { getProperties, addProperty, getProperty } = require('./firebase');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

app.get("/api/properties", async (req, res) =>{
  const data = await getProperties();
  res.send(JSON.stringify(data));
})

app.post('/api/data', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const data = req.body;
    const { image1, image2, image3, video } = req.files;
    const uploaded = await addProperty(data, { image1, image2, image3 }, video);
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