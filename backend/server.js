import express from 'express';
import cors from 'cors';
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

const app = express();
let db;

app.use(cors());
const PORT = process.env.PORT || 5000;

connectToDb((err) => {
    if (!err) {
        app.listen( PORT , () => {
        console.log(`server running on port ${PORT}`)
        })
        db = getDb();
    }
});

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

app.get('/activities/:id', (req, res) => {
  
    if (ObjectId.isValid(req.params.id)) {
      db.collection('activities')
        .findOne({
          _id: ObjectId(req.params.id)
        })
       .then(doc => {
         res.status(200).json(doc)
       })
       .catch(err => {
         res.status(500).json({ error: 'could not fetch the doc' })
       })
   } else {
     res.status(500).json({ error: 'Not valid doc id' })
   }
  
  })

  app.post('/activities', (req, res) => {

  const activity = req.body;

  db.collection('activities')
    .insertOne(activity)
    .then( result => {
         res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ error: 'could not post the body'})
    })
  
})

app.delete('/activities/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {
    db.collection('activities')
      .deleteOne({
        _id: ObjectId(req.params.id)
      })
     .then(result => {
       res.status(200).json(result)
     })
     .catch(err => {
       res.status(500).json({ error: 'could not delete the doc' })
     })
 } else {
   res.status(500).json({ error: 'Not valid doc id' })
 }
})


app.patch('/books/:id', (req, res) => {
  const updates = req.body;

 if (ObjectId.isValid(req.params.id)) {
   db.collection('activities')
     .updateOne({
       _id: ObjectId(req.params.id)
     }, 
     {
       $set: updates
     }
)                                                    
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ error: 'could not update the doc' })
    })
} else {
  res.status(500).json({ error: 'Not valid doc id' })
}

})

