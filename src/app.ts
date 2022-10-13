import express from 'express'
import productsRouter from './routes/products'
import cors from 'cors'

const app = express();
const port = 8080;

app.use(express.static('./frontend/public'));

app.use(cors({ 
    origin: '*'
}))

app.use(express.urlencoded({extended: false}));

app.use(express.json()); 

app.use('/api/products', productsRouter);

app.all('*', (req: express.Request, res: express.Response) => { 
    res.status(404).send('Resource not found');
});

app.listen(port, () => { 
    console.log(`Server listening on port ${port}...`);
});