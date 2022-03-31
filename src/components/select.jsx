import { setCity } from 'features/city/citySlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cities } from 'helpers';

function Select() {
    const dispatch = useDispatch();
    const { city } = useSelector(state => state.city);
    return (
        <div className='w-full sm:w-1/2'>
            <select
                name="city"
                id="city"
                className='w-full outline-none px-8 py-2 rounded shadow-2xl'
                onChange={e => dispatch(setCity(e.target.value))}
                defaultValue={city}
            >
                <option value="İstanbul">İstanbul</option>
                <option value="Ankara">Ankara</option>
                <option value="İzmir">İzmir</option>
                {
                    cities.map(city => {
                        if (city.name !== 'İstanbul' && city.name !== 'Ankara' && city.name !== 'İzmir') {
                            return <option value={city.name} key={city.id}>{city.name}</option>
                        }
                        return null;
                    })
                }
            </select>
        </div>

    );
}

export default Select;