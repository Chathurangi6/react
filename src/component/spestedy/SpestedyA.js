import React, { Component } from 'react'
import { Table } from 'reactstrap';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2'
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Active/Failed Appoinment'

class SpestedyA extends Component {
    constructor(){
        super();
        this.state={
            applicationNumList:[],
            curDate: new Date(),
            selected: {},
            toSendStatus:[],
            applicationNo:"",
            
        }
        this.handleDateChange=this.handleDateChange.bind(this)
        this.handleSelect=this.handleSelect.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSelect(e){
      const selected=this.state.selected;
      const toSendStatus=this.state.toSendStatus;
      selected[e.target.id] = e.target.checked;
      if(selected[e.target.id]===true){
        var feed={applicationNo:e.target.id}
        toSendStatus.push(feed)
      }
      if(selected[e.target.id]===false){ 
        var index=toSendStatus.findIndex(v => v.applicationNo === e.target.id)
          toSendStatus.splice(index,1)
      }
      this.setState({ selected });
      console.log(selected)
    }

    handleSubmit(e){
       e.preventDefault();
console.log(this.state.toSendStatus)
       this.state.toSendStatus.map(mapTo=>{

        fetch(`spestedy/changeStatusToF?applicationNo=${mapTo.applicationNo}`,{
          method:'GET',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}) .then(response=>{
          if(response.status === 200) {
          Swal.fire({    
              type: 'success',
              title: 'Application Failed Sucessfully ',
              showConfirmButton: false,
              timer: 1500
            })
            this.setState({item:"",deptId:"",deptCode:""})
            
          }},error=>{
              if(error.response.status===500)
              alert("Try Again!")
          }
      )  
         })
         
    }

    handleDateChange(date) {
        this.setState({
            curDate: date
        },()=>this.getDetail());
    }

    getDetail(){
        var correctDate=this.state.curDate
        correctDate = correctDate.getFullYear() + "-" + (correctDate.getMonth() + 1) + "-" + correctDate.getDate()
        fetch(`/spestedy/findByDate?allocatedDate=${correctDate}`)
        .then(response=>response.json())
        .then(data => this.setState({applicationNumList: data}))   
    } 

    componentDidMount(){
     this.getDetail() 
    }

  render() {

    const {applicationNumList}=this.state;
    const appNumList =applicationNumList && applicationNumList.map((aplno,i)=>{
        return <tr key={i}>
    
          <td>
          <div className="checkbox ">
          <label>
          <input 
             type="checkbox" 
             id={aplno.id.appointmentId}
           //  name={""}
            // checked={""} 
            onChange={this.handleSelect}
             
             />
          </label>
        </div>
        </td>
          <td>{aplno.referenceNo}</td>
          <td>{aplno.id.appointmentId}</td>
          <td>{sessionStorage.getItem('userName')}</td>
          <td>{aplno.description}</td>
          <td>{aplno.timeSession}</td>
          <td>{aplno.id.deptId}</td>
          <td>{aplno.appoinmentType}</td>
          <td>{aplno.status}</td>
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
        <a className="path2" href="/spestedya"> Active/Failed</a>
     </div>
        <h3 align="center">Active / Failed Appoinments </h3>
      <br></br>
      <div>
      <label className="col-form-label col-md-1 col-sm-1" for="start">Selected Date</label>
      <DatePicker
      className="form-control col-md-8 col-sm-3 "
      
          selected={this.state.curDate}
          onChange={this.handleDateChange}
          
      /> 
   </div>

         <div>
         <br></br><br></br><br></br><br></br>
         <Table>
         <thead>
          <tr>
             <th width="10%">Check</th>
             <th width="10%">Id</th>
             <th width="14%">Application No</th>
             <th width="12%">Alocated By</th>
             <th width="14%">Description</th>
             <th width="10%">Time</th>
             <th width="10%">Cost Center</th>
             <th width="10%">Appt Time</th>
             <th width="10%">Status</th>
          </tr>
         </thead>
            <tbody>
               {appNumList}
            </tbody>
        </Table>
         </div>
         <div>
         <button type="button" class="btn btn-outline-light book_button5" style={{marginLeft:"10vh",marginTop:"10vh",fontSize:"80%"}} onClick={this.handleSubmit} >Change Status</button>
      </div>
      </div>
    )
  }
}

export default SpestedyA ;
