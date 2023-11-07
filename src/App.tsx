import './App.css'
import Calendar from './components/Calendar/Calendar';

function App() {

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
