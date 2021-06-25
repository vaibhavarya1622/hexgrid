import React,{useState} from 'react'
import DataDisplay from './../DataDisplay/DataDisplay'
import axios from 'axios'
import HashLoader from 'react-spinners/HashLoader'
import { flexbox } from '@material-ui/system'
const Fetch=(props)=>{
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState("")
    axios.get('/fetch_from_nasa')
    .then((response)=>{
        console.log(response)
        setLoading(false)
    })
    .catch(err=>{
        setError(err)
        console.log(err)
    })
    return(
        <div>
            {
            loading?
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20%'}}><HashLoader color={'blue'}/></div>
            :<DataDisplay />
            }  
        </div>
    )
}
export default Fetch