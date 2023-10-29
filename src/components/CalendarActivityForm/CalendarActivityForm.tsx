import { useLayoutEffect, useState } from 'react';
import './CalendarActivityForm.css';

type Props = {
    title: string;
    time: string;
    desc: string;
    layout: string;
}

const CalendarActivityForm = ({title, time, desc, layout}: Props) => {

    const [ hour, setHour ] = useState<string>('');
    const [ minute, setMinute ] = useState<string>('');
    const [ valid, setValid ] = useState<boolean>();

    useLayoutEffect(() => {

        if (layout == 'edit') {
            setHour(time.substring(0, 2));
            setMinute(time.substring(3, 5));
        }

    }, [])

    const handleHours = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHour(e.target.value);
    }

    const handleMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinute(e.target.value);
    }

    const validateKey = (e: any) => {
        if ( (e.keyCode >= 48 && e.keyCode < 57) || e.keyCode == 8) {
            setValid(true);
        } else {
            setValid(false);
        }
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
            <section className="time_container">
                <label htmlFor="times">Tid: </label>
                <input className="input_time" maxLength={2} name="hour" id="hour" value={hour} onKeyDown={(e) => validateKey(e)} onChange={(e) => { if (valid) {handleHours(e)} } }/>
                <p> : </p>
                <input className="input_time" maxLength={2} name="minute" id="minute" value={minute} onKeyDown={(e) => validateKey(e)} onChange={(e) => { if (valid) {handleMinutes(e)} } }/>
            </section>
            <label htmlFor="desc">Beskrivning:</label>
            <textarea name="desc" id="desc" maxLength={200} >{ desc }</textarea>
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
