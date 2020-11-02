import React, { Component } from 'react'
import './ReportGenerate.css'

class ReportGenerate extends Component {
  constructor(){
    super();
    this.state={
      pane:"",
      deptId:sessionStorage.getItem('costCenterNo'),
      approvalType:"",userLevel:"",
      categoryList:[],subCatgryList:[],paneIdexes:[],submenu:""
    }
    this.pdfGeneratorForFirstOfM1=this.pdfGeneratorForFirstOfM1.bind(this)
    this.pdfGeneratorForSecondOfM1=this.pdfGeneratorForSecondOfM1.bind(this)
    this.handleChange=this.handleChange.bind(this);
    this.handleMainMenu=this.handleMainMenu.bind(this);
    this.buttonHandle=this.buttonHandle.bind(this);
  }

  componentDidMount(){
    fetch(`parameterDetail/getMainCategory`)
      .then(response =>  response.json())
        .then(data => this.setState({categoryList:data}))

        fetch(`subCatgry/all`)
        .then(response =>  response.json())
          .then(data => this.setState({subCatgryList:data},()=>console.log(this.state.subCatgryList)))
  }

  handleChange(e){
    this.setState({[e.target.name]:e.target.value})
  }


  handleSubMenu=(subId)=>{
    fetch(`parameters/getParameters?subId=${subId}`)
    .then(res=>res.json())
    .then(data=>this.setState({
      paneIdexes:data,
      submenu:subId,
      approvalType:"",
      userLevel:"",
    }))

  }

  handleMainMenu(){
    this.setState({
      paneIdexes:[],submenu:""
    })
  }
  
   async pdfGeneratorForFirstOfM1() { 
      await fetch(`/report/getAppestlim?deptId=${this.state.deptId}&approvalType=${this.state.approvalType}`)
      .then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'Appestlim1.pdf';
					a.click();
				});
		});    
   
  }

  async pdfGeneratorForSecondOfM1() { 
    await fetch(`/report/getAppestlim2?deptId=${this.state.deptId}&approvalType=${this.state.approvalType}&userLevel=${this.state.userLevel}`)
    .then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'Appestlim2.pdf';
        a.click();
      });
  });    
 
}

buttonHandle(){
  switch(this.state.submenu){
    case 's1':
      this.pdfGeneratorForFirstOfM1();
    break
    case 's2':
      this.pdfGeneratorForSecondOfM1();
  }
}

  render() {

    const DeptId= 
    <div className="form-group row">
      <label className="col-form-label">Dept Id</label>
      <input name="deptId" value={this.state.deptId} onChange={this.handleChange} className="form-control"/>
    </div>

    const ApprovalType=
    <div className="form-group row">
        <label className="col-form-label">Approval Type</label>
        <select name="approvalType" value={this.state.approvalType} onChange={this.handleChange} className="form-control">
            <option>Select Approval Type</option>
            <option value="JOB">Job</option>
            <option value="EST">Estimate</option>
        </select>
      </div>

    const UserLevel=
    <div className="form-group row">
          <label className="col-form-label">User Level</label>
          <select name="userLevel" value={this.state.userLevel} onChange={this.handleChange} className="form-control">
            <option>Select User Level</option>
            <option value="ES">ES</option>
            <option value="EA">EA</option>
            <option value="EE">EE</option>
            <option value="CE">CE</option>
            <option value="DGM">DGM</option>
            <option value="AGM">AGM</option>

          </select>
    </div>


      const {categoryList,subCatgryList}=this.state;
      const panes=[DeptId,ApprovalType,UserLevel]

      const main=(
        <ul class="mainmenu">
          {categoryList.map((side)=>
          
            <li key={side.main_name} className="active"><label for={side.main_name}  ><a onClick={this.handleMainMenu}>{side.main_name}</a></label><input type="checkbox" class="dropdown-toggle" id={side.main_name}/>
            <ul class="submenu">
              {subCatgryList.map(subb=>{
              if(subb.main_id===side.main_Id){
                
                return <li><a onClick={()=>this.handleSubMenu(subb.submenu_Id)}>{subb.submenu_name}</a></li>
              }
              
            })}
            </ul>
          </li>
          )}
      </ul>
      );

      const pages=(
          this.state.paneIdexes.map(i=>
            <div>
      {panes[i]}
      </div>)
      );
 
      let button;
      if(this.state.submenu!==""){
          button=<div><button onClick={this.buttonHandle}>Download</button></div>
        }

      
        return(
         <div className="wrapper">
          <nav class="sidebar">
          <div class="sidebar-header">
                <h3>SPS Admin</h3>
            </div>
              {main}
        </nav>
        <div className="contentt">
        <div class="container-fluid">  
            {pages}
           {button}
       
        </div>
        </div>
        </div>   
        )
    
  }
}
export default ReportGenerate;