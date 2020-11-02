import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import { thisExpression } from '@babel/types';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Create Appoinments'

class Spestedy2 extends Component {
    constructor(){
        super();
        
        this.state={
           deptId:sessionStorage.getItem('costCenterNo'),
           appointmentId:"",
            rptUser:[],
            applicationNoList:[],
            applicationNo:"",
            curDate: new Date(),
            allocatedTo:"",
            appoinmentType:"",
            timeSession:"",
            description:"",
            referenceNo:"",

        }
        this.handleChange=this.handleChange.bind(this)
        this.handleDateChange=this.handleDateChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        console.log(this.state.date)       
    }

    handleSubmit(e){
      e.preventDefault();
         this.state.applicationNoList.map(mapTo=>{
           if(this.state.applicationNo===mapTo.applicationNo){
              this.setState({referenceNo:mapTo.idNo})
           }
         })
         
          var correctDate=this.state.curDate
          correctDate = correctDate.getFullYear() + "-" + ("0" + (correctDate.getMonth() + 1)).slice(-2) + "-" + ("0" + correctDate.getDate()).slice(-2)
          console.log(correctDate)

        fetch(`/application/changeStatus?applicationNo=${this.state.applicationNo}&allocatedDate=${correctDate}&allocatedTo=${this.state.allocatedTo}`,{
          method:'GET',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        
      });

        const item ={
          id:{deptId:this.state.deptId,appointmentId:this.state.applicationNo},
          allocatedDate:correctDate,
          status:"A",
          allocatedTo:this.state.allocatedTo,
          timeSession:this.state.timeSession,
          description:this.state.description,
          appoinmentType:this.state.appoinmentType,
          referenceNo:this.state.referenceNo,

        }

        console.log(this.state.referenceNo)
        console.log(this.state.deptId)
        
        fetch('/spestedy/add', {
           method:'POST',
           headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      }).then(console.log(item))
    
    }

    async afterSubmit(){
      const item ={
        id:{deptId:this.state.deptId,appointmentId:this.state.applicationNo,},
        submitDate:this.state.submitDate,
        status:"A"
      }
      console.log(this.state.deptId)
      
     await fetch('/spestedy/add', {
        method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    }).then(console.log(item))
    }

    componentDidMount(){
        fetch(`/sauserm/allocatedTo`)
        .then(response =>  response.json())
        .then(data => this.setState({rptUser: data}))

        fetch(`/application/getAllConfirmedApplication`)
        .then(response =>  response.json())
          .then(data => this.setState({applicationNoList: data},()=>console.log(this.state.applicationNoList)))
      }
      handleChange(e){
         this.setState({[e.target.name]:e.target.value})
      }
      handleDateChange(date) {
         this.setState({
             curDate: date
         });
     }
  render() {
    const {rptUser,applicationNoList}=this.state;
    const AppNoList=applicationNoList.map(anl=>{
        return <option value={anl.applicationNo}>{anl.applicationNo}</option>  
    }

    )
    const rptUserList= rptUser.map(rpt=>{
        return <option value={rpt}>{rpt}</option>
     })
     
    return (
      <div>
      <div className="padding">
      <a className="path" href="/home">  Home  </a> |
      <a className="path" href="/home"> Appoinments  </a> |
      <a className="path2" href="/spestedys"> Create Appoinments </a>
      <h3 align="center">Shedule</h3>
               <Helmet>
          <title>{ TITLE }</title>
        </Helmet>    
        </div>     
        <div style={{marginTop:"20vh",marginLeft:"20vh"}}>
        <div style={{marginLeft:"2vh"}}> <h3>Shedule</h3> </div>
        <br></br>
      <div class="container-fluid">
         <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className="form-group row ">
                 <label className="col-form-label col-md-3 col-sm-6">Cost Center</label>
                 <option className="form-control col-md-3 col-sm-6 ">{sessionStorage.getItem("costCenterNo")}</option>
              </div>
              <div className="form-group row">
                 <label className="col-form-label col-md-3 col-sm-6">Application Number</label>
                 <div>
                 <select value={this.state.applicationNo} name="applicationNo" className="form-control" onChange={this.handleChange}>
                 <option>Please Select</option>
                 {AppNoList}              
                 </select>
                 </div>
              </div>
              <div className="form-group row">
                 <label className="col-form-label col-md-3">Session</label>
                 <div>          
                <select  name="timeSession" className="form-control" onChange={this.handleChange}>
                 <option>Please Select</option>
                 <option>Morning</option>
                 <option>Evening</option>             
                 </select>
                 </div>
              </div>
              <div className="form-group row">
                 <label className="col-form-label col-md-3">Description</label>
                 <textarea name="description" cols="35" rows="3" value={this.state.description} onChange={this.handleChange}></textarea>
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="form-group row">
                 <label className="col-form-label col-md-3">Allocated To</label>
                 <div>
                 <select value={this.state.allocatedTo} name="allocatedTo" className="form-control" onChange={this.handleChange}>
                 <option>Please Select</option>
                 {rptUserList}              
                 </select>
                 </div>
              </div>
              <br></br>
              <div className="form-group row">
                 <label className="col-form-label col-md-3">Appoinment Type</label>
                 <div>
                 <select  name="appoinmentType" className="form-control" onChange={this.handleChange}>
                 <option>Please Select</option>
                 <option>ES.VISIT</option>             
                 </select>
                 </div>
              </div>
              <br></br>
              <div className="form-group row">
                 <label className="col-form-label col-md-3 col-sm-3" for="start">Date</label>
                 <DatePicker
                 className="form-control col-md-8 col-sm-3 "
                 
                     selected={this.state.curDate}
                     onChange={this.handleDateChange}
                     
                 /> 
              </div>
            </div>
         </div>    
      </div>
      </div>
      <div>
         <button type="button" class="btn btn-outline-light book_button5" style={{marginLeft:"22vh",marginTop:"10vh"}} onClick={this.handleSubmit}>Create</button>
      </div>
      </div>
      
    )
  }
}

export default Spestedy2 ;
