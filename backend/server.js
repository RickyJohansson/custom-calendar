import express from 'express';
import cors from 'cors';
const { connectToDb, getDb } = require('./db');

const app = express();
let db;

app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/activities" ,(req, resp) => {
    const activities = [];
    db.collection('activities').find().sort({ time: 1 }).forEach(activity => activities.push(activity))
    .then(() => {
        resp.status(200).json(activities);
    })
    .catch(() => {
        resp.status(500).json({ error: 'Could not fetch documents' })
    });
    resp.json({ "msg": "hello man" });
})

connectToDb((err) => {
    if (!err) {
        app.listen( PORT , () => {
        console.log(`server running on port ${PORT}`)
        })
        db = getDb();
    }
  });

