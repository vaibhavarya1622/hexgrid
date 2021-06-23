import React,{useState} from 'react'
import { useHistory } from 'react-router';
import './custom.css'
import MapContainer from './../Map/Map'
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Home=(props)=>{
    let history=useHistory()
    const [radius,setRadius]=useState("")
    const [lat,setLat]=useState("")
    const [lng,setLng]=useState("")
    const [hexagon,setHexagon]=useState(false)

    const myLocation=()=>{
      var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };//check if we don't get location in 30 seconds
      var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }
  
  const onSuccess=(pos)=>{
      setLat(pos.coords.latitude)
      setLng(pos.coords.longitude)
  }
  
  const onError=(error)=>{
      console.log(error)
  }
    const handleInput=(e)=>{
      const {name,value}=e.target
      if(name==='radius'){
        setRadius(value)
      }
      else if(name==='lat'){
        setLat(value)
      }
      else if(name==='lng'){
        setLng(value)
      }
      else if(name==='hexagon'){
        setHexagon(!hexagon)
      }
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        history.push('/get_data')
      }
      return(
        <div className='home'>
        <MapContainer radius={radius} lat={lat} lng={lng} hexagon={hexagon}/>
        <div className="location-button">
  <button onClick={myLocation} className="myLocationBtn">
    <LocationOnIcon style={{ color: "#960A0A"}} />
  </button>
  </div>
        <div class="login-page">
          <div class="form">
              <div class="login-header">
                  My Web App
              </div>
            <form onSubmit={handleSubmit}>
              <div className="group">
                <input
                type="text"
                name="radius"
                value={radius}
                placeholder="Enter radius" 
                onChange={handleInput}
                />
              </div>
              <div className="group">
                <input
                type="text"
                name="lat"
                value={lat}
                placeholder="Enter latitude"
                onChange={handleInput}
                />
              </div>
              <div className="group">
                <input
                type="text"
                name="lng"
                value={lng}
                placeholder="Enter Longitude"
                onChange={handleInput}
                />
              </div>
              <div className='group'>
                <input
                type='checkbox'
                name='hexagon'
                value={hexagon}
                onChange={handleInput}
                />Check box to show Hexagon
              </div>
              <div className="group">
              <button className="button">Get the data!</button>
              </div>
            </form>
          </div>
        </div>
        </div>
        )
    }
  export default Home;