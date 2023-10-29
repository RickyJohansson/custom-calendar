import { useLayoutEffect, useState } from 'react';
import './CalendarActivityForm.css';

type Props = {
    date: string | undefined;
    title: string;
    time: string;
    endTime: string;
    desc: string;
    id: number;
    layout: string;
}

const CalendarActivityForm = ({date, title, time, endTime, desc, id, layout}: Props) => {

    const [ startHour, setStartHour ] = useState<string>('');
    const [ startMinute, setStartMinute ] = useState<string>('');
    const [ endHour, setEndHour ] = useState<string>('');
    const [ endMinute, setEndMinute ] = useState<string>('');
    const [ activityDesc, setActivityDesc ] = useState<string>('');
    const [ valid, setValid ] = useState<boolean>();
    const [ activityTitle, setActivityTitle ] = useState<string>('');

    useLayoutEffect(() => {

        if (layout == 'edit') {
            setStartHour(time.substring(0, 2));
            setStartMinute(time.substring(3, 5));
            setEndHour(endTime.substring(0, 2));
            setEndMinute(endTime.substring(3, 5));
            setActivityDesc(desc);
            setActivityTitle(title);
        }

    }, [])

    const handleStartHours = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartHour(e.target.value);
    }

    const handleStartMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartMinute(e.target.value);
    }

    const handleEndHours = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndHour(e.target.value);
    }

    const handleEndMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndMinute(e.target.value);
    }

    const validateKey = (e: any) => {
        if ( (e.keyCode >= 48 && e.keyCode < 58) || e.keyCode == 8) {
            setValid(true);
        } else {
            setValid(false);
        }
    }

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('attempting to edit');
        console.log('expected edit: ', {
            date: date,
            title: activityTitle, 
            startTime: `${ startHour + ':' + startMinute }`,
            endTime: `${ endHour + ':' + endMinute }`,
            desc: activityDesc,
            id: id
        })
    }
    
    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('attempting to create');
        console.log('expected creation: ', {
            date: date,
            title: activityTitle, 
            startTime: `${ startHour + ':' + startMinute }`,
            endTime: `${ endHour + ':' + endMinute }`,
            desc: activityDesc,
            id: Math.floor(Math.random() * Math.random() * 120456794006)
        })
    }

    return(
        <form className="activity_form" onSubmit={ layout == 'edit' ? (e) => handleChange(e) : (e) => handleCreate(e)}>

            <label htmlFor="title">Titel: </label>
            <input type="text" required maxLength={35} name="title" id="title" value={ activityTitle } onChange={ (e) => setActivityTitle(e.target.value) }/>
            <section className="time_container">
                <label htmlFor="times">Tid: </label>
                <label htmlFor="startHour">startar</label>
                <input className="input_time" required maxLength={2} name="startHour" id="startHour" value={startHour} onKeyDown={(e) => validateKey(e)} onChange={(e) => { if (valid) {handleStartHours(e)} } }/>
                <p> : </p>
                <input className="input_time" required maxLength={2} name="startMinute" id="startMinute" value={startMinute} onKeyDown={(e) => validateKey(e)} onChange={(e) => { if (valid) {handleStartMinutes(e)} } }/>

                <label htmlFor="startHour">slutar</label>
                <input className="input_time" required maxLength={2} name="endHour" id="endHour" value={endHour} onKeyDown={(e) => validateKey(e)} onChange={(e) => { if (valid) {handleEndHours(e)} } }/>
                <p> : </p>
                <input className="input_time" required maxLength={2} name="endMinute" id="endMinute" value={endMinute} onKeyDown={(e) => validateKey(e)} onChange={(e) => { if (valid) {handleEndMinutes(e)} } }/>

            </section>
            <label htmlFor="desc">Beskrivning:</label>
            <textarea name="desc" id="desc" required maxLength={200} value={activityDesc} onChange={ (e) => setActivityDesc(e.target.value) } ></textarea>
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
