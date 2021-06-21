import React, {useState,useEffect} from "react";
import Fab from '@material-ui/core/Fab';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import axios from 'axios'
import './custom.css'

let map
let hexapts=[]
var hexaptsout = [];
var lattosave = [];
var longtosave = [];

const IndexMap =(props)=> {
const [userLocation,setUserLocation]=useState([23,32])
function generate(pt) {
  var lati;
  var longi;
  lati = 0;
  longi = 0;
  lati = pt.lat();
  longi = pt.lng();
  lattosave.push(lati);
  longtosave.push(longi);
  console.log('latitude',lattosave)
  console.log('longitude',longtosave)
  return;

}
function makehexagon(rad, pt) {
  var points = [];
  for (var angle = 0; angle < 360; angle += 60) {
      var coord = window.google.maps.geometry.spherical.computeOffset(
          pt,
          rad,
          angle
      );
      points.push(coord);
  }

  // Construct the polygon
  var polygon = new window.google.maps.Polygon({
      paths: points,
      strokeColor: "#FFFF00",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#F8FCFC",
      fillOpacity: 0.1,
  });
  polygon.setMap(map);
}
function markpt(coord) {
  new window.google.maps.Marker({
      position: coord,
      map: map
  });
  generate(coord);
}
function hexagonoverlay(rad) {
  for (var i = 0; i < 6; i++) {
      var b = hexapts[i];
      makehexagon(rad, b);
  }
}

function markouthexagon(rad) {
  for (var angle = 30; angle < 390; angle += 60) {
      var coord = window.google.maps.geometry.spherical.computeOffset(
          new window.google.maps.LatLng(props.lat,props.lng),
          rad,
          angle
      );
      hexaptsout.push(coord);
      markpt(coord);

  }
  var polygon = new window.google.maps.Polygon({
      paths: hexaptsout,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "#F8FCFC",
      fillOpacity: 0.2,
  });
  polygon.setMap(map);
}
//outer hexagon overlay
function outhexagonoverlay(radii) {
  for (let i = 0; i < 6; i++) {
      var b = hexaptsout[i];
      makehexagon(radii, b);
  }
  for (let i = 0; i < 6; i++) {
      var c = window.google.maps.geometry.spherical.interpolate(
          hexaptsout[i],
          hexaptsout[(i + 1) % 6],
          0.5
      );
      makehexagon(radii, c);
      hexaptsout.push(c);
  }
}
function markhexagon(rad) {
  for (var angle = 30; angle < 390; angle += 60) {
      var coord = window.google.maps.geometry.spherical.computeOffset(
          new window.google.maps.LatLng(props.lat,props.lng),
          rad,
          angle
      );
      hexapts.push(coord);
      markpt(coord);
  }
  var polygon = new window.google.maps.Polygon({
      paths: hexapts,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "#F8FCFC",
      fillOpacity: 0.2,
  });
  console.log(map)
  polygon.setMap(map);
}

useEffect(()=>{
  if(props.hexagon){
    var radius=props.radius*1000;
    var radii=radius/Math.sqrt(3)
    new window.google.maps.Marker({
      map,
      position:{lat:props.lat,lng:props.lng}
    })
    markhexagon(radius)
    hexagonoverlay(radii);
    markouthexagon((2 * radius));
    outhexagonoverlay(radii);

    axios.post('/getlati',{
      latikey:lattosave
    })
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })

    axios.post('/getlongi',{
      longikey:longtosave
    })
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }
},[props.hexagon])

const initMap=()=>{
  map = new window.google.maps.Map(document.getElementById("map"), {
    center:{lat:23,lng:78},
      zoom: 10,
      mapTypeControl: false,
      streetViewControl:false,
      fullscreenControl:false,
    })
}
const renderMap = () => {
  loadScript(
    "https://maps.googleapis.com/maps/api/js?libraries=geometry&callback=initMap"
  );
  window.initMap = initMap;
}
useEffect(()=>{
  renderMap()
},[])
return (
<div id="map" className="map"></div>
)
}
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
export default IndexMap;