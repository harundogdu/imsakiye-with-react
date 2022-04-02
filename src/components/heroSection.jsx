import React from 'react';
import moment from 'moment';
import 'moment/locale/tr';
import { times } from 'helpers';
import { convertTime } from 'helpers/utils';
import { useSelector } from 'react-redux';
import Countdown from 'react-countdown';

function HeroSection({ data }) {
    const [activeDay, setActiveDay] = React.useState(data.items[0]);
    const [nextDay, setNextDay] = React.useState(data.items[1])
    const [status, setStatus] = React.useState(false);
    const { isLoading, city } = useSelector(state => state.city);

    // safari detect
    //const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    React.useEffect(() => {
        
        data.items.map(item => {
            if (item.date_for === moment().format('YYYY-M-D')) {
                setActiveDay(item);
            }
            if (item.date_for === moment().add(1, 'days').format('YYYY-M-D')) {
                setNextDay(item);
            }

            return null;
        })

    }, [city, data.items])

    return (
        <div className='h-screen flex flex-col md:items-center md:justify-center py-5 text-white w-full'>
            <div
                className={`bg-secondary shadow-2xl p-6 md:p-12 rounded-lg space-y-4 transition-all duration-300 cursor-pointer flex flex-col ${isLoading ? "animate-pulse" : "hover:scale-105"}`}
            >

                <div className=' flex flex-col space-y-2'>
                    <h1 className='text-4xl font-bold text-center'>{city}</h1>
                    <div className=' flex items-center justify-center gap-x-4 flex-col md:flex-row'>
                        <div className='text-3xl font-bold'>Tarih</div>
                        <div className='text-3xl'>
                            {
                                isLoading ? "..."
                                    : moment(activeDay.date_for).format('LL')
                            }
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center text-3xl'>
                    <span className={`mr-2`}>
                        {
                            status
                                ? "Sahur için Kalan Süre"
                                : "İftara Kalan Süre"
                        }
                    </span>
                    <div>
                        {
                            isLoading
                                ? "..."
                                : <Countdown
                                    date={
                                        status
                                            ? new Date(moment(nextDay.date_for).format('YYYY-MM-DD') + "T" + convertTime(nextDay.fajr) + "Z").toISOString()
                                            : new Date(moment(activeDay.date_for).format('YYYY-MM-DD') + "T" + convertTime(activeDay.maghrib) + "Z").toISOString()
                                    }
                                    daysInHours
                                    overtime
                                    onComplete={() => setStatus(!status)} />
                        }
                    </div>
                </div>

                <div className='flex flex-wrap justify-around'>
                    {
                        times.map(time => (
                            <div className='flex flex-col items-center justify-center p-4 px-6' key={time.id}>
                                <div className='text-2xl font-bold'>{time.time}</div>
                                <div className='text-xl'>
                                    {
                                        isLoading ? "..." : convertTime(activeDay[time.time_converted])
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    );
}

export default HeroSection;