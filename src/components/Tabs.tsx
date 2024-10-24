import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { clearCache, fetchLorem } from '../slices/lorem.slice';
import { Spinner } from './Spinner';

const tabs = ['1', '2', '3', '4'];

function Tabs() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  const data = useSelector((state: RootState) => state.lorem.data[selectedTab]);
  const status = useSelector((state: RootState) => state.lorem.status[selectedTab]);
  const error = useSelector((state: RootState) => state.lorem.error[selectedTab]);

  useEffect(() => {
    dispatch(fetchLorem(selectedTab));
  }, [dispatch, selectedTab, data]);

  const clearCacheDataHandler = (e: any) => {
    dispatch(clearCache(selectedTab));
    e.preventDefault();
  }

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <section className="spinner_container">
            <div>
              <Spinner /> Loading...
            </div>
          </section>
        );
      case 'succeeded':
        return <article dangerouslySetInnerHTML={{ __html: data }} />;
      case 'failed':
        return <article>Sorry, we couldn't fetch the data! ${error}</article>;
      default:
        return null;
    }
  };

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
        {data && <button className="clear_cache_btn" onClick={clearCacheDataHandler}>Clear Cache</button>}
        {renderContent()}
      </div>
    </section>
  );
}

export default Tabs;
