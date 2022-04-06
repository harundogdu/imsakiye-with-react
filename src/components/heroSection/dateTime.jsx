import React from 'react';
import moment from 'moment';

function DateTime({ isLoading, city , day}) {
    // safari detect
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    return (
        <div className=' flex flex-col space-y-2'>
            <h1 className='text-4xl font-bold text-center'>{city}</h1>
            <div className=' flex items-center justify-center gap-x-4 flex-col md:flex-row'>
                <div className='text-3xl font-bold'>Tarih</div>
                <div className='text-3xl'>
                    {
                        isLoading ? "..."
                            : isSafari
                                ? moment(day.date_for, 'yyyy-M-D').format("Do MMMM dddd")
                                : moment(day.date_for).format('Do MMMM dddd')
                    }
                </div>
            </div>
        </div>
    );
}

export default DateTime;