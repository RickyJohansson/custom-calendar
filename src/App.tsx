import { useEffect, useState } from 'react';
import './App.css'
import Calendar from './components/Calendar/Calendar';

function App() {

  const [ activities, setActivities ] = useState<[]>([]);

  /*
  useEffect(() => {
    
    (async function getActivities() {
      const response = await fetch('http://localhost:5000/activities');
      const data = await response.json();
      console.log(data);

      setActivities(data);
    })()

  }, []) */

  console.log(activities);

  return (

    <div className="app">
      
      <h1 className="string_customcalendar"> Custom Calendar </h1>
      <section className="calendar_description">
        <figure className="green_square"></figure>
        <p>- datumet innehåller aktiviteter</p>
      </section>
      <section className="calendar_description">
        <figure className="blue_square"></figure>
        <p>- dagens datum</p>
      </section>
      <Calendar />

    </div>

  )
}

export default App
