import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/activities" ,(req, resp) => {
    resp.json({ "msg": "hello man" });
})

app.listen( PORT , () => {
console.log(`server running on port ${PORT}`)
})

