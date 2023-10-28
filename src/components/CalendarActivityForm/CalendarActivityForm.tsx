import { useLayoutEffect, useState } from 'react';
import './CalendarActivityForm.css';

type Props = {
    title: string;
    time: string;
    desc: string;
    layout: string;
}

const CalendarActivityForm = ({title, time, desc, layout}: Props) => {

    const [ hourOptions, setHourOptions ] = useState<string[]>([]);
    const [minuteOptions, setMinuteOptions] = useState<string[]>([]);
    const [ hour, setHour ] = useState<string>('');
    const [ minute, setMinute ] = useState<string>('');

    useLayoutEffect(() => {
        const hourArray: string[] = [];
        for(let i = 0; i < 24; i++) {
            if ( i < 10 ) {
                hourArray.push('0' + `${i}`)
            } else { 
                hourArray.push(`${i}`) 
            }
        }
        setHourOptions(hourArray);

        const minuteArray: string[] = [];
        for(let i = 0; i < 12; i++) {
            if ( i < 2 ) {
                minuteArray.push('0' + `${i * 5}`)
            } else { 
                minuteArray.push(`${i * 5}`) 
            }
        }
        setMinuteOptions(minuteArray);

        if (layout == 'edit') {
            setHour(time.substring(0, 2));
            setMinute(time.substring(3, 5));
        }

    }, [])

    const handleHours = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHour(e.target.value);
    }

    const handleMinutes = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMinute(e.target.value);
    }

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('attempting to edit');
    }
    
    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('attempting to create');
    }

    return(
        <form className="activity_form" onSubmit={ layout == 'edit' ? (e) => handleChange(e) : (e) => handleCreate(e)}>

            <label htmlFor="title">Titel: </label>
            <input type="text" name="title" id="title" value={ title } />
            <label htmlFor="times">Tid: </label>
            <select name="hours" id="hours" value={hour} onChange={ (e) => handleHours(e) }>
                {
                    hourOptions.map((hour) => {
                        return <option value={ hour }>{ hour }</option>
                    })
                }
            </select>
            <p> : </p>
            <select name="minutes" id="minutes" value={minute} onChange={ (e) => handleMinutes(e) }>
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
                <input type="submit" value="spara ändringar" ></input>
                : layout == 'create' ?
                <input type="submit" value="skapa aktivitet" ></input>
                :
                ''
            }

        </form>
    )

}

export default CalendarActivityForm;
