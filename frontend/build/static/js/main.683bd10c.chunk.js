(this.webpackJsonpmyapp=this.webpackJsonpmyapp||[]).push([[0],{160:function(e,t,o){"use strict";o.r(t);var n,a,s=o(0),r=o.n(s),i=o(21),c=o.n(i),l=(o(71),o(72),o(63)),g=o(6),d=o(19),p=(o(73),o(28)),u=o.n(p),m=(o(92),o(5)),w=[],h=[],j=[],f=[];var b=function(e){function t(e,t){for(var o=[],a=0;a<360;a+=60){var s=window.google.maps.geometry.spherical.computeOffset(t,e,a);o.push(s)}new window.google.maps.Polygon({paths:o,strokeColor:"#FFFF00",strokeOpacity:.8,strokeWeight:2,fillColor:"#F8FCFC",fillOpacity:.1}).setMap(n)}function o(e){new window.google.maps.Marker({position:e,map:n}),function(e){var t,o;t=e.lat(),o=e.lng(),j.push(t),f.push(o)}(e)}Object(s.useEffect)((function(){if(e.hexagon){var a=1e3*e.radius,s=a/Math.sqrt(3);o(new window.google.maps.LatLng(e.lat,e.lng)),function(t){for(var a=30;a<390;a+=60){var s=window.google.maps.geometry.spherical.computeOffset(new window.google.maps.LatLng(e.lat,e.lng),t,a);w.push(s),o(s)}new window.google.maps.Polygon({paths:w,strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:3,fillColor:"#F8FCFC",fillOpacity:.2}).setMap(n)}(a),function(e){for(var o=0;o<6;o++)t(e,w[o])}(s),function(t){for(var a=30;a<390;a+=60){var s=window.google.maps.geometry.spherical.computeOffset(new window.google.maps.LatLng(e.lat,e.lng),t,a);h.push(s),o(s)}new window.google.maps.Polygon({paths:h,strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:3,fillColor:"#F8FCFC",fillOpacity:.2}).setMap(n)}(2*a),function(e){for(var n=0;n<6;n++)t(e,h[n]);for(var a=0;a<6;a++){var s=window.google.maps.geometry.spherical.interpolate(h[a],h[(a+1)%6],.5);o(s),t(e,s),h.push(s)}}(s),n.panTo(new window.google.maps.LatLng(e.lat,e.lng)),n.setZoom(11),u.a.post("/getlati",{latikey:j}).then((function(e){console.log(e)})).catch((function(e){window.alert(e+" please refresh page and try again"),window.location.reload(!0)})),console.log("lat",j),console.log(f),u.a.post("/getlongi",{longikey:f}).then((function(t){e.setStatus(2),console.log(t)})).catch((function(e){window.alert(e+" please refresh page and try again"),window.location.reload(!0)}))}}),[e.hexagon]);var r=function(){n=new window.google.maps.Map(document.getElementById("map"),{center:new window.google.maps.LatLng(23,78),zoom:10,mapTypeControl:!1,streetViewControl:!1,fullscreenControl:!1}),a=new window.google.maps.Marker({map:n,draggable:!0,position:new window.google.maps.LatLng(23,78)}),window.google.maps.event.addListener(a,"dragend",(function(){var t;t=a.getPosition(),(new window.google.maps.Geocoder).geocode({latLng:t},(function(){e.setLat(t.lat()),e.setLng(t.lng())}))}))};Object(s.useEffect)((function(){if(n&&e.lat&&e.lng){var t=new window.google.maps.LatLng(e.lat,e.lng);a.setPosition(t),n.panTo(t),n.setCenter(t)}}),[e.lat,e.lng]);var i=function(){!function(e){var t=window.document.getElementsByTagName("script")[0],o=window.document.createElement("script");o.src=e,o.async=!0,o.defer=!0,t.parentNode.insertBefore(o,t)}("https://maps.googleapis.com/maps/api/js?libraries=geometry&callback=initMap"),window.initMap=r};return Object(s.useEffect)((function(){i()}),[]),Object(m.jsx)("div",{id:"map",className:"map"})},O=o(59),v=o.n(O),x=o(47),C=o.n(x),y=(o(94),o(62)),k=o.n(y),L=o.p+"static/media/hexagonal.f7c86d98.png",F=o(24),D=(o(95),o(96)),E=function(e){var t=Object(s.useState)(""),o=Object(d.a)(t,2),n=o[0],a=o[1],r=Object(s.useState)(""),i=Object(d.a)(r,2),c=i[0],l=i[1],g=Object(s.useState)(""),p=Object(d.a)(g,2),w=p[0],h=p[1],j=Object(s.useState)(!1),f=Object(d.a)(j,2),O=f[0],x=f[1],y=Object(s.useState)(),E=Object(d.a)(y,2),N=E[0],P=E[1],S=Object(s.useState)(),B=Object(d.a)(S,2),M=B[0],T=B[1],H=Object(s.useState)(0),q=Object(d.a)(H,2),R=q[0],A=q[1],I=function(e){l(e.coords.latitude),h(e.coords.longitude)},W=function(e){console.log(e)},z=function(e){var t=e.target,o=t.name,n=t.value;"radius"===o?a(n):"lat"===o?l(n):"lng"===o&&h(n)},G={radius:new RegExp("([0-9]*[.])?[0-9]+"),lat:new RegExp("([0-9]*[.])?[0-9]+"),lng:new RegExp("([0-9]*[.])?[0-9]+")};return Object(m.jsxs)("div",{className:"home",children:[Object(m.jsx)(F.a,{position:"top-center",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0}),Object(m.jsx)(b,{radius:n,lat:c,lng:w,hexagon:O,setStatus:A,setLat:l,setLng:h}),Object(m.jsx)("div",{className:"form-page",children:Object(m.jsxs)("div",{className:"form",children:[Object(m.jsxs)("div",{class:"login-header",children:["HexGrid ",Object(m.jsx)("img",{style:{height:"1.4rem",width:"1.4rem"},src:L,alt:""})]}),Object(m.jsxs)("form",{children:[Object(m.jsx)("div",{className:"group",children:Object(m.jsx)("input",{type:"text",name:"radius",value:n,placeholder:"Enter radius",onChange:z,required:!0})}),Object(m.jsx)("div",{className:"group",children:Object(m.jsx)("input",{type:"text",name:"lat",value:c,placeholder:"Enter latitude",onChange:z,required:!0})}),Object(m.jsxs)("div",{className:"group",children:[Object(m.jsx)("input",{type:"text",name:"lng",value:w,placeholder:"Enter Longitude",onChange:z,required:!0}),Object(m.jsxs)("div",{className:"location-button",children:[Object(m.jsx)(v.a,{onClick:function(){navigator.geolocation.getCurrentPosition(I,W,{maximumAge:3e3,timeout:5e3,enableHighAccuracy:!0})},style:{cursor:"pointer"}}),"Click to set current location"]})]}),Object(m.jsx)("div",{className:"group",children:Object(m.jsx)(C.a,{selected:N,selectsStart:!0,startDate:N,endDate:M,minDate:new Date("1981-01-03"),maxDate:new Date("2021-05-29"),onChange:function(e){P(e)},placeholderText:"Enter start date"})}),Object(m.jsx)("div",{className:"group",children:Object(m.jsx)(C.a,{selected:M,selectsEnd:!0,startDate:N,endDate:M,minDate:N&&new Date(N.getFullYear(),N.getMonth(),N.getDate()+1),maxDate:new Date("2021-05-30"),onChange:function(e){return T(e)},placeholderText:"Enter End date"})}),Object(m.jsx)("div",{className:"group",children:0===R?Object(m.jsx)("button",{onClick:function(e){e.preventDefault(),console.log(N,M),(!1===G.radius.test(n)?(F.b.error("Radius should be floating and greater than 0",{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),0):!1===G.lat.test(c)?(F.b.error("Latitude is not valid",{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),0):!1===G.lng.test(w)?(F.b.error("Longitude is not valid",{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),0):N?M||(F.b.error("Enter valid end Date",{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),0):(F.b.error("Enter valid start Date",{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),0))&&(u.a.post("/submit",{start_date:N,end_date:M}).then((function(e){console.log(e)})).catch((function(e){window.alert(e+" please try again"),window.location.reload(!0)})),A(1),x(!0))},className:"button",children:"Submit"}):1===R?Object(m.jsx)("div",{className:"loader",children:Object(m.jsx)(k.a,{size:15})}):Object(m.jsx)("button",{className:"button",onClick:function(e){e.preventDefault(),u.a.get("/download").then((function(e){D(e.data,"correlation.csv"),console.log(e)})).catch((function(e){window.alert(e)}))},children:"Download"})})]})]})})]})};var N=function(){return Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)(l.a,{children:[Object(m.jsx)(g.a,{path:"/",exact:!0,component:E}),Object(m.jsx)(g.a,{path:"/map",exact:!0,component:b})]})})},P=function(e){e&&e instanceof Function&&o.e(3).then(o.bind(null,177)).then((function(t){var o=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;o(e),n(e),a(e),s(e),r(e)}))};c.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(N,{})}),document.getElementById("root")),P()},71:function(e,t,o){},72:function(e,t,o){},73:function(e,t,o){},92:function(e,t,o){}},[[160,1,2]]]);
//# sourceMappingURL=main.683bd10c.chunk.js.map