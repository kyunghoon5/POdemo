import axios from 'axios';
import { useEffect } from 'react';

function Test1() {
  // HOOK useState
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos/1`)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  console.log(data);

  return <div>test</div>;
}

export default Test1;
