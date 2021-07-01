import React,{useState} from 'react'
import './custom.css'
import MapContainer from './../Map/Map'
import axios from 'axios'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropagateLoader from 'react-spinners/PropagateLoader'
const FileDownload=require('js-file-download')

const Home=(props)=>{
    const [radius,setRadius]=useState("")
    const [lat,setLat]=useState("")
    const [lng,setLng]=useState("")
    const [hexagon,setHexagon]=useState(false)
    const [startDate,setStartDate]=useState(new Date('2021-05-29'))
    const [endDate,setEndDate]=useState(new Date('2021-05-30'))
    const [status,setStatus]=useState(0)

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
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://127.0.0.1:5000/submit',{
          start_date:startDate,
          end_date:endDate
        })
        .then(response=>{
          console.log(response)
        })
        .catch(error=>{
          window.alert('error')
        })
        setStatus(1)
        setHexagon(true)
      }
    const handleDownload=(e)=>{
      e.preventDefault();
      axios.get('http://127.0.0.1:5000/download')
      .then(response=>{
        FileDownload(response.data,'correlation.csv')
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
      window.location.reload(true)
    }
      return(
        <div className='home'>
        <MapContainer 
        radius={radius}
        lat={lat}
        lng={lng}
        hexagon={hexagon}
        setStatus={setStatus}
        />
        <div className='form-page'>
          <div className="form">
              <div class="login-header">
                  My Web App
              </div>
            <form>
              <div className="group">
                <input
                type="text"
                name="radius"
                value={radius}
                placeholder="Enter radius" 
                onChange={handleInput}
                required
                />
              </div>
              <div className="group">
                <input
                type="text"
                name="lat"
                value={lat}
                placeholder="Enter latitude"
                onChange={handleInput}
                required
                 />
              </div>
              <div className="group">
                <input
                type="text"
                name="lng"
                value={lng}
                placeholder="Enter Longitude"
                onChange={handleInput}
                required
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
                maxDate={new Date('2021-05-29')}
                onChange={date => {setStartDate(date)}}
                />
              </div>
              <div className='group'>
                <DatePicker
                  selected={endDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()+1)}
                  maxDate={new Date('2021-05-30')}
                  onChange={date => setEndDate(date)}
                />
              </div>
              <div className='group'>
                {
                  (status===0)?
                    <button onClick={handleSubmit} className="button">Submit data!</button>
                  :(status===1)?
                    <div className='loader'><PropagateLoader size={15}/></div>
                  :
              <button  className="button" onClick={handleDownload}>Download data!</button>
                  }
              </div>
            </form>
          </div>
          </div>
        </div>
        )
    }
  export default Home;