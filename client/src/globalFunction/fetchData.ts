import axios from 'axios';

interface Props {
  data: any | null;
  isLoading: boolean;
  isError: boolean | null;
}

const fetchData = async (url: string) => {
  const state: Props = {
    data: null,
    isLoading: true,
    isError: null,
  };
  try {
    const response = await axios.get(`${url}`);
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
