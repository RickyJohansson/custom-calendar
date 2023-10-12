import './CalendarDate.css';

type Props = {
    day: number;
    date: Date;
    changeLayout: (clickedDate: number) => void;
}

const CalendarDate = ({ day, date, changeLayout }: Props) => {

    const today = new Date();

    return(
        <>
        {
            today.getDate() == day && date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() ?

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