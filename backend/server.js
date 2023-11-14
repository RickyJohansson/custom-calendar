import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
const PORT = process.env.PORT || 5171;

app.listen( PORT , () => {
console.log(`server running on port ${PORT}`)
})

app.get('/activities' ,(resp) => {
resp.json({ msg: 'hello man' });
})
