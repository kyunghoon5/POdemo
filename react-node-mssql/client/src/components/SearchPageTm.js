import React, {useState} from 'react'
import axios from 'axios';
import { SearchPage } from './SearchPage';



var _ = require('lodash');


const SearchPageTm = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [search, setSearch] = useState([]);
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);
 const abcd = 3


  

  const searchRecords2 = () => {
    const searchedRecord = record.toLowerCase();

    setLoading(true);
    axios
      .get(`${BASE_URL}mergeData?descrip=${searchedRecord}`)

      .then((response) => {
        setSearch(response.data);
        setLoading(false);
      });
  };
  return (
    <div>
      <SearchPage searchRecords2={searchRecords2} />
    </div>
  );
};

export default SearchPageTm