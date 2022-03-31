import React from 'react';
import { Calendar, HeroSection, Select } from 'components';
import Loading from 'components/loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityByCityName } from 'features/city/citySlice';

function App() {
  const { data, city } = useSelector(state => state.city);
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchCityByCityName(city))
  }, [city, dispatch])

  if (data.length === 0 || data === undefined || data === null) {
    return <Loading />
  }

  return (
    <div className='flex flex-col min-h-screen h-full w-full items-center justify-center bg-primary p-4'>
      <Select />
      <HeroSection data={data} />
      <Calendar data={data} />
    </div>
  );
}

export default App;
