import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
  'products/fetchProductImageById',
  async (itemIds) => {
    const { productId, imageId } = itemIds;
    const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/products/image/${imageId}`;
    const response = await axios.get(uri);
    const item = {
      productId,
      image: response.data,
    };

    return item;
  }
);
