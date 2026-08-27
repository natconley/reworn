const express = require('express');
const productsRouter = require('./routes/products');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/products', productsRouter);


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});