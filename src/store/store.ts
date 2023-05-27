import {configureStore} from '@reduxjs/toolkit';
import tokenSlice from './slices/tokenSlice';
import userInforSlice from './slices/userInforSlice';
import reloadSlice from './slices/reloadSlice';
import appStatusSlice from './slices/appStatusSlice';
export const store = configureStore({
  reducer: {
    token: tokenSlice,
    userInfor: userInforSlice,
    reload: reloadSlice,
    appStatus: appStatusSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});
