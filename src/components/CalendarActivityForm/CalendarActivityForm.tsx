import { useLayoutEffect, useState } from 'react';
import './CalendarActivityForm.css';

type Activities = {
    date: string;
    startTime: string;
    endTime: string;
    title: string;
    desc: string;
    id: number;
};

type Props = {
    acts: Activities[];
    setActivities: React.Dispatch<React.SetStateAction<Activities[]>>;
    date: string;
    title: string;
    time: string;
    endTime: string;
    desc: string;
    id: number;
    layout: string;
    setLayout: React.Dispatch<React.SetStateAction<string>>;
}

const CalendarActivityForm = ({acts, setActivities, date, title, time, endTime, desc, id, layout, setLayout}: Props) => {

    const [ startHour, setStartHour ] = useState<string>('');
    const [ startMinute, setStartMinute ] = useState<string>('');
    const [ endHour, setEndHour ] = useState<string>('');
    const [ endMinute, setEndMinute ] = useState<string>('');
    const [ activityDesc, setActivityDesc ] = useState<string>('');
    const [ valid, setValid ] = useState<boolean>();
    const [ activityTitle, setActivityTitle ] = useState<string>('');

    let todayString: string;
    date.length < 10 ? todayString = date.substring(0, 8) + '0' + date.charAt(8) : todayString = date;

    useLayoutEffect(() => {

        if (layout == 'edit') {
            setStartHour(time.substring(0, 2));
            setStartMinute(time.substring(3, 5));
            setEndHour(endTime.substring(0, 2));
            setEndMinute(endTime.substring(3, 5));
            setActivityDesc(desc);
            setActivityTitle(title);
        }

    }, []);

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
        const tempArray = acts.map((act: Activities) => {
            if (act.id == id) {
                return {
                    date: todayString,
                    title: activityTitle, 
                    startTime: `${ startHour + ':' + startMinute }`,
                    endTime: `${ endHour + ':' + endMinute }`,
                    desc: activityDesc,
                    id: id
                }
            } else {
                return act;
            }
        });

        tempArray.sort((a: any, b: any) => {
            if (a.CreatedAt <= b.CreatedAt) {
                return b.startTime >= a.startTime ? -1 : 1
            } else {
                return a.startTime < b.startTime ? -1 : 1
            }
        })

        setActivities(tempArray);
        setLayout('date');
    }
    
    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const tempArray = acts;

        tempArray.push({
            date: todayString,
            title: activityTitle, 
            startTime: `${ startHour + ':' + startMinute }`,
            endTime: `${ endHour + ':' + endMinute }`,
            desc: activityDesc,
            id: Math.floor(Math.random() * Math.random() * 120456794006)
        })

        tempArray.sort((a: any, b: any) => {
            if (a.startTime <= b.startTime) {
                return b.startTime >= a.startTime ? -1 : 1
            } else {
                return a.startTime < b.startTime ? -1 : 1
            }
        })

        setActivities(tempArray);
        setLayout('date');
    }

    return(
        <form className="activity_form" onSubmit={ layout == 'edit' ? (e) => handleChange(e) : (e) => handleCreate(e)}>

            <label htmlFor="title">Titel: </label>
            <input type="text" required maxLength={35} name="title" id="title" value={ activityTitle } onChange={ (e) => setActivityTitle(e.target.value) }/>
            <section className="time_container">
                <label className="time_text" htmlFor="times">Tid: </label>
                <section className="start_time">
                    <label htmlFor="startHour">startar</label>
                    <section className="time_flex">
                        <input className="input_time" required minLength={2} maxLength={2} name="startHour" id="startHour" value={startHour} onKeyDown={(e) => validateKey(e)} onChange={(e) => { if (valid) {handleStartHours(e)} } }/>
                        <p className="time_colon"> : </p>
                        <input className="input_time" required minLength={2} maxLength={2} name="startMinute" id="startMinute" value={startMinute} onKeyDown={(e) => validateKey(e)} onChange={(e) => { if (valid) {handleStartMinutes(e)} } }/>
                    </section>
                </section>
                <section className="end_time">
                    <label htmlFor="startHour">slutar</label>
                    <section className="time_flex">
                        <input className="input_time" required minLength={2} maxLength={2} name="endHour" id="endHour" value={endHour} onKeyDown={(e) => validateKey(e)} onChange={(e) => { if (valid) {handleEndHours(e)} } }/>
                        <p className="time_colon"> : </p>
                        <input className="input_time" required minLength={2} maxLength={2} name="endMinute" id="endMinute" value={endMinute} onKeyDown={(e) => validateKey(e)} onChange={(e) => { if (valid) {handleEndMinutes(e)} } }/>
                    </section>
                </section>

            </section>
            <label className="form_desc" htmlFor="desc">Beskrivning:</label>
            <textarea name="desc" id="desc" required maxLength={200} value={activityDesc} onChange={ (e) => setActivityDesc(e.target.value) } ></textarea>
            {
                layout == 'edit' ?
                <input className="form_button" type="submit" value="Spara ändringar" ></input>
                : layout == 'create' ?
                <input className="form_button" type="submit" value="Skapa aktivitet" ></input>
                :
                ''
            }

        </form>
    )

}

export default CalendarActivityForm;
