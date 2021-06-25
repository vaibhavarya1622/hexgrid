import React,{useState} from 'react'
import {Spinner} from 'reactstrap'
import DataDisplay from './../DataDisplay/DataDisplay'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const Fetch=(props)=>{
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState("")
    axios.get('http://127.0.0.1:5000/fetch_from_nasa')
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
            <div style={{marginTop:'60px'}}><Spinner color='primary'/></div>
            :<DataDisplay />
            }  
        </div>
    )
}
export default Fetch