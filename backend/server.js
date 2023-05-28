const express = require('express');
const cors = require('cors');
const axios = require('axios');
const https = require('https');
const app = express();

const port = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true
  }));
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  const agent = new https.Agent({
    rejectUnauthorized: false
  });
  

app.get('/user', async (req, res) => {
    console.log('user route hit');
    try {
        const response = await axios.get('https://demo.wavefront.com/api/v2/user', {
            headers: {
                'Authorization': 'Bearer 0759febe-a552-4918-8da5-766a71ca2f3c', 
            }, 
            httpsAgent: agent
        });
        res.header('Access-Control-Allow-Origin', '*');
        res.send(response.data)
    }
    catch(err) {
        console.error(err);
        res.status(500).send(err)
    }
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})