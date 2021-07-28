import axios from 'axios';

interface Props {
  data: any | null;
  isLoading: boolean;
  isError: boolean | null;
}

const fetchData = async (axiosParams: any) => {
  const state: Props = {
    data: null,
    isLoading: true,
    isError: null,
  };
  try {
    const response = await axios.request(axiosParams);
    if (response.data) {
      state.data = response.data;
      state.isLoading = false;
      state.isError = false;
    }
  } catch (error) {
    state.data = null;
    state.isLoading = false;
    state.isError = true;
  }
  return state;
};

export default fetchData;
