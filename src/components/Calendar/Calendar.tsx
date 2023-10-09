import './calendar.css';
import CalendarDate from '../CalendarDate/CalendarDate';
import { useEffect, useState } from 'react';

const Calendar = () => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const daysThisMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

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

            <div className="calendar_container">

                {

                    dayArray.map((day) => {
                        return < CalendarDate day={day}/>
                    })

                }

            </div>
            
        </div>

    )
}

export default Calendar;