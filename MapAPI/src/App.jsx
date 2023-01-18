import React, { useState } from 'react';
import SearchBox from './SearchBox';
import Maps from './Maps';

function App() {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div className="flex flex-row w-screen h-screen border-solid, border-2 border-indigo-800">
      <div className="border-solid w-6/12 h-full border-2 border-indigo-800">
        <Maps selectPosition={selectPosition} />
      </div>
      <div className="border-solid w-6/12 border-2 border-indigo-800">
        <SearchBox
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
        />
      </div>
    </div>
  );
}

export default App;
