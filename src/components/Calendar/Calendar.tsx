import './calendar.css';
import CalendarDate from '../CalendarDate/CalendarDate';
import CalendarActivity from '../CalendarActivity/CalendarActivity';
import CalendarNavigator from '../CalendarNavigator/CalendarNavigator';
import { useEffect, useState } from 'react';
import CalendarActivityForm from '../CalendarActivityForm/CalendarActivityForm';

type Activities = {
    date: string;
    startTime: string;
    endTime: string;
    title: string;
    desc: string;
    id: number;
};

const Calendar = () => {

    const testActivities = [
        { date: '2023-10-04', startTime: '14:00', endTime: '15:20', title: 'Sup', desc: 'Ta sig en sup', id: 1 },
        { date: '2023-10-08', startTime: '18:00', endTime: '19:10', title: 'Arnold', desc: 'möte Arnold', id: 2 },
        { date: '2023-10-08', startTime: '16:00', endTime: '18:00', title: 'Prog', desc: 'programmera', id: 3 },
        { date: '2023-10-10', startTime: '14:00', endTime: '19:45', title: 'Kakor', desc: 'baka kakor', id: 4 },
        { date: '2023-11-05', startTime: '11:00', endTime: '13:30', title: 'Bullar', desc: 'köpa bullar', id: 5 },
        { date: '2023-11-08', startTime: '08:05', endTime: '16:25', title: 'Skola', desc: 'redo för skolan', id: 6 }
    ];

    const [date, setDate] = useState<Date>(new Date());
    const [ dayArray, setDayArray ] = useState<string[]>([]);
    const [ layout, setLayout ] = useState<string>('calendar');
    const [dateClicked, setDateClicked] = useState<string>();
    const [ currentId, setCurrentId ] = useState<number | null>();
    const [activities, setActivities] = useState<Activities[]>(testActivities);

    const fullDateClicked = `${date.getFullYear()}` + '-' + `${date.getMonth() + 1}` + '-' + `${dateClicked}`;


    useEffect(() => {

        const daysArray: string[] = [];

        for(let i = 0; i < new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); i++ ) {
            i+1 >= 10 ? daysArray.push(`${i+1}`) : daysArray.push(`0${i+1}`);
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

    const changeLayout = (clickedDate: string, id: number | null) => {

        setDateClicked(clickedDate);
        setCurrentId(id);
        layout == 'calendar' ? setLayout('date') : setLayout('activity');

    }

    return(

        <div className="calendar_border">

            {

            layout == 'calendar' ?

            <section className="calendar_container">

                < CalendarNavigator previousMonth={previousMonth} nextMonth={nextMonth} date={date} layout={layout} 
                setLayout={setLayout} dateClicked={dateClicked}/>

                <section className="dates">

                    {

                        dayArray.map((day, i) => {
                            return < CalendarDate key={i} day={day} date={date} changeLayout={changeLayout} testActivities={activities}/>
                        })

                    }

                </section>


            </section>

            : layout == 'date' ?

            <section className="calendar_container">

                < CalendarNavigator previousMonth={previousMonth} nextMonth={nextMonth} date={date} layout={layout} 
                setLayout={setLayout} dateClicked={dateClicked}/>

                <section className="calendar_activities">

                    {
                        activities.map((act: Activities, i) => {
                            if (act.date == fullDateClicked || act.date.substring(0,8) + act.date.substring(9, 10) == fullDateClicked) {
                                return < CalendarActivity key={i} act={act} activities={activities} setActivities={setActivities} changeLayout={changeLayout} setLayout={setLayout}/>
                            }
                        })
                    }

                </section>

                <button className="new_button" onClick={ () => setLayout('create') }>New activity</button>


            </section>

            : layout == 'activity' ?

            <section className="calendar_container">

                < CalendarNavigator previousMonth={previousMonth} nextMonth={nextMonth} date={date} layout={layout} 
                setLayout={setLayout} dateClicked={dateClicked}/>

                <section className="activity_info--container">

                    {
                        activities.map((act: Activities) => {
                            if ( currentId === act.id ) {
                                return (
                                    <section key={act.id} className="activity_info">

                                        <h2> { act.title }</h2>
                                        <p>{`${act.startTime}` + ' - ' + `${ act.endTime }`}</p>
                                        <p className="activity_desc">Beskrivning:</p>
                                        <article>
                                            <p>{ act.desc }</p>
                                        </article>

                                    </section>
                                )
                            }
                        })
                    }

                </section>

            </section>

            : layout == 'edit' ?
            <section className="calendar_container">

                < CalendarNavigator previousMonth={previousMonth} nextMonth={nextMonth} date={date} layout={layout} 
                setLayout={setLayout} dateClicked={dateClicked}/>

                <section className="activity_info--container">
                    {
                        activities.map((act: Activities) => {
                            if ( currentId === act.id ) {
                                return < CalendarActivityForm key={act.id} acts={activities} setActivities={setActivities} date={act.date} title={act.title} time={act.startTime} endTime={act.endTime} desc={act.desc} id={act.id} layout={layout} setLayout={setLayout}/>
                            }
                        })
                    }
                </section>

            </section>

            : layout == 'create' ?
            <section className="calendar_container">

                < CalendarNavigator previousMonth={previousMonth} nextMonth={nextMonth} date={date} layout={layout} 
                setLayout={setLayout} dateClicked={dateClicked}/>

                <section className="activity_info--container">

                    < CalendarActivityForm acts={activities} setActivities={setActivities} date={fullDateClicked} title={''} time={''} endTime={''} desc={''} id={0} layout={layout} setLayout={setLayout}/>

                </section>

            </section>
            :
            ''
            }
            
        </div>

    )
}

export default Calendar;