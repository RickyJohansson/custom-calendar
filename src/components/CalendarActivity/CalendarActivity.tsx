import './calendarActivity.css';

type Activities = {
    date: string;
    startTime: string;
    endTime: string;
    title: string;
    desc: string;
    id: number;
};

type Props = {

    act: Activities;
    changeLayout: (clickedDate: string, id: number | null) => void;
    setLayout: React.Dispatch<React.SetStateAction<string>>;

};

const CalendarActivity = ({act, changeLayout, setLayout}: Props) => {

    let clickedDate: string;

    act.date.substring(8, 9).includes('0') ? clickedDate = act.date.substring(9, 10) : clickedDate = act.date.substring(8, 10);

    const readMore = () => {
        changeLayout(clickedDate, act.id);
    }

    return(
        <div className="activity_wrapper--border">

            <div className="activity_container">

                <article className="activity_title">
                    <h2> {act.title} </h2>
                    <p> { act.startTime } - { act.endTime } </p>
                </article>

                <section>
                    <button onClick={ readMore }>Details</button>
                    <button onClick={ () => {changeLayout(clickedDate, act.id), setLayout('edit')} }>Edit</button>
                    <button>Delete</button>
                </section>

            </div>

        </div>
    )

}

export default CalendarActivity;