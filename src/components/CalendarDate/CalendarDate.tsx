import { useEffect, useState } from 'react';
import './CalendarDate.css';

type Activities = {
    date: string;
    time: string;
    title: string;
    desc: string;
};

type Props = {
    day: number;
    date: Date;
    changeLayout: (clickedDate: number) => void;
    testActivities: Activities[];
}

const CalendarDate = ({ day, date, changeLayout, testActivities }: Props) => {

    const [ activities, setActivities ] = useState<boolean>(false);
    const today = new Date();

    useEffect(() => {

        const calendarDate: string = `${ date.getFullYear() }` + '-' + `${ date.getMonth() + 1 }` + '-' +`${ day }`;
        let found: boolean = false;

        testActivities.forEach((obj: Activities) => {
            if (obj.date == calendarDate) {
                found = true;
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

            <div className="calendar_date--activity" onClick={ () => changeLayout(day) }>

                <p>{ day }</p>

            </div>

            : today.getDate() == day && date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() ?

            <div className="calendar_date--today" onClick={ () => changeLayout(day) }>

                <p>{ day }</p>

            </div>

            :

            <div className="calendar_date--container" onClick={ () => changeLayout(day) }>

                <p>{ day }</p>

            </div>

        }
        </>

    )

}

export default CalendarDate;