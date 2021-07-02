import React,{useState} from 'react'
import './custom.css'
import MapContainer from './../Map/Map'
import axios from 'axios'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropagateLoader from 'react-spinners/PropagateLoader'
import Hexagon from './hexagonal.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileDownload=require('js-file-download')

const Home=(props)=>{
    const [radius,setRadius]=useState("")
    const [lat,setLat]=useState("")
    const [lng,setLng]=useState("")
    const [hexagon,setHexagon]=useState(false)
    const [startDate,setStartDate]=useState()
    const [endDate,setEndDate]=useState()
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
    const input_fields={
      radius:new RegExp('([0-9]*[.])?[0-9]+'),
      lat:new RegExp('([0-9]*[.])?[0-9]+'),
      lng:new RegExp('([0-9]*[.])?[0-9]+'),
    }
  
    const handleValidation=()=>{
      if(input_fields['radius'].test(radius)===false && radius<=0){
        toast.error('Enter valid Radius', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return false
      }
      if(input_fields['lat'].test(lat)===false){
        toast.error('Latitude is not valid', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return false
      }
      if(input_fields['lng'].test(lng)===false){
        toast.error('Longitude is not valid', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return false
      }
      if(!startDate){
        toast.error('Enter valid start Date', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return false
      }
      if(!endDate){
        toast.error('Enter valid end Date', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return false
      }
      return true
    }
   
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(startDate,endDate)
        if(handleValidation()){
        axios.post('/submit',{
          start_date:startDate,
          end_date:endDate
        })
        .then(response=>{
          console.log(response)
        })
        .catch(error=>{
          window.alert(error+" please try again")
          window.location.reload(true)
        })
        setStatus(1)
        setHexagon(true)
        }
      }
    const handleDownload=(e)=>{
      e.preventDefault();
      axios.get('/download')
      .then(response=>{
        FileDownload(response.data,'correlation.csv')
        console.log(response)
      })
      .catch(error=>{
        window.alert(error)
      })
    }
      return(
        <div className='home'>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        <MapContainer 
        radius={radius}
        lat={lat}
        lng={lng}
        hexagon={hexagon}
        setStatus={setStatus}
        setLat={setLat}
        setLng={setLng}
        />
        <div className='form-page'>
          <div className="form">
              <div class="login-header">
                  HexGrid <img style={{height:'1.4rem',width:'1.4rem'}} src={Hexagon} alt=''/>
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
                minDate={new Date('1981-01-03')}
                maxDate={new Date('2021-05-29')}
                onChange={date => {setStartDate(date)}}
                placeholderText='Enter start date'
                />
              </div>
              <div className='group'>
                <DatePicker
                  selected={endDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate && new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()+1)}
                  maxDate={new Date('2021-05-30')}
                  onChange={date => setEndDate(date)}
                  placeholderText='Enter End date'
                />
              </div>
              <div className='group'>
                {
                  (status===0)?
                    <button onClick={handleSubmit} className="button">Submit</button>
                  :(status===1)?
                    <div className='loader'><PropagateLoader size={15}/></div>
                  :
              <button  className="button" onClick={handleDownload}>Download</button>
                  }
              </div>
            </form>
          </div>
          </div>
        </div>
        )
    }
  export default Home;