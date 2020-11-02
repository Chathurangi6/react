import React, { Component } from 'react';
import "./css/SelectCostCenter.css";
import { Helmet } from 'react-helmet'
const TITLE = 'COST CENTER'
class SelectCostCenter extends Component {
    constructor(){
        super();
        this.state={
            costCenterNo :"",
            jobType:sessionStorage.getItem('jobType'),
            userName:sessionStorage.getItem('userName'),
            validCostCenter:[],
            region:sessionStorage.getItem('region'),
            authorizedType:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleCostCenter=this.handleCostCenter.bind(this);
        this.afterSetStateFinished=this.afterSetStateFinished.bind(this);
    }
   
    async componentDidMount(){
        await fetch(`/sauserm/getReportUser?userId=${this.state.userName}`)
         .then(response =>  response.text())
           .then(data => this.setState({costCenterNo: data}))
           
        await fetch(`/sausrdpm/getAuthorizedCostCenters?userId=${this.state.userName}`)
         .then(response =>  response.json())
           .then(data => this.setState({validCostCenter: data}))
           
        await fetch(`/applicationType/getAuthorizedType?deptId=${this.state.costCenterNo}`)
           .then(response =>  response.json())
             .then(data => this.setState({authorizedType: data}))
    }
    async handleSubmit(e){
        e.preventDefault();
        const item={
            deptId:this.state.costCenterNo,
            jobType:this.state.jobType,
            userId:this.state.userName,
            region:this.state.region
        }
        await fetch('/loginDetail/add', {
            method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),
        });
        sessionStorage.setItem('costCenterNo',this.state.costCenterNo)
        sessionStorage.setItem('jobType',this.state.jobType)
        this.props.history.push('/home');
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
   handleCostCenter(e){
        
        this.setState({
            costCenterNo:e.target.value
        },()=>this.afterSetStateFinished())    
       
    }
    afterSetStateFinished(){
        fetch(`/applicationType/getAuthorizedType?deptId=${this.state.costCenterNo}`)
           .then(response =>  response.json())
             .then(data => this.setState({authorizedType: data}))
            
    }
  render() {
      
      const {authorizedType}=this.state;
      const jobList= authorizedType.map(job=>{
         return <option value={job.applicationType}>{job.description}</option>
      })
    return (
     
        <div>
             <Helmet>
          <title>{ TITLE }</title>
        </Helmet> 
        <div
       
        className="content">
          </div>
       
              <div>
        <div className="container" align="center" style={{marginTop: '-80vh'}}>
        <div class="card border-warning mb-3" style={{width: '20rem',height:'20rem'}}>
            <div class="card-header" class="card text-white  mb-3"style={{height:'5rem',backgroundColor:"#850a0a"}}>
                <div style={{marginRight:"45vh",marginTop:"2vh"}}>
        <img src={require('../../assets/logo1.png')} style={{marginTop:"-1vh"}}
            height='45'
            width='55'
            
        />
        </div><h5 style={{marginTop:"-6vh",marginRight:"-7vh" }} class="text-white">Cost Center / Job Type</h5></div>
            <div class="card-body text-primary">
            {/* <div className="form-group row"> */}
            <div style={{marginTop:"-5vh"}}>
                <label className="col-sm-12 col-form-label">Cost Center Number</label>
                    {/* <div className="col-sm-6">  */}
                    
                        <select type="text"  value={this.state.costCenterNo} name="costCenterNo" className="form-control"  onChange={this.handleCostCenter} >
                            <option >{this.state.costCenterNo}</option>
                            {this.state.validCostCenter.map(num=><option >{num}</option>)}
                            
                        </select>
                    {/* </div>                                            */}
            {/* </div> */}
            {/* <div className="form-group row"> */}
                    <label className="col-sm-4 col-form-label">Job Type</label>
                        {/* <div className="col-sm-6"> */}
                        <select value={this.state.jobType} name="jobType" className="form-control" onChange={this.handleChange}>
                        <option>Select Job Type</option>
                        {jobList}
                        
                        </select>
                        {/* </div> */}
            {/* </div>   */}
            <br></br><br></br>
            <div className=" row intro_row">
            <div className="col-sm-6">
            <button type="button" className="book_butto5 btn-block" onClick={this.handleSubmit}>Enter</button>{' '}
            {/* <button type="button" class="btn btn-primary btn-block">Clear</button>{' '} */}
            </div>
            <div className="col-sm-6">
            <button type="button" className="book_button6 btn-block">Clear</button>{' '}
            </div>
            </div>
            </div>
            </div>
        </div>
        </div>
        
        </div>
        
        </div>
    )
  }
}

export default SelectCostCenter;