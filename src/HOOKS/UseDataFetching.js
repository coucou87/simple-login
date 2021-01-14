import { useState, useCallback } from "react";
import axios from 'axios'

// export default function useDataFetching(dataSource) {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     (async function () {
//       try {
//         const data = await fetch(dataSource , {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                //myData
//             })
//         });
//         const json = await data.json();

//         if (json) {
//           setLoading(false);
//           setData(json);
//         }
//       } catch (error) {
//         setLoading(false);
//         setError(error.message);
//       }

//       setLoading(false);
//     })()
//   }, [dataSource]);

//   return {
//     error,
//     loading,
//     data
//   };
// }


export const useDataFetching = ({url, headers, payload}) => {
  const [res, setRes] = useState({data: null, error: null, isLoading: false});
  // const [error, setError]
  // You POST method here
  const callAPI = useCallback(() => {
       setRes(prevState => ({...prevState, isLoading: true}));
       axios.post(url, headers, payload).then(res => {
          setRes({data: res.data, isLoading: false, error: null});
       }).catch((error) => {
          setRes({data: null, isLoading: false, error});
       })
  }, [url, headers, payload])
  return [res, callAPI];
}


// axios({
//   method: 'post',
//   url: '/login',
//   timeout: 4000,    // 4 seconds timeout
//   data: {
//     firstName: 'David',
//     lastName: 'Pollock'
//   }
// })
// .then(response => {/* handle the response */})
// .catch(error => console.error('timeout exceeded'))

