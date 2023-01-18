import React, { useState } from 'react';
import { Divider, OutlinedInput } from '@mui/material';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { MdPlace } from 'react-icons/md';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';

const parmas = {
  q: '',
  format: 'json',
  addressdetails: 'addressdetails',
};

export default function SearchBox(props) {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState('');
  const [listPlace, setListPlace] = useState([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: '100%' }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', padding: '0px 20px' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              //Search
              const parmas = {
                q: searchText,
                format: 'json',
                addressdetails: 1,
                polygon_geojson: 0,
              };
              const queryString = new URLSearchParams(parmas).toString();
              const requestOptions = {
                method: 'GET',
                redirect: 'follow',
              };
              fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  console.log(JSON.parse(result));
                  setListPlace(JSON.parse(result));
                })
                .catch((err) => console.log('err: ', err));
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <ListItem
                  button
                  onClick={() => {
                    setSelectPosition(item);
                  }}
                >
                  <ListItemIcon>
                    <MdPlace size={40} />
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
}
