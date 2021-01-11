// import styled, { keyframes } from "styled-components";

// const rotate360 = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;

// const Spinner = styled.div`
//   animation: ${rotate360} 1s linear infinite;
//   transform: translateZ(0);
//   border-top: 2px solid grey;
//   border-right: 2px solid grey;
//   border-bottom: 2px solid grey;
//   border-left: 4px solid black;
//   background: transparent;
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
// `;

// export default Spinner;


import React from 'react'
import loaderGif from '../constants/images/loader.gif'
import './loader.css'

export default function Loader() {
  return( 
   <div className="loader-wrapper">
     <div className="loader">
     <img src={loaderGif} />
     </div>
    </div>
  )
}