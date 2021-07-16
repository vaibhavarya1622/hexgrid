import React, {useEffect} from "react";
import axios from 'axios'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './custom.css'

let map
let hexapts=[]
var hexaptsout = [];
var lattosave = [];
var longtosave = [];
let marker;

const IndexMap =(props)=> {
  const myLocation=()=>{
    var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };//check if we don't get location in 30 seconds
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

const onSuccess=(pos)=>{
    props.setLat(pos.coords.latitude)
    props.setLng(pos.coords.longitude)
}

const onError=(error)=>{
    console.log(error)
}
function generate(pt) {
  var lati;
  var longi;
  lati = 0;
  longi = 0;
  lati = pt.lat();
  longi = pt.lng();
  lattosave.push(lati);
  longtosave.push(longi);
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
      markpt(c)
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
  polygon.setMap(map);
}

useEffect(()=>{
  if(props.hexagon){
    var radius=props.radius*1000;
    var radii=radius/Math.sqrt(3)
    markpt(new window.google.maps.LatLng(props.lat,props.lng))
    markhexagon(radius)
    hexagonoverlay(radii);
    markouthexagon((2 * radius));
    outhexagonoverlay(radii);
    map.panTo(new window.google.maps.LatLng(props.lat,props.lng))
    map.setZoom(11)
    axios.post('/getlati',{
      latikey:lattosave
    })
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>{
      window.alert(err+' please refresh page and try again')
      window.location.reload(true)

    })
    console.log('lat',lattosave)
console.log(longtosave)
    axios.post('/getlongi',{
      longikey:longtosave,
      method:props.method
    })
    .then(res=>{
  props.setStatus(2)
      console.log(res)
    })
    .catch(err=>{
      window.alert(err+' please refresh page and try again')
      window.location.reload(true)
    })
  }
},[props.hexagon])

const geocodePosition=(pos)=>{
  const geocoder=new window.google.maps.Geocoder()
  geocoder.geocode({latLng:pos},()=>{
    props.setLat(pos.lat())
    props.setLng(pos.lng())
  })
}


const initMap=()=>{
  map = new window.google.maps.Map(document.getElementById("map"), {
    center:new window.google.maps.LatLng(23,78),
      zoom: 10,
      mapTypeControl: false,
      streetViewControl:false,
      fullscreenControl:false,
    })

    marker=new window.google.maps.Marker({
      map,
      draggable:true,
      position:new window.google.maps.LatLng(23,78)
    })
    window.google.maps.event.addListener(marker, 'dragend', function() 
{
    geocodePosition(marker.getPosition());
});
const location=document.getElementById('location')
map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(location);
//SearchBar start
// const input = document.getElementById("mapsearch");
// const searchBox = new window.google.maps.places.SearchBox(input);
// // Bias the SearchBox results towards current map's viewport.
// map.addListener("bounds_changed", () => {
//   searchBox.setBounds(map.getBounds());
// });

// searchBox.addListener("places_changed", () => {
//   const places = searchBox.getPlaces();

//   if (places.length === 0) {
//     return;
//   }
//   // For each place, get the icon, name and location.
//   const bounds = new window.google.maps.LatLngBounds();
//   places.forEach((place) => {
//     if (!place.geometry) {
//       console.log("Returned place contains no geometry");
//       return;
//     }
//     if (place.geometry.viewport) {
//       bounds.union(place.geometry.viewport);
//     } else {
//       bounds.extend(place.geometry.location);
//     }
//     props.setLat(place.geometry.location.lat())
//     props.setLng(place.geometry.location.lng())
//   });
//   map.fitBounds(bounds);
// });

//Search Bar ends
}

useEffect(()=>{
  if(map && /^[+-]?([0-9]*[.])?[0-9]+$/.test(props.lat) && /^[+-]?([0-9]*[.])?[0-9]+$/.test(props.lng)){
    const point=new window.google.maps.LatLng(props.lat,props.lng)
    marker.setPosition(point)
    map.panTo(point)
    map.setCenter(point)
  }
},[props.lat,props.lng])
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
  <>
  {/* <div id="searchbar">
    <input
      placeholder="Search the Location                              &#xF002;"
      // placeholder="Search the Location                              🔍"
      className="input"
      id="mapsearch"
    />
</div> */}
   
   <LocationOnIcon id='location' fontSize='large' onClick={()=>myLocation()} style={{cursor:'pointer'}}>
     My Location
    </LocationOnIcon>
  <div id="map" className="map"></div>
  </>
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