import React from 'react';
import moment from 'moment';
import 'moment/locale/tr';
import { useSelector } from 'react-redux';
import DateTime from './dateTime';
import SalatTimes from './salatTimes';
import CustomCountdown from './countdown';
import { convertTime } from 'helpers/utils';

function HeroSection({ data }) {
    const { isLoading, city } = useSelector(state => state.city);
    const [currentDay, setCurrentDay] = React.useState(moment().format('L'))
    const [nextDay, setNextDay] = React.useState(moment().add(1, "day").format('L'))
    const [isDayLoading, setIsDayLoading] = React.useState(true)
    const [timeStatus, setTimeStatus] = React.useState(true)
    const [iftarTime, setIftarTime] = React.useState(moment(new Date(), 'yyyy-M-D').format('HH:mm'))
    const [sahurTime, setSahurTime] = React.useState(moment(new Date(), 'yyyy-M-D').format('HH:mm'))

    React.useEffect(() => {
        data.find(day => {
            if (moment(day.date_for).format('L') === moment().format('L')) {
                setCurrentDay(day)
            }

            if (moment(day.date_for).format('L') === moment().add(1, "day").format('L')) {
                setNextDay(day)
            }

            setIsDayLoading(false)
            return null;
        })
    }, [city, data])

    React.useEffect(() => {
        if (currentDay?.date_for && nextDay?.date_for) {

            const currentSahurTime = new Date(moment(currentDay.date_for, 'yyyy-M-D').format('YYYY-MM-DD') + "T" + convertTime(currentDay.fajr))
            const currentIftarTime = new Date(moment(currentDay.date_for, 'yyyy-M-D').format('YYYY-MM-DD') + "T" + convertTime(currentDay.maghrib))

            if (currentSahurTime.getTime() < currentIftarTime.getTime() && currentIftarTime.getTime() < new Date().getTime()) {
                setSahurTime(currentSahurTime)
            } else {
                const nextSahurTime = new Date(moment(nextDay.date_for, 'yyyy-M-D').format('YYYY-MM-DD') + "T" + convertTime(nextDay.fajr))

                if (nextSahurTime > currentIftarTime) {
                    setSahurTime(nextSahurTime)
                }
            }

            setIftarTime(currentIftarTime)
        }

    }, [currentDay, nextDay, timeStatus])

    if (isDayLoading) {
        return <div>Laoding...</div>
    }

    return (
        <div className='h-screen flex flex-col md:items-center md:justify-center py-5 text-white w-full'>
            <div
                className={`bg-secondary shadow-2xl p-6 md:p-12 rounded-lg space-y-4 transition-all duration-300 cursor-pointer flex flex-col ${isLoading ? "animate-pulse" : "hover:scale-105"}`}
            >

                <DateTime city={city} day={currentDay} isLoading={isLoading} />
                <CustomCountdown
                    isLoading={isLoading}
                    timeStatus={timeStatus}
                    setTimeStatus={setTimeStatus}
                    iftarTime={iftarTime}
                    sahurTime={sahurTime}
                />
                <SalatTimes isLoading={isLoading} day={currentDay} />

            </div>
        </div >
    );
}

export default HeroSection;