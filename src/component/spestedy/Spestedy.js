import React, { Component,PureComponent } from 'react'
// import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/Spes.css';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import '../../css/Path.css';
import Calander from '../Common/Calander/Calander';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField } from 'availity-reactstrap-validation';
import { Button, FormGroup, Label, Card, CardBody, CardTitle, CardText, Col, Row, CustomInput, CardSubtitle, Alert, Jumbotron, Container, Table } from 'reactstrap';
import { Helmet } from 'react-helmet'
const TITLE = 'New Appointments'


class Spestedy extends React.PureComponent {
  constructor(){
    super();
    this.state={
      userIdList:[],
        allocatedTo:"",
        applirptUsercationNumList:[],
        submitDate: "",dateFromCalender:"",allocatedDate:"",
        selected: {},application:[],toSendStatus:[],applicationNo:"",
        curDate: "",applicationNumList:[]
        
    }
   this.handleChange=this.handleChange.bind(this)
   this.handleSubmit=this.handleSubmit.bind(this)
   this.handleDiscard=this.handleDiscard.bind(this)
   this.handleDateChange=this.handleDateChange.bind(this)
    
}


handleSelect = (idNo) =>e=> {
  
  const selected = this.state.selected;
  const toSendStatus=this.state.toSendStatus;
  selected[e.target.id] = e.target.checked;
  if(selected[e.target.id]===true){
    var feed={applicationNo:e.target.id,allocatedDate:e.target.name,referenceNo:idNo}
    toSendStatus.push(feed)
  }
  if(selected[e.target.id]===false){ 
    var index=toSendStatus.findIndex(v => v.applicationNo === e.target.id)
      toSendStatus.splice(index,1)
  }
  this.setState({ selected });
  
}
handleDateChange(date) {
  this.setState({
      curDate: date
  });
}

handleDiscard(e){
  e.preventDefault();
  this.state.toSendStatus.map(appNo=>{ 
    fetch(`/application/discardStatus?applicationNo=${appNo.applicationNo}`,{
      method:'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
  }
    )
}

handleSubmit(e){
  e.preventDefault();
  
  this.state.toSendStatus.map(mapTo=>{
    if(this.state.curDate==""){
      var correctDate=mapTo.allocatedDate
    }
    else{
      var correctDate=this.state.curDate

      correctDate = correctDate.getFullYear() + "-" + ("0" + (correctDate.getMonth() + 1)).slice(-2) + "-" + ("0" + correctDate.getDate()).slice(-2)
    }
   // this.setState({applicationNo:mapTo.applicationNo,submitDate:correctDate},()=>{
      console.log(correctDate)
    fetch(`/application/changeStatus?applicationNo=${mapTo.applicationNo}&allocatedDate=${correctDate}&allocatedTo=${this.state.allocatedTo}`, {
      method:'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }});
    const item ={
      id:{deptId:sessionStorage.getItem('costCenterNo'),appointmentId:mapTo.applicationNo,},
      allocatedDate:correctDate,
      status:"A",allocatedTo:this.state.allocatedTo,allocatedBy:sessionStorage.getItem('userName')
    }
    console.log(this.state.allocatedTo)
    console.log(sessionStorage.getItem('costCenterNo'))
    
    fetch('/spestedy/add', {
      method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item),
  }).then(console.log(item))

  //},()=>this.afterSubmit()) 
  }
    )
     
}
// async afterSubmit(){
//   const item ={
//     id:{deptId:sessionStorage.getItem('costCenterNo'),appointmentId:this.state.applicationNo,},
//     status:"A",
    
//   }
//   console.log(sessionStorage.getItem('costCenterNo'))
  
//  await fetch('/spestedy/add', {
//     method:'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(item),
// }).then(console.log(item))


// }
handleChange(e){
     this.setState({[e.target.name]:e.target.value})
    
}
componentDidMount(){
  fetch(`/sauserm/allocatedTo`)
  .then(response =>  response.json())
  .then(data => this.setState({userIdList: data},console.log(this.state.userIdList)))


  fetch(`/application/getAllConfirmedApplications`)
  .then(response=>response.json())
  .then(data => this.setState({applicationNumList: data},()=>console.log(this.state.applicationNumList)))
  

}

onChange = (e) => {
  var dateFromCalender =e.target.value
  this.setState({ dateFromCalender })
}

render() {
const {userIdList,applicationNumList,selected,handleSelect}=this.state;
const curruntDate=new Date()
const formatted_date = curruntDate.getFullYear() + "-" + (curruntDate.getMonth() + 1) + "-" + curruntDate.getDate()

  const UserId= userIdList.map(rpt=>{
     return <option value={rpt}>{rpt}</option>
  })
  

  const appNumList =applicationNumList && applicationNumList.map((aplno,i)=>{
    return <tr className="check_box1">

      <td>
      <div class="checkbox ">
      <label>
      <input 
         type="checkbox" 
         id={aplno.applicationNo}
         name={aplno.submitDate}
         checked={this.state.selected[aplno.applicationNo]} 
         onChange={this.handleSelect(aplno.idNo)}
         
         />
      </label>
    </div>
    </td>
      <td>{aplno.applicationNo}</td>
      <td>{aplno.submitDate}</td>
    </tr>

  });
return (
  <div>
  <Helmet>
  <title>{ TITLE }</title>
</Helmet>
  <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home"> Appoinments  </a> |
        <a className="path2" href="/spestedy"> New Appoinments </a>
    </div>
        <h3 align="center">New Appoinment</h3>
    <div class="intro" style={{marginTop:'5vh'}}>
                        <div class="container-fluid"> 
        <div className="row">
        <div  className="col-sm-6 col-md-2">
          <h5 style={{marginTop:'1vh',float:'right'}}>Allocated To</h5>
        </div>        
          <div className="col-sm-6 col-md-2">
              <div 
            style={{marginBottom:'2vh'}}
              >      
                    <select value={this.state.allocatedTo} name="allocatedTo" className="form-control" onChange={this.handleChange}>
                    <option>--Please Select--</option>
                    {UserId}              
                    </select>
              </div>
            </div>
              
             <div className="col-sm-6 col-md-2 offset-md-6">
             
             <DatePicker
             className="form-control col-md-8 col-sm-3 "
              placeholderText={formatted_date}
                 selected={this.state.curDate}
                 onChange={this.handleDateChange}
                 
             /> 
             </div>         
         </div>
         <div class="table-wrapper-scroll-y scrollbar">
         <Table >
     
     <thead>
     <tr>
       <th width="40%">Id</th>
       <th width="30%">Application No</th>
       <th width="30%">Application Date</th>
     </tr>
     </thead>
     <tbody>
          {appNumList}
          </tbody>
   </Table>
   </div>
   <div className="row intro_row" style={{marginTop:"5vh"}}>
     <div>
       <button type="button"class="btn btn-outline-light book_button5 " onClick={this.handleSubmit}>Create</button>
     </div>
     <div>
       <button type="button"class="btn btn-outline-light book_button5 " onClick={this.handleDiscard}>Discard</button>
     </div>
   </div>
         </div>
         </div>

         <div style={{marginLeft:"2vh",marginTop:"-40vh"}}>
         <Container fluid>
   
       </Container>
       </div>
     
      </div>


      
)
}
}

export default Spestedy;
