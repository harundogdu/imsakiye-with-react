import React from 'react';
import moment from 'moment';
import 'moment/locale/tr';
import { times } from 'helpers';
import { convertTime } from 'helpers/utils';
import { useSelector } from 'react-redux';
import Countdown from 'react-countdown';

function HeroSection({ data }) {
    const { isLoading, city } = useSelector(state => state.city);
    const iftar = convertTime((data.items[0]['maghrib']));
    return (
        <div className='h-screen flex flex-col items-center justify-center text-white w-full'>
            <div
                className={`bg-secondary shadow-2xl p-6 md:p-12 rounded-lg space-y-4 transition-all duration-300 cursor-pointer flex flex-col ${isLoading ? "animate-pulse" : "hover:scale-105"}`}
            >

                <div className=' flex flex-col space-y-4'>
                    <h1 className='text-4xl font-bold text-center'>{city}</h1>
                    <div className=' flex items-center justify-center gap-x-4'>
                        <div className='text-3xl font-bold'>Tarih</div>
                        <div className='text-3xl'>
                            {
                                isLoading ? "..." : moment(data.items[0].date_for).format('L')
                            }
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center text-3xl'>
                    <span className={`mr-2`}>İftara Kalan Süre</span>
                    <div>
                        {
                            isLoading
                                ? "..."
                                : <Countdown date={data.items[0].date_for + " " + iftar} />
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
                                        isLoading ? "..." : convertTime(data.items[0][time.time_converted])
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    );
}

export default HeroSection;