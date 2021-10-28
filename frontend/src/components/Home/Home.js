import React,{useState,Fragment} from 'react'
import MapContainer from './../Map/Map'
import axios from 'axios'
import PropagateLoader from 'react-spinners/PropagateLoader'
import Hexagon from './hexagonal.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {FormSection,Info,Form,NoBullet,Input,Select,Button,Modal,Loader,Option} from './Home.styles'
const FileDownload=require('js-file-download')

var alertRedInput = "#8C1010";
var defaultInput = "rgba(10, 180, 180, 1)";

const Home=(props)=>{

    const [radius,setRadius]=useState("")
    const [lat,setLat]=useState("")
    const [lng,setLng]=useState("")
    const [hexagon,setHexagon]=useState(false)
    const [startDate,setStartDate]=useState('')
    const [endDate,setEndDate]=useState('')
    const [method,setMethod]=useState('0')
    const [status,setStatus]=useState(0) 
    const [showModal,setShowModal]=useState(false)

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
      else if(name==='method'){
        console.log(value)
        setMethod(value)
      }
    }
    const input_fields={
      // radius:/([0-9]*[.])?[0-9]+/,
      // lat:/([0-9]*[.])?[0-9]+/,
      // lng:/([0-9]*[.])?[0-9]+/
      radius:/^\d*\.?\d*$/,
      lat:/^[+-]?([0-9]*[.])?[0-9]+$/,
      lng:/^[+-]?([0-9]*[.])?[0-9]+$/
    }
  
    const handleValidation=()=>{
      if(input_fields['radius'].test(radius)===false || Number(radius)<=0){
        toast.error('Enter valid Radius', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        document.getElementById('radius').style.borderColor=alertRedInput
        return false
      }
      if(input_fields['lat'].test(lat)===false || Number(lat)<-90 || Number(lat)>90){
        toast.error('Latitude is not valid', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        document.getElementById('lat').style.borderColor=alertRedInput
          return false
      }
      if(input_fields['lng'].test(lng)===false || Number(lng)<-180 || Number(lng)>180){
        toast.error('Longitude is not valid', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        document.getElementById('lng').style.borderColor=alertRedInput
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
        document.getElementById('start_date').style.borderColor=alertRedInput
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
        document.getElementById('end_date').style.borderColor=alertRedInput
          return false
      }
      if(method==='0'){
        toast.error('Please select method', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          document.getElementById('method').style.borderColor=alertRedInput;
          return false;
      }
      return true
    }
   
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(handleValidation()){
         console.log(method)
          document.getElementById('radius').borderColor=defaultInput
          document.getElementById('lat').borderColor=defaultInput
          document.getElementById('lng').borderColor=defaultInput
          document.getElementById('start_date').borderColor=defaultInput
          document.getElementById('end_date').borderColor=defaultInput

        axios.post('/getstartd',{
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
      const downloadCorrelation=()=>{
        axios.get('/download_csv')
        .then(response=>{
          FileDownload(response.data,'correlated.csv')
          console.log(response)
        })
        .catch(error=>{
          window.alert(error)
        })
      }
      const downloadFinal=()=>{
        axios.get('/download_inter')
        .then(response=>{
          FileDownload(response.data,'multiple_locations.csv')
          console.log(response)
        })
        .catch(error=>{
          window.alert(error)
        })
      }
      const modal=(
          <Modal showModal={showModal}>
                <div className='modal-dialog' role='document'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title'>Downloads</h5>
                    <button type='button' className='btn-close' onClick={()=>setShowModal(false)} aria-label='Close'>
                      <span aria-hidden='true'></span>
                    </button>
                    </div>
                    <div className='modal-body' style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                      <button type='button' className='btn btn-primary' onClick={downloadCorrelation}>Correlated Locations data</button>
                      <button type='button' className='btn btn-primary' onClick={downloadFinal}>Multiple Locations data</button>
                    </div>
                    <div className='modal-footer'>
                      <button type='button' className='btn btn-secondary' onClick={()=>setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </Modal>
    )
    const handleDownload=(e)=>{
      e.preventDefault();
      setShowModal(true)
    }
    return(
      <>
      {modal}
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
     <FormSection>
       <Info>
            {/* <h2>HexGrid</h2>
            <i className="icon ion-ios-ionic-outline" aria-hidden="true"></i>
            <p>The Future Is Here</p> */}
             <MapContainer 
              radius={radius}
              lat={lat}
              lng={lng}
              hexagon={hexagon}
              setStatus={setStatus}
              setLat={setLat}
              setLng={setLng}
              method={method}
              />
       </Info>
        <Form> 
          <h2>HexGrid 
          <img className='icon' src={Hexagon} style={{height:'1.6rem',width:'1.6rem',marginLeft:'8px'}}alt=''/>
          </h2>
          <NoBullet>
           <li>
            <label for="radius"></label>
              <Input 
              type="text" 
              name='radius' 
              value={radius} 
              onChange={handleInput} 
              placeholder='Enter Radius'
              // className={` ${validRadius?'':'is-invalid'}`}
              id="radius"
              required />
              {/* {validRadius?'':<div className="invalid-feedback">Radius must be greater than 0</div>} */}
              </li>
           <li>
            <label for="lat"></label>
              <Input 
              type="text" 
              name='lat' 
              value={lat} 
              onChange={handleInput} 
              placeholder='Enter Latitude'
              // className={`form-control ${validLat?'':'is-invalid'}`}
              id="lat" 
              required
              />
            </li>
            <li>
            <label for="lng"></label>
              <Input 
              type="text" 
              name='lng' 
              value={lng} 
              onChange={handleInput} 
              placeholder='Enter Longitude'
              // className={`form-control ${validLng?'':'is-invalid'}`}
              id="lng" 
              required
              />
            </li>
            <li>
            <label for="startDate"></label>
            {/* <DatePicker
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date('1981-01-03')}
              maxDate={new Date('2021-05-29')}
              onChange={date => {setStartDate(date)}}
              placeholderText='Enter start date'
              component={Input}
              /> */}
              <Input type='text'
               id='start_date'
               min='1981-01-03'
               max='2021-05-29'
               onFocus={(e)=>e.target.type='date'} 
               onBlur={(e)=>e.target.type='text'}
               placeholder='Enter Start Date' name='startDate'
               value={startDate} 
               onChange={(e)=>setStartDate(e.target.value)}
               required />
              </li>
            <li>
            <label for="endDate"></label>
              {/* <DatePicker
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate && new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()+1)}
                maxDate={new Date('2021-05-30')}
                onChange={date => setEndDate(date)}
                placeholderText='Enter End date'
                // className='form-control'
              /> */}
              <Input type='text' 
              id='end_date'
              min={startDate}
              max='2021-05-30'
              onFocus={(e)=>e.target.type='date'} 
              onBlur={(e)=>e.target.type='text'}
              placeholder='Enter End Date' name='endDate' value={endDate}
              onChange={(e)=>setEndDate(e.target.value)} 
              required
               />
            </li>
            <li>
              <label for='method'></label>
              <Select  id='method' name='method' onChange={handleInput} required>
                <Option selected disabled value='0'>Select Correlation method</Option>
                <Option value='1'>Pearson</Option>
                <Option value='2'>Kendall</Option>
                <Option value='3'>Spearman</Option>
                <Option value='4'>XGBoost</Option>
                <Option value='5'>Dynamic time warping</Option>
              </Select>
              </li>
            <li>
              {
                (status===0)?
                  <Button onClick={handleSubmit} >Submit</Button>
                :(status===1)?
                  <Loader><PropagateLoader color='rgba(10, 180, 180, 1)' size={15}/></Loader>
                :
            <Button   
            onClick={handleDownload}
            >Downloads
            </Button>
          }
            </li>
            </NoBullet>
          </Form> 
        </FormSection>
      </>
      )
    }
  export default Home;