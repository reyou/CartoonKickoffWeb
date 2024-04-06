import React, { useState } from 'react';

interface TabContent {
  [key: string]: JSX.Element;
}

interface VerticalTabsProps {
  tabContent: TabContent;
}

export default function VerticalTabs({ tabContent }: VerticalTabsProps) {
  const [activeTab, setActiveTab] = useState(Object.keys(tabContent)[0]);
  const tabTitles = Object.keys(tabContent);

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-3'>
          {/* Vertical nav tabs */}
          <div
            className='nav flex-column nav-pills'
            id='v-pills-tab'
            role='tablist'
            aria-orientation='vertical'
          >
            {tabTitles.map((title) => (
              <button
                key={title}
                className={`nav-link ${activeTab === title ? 'active' : ''}`}
                onClick={() => setActiveTab(title)}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
        <div className='col-9'>
          {/* Tab content */}
          <div className='tab-content'>
            {tabTitles.map((title) => (
              <div
                key={title}
                className={`tab-pane fade ${
                  activeTab === title ? 'show active' : ''
                }`}
                role='tabpanel'
              >
                {tabContent[title]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
