import { useEffect } from 'react';
import './CalendarActivityForm.css';

type Props = {
    title: string;
    time: string;
    desc: string;
    layout: string;
}

const CalendarActivityForm = ({title, time, desc, layout}: Props) => {

    let hourOptions: string[] = [];
    let minuteOptions: string[] = [];

    useEffect(() => {
        const hourArray: string[] = [];
        for(let i = 0; i < 24; i++) {
            if ( i < 10 ) {
                hourArray.push('0' + `${i}`)
            } else { 
                hourArray.push(`${i}`) 
            }
        }
        hourOptions = hourArray;

        const minuteArray: string[] = [];
        for(let i = 0; i < 12; i++) {
            if ( i < 2 ) {
                minuteArray.push('0' + `${i}`)
            } else { 
                minuteArray.push(`${i * 5}`) 
            }
        }
        minuteOptions = minuteArray;
    }, [])

    return(
        <form action="">

            <label htmlFor="title">Titel: </label>
            <input type="text" name="title" value={ title } />
            <label htmlFor="times">Tid: </label>
            <select name="hours" id="hours" value={ time }>
                {
                    hourOptions.map((hour) => {
                        return <option value={ hour }>{ hour }</option>
                    })
                }
            </select>
            <p> : </p>
            <select name="minutes" id="minutes">
                {
                    minuteOptions.map((minute) => {
                        return <option value={ minute }>{ minute }</option>
                    })
                }
            </select>
            <label htmlFor="desc">Beskrivning:</label>
            <textarea name="desc" id="desc" >{ desc }</textarea>
            {
                layout == 'edit' ?
                <button>Spara ändringar</button>
                : layout == 'create' ?
                <button>Skapa aktivitet</button>
                :
                ''
            }

        </form>
    )

}

export default CalendarActivityForm;
