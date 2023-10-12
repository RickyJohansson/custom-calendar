import './calendar.css';
import CalendarDate from '../CalendarDate/CalendarDate';
import { useEffect, useState } from 'react';

const Calendar = () => {

    const [date, setDate] = useState<Date>(new Date());
    //const currentYear: number = date.getFullYear();
    //const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
    //const [ daysThisMonth, setDaysThisMonth ] = useState<number>(new Date(currentYear, currentMonth + 1, 0).getDate());
    //const [ monthString, setMonthString ] = useState<string>(date.toLocaleString('default', { month: 'long' }).toUpperCase());
    const [ dayArray, setDayArray ] = useState<number[]>([]);

    useEffect(() => {

        const daysArray: number[] = [];

        for(let i = 0; i < new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); i++ ) {
            daysArray.push(i+1);
        }

        setDayArray(daysArray);

    }, [date]);

    const previousMonth = () => {

        setDate(new Date(date.getFullYear(), date.getMonth(), 0));

    }

    const nextMonth = () => {

        const newMonth = date.getMonth() + 2;
        setDate(new Date(date.getFullYear(), newMonth, 0));

    }

    return(

        <div className="calendar_border">

            <section className="calendar_container">

                <section className="calendar_navigator">

                    <figure className="left_arrow" onClick={ previousMonth }>
                        <section className="arrow_shaft"></section>
                        <section className="arrow_pointer"></section>
                        <section className="arrow_block"></section>
                    </figure>

                    <h2>{ date.toLocaleString('default', { month: 'long' }).toUpperCase() + ' - ' + date.getFullYear() }</h2>

                    <figure className="right_arrow" onClick={ nextMonth }>
                        <section className="arrow_shaft"></section>
                        <section className="arrow_pointer"></section>
                        <section className="arrow_block"></section>
                    </figure>

                </section>

                <section className="dates">

                    {

                        dayArray.map((day, i) => {
                            return < CalendarDate key={i} day={day} date={date}/>
                        })

                    }

                </section>

            </section>
            
        </div>

    )
}

export default Calendar;