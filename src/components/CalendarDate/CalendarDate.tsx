import { useEffect, useState } from 'react';
import './CalendarDate.css';

type Activities = {
    date: string;
    time: string;
    title: string;
    desc: string;
    id: number;
};

type Props = {
    day: string;
    date: Date;
    changeLayout: (clickedDate: string, id: number | null) => void;
    testActivities: Activities[];
}

const CalendarDate = ({ day, date, changeLayout, testActivities }: Props) => {

    const [ activities, setActivities ] = useState<boolean>(false);
    const [ id, setId ] = useState<number | null>(null);
    const today = new Date();
    let displayDay: string;


    day.substring(0, 1).includes('0') ? displayDay = day.substring(1, 2) : displayDay = day.substring(0, 2);

    useEffect(() => {

        const calendarDate: string = `${ date.getFullYear() }` + '-' + `${ date.getMonth() + 1 }` + '-' +`${ day }`;
        let found: boolean = false;

        testActivities.forEach((obj: Activities) => {
            if (obj.date == calendarDate) {
                found = true;
                setId(obj.id);
            }
        });

        if (found) {
            setActivities(true);
        } else {
            setActivities(false);
        }

    }, [date]);


    return(
        <>
        {
            activities ?

            <div className="calendar_date--activity" onClick={ () => changeLayout(displayDay, id) }>

                <p>{ displayDay }</p>

            </div>

            : today.getDate().toString() == day && date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() ?

            <div className="calendar_date--today" onClick={ () => changeLayout(displayDay, id) }>

                <p>{ displayDay }</p>

            </div>

            :

            <div className="calendar_date--container" onClick={ () => changeLayout(displayDay, id) }>

                <p>{ displayDay }</p>

            </div>

        }
        </>

    )

}

export default CalendarDate;