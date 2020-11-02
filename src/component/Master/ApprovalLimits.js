import React, { Component } from 'react';
import Swal from 'sweetalert2'



class ApprovalLimits extends Component {
    constructor(){
        super();
        this.state={
            deptId:"",applicationType:"",limitFrom:"",statusFrom:"",
            approvalType:"",userLevelList:['ES','EA','EE','CE','DGM','AGM'],limitTo:"",statusTo:"",userLevel:"",deptType:"",statusToList:[]
        }
        this.handleDeptId=this.handleDeptId.bind(this);
      //  this.afterHandleDeptId=this.afterHandleDeptId.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleUserLevel=this.handleUserLevel.bind(this);
        this.afterHandleUserLevel=this.afterHandleUserLevel.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.cancel=this.cancel.bind(this);
    }
     handleDeptId(e){
       // this.setState({deptId:e.target.value},()=>this.afterHandleDeptId())
       this.setState({deptId:e.target.value})    
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    // async afterHandleDeptId(){
    //     var deptType= await (await fetch(`/gldeptin/getDeptType?deptId=${this.state.deptId}`)).text()
    //     .then(data=>this.setState({deptType:data}))
    //     if(this.state.deptType=="area"){
    //         this.setState({userLevelList:['ES','EA','EE','CE','DGM','AGM']})
    //     }
    //     if(this.state.deptType=="depo"){
    //         this.setState({userLevelList:['ES']})
    //     }
    // }
    handleUserLevel(e){    
        this.setState({userLevel:e.target.value},()=>this.afterHandleUserLevel())    
    }
    async handleSubmit(e){
        e.preventDefault();
        const item={id:{deptId:this.state.deptId,
            applicationType:this.state.applicationType,
            limitFrom:this.state.limitFrom,
            statusFrom:this.state.statusFrom,
            approvalType:this.state.approvalType,
            limitTo:this.state.limitTo,
            statusTo:this.state.statusTo,
            userLevel:this.state.userLevel}
            
        }
        await fetch('/appestlim/add', {
            method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)}).then(response=>{
            if(response.status === 200) {
            Swal.fire({    
                type: 'success',
                title: 'Sucessfully saved',
                showConfirmButton: false,
                timer: 1500
              })
            }},error=>{
                if(error.response.status===500)
                alert("Try Again!")
            }
        )  
        
    }
    afterHandleUserLevel(){
      //  if(this.state.deptType=="area" && this.state.approvalType=="EST"){
            switch(this.state.userLevel){
                case 'ES':
                    this.setState({limitFrom:0,limitTo:25000,statusFrom:'ES',statusToList:[{value:'45',status:'EA'},{value:'46',status:'EE'},{value:'47',status:'CE'}]})
                break
                case 'EA':
                    this.setState({limitFrom:0,limitTo:50000,statusFrom:45,statusToList:[{value:'46',status:'EE'},{value:'47',status:'CE'}]})
                break
                case 'EE':
                    this.setState({limitFrom:0,limitTo:250000,statusFrom:46,statusToList:[{value:'47',status:'CE'},{value:'48',status:'DGM'}]})
                break
                case 'CE':
                    this.setState({limitFrom:0,limitTo:1000000,statusFrom:47,statusToList:[{value:'48',status:'DGM'}]})
                break
                case 'DGM':
                    this.setState({limitFrom:0,limitTo:15000000,statusFrom:48,statusToList:[{value:'49',status:'AGM'}]})
                break
                case 'AGM':
                    this.setState({limitFrom:0,limitTo:50000000,statusFrom:49,statusToList:[{value:'42',status:'GM'}]})
                break
            }
        }
      //  }
        // if(this.state.deptType=="depo" && this.state.approvalType=="EST"){
        //     switch(this.state.userLevel){
        //         case 'ES':
        //             this.setState({limitFrom:0,limitTo:25000,statusFrom:44,statusToList:[{value:'46',status:'EE'}]})
        //         break
                
        //     }
        // }
        // if(this.state.deptType=="area" && this.state.approvalType=="JOB"){
        //     switch(this.state.userLevel){
        //         case 'ES':
        //             this.setState({limitFrom:0,limitTo:25000,statusFrom:55,statusToList:[{value:'56',status:'EA'},{value:'57',status:'EE'},{value:'61',status:'CE'}]})
        //         break
        //         case 'EA':
        //             this.setState({limitFrom:0,limitTo:50000,statusFrom:56,statusToList:[{value:'57',status:'EE'},{value:'61',status:'CE'}]})
        //         break
        //         case 'EE':
        //             this.setState({limitFrom:0,limitTo:250000,statusFrom:57,statusToList:[{value:'61',status:'CE'},{value:'58',status:'DGM'}]})
        //         break
        //         case 'CE':
        //             this.setState({limitFrom:0,limitTo:1000000,statusFrom:61,statusToList:[{value:'58',status:'DGM'}]})
        //         break
        //         case 'DGM':
        //             this.setState({limitFrom:0,limitTo:15000000,statusFrom:58,statusToList:[{value:'59',status:'AGM'}]})
        //         break
        //         case 'AGM':
        //             this.setState({limitFrom:0,limitTo:50000000,statusFrom:59,statusToList:[{value:'62',status:'GM'}]})
        //         break
        //     }
        // }
        // if(this.state.deptType=="depo" && this.state.approvalType=="JOB"){
        //     switch(this.state.userLevel){
        //         case 'ES':
        //             this.setState({limitFrom:0,limitTo:25000,statusFrom:55,statusToList:[{value:'56',status:'EA'},{value:'57',status:'EE'},{value:'61',status:'CE'}]})
        //         break
                
