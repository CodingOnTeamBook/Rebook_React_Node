const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/api', (req,res) => {
    res.json({
        success: true,
        message: 'from node server',
    })
});

app.listen(5000, () => {
    console.log('server on port 5000');
});