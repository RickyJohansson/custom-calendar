import './App.css'
import Calendar from './components/Calendar/Calendar';
/*
import express, { Response , Application } from 'express';
import cors from 'cors';
*/

function App() {

  /*

  const app: Application = express();

  app.use(cors());
  const PORT = process.env.PORT || 5171;

  app.listen( PORT , () => {
    console.log(`server running on port ${PORT}`)
  })

  app.get('/activities' ,(resp: Response) => {
    resp.json({ msg: 'hello man' });
  })
  */

  return (

    <div className="app">
      
      <h1 className="string_customcalendar"> Custom Calendar </h1>
      <section className="calendar_description">
        <figure className="green_square"></figure>
        <p>- datumet innehåller aktiviteter</p>
      </section>
      <section className="calendar_description">
        <figure className="blue_square"></figure>
        <p>- date today</p>
      </section>
      <Calendar />

    </div>

  )
}

export default App
