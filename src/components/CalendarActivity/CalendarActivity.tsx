import './calendarActivity.css';

type Activities = {
    date: string;
    time: string;
    title: string;
    desc: string;
    id: number;
};

type Props = {

    act: Activities;
    changeLayout: (clickedDate: string, id: number | null) => void;

};

const CalendarActivity = ({act, changeLayout}: Props) => {

    let clickedDate: string;

    act.date.substring(8, 9).includes('0') ? clickedDate = act.date.substring(9, 10) : clickedDate = act.date.substring(8, 10);

    const readMore = () => {
        changeLayout(clickedDate, act.id);
    }

    return(
        <div className="activity_wrapper--border">

            <div className="activity_container">

                <p> { act.time } </p>
                <h2> {act.title} </h2>
                <button onClick={ readMore }>read more</button>
                <button>EDIT</button>
                <button>DELETE</button>

            </div>

        </div>
    )

}

export default CalendarActivity;