// import React, { useState, useEffect } from "react";

// export default function UseDataFetching(dataSource,username,app) {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");


//   useEffect(() => {
//     {alert(username)
//     alert(app)}
//     async function fetchData(dataSource) {

//       try {
//         const data = await fetch(dataSource + "/general/v1/users/check") 
//         // { method: 'post',
//           // headers: { "Content-Type": 'application/json'},
//           // body: {
//           //   "username": username,
//           //   "app": app
//           // }
//         // };
//         const json = await data.json();

//         if (json) {
//           setLoading(false);
//           setData(alert(json));
//         }
//       } catch (error) {
//         setLoading(false);
//         setError(error.message);
//       }

//       setLoading(false);
//     }

//     fetchData();
//   }, [dataSource]);

//   return {
//     error,
//     loading,
//     data
//   };
// }