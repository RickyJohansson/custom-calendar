import './CalendarDate.css';

type Props = {
    day: number;
}

const CalendarDate = ({ day }: Props) => {


    return(

        <div className="calendar_date--container">

            <p>{ day }</p>

        </div>

    )

}

export default CalendarDate;