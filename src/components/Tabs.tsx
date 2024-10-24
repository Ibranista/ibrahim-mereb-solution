import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchLorem } from '../slices/lorem.slice';

function Tabs() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTab, setSelectedTab] = useState<string>('1/short');

  const data = useSelector((state: RootState) => state.lorem.data[selectedTab]);
  const status = useSelector((state: RootState) => state.lorem.status[selectedTab]);
  const error = useSelector((state: RootState) => state.lorem.error[selectedTab]);

  useEffect(() => {
    dispatch(fetchLorem(selectedTab));
  }, [dispatch, selectedTab]);

  return (
    <>
      <div>
        <button onClick={() => setSelectedTab('1/short')}>Tab 1 (1/short)</button>
        <button onClick={() => setSelectedTab('2/short')}>Tab 2 (2/short)</button>
        <button onClick={() => setSelectedTab('3/short')}>Tab 3 (3/short)</button>
      </div>
    </>
  );
}

export default Tabs;