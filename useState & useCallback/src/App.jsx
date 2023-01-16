import { useCallback, useState } from 'react';
import './index.css';
import { RiBuilding4Fill } from 'react-icons/ri';
import Money from './Money';
function App() {
  const [compCount, setCount] = useState(1);
  const [checkCount, setCount2] = useState(1000);

  const increaseParentage = () => {
    setCount(compCount + 1);
  };

  const increaseAmount = () => {
    setCount2(checkCount + 1000);
  };

  // const tellMe = useCallback{() => {
  //   console.lof('');
  // },[]}

  return (
    <div className="App">
      <div style={{ border: '4px solid navy', padding: '10px' }}>
        <div className="flex font-bold py-2">
          <RiBuilding4Fill size={40} />
          <h1 className="flex m-2">Company</h1>
        </div>
        <p>count: {compCount}</p>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={increaseParentage}
        >
          + Company
        </button>
        <Money name={'John'} payment={checkCount} />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={increaseAmount}
        >
          + addCheck
        </button>
      </div>
    </div>
  );
}

export default App;