        //     }
        // }
cancel(){
        this.setState({
            deptId:"",applicationType:"",limitFrom:"",statusFrom:"",
            approvalType:"",userLevelList:[],limitTo:"",statusTo:"",userLevel:"",deptType:"",statusToList:[]
        })
    }
  render() {
    
    return (
        <div>
          <br/><br/><br/><br/><br/><br/>  
        <div className="container" align="center" style={{position:"relative"}}>
          <h1>Approval Limits</h1>
          <form id="appestlim-form">
          <div className="row">
            <div className="col-sm-6">
                
                    <div className="form-group row">
                    <label className="col-form-label">Cost Center</label>
                    <input name="deptId"  value={this.state.deptId} onChange={this.handleDeptId} class="form-control mr-sm-5" type="text" />
                    </div>
                                
                    <div className="form-group row">
                            <label className="col-form-label">Application Type</label>    
                                <select value={this.state.applicationType} name="applicationType" className="form-control mr-sm-5" onChange={this.handleChange} required>
                                    <option>Select Job Type</option>
                                    <option value="NC">New Connection</option>
                                    <option value="TC">Temporary Connection</option>
                                    <option value="CR">Cost Recovery</option>
                                    <option value="MT">Maintenance</option>
                                    <option value="BD">Breakdown</option>
                                    <option value="SA">Sys. Augmentation</option>
                                    <option value="AM">AMU Jobs</option>
                                    <option value="RE">RE Jobs</option>
                                    <option value="ABC">ABC Jobs</option>
                                    <option value="EM">EMU Jobs</option>
                                </select>                         
                    </div> 
                    <div className="form-group row">
                            <label className="col-form-label">Limit From</label>    
                                <input type="text" value={this.state.limitFrom} name="limitFrom" className="form-control mr-sm-5" onChange={this.handleChange} required></input>                          
                    </div> 
                    <div className="form-group row">
                            <label className="col-form-label">Status From</label>    
                                <input type="text" value={this.state.userLevel} name="userLevel" className="form-control mr-sm-5" disabled></input>                          
                    </div> 
            </div>
            <div className="col-sm-6">
                    <div className="form-group row">
                    <label className="col-form-label">Approval Type</label>
                    <select name="approvalType"  value={this.state.approvalType} onChange={this.handleChange} class="form-control mr-sm-2" type="text">
                        <option>Select Approval Type</option>
                        <option value="JOB">Job</option>
                        <option value="EST">Estimate</option>
                    </select>
                    </div>
                                
                    <div className="form-group row">
                            <label className="col-form-label">User Level</label>    
                                <select type="text"  name="userLevel" className="form-control" onChange={this.handleUserLevel}>
                                    <option>Select user Level</option>
                                    {this.state.userLevelList && this.state.userLevelList.map((user,i)=><option key={i} value={user}>{user}</option>)}
                                </select>                          
                    </div> 
                    <div className="form-group row">
                            <label className="col-form-label">Limit To</label>    
                                <input type="text" value={this.state.limitTo} name="limitTo" className="form-control" onChange={this.handleChange} required></input>                          
                    </div> 
                    <div className="form-group row">
                            <label className="col-form-label">Status To</label>    
                                <select type="text" value={this.state.statusTo} name="statusTo" className="form-control" onChange={this.handleChange} required>
                                <option>Select Status To</option>
                                    {this.state.statusToList && this.state.statusToList.map((status,i)=><option key={i} value={status.value}>{status.status}</option>)}
                                </select>                          
                    </div> 
            </div>
        </div>
            <div className="row intro_row">
                <div className="col-sm-6">
                    <button type="button" class="btn btn-primary btn-block" onClick={this.handleSubmit}>Add</button>{'  '}
                </div>
                <div className="col-sm-6">
                    <button type="button" class="btn btn-primary btn-block" onClick={this.cancel} >Cancel</button>
                </div>  
            </div> 
            </form>         
        </div>
      
      </div>
    )
  }
}
export default ApprovalLimits;




