import React,{useState} from 'react'
import { useHistory } from 'react-router';
import './custom.css'
import MapContainer from './../Map/Map'
import axios from 'axios'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Container,Row,Col} from 'reactstrap';

const Home=(props)=>{
    let history=useHistory()
    const [radius,setRadius]=useState("")
    const [lat,setLat]=useState("")
    const [lng,setLng]=useState("")
    const [hexagon,setHexagon]=useState(false)
    const [startDate,setStartDate]=useState(new Date())
    const [endDate,setEndDate]=useState(new Date())

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
        axios.post('/submit',{
          start_date:startDate,
          end_date:endDate
        })
        .then(response=>{
          console.log(response)
        })
        .catch(error=>{
          console.log(error)
        })
        history.push('/get_data')
      }
      let submit={
        background:'grey'
      }
      if(hexagon){
        submit={}
      }
      return(
        <div className='home'>
        <MapContainer 
        radius={radius}
        lat={lat}
        lng={lng}
        hexagon={hexagon}
        />
        <div className='form-page'>
          <div className="form">
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
                <div className='location-button'>
                 <LocationOnIcon onClick={()=>myLocation()} style={{cursor:'pointer'}} />
                 Click to set current location
                </div>
              </div>
              <div className='group'>
                <DatePicker
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={date => setStartDate(date)}
                />
              </div>
              <div className='group'>
                <DatePicker
                  selected={endDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  onChange={date => setEndDate(date)}
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
              <button disabled={!hexagon} style={submit} className="button">Get the data!</button>
              </div>
            </form>
          </div>
          </div>
        </div>
        )
    }
  export default Home;