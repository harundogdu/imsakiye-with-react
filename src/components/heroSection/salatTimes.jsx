import { times } from 'helpers';
import { convertTime } from 'helpers/utils';

const SalatTimes = ({ isLoading, day }) => {
    return (
        <div className='flex flex-wrap justify-around'>
            {
                times.map(time => (
                    <div className='flex flex-col items-center justify-center p-4 px-6' key={time.id}>
                        <div className='text-2xl font-bold'>{time.time}</div>
                        <div className='text-xl'>
                            {
                                isLoading ? "..." : convertTime(day[time.time_converted])
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default SalatTimes