import express from 'express'
import productsRouter from './routes/products'
import cors from 'cors'
import path from 'path'
import open from 'open'
import dotenv from 'dotenv'
import { connectDb } from './db/connect'
import { errorHandler } from './middlewares/errorHandler'
import { notFound } from './middlewares/notFound'

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ 
    origin: '*'
}))

app.use(express.static(path.join(process.cwd(), 'frontend-store', 'build')));

app.use(express.urlencoded({extended: false}));

app.use(express.json()); 

app.use('/api/products', productsRouter);

app.use(errorHandler);

app.use(notFound);

const startServer = async () => { 
    try { 
        await connectDb(process.env.MONGO_URI as string)
        app.listen(port, () => { 
            console.log(`Server listening on port ${port}... 🔈`);
        });
    } catch (err) { 
        console.log(err)
        console.log(`Could not establish connection to the database`);
    }
}

startServer();

//open('http://localhost:8080/');