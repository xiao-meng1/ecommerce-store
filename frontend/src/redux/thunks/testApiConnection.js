import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk('api/testApiConnection', async () => {
  const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/api/test-api-connection`;
  await axios.get(uri);
});
