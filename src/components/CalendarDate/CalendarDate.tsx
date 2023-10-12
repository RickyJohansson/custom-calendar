import './CalendarDate.css';

type Props = {
    day: number;
    date: Date;
}

const CalendarDate = ({ day, date }: Props) => {

    const today = new Date();

    return(
        <>
        {
            today.getDate() == day && date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() ?

            <div className="calendar_date--today">

                <p>{ day }</p>

            </div>

            :

            <div className="calendar_date--container">

                <p>{ day }</p>

            </div>

        }
        </>

    )

}

export default CalendarDate;