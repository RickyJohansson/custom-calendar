import './calendar.css';
import CalendarDate from '../CalendarDate/CalendarDate';
import { useEffect, useState } from 'react';

const Calendar = () => {

    const date: Date = new Date();
    const currentYear: number = date.getFullYear();
    const currentMonth: number = date.getMonth();
    const daysThisMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate();
    const monthString: string = date.toLocaleString('default', { month: 'long' }).toUpperCase();

    const [ dayArray, setDayArray ] = useState<number[]>([]);

    useEffect(() => {

        const daysArray: number[] = [];

        for(let i = 0; i < daysThisMonth; i++ ) {
            daysArray.push(i+1);
        }

        setDayArray(daysArray);

    }, []);

    return(

        <div className="calendar_border">

            <section className="calendar_container">

                <section className="calendar_navigator">

                    <figure className="left_arrow">
                        <section className="arrow_shaft"></section>
                        <section className="arrow_pointer"></section>
                        <section className="arrow_block"></section>
                    </figure>

                    <h2>{ monthString }</h2>

                    <figure className="right_arrow">
                        <section className="arrow_shaft"></section>
                        <section className="arrow_pointer"></section>
                        <section className="arrow_block"></section>
                    </figure>

                </section>

                <section className="dates">

                    {

                        dayArray.map((day) => {
                            return < CalendarDate day={day}/>
                        })

                    }

                </section>

            </section>
            
        </div>

    )
}

export default Calendar;