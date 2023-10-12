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
    const [ layout, setLayout ] = useState<string>('calendar');
    const [dateClicked, setDateClicked] = useState<number>();

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

    const changeLayout = (clickedDate: number) => {

        setDateClicked(clickedDate);
        setLayout('date');

    }

    return(

        <div className="calendar_border">

            {

            layout == 'calendar' ?

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
                            return < CalendarDate key={i} day={day} date={date} changeLayout={changeLayout}/>
                        })

                    }

                </section>


            </section>

            :

            <section className="calendar_container">

                <section className="calendar_navigator">

                <figure className="left_arrow" onClick={ () => setLayout('calendar') }>
                    <section className="arrow_shaft"></section>
                    <section className="arrow_pointer"></section>
                    <section className="arrow_block"></section>
                </figure>

                <h2>{ dateClicked + ' ' + date.toLocaleString('default', { month: 'long' }).toUpperCase() + ' - ' + date.getFullYear() }</h2>

                <figure className="right_arrow--hidden">
                    <section className="arrow_shaft"></section>
                    <section className="arrow_pointer"></section>
                    <section className="arrow_block"></section>
                </figure>

                </section>


            </section>

            }
            
        </div>

    )
}

export default Calendar;