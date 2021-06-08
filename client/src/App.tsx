import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('/api').then((res: any) => console.log(res.data));
  }, []);
  return <div>sample</div>;
}

export default App;
