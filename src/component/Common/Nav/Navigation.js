
import React from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl, Button } from 'react-bootstrap';
import './Css/Navigation.css';
 import {NavLink,withRouter} from 'react-router-dom';
//import {NavItem,} from  'reactstrap';
class Navigation extends React.Component {

  constructor() {
    super();
    this.state = {
      validCostCenter: [],
      userName: sessionStorage.getItem('userName'),
      costCenterNo: sessionStorage.getItem("costCenterNo"),
      authorizedType: [],
      jobType: sessionStorage.getItem("jobType")
    }
    this.handleCostCenter = this.handleCostCenter.bind(this)
    this.setCostCenter = this.setCostCenter.bind(this)
    this.handleJobType = this.handleJobType.bind(this)
    this.setJobType = this.setJobType.bind(this)
  }
  async componentDidMount() {
    await fetch(`/sausrdpm/getAuthorizedCostCenters?userId=${this.state.userName}`)
      .then(response => response.json())
      .then(data => this.setState({ validCostCenter: data }))
    await fetch(`/applicationType/getAuthorizedType?deptId=${this.state.costCenterNo}`)
      .then(response => response.json())
      .then(data => this.setState({ authorizedType: data }))
  }
  handleCostCenter(e) {
    this.setState({ [e.target.name]: e.target.value }, () => this.setCostCenter())
  }
  async setCostCenter(e) {
     sessionStorage.setItem('costCenterNo', this.state.costCenterNo)
     
    await fetch(`/applicationType/getAuthorizedType?deptId=${this.state.costCenterNo}`)
      .then(response => response.json())
      .then(data => this.setState({ authorizedType: data }))
      sessionStorage.removeItem('jobType')
      this.setState({jobType:''})
  }
  handleJobType(e) {
    this.setState({ [e.target.name]: e.target.value }, () => this.setJobType())
  }
  setJobType(e) {
    sessionStorage.setItem('jobType', this.state.jobType)
  }
  handleLogout=(e)=> {
    e.preventDefault();
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('jobType')
    sessionStorage.removeItem('region')
    sessionStorage.removeItem('costCenterNo')
    this.props.history.push('/')
  }
  render() {
    const { authorizedType } = this.state;
    const jobList = authorizedType.map(job => {
      return <option value={job.applicationType}>{job.applicationType}</option>
    })
    
    return (

 
 
      <Navbar className="sticky-top navColor" expand="lg">
        <Navbar.Brand href="#home">
          <img src={require('../../../assets/logo1.png')} width="60" height="50" alt=""/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item><NavLink className="nav-link" exact to="/home">
              Home
              </NavLink></Nav.Item>
      
            <NavDropdown title="Application" id="basic-nav-dropdown" >
            <NavDropdown title="Applicant" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
            <NavDropdown.Item ><NavLink className="nav-link" exact to="/applicant/search">Search Applicant</NavLink></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Application" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                {/* <NavDropdown.Item ><NavLink className="nav-link" exact to="/application/add">Add</NavLink></NavDropdown.Item> */}
                <NavDropdown.Item><NavLink className="nav-link" exact to="/application/search">Search</NavLink></NavDropdown.Item>
              </NavDropdown>
          </NavDropdown>
            <NavDropdown title="Shedule" id="basic-nav-dropdown" >
            <NavDropdown title="Appoinments" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="/spestedy">New Appoiment</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to="/spestedys">Create Appoiment</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to="/spestedya">Active / Failed</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to="/spestedyf">Failed/Active</NavLink></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="D Notice permissions" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="/spestpemAdd">New D Notice</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to="/spestpemEdit">Update D Notice</NavLink></NavDropdown.Item>
              </NavDropdown>
          </NavDropdown>
            <NavDropdown title="Estimation" id="basic-nav-dropdown" >

              <NavDropdown title="Service Estimation" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="/serviceEstimate/add">Add</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to="/serviceEstimate/edit">Edit</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to="/serviceEstimate/view">View/Delete</NavLink></NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Estimation" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="/estimate/add">Add</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to={"/estimate/edit"}>Edit</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to={"/estimate/view"}>View</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to={"/estimate/delete"}>Delete</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to={"/estimate/undoRejects"}>Activate Rejected Estimates</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to={"/estimate/approveOrReject"}>Approve/Reject</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to={"/estimate/approveLowerLevel"}>Approve Lower Level Estimates</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to={"/estimate/cancel"}>Cancel Approved Estimates</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to={"/job/create"}>Create Job</NavLink></NavDropdown.Item>

              </NavDropdown>
            </NavDropdown>
         
            <NavDropdown title="Manage Jobs" id="basic-nav-dropdown" >
              <NavDropdown.Item ><NavLink className="nav-link" exact to={"/job/revise"}>Revise Job</NavLink></NavDropdown.Item>
              <NavDropdown.Item ><NavLink className="nav-link" exact to={"/job/view"}>View Job</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink className="nav-link" exact to={"/job/undoRejects"}>Activate Rejected Jobs</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink className="nav-link" exact to={"/job/approveOrReject"}>Approve/Reject</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink className="nav-link" exact to={"/job/approveLowerLevel"}>Approve Lower Level Jobs</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink className="nav-link" exact to={"/job/cancel"}>Cancel Approved Jobs</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink className="nav-link" exact to={"/job/deactivate"}>Deactivate Job</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink className="nav-link" exact to={"/job/activate"}>Activate Job</NavLink></NavDropdown.Item>
              <NavDropdown title="Billing" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
            <NavDropdown.Item ><NavLink className="nav-link" exact to="/accountInfo">Acoount Info</NavLink></NavDropdown.Item>
            <NavDropdown.Item ><NavLink className="nav-link" exact to="/sendToBilling">Send To Billing</NavLink></NavDropdown.Item>
            </NavDropdown>
            </NavDropdown>
       

          <NavDropdown title="Letters" id="basic-nav-dropdown" >
            <NavDropdown title="Link 1" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
            <NavDropdown.Item ><NavLink className="nav-link" exact to="/applicant/search">Link 1.1</NavLink></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Link 2" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="/">Link 2.1</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to="/">Link 2.2</NavLink></NavDropdown.Item>
              </NavDropdown>
              </NavDropdown>

              <NavDropdown title="Reports" id="basic-nav-dropdown" >
            <NavDropdown title="Link 1" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
            <NavDropdown.Item ><NavLink className="nav-link" exact to="/applicant/search">Link 1.1</NavLink></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Link 2" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="/application/add">Link 2.1</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to="/application/search">Link 2.2</NavLink></NavDropdown.Item>
              </NavDropdown>
          </NavDropdown>
     
            <NavDropdown title="Master" id="basic-nav-dropdown" >
          
              <NavDropdown title="Cost Center Details" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="/gldeptin/add">Add</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/gldeptin/view">View</NavLink></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Material" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="/spdppolm">Add Pole</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/spestmtm">Search Material</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/sppolemt">Pole Material</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/spsvcwrm">Wire Material</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/spstrutm">Strut Material</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/spstaymt">Stay  Material</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/sploopmt">Loop Material</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/spugcblmh">Under Ground Material</NavLink></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Labour Activity Rates" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="/labour/findByDeptId">Manage Labour </NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink className="nav-link" exact to="/labour/groupAdd">Labour Group</NavLink></NavDropdown.Item>
              </NavDropdown>
            
        <NavDropdown title="Contractors" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="/contractor/findByDeptId">Manage Contractor</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/contractor/groupAdd">Contractor Group</NavLink></NavDropdown.Item>
              </NavDropdown>
            <NavDropdown title="Labour" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="splbpole">Pole Labour Rates</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exaTransport ct to="/splbpolt">Transport Labour Rates</NavLink></NavDropdown.Item>
               <NavDropdown.Item ><NavLink className="nav-link" exact to="/splbsrvc">Wire Labour Rates</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/splbstay">Stay Labour Rates</NavLink></NavDropdown.Item>
               <NavDropdown.Item ><NavLink className="nav-link" exact to="/splbstrt">Strut Labour Rates</NavLink></NavDropdown.Item>
               
              
               </NavDropdown>
              <NavDropdown.Item ><NavLink className="nav-link" exact to="/bank">Bank</NavLink></NavDropdown.Item>
              <NavDropdown.Item ><NavLink className="nav-link" exact to="/branch">Branch</NavLink></NavDropdown.Item>
              <NavDropdown.Item ><NavLink className="nav-link" exact to="/cscBank">Csc Bank</NavLink></NavDropdown.Item>
              <NavDropdown.Item ><NavLink className="nav-link" exact to="/tariff">Tariff</NavLink></NavDropdown.Item>
              <NavDropdown.Item ><NavLink className="nav-link" exact to="/tariffCategory">Tariff Category</NavLink></NavDropdown.Item>
              <NavDropdown.Item ><NavLink className="nav-link" exact to={"/conductorRate/all"}>Conductor Rates</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink className="nav-link" exact to={"/conversionRate/all"}>Conversion Rates</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink className="nav-link" exact to={"/standardConstructionRate/findByDeptId"}>Standard Construction Rates</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink className="nav-link" exact to={"/labourNorm/all"}>Labour Norms</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink className="nav-link" exact to={"/specialRate/findByDeptId"}>Special Rates</NavLink></NavDropdown.Item>
              <NavDropdown.Item><NavLink className="nav-link" exact to={"/loopServiceWire/findByDeptId"}>Loop Service Wires</NavLink></NavDropdown.Item>

              <NavDropdown title="History" id="basic-nav-dropdown" drop="right" className="dropdown-submenu" >
                <NavDropdown.Item ><NavLink className="nav-link" exact to="viewspugcblmh">History of Under Ground Material</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exaTransport ct to="/spsecdeph">History of Security Deposit</NavLink></NavDropdown.Item>
               <NavDropdown.Item ><NavLink className="nav-link" exact to="/spratesmh">History of Special Rates</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/splpsvcmh">History of Loop Service Wire Master</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/spcrconvh">History of Phase Construction Rates</NavLink></NavDropdown.Item>
               </NavDropdown>
           </NavDropdown>
           

           <NavDropdown title="Admin" id="basic-nav-dropdown" className="admin" >
           <NavDropdown.Item ><NavLink className="nav-link" exact to="/billing">Billing</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/warehouse">Warehouse</NavLink></NavDropdown.Item>
               <NavDropdown.Item><NavLink className="nav-link" exact to="/authorizedAppType">Job Type</NavLink></NavDropdown.Item>
           </NavDropdown>
        

            <Nav.Item>
             <div style={{color:"#ffff"}}>
               <Nav.Link className="sessionLink">{sessionStorage.getItem("userName")}</Nav.Link>
             </div>
           </Nav.Item>
           <Nav.Item>
              <Nav.Link>
                <select  className="sessionLink1" name="costCenterNo" value={this.state.costCenterNo} onChange={this.handleCostCenter}>
                  {this.state.validCostCenter.map(num => <option >{num}</option>)}
                </select>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <select value={this.state.jobType} name="jobType" onChange={this.handleJobType} className="sessionLink1" style={{ marginLeft: "1vh" }}>
                  {jobList}
                </select>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Form inline>

          <button onClick={this.handleLogout}
                    class="btn btn-outline-light book_button1 " color="link">Logout</button>

          </Form>
    
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Navigation);