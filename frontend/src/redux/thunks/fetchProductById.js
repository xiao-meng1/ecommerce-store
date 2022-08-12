import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk('products/fetchProductById', async (id) => {
  const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/products/${id}`;
  const response = await axios.get(uri);
  return response.data;
});
