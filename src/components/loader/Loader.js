import loaderGif from '../../constants/images/loader.gif';
import './loader.css';

export default function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <img src={loaderGif} alt='spinner'/>
      </div>
    </div>
  )
}