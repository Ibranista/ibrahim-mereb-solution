import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchLorem } from '../slices/lorem.slice';

const tabs = ['1/short', '2/short', '3/short', '4/short'];

function Tabs() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  const data = useSelector((state: RootState) => state.lorem.data[selectedTab]);
  const status = useSelector((state: RootState) => state.lorem.status[selectedTab]);
  const error = useSelector((state: RootState) => state.lorem.error[selectedTab]);

  useEffect(() => {
    dispatch(fetchLorem(selectedTab));
  }, [dispatch, selectedTab]);

  return (
    <section className="content_container">
      <div className="tab_container">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`tabs ${selectedTab === tab ? 'active_tab' : 'tab_item'}`}
          >
            Tab {tab.split('/')[0]}
          </button>
        ))}
      </div>
      <div className="content">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && <p dangerouslySetInnerHTML={{ __html: data }} />}
        {status === 'failed' && <p>Error: {error}</p>}
      </div>
    </section>
  );
}

export default Tabs;
