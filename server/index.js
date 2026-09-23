const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});