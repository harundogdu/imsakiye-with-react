import React from 'react';
import moment from 'moment';
import 'moment/locale/tr';
import { times } from 'helpers';
import { convertTime } from 'helpers/utils';
import { useSelector } from 'react-redux';

function HeroSection({ data }) {

    const { isLoading, city } = useSelector(state => state.city);
    return (
        <div className='h-screen flex flex-col items-center justify-center text-white w-full'>
            <div
                className={`bg-secondary shadow-2xl p-6 md:p-12 rounded-lg space-y-4 transition-all duration-300 cursor-pointer ${isLoading ? "animate-pulse" : "hover:scale-105"}`}
            >

                <div>
                    <h1 className='text-4xl font-bold text-center'>{city}</h1>
                </div>


                <div className=' flex items-center justify-center gap-x-4'>
                    <div className='text-4xl font-bold'>Tarih</div>
                    <div className='text-4xl'>
                        {
                            isLoading ? "..." : moment(data.items[0].date_for).format('L')
                        }
                    </div>
                </div>

                <div className='flex flex-wrap items-center justify-center'>
                    {
                        times.map(time => (
                            <div className='flex flex-col items-center justify-center p-4 px-6'>
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