import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import testApiConnection from '../redux/thunks/testApiConnection';
import { selectApiIsConnected } from '../redux/slices/apiSlice';

export default function useTestApiConnection() {
  const dispatch = useDispatch();
  const apiIsConnected = useSelector(selectApiIsConnected);
  const intervalId = useRef();

  useEffect(() => {
    if (apiIsConnected) return;

    dispatch(testApiConnection());
    intervalId.current = setInterval(() => {
      dispatch(testApiConnection());
    }, 500);
  }, []);

  useEffect(() => {
    if (apiIsConnected) {
      clearInterval(intervalId.current);
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [apiIsConnected]);

  return apiIsConnected;
}
