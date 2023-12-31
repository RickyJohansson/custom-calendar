import { useLayoutEffect, useState } from 'react';
import './CalendarNavigator.css';

type Props = {
    previousMonth: () => void;
    nextMonth: () => void;
    date: Date;
    layout: string;
    setLayout: React.Dispatch<React.SetStateAction<string>>;
    dateClicked: string | undefined;
}

const CalendarNavigator = ({ previousMonth, nextMonth, date, layout, setLayout, dateClicked }: Props) => {

    const [ dateString, setDateString ] = useState<string>();
    const [ navClass, setNavClass ] = useState<string>();

    useLayoutEffect(() => {
        layout !== 'calendar' ? setNavClass('center') : setNavClass('');
    }, [layout]);

    useLayoutEffect(() => {
        layout == 'calendar' ? setDateString(date.toLocaleString('default', { month: 'long' }).toUpperCase() + ' - ' + date.getFullYear())
        : setDateString(dateClicked + ' - ' + date.toLocaleString('default', { month: 'long' }).toUpperCase() + ' - ' + date.getFullYear());
    }, [date, layout]);

    const handleLeftArrow = () => {
        layout == 'calendar' ? previousMonth() : layout == 'date' ? setLayout('calendar') : layout == 'activity' || 'edit' ? setLayout('date') : setLayout('calendar');
    }

    const handleRightArrow = () => {
        if (layout == 'calendar') {
            nextMonth();
        }
    }

    return(

        <section className={`calendar_navigator ${navClass}`}>

            <figure className="left_arrow" onClick={ handleLeftArrow }>
                <section className="arrow_shaft"></section>
                <section className="arrow_pointer"></section>
                <section className="arrow_block"></section>
            </figure>

            <h2 className={`${navClass}`}>{ dateString }</h2>

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