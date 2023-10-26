import './CalendarNavigator';

type Props = {
    previousMonth: () => void;
    nextMonth: () => void;
    date: Date;
    layout: string;
    setLayout: React.Dispatch<React.SetStateAction<string>>;
}

const CalendarNavigator = ({ previousMonth, nextMonth, date, layout, setLayout }: Props) => {

    const handleLeftArrow = () => {
        layout == 'calendar' ? previousMonth() : layout == 'date' ? setLayout('calendar') : layout == 'activity' ? setLayout('date') : setLayout('calendar');
    }

    const handleRightArrow = () => {
        if (layout == 'calendar') {
            nextMonth();
        }
    }

    return(

        <section className="calendar_navigator">

            <figure className="left_arrow" onClick={ handleLeftArrow }>
                <section className="arrow_shaft"></section>
                <section className="arrow_pointer"></section>
                <section className="arrow_block"></section>
            </figure>

            <h2>{ date.toLocaleString('default', { month: 'long' }).toUpperCase() + ' - ' + date.getFullYear() }</h2>

            {
                layout == 'calendar'?

                <figure className="right_arrow" onClick={ handleRightArrow }>
                    <section className="arrow_shaft"></section>
                    <section className="arrow_pointer"></section>
                    <section className="arrow_block"></section>
                </figure>
                :
                ''
            }


        </section>
    )

}

export default CalendarNavigator;