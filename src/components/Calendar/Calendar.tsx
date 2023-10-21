import './calendar.css';
import CalendarDate from '../CalendarDate/CalendarDate';
import CalendarActivity from '../CalendarActivity/CalendarActivity';
import { useEffect, useState } from 'react';

type Activities = {
    date: string;
    time: string;
    title: string;
    desc: string;
};

const Calendar = () => {

    const [date, setDate] = useState<Date>(new Date());
    const [ dayArray, setDayArray ] = useState<number[]>([]);
    const [ layout, setLayout ] = useState<string>('calendar');
    const [dateClicked, setDateClicked] = useState<number>();

    const fullDateClicked = `${date.getFullYear()}` + '-' + `${date.getMonth() + 1}` + '-' + `${dateClicked}`;

    const testActivities = [
        { date: '2023-10-4', time: '14:00', title: 'Sup', desc: 'Ta sig en sup' },
        { date: '2023-10-8', time: '18:00', title: 'Arnold', desc: 'möte Arnold' },
        { date: '2023-10-8', time: '16:00', title: 'Prog', desc: 'programmera' },
        { date: '2023-10-10', time: '14:00', title: 'Kakor', desc: 'baka kakor' },
        { date: '2023-11-5', time: '11:00', title: 'Bullar', desc: 'köpa bullar' }
    ];

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
                            return < CalendarDate key={i} day={day} date={date} changeLayout={changeLayout} testActivities={testActivities}/>
                        })

                    }

                </section>


            </section>

            : layout == 'date' ?

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

                <section className="calendar_activities">

                    {
                        testActivities.map((act: Activities) => {
                            if (act.date == fullDateClicked) {
                                return < CalendarActivity act={act} setLayout={setLayout}/>
                            }
                        })
                    }

                </section>

                <button>New activity</button>


            </section>

            : layout == 'activity' ?

            <section className="calendar_container">

                <section className="calendar_navigator">

                <figure className="left_arrow" onClick={ () => setLayout('calendar') }>
                    <section className="arrow_shaft"></section>
                    <section className="arrow_pointer"></section>
                    <section className="arrow_block"></section>
                </figure>

                <h2>{ dateClicked + ' ' + date.toLocaleString('default', { month: 'long' }).toUpperCase() + ' - ' + date.getFullYear() }</h2>

                </section>

            </section>

            :
            ''
            }
            
        </div>

    )
}

export default Calendar;