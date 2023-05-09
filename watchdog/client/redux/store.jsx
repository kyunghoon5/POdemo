import { configureStore } from '@reduxjs/toolkit';
import testcomp from './testcomp';


export default configureStore({
  reducer: {counter: testcomp},
});
