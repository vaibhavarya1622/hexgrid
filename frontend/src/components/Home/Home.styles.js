import styled from 'styled-components'

export const FormSection=styled.div`
  background:no-repeat center/100% url(https://source.unsplash.com/TV2gg2kZD1o/1600x800);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  display: flex;
  color: white;
  box-shadow: 3px 10px 20px 5px rgba(0, 0, 0, .5);
}
`
export const Info=styled.div`
  width:90%;
  background: rgba(20, 20, 20, .8);
  padding: 4%;
`
export const Form=styled.form`
  text-align:center;
  width: 70%;
  padding: 30px 0;
  background-color: rgba(20, 40, 40, .8);
  text-transform:uppercase;
  transition: .2s;
  h2 {
    font-weight: 500;
    letter-spacing:0.2rem;
  }
`
export const NoBullet=styled.ul`
list-style-type:None;
padding:0;
`
export const Input=styled.input`
  margin: 15px 0;
  font-size: 16px;
  padding: 10px;
  width: 250px;
  border: 1px solid rgba(10, 180, 180, 1);
  border-top: none;
  border-left: none;
  border-right: none;
  background: rgba(20, 20, 20, .2);
  color: white;
  outline: none;
`
export const Select=styled.select` 
margin: 15px 0;
font-size: 16px;
padding: 10px;
width: 250px;
border: 1px solid rgba(10, 180, 180, 1);
border-top: none;
border-left: none;
border-right: none;
background: rgba(20, 20, 20, .2);
color: white;
outline: none;
`
export const Option=styled.option`
background:rgba(20,20,20,0.2);
color:black;
`
export const Button=styled.button`
border: 1px solid rgba(10, 180, 180, 1);
background: rgba(20, 20, 20, .6);
font-size: 18px;
color: white;
margin-top: 20px;
padding: 10px 50px;
cursor: pointer;
transition: .4s;
&:hover {
  background: rgba(20, 20, 20, .8);
  padding: 10px 80px;
}
`
export const Modal=styled.div`
position:fixed;
top:0;
left:0;
z-index:1600;
width:100%;
height:100%;
overflow-x:hidden;
overflow-y:auto;
outline:0;
display:none;
${props=>props.showModal&&
`display:block`
}
`
export const Loader=styled.div`
    text-align: center;
    padding:10px;
    margin-top: 20px;
`