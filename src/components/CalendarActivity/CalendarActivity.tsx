import './calendarActivity.css';

type Activities = {
    date: string;
    time: string;
    title: string;
    desc: string;
};

type Props = {

    act: Activities;
    setLayout: React.Dispatch<React.SetStateAction<string>>; 

};

const CalendarActivity = ({act, setLayout}: Props) => {

    return(
        <div className="activity_wrapper--border">

            <div className="activity_container">

                <p> { act.time } </p>
                <h2> {act.title} </h2>
                <button onClick={ () => setLayout('activity') }>read more</button>
                <button>EDIT</button>
                <button>DELETE</button>

            </div>

        </div>
    )

}

export default CalendarActivity;