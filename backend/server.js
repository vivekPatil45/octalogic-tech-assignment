import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import { connectingDB } from './db.js';

dotenv.config();
const app = express();


morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
    morgan(":method :url :status :response-time ms - :res[content-length] :body")
);
app.use(bodyParser.json());
app.use(cors());

await connectingDB();


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    return res.send("<h2>API is working 🚀</h2>");
});


app.listen(PORT, () => {
    console.log(`Serve running on http://localhost:${PORT}`)
});
