import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../css/ContractorGroup.css';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import '../../css/Path.css';
const TITLE = 'Contractor group';


class ContractorGroup extends Component {

  emptyIdGroup={
    deptId:''
  };
  costCenter=sessionStorage.getItem('costCenterNo');
 // var str2 = str1.slice(0, -1) + '.';
  areaCostCenter= this.costCenter.slice(0,-2)+'00';
  
  constructor(props) {
    super(props);
    this.state = {
      contractors: [], 
      isLoading: true, 
      idGroup:this.emptyIdGroup,
      deptIds:[],
      depotContractors:[], 
      isDepotContractors:false,
      userName:sessionStorage.getItem('userName'),
      costCenterNo:this.areaCostCenter,
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit=this.handleSubmit.bind(this);
    this.copyContractor=this.copyContractor.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch(`/contractor/findByIdDeptId?deptId=${this.state.costCenterNo}`)
      .then(response => response.json())
      .then(data => this.setState({contractors: data, isLoading: false}));
    
      // fetch('/contractor/allDeptIds')
      // .then(response => response.json())
      // .then(data => this.setState({deptIds: data}));

    // const departIds=['514.00', '514.10','514.20'];
    // this.setState({deptIds:departIds});

    fetch(`/sausrdpm/getAuthorizedCostCenters?userId=${this.state.userName}`)
         .then(response =>  response.json())
           .then(data => this.setState({deptIds: data}))
    console.log(this.state.userName);
    console.log(this.state.costCenterNo);
  }

  handleChange(event){
    this.setState({isDepotContractors:false});
      //console.log(this.state.deptId);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let idGroup = {...this.state.idGroup};
    idGroup[name] = value;
    this.setState({idGroup});
    
    console.log(idGroup.deptId);
    if(idGroup.deptId){
      fetch(`/contractor/findByIdDeptId?deptId=${idGroup.deptId}`)
      .then(response => response.json())
      .then(data => this.setState({depotContractors: data, isDepotContractors: true}));
    }
  }

//   handleSubmit(event){
//     event.preventDefault();
//     console.log(this.state.deptId);
//     this.setState({isDepotContractors:false})
//     fetch(`/contractor/findByIdDeptId?deptId=${this.state.deptId}`)
//       .then(response => response.json())
//       .then(data => this.setState({depotContractors: data, isDepotContractors: true}));
//     //this.props.history.push("/applicant/result/" + this.state.idNo);
//  }

 async copyContractor(contractor) {

  const message= await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, copy it!'
  })
  if(message.value){
  if(this.state.idGroup.deptId==''){
    //alert("fill out the cost center");
    Swal.fire(
      'Error!',
      'Please select the cost center',
      'error'
    )
  }else{
    if(!this.state.isDepotContractors){
      fetch(`/contractor/findByIdDeptId?deptId=${this.state.idGroup.deptId}`)
      .then(response => response.json())
      .then(data => this.setState({depotContractors: data, isDepotContractors: true}));
    }

    const person = await (await fetch(`/contractor/existsByIdContractorIdAndIdDeptId?contractorId=${contractor.id.contractorId}&deptId=${this.state.idGroup.deptId}`)).json();
    
    if(person){
      //alert("contractor exist");
      Swal.fire(
        'Error!',
        'contractor exist',
        'error'
      )
    }else{
      contractor.id.deptId=this.state.idGroup.deptId;
      const response=await fetch('/contractor/addToDepot', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contractor),
      });

      fetch(`/contractor/findByIdDeptId?deptId=${this.state.idGroup.deptId}`)
          .then(response => response.json())
          .then(data => this.setState({depotContractors: data, isDepotContractors: true}));
     
      if(response.status){
        Swal.fire(
          'Copied!',
          'Contractor has been copied.',
          'success'
        )
      }else{
        Swal.fire(
          'Error!',
          'Contractor has not been copied.',
          'error'
        )
      }
    
    }
    
    
  }
  
}
 
}

  render() {
    const {contractors, isLoading, deptIds, depotContractors, isDepotContractors} = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const contractorList = contractors.map(contractor => {

      return <tr key={[contractor.id.contractorId,contractor.id.deptId]}>
        {/* <td><input type="checkbox" class="form-check-input" value=""/></td> */}
        <td>{contractor.id.contractorId}</td>
        <td>{contractor.contractorName}</td>
        <td>{contractor.jobInHand}</td>
        <td>{contractor.totalAmount}</td>
        <td>{contractor.bondNo}</td>
        <td>{contractor.startDate}</td>
        <td><Button size="sm" type="button" color="primary" onClick={()=>this.copyContractor(contractor)}>Copy</Button></td>
      </tr>
    });

    

    return (
      <div> 
<Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/home">  Contractor  </a> |
        <a className="path2" href="/contractor/groupAdd">  Contractor Group</a> 
        </div>
        <Container fluid>
          {/* <div className="row float-right">
            
            <div className="col-md-4 mb-3">

            <Button color="success" tag={Link} to="/contractor/add">Add contractor</Button>
            </div>
            
          </div> */}
          <h3>CONTRACTORS</h3>
        <br></br>
        <div className="row block-row">
            {/* <div className="col-sm-1"></div> */}
            <div className="col-sm-6" >
              <div className="column-border-left">
              <br></br>
                <h4 class="text-center">Area Contractors List ({this.state.costCenterNo})</h4>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="custom-scrollbar">
                <Table className="mt-4">
                  <thead>
                  <tr>
                    {/* <th></th> */}
                    <th width="10%">ID</th>
                    <th width="20%">Name</th>
                    <th width="20%">Jobs In Hand</th>
                    <th width="10%">Total Amount</th>
                    <th width="10%">Bond Number</th>
                    <th width="20%">Start Date</th>
                    <th width="10%">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {contractorList}
                  </tbody>
                </Table>
                </div>
                </div>
            </div>
            {/* <div className="col-sm-1">

            </div> */}
            <div className="col-sm-6">
            <div className="column-border-right">
            <br></br>
            <h4 class="text-center">Depot Contractors List</h4>
            <br></br>
            {/* <Form onSubmit={this.handleSubmit}>
              <div className="form-group row find-block">
                  <label for="deptId" className="col-sm-4 col-form-label">Cost center No To be Find</label>
                  <div className="col-sm-6">
                      <Input type="text" name="deptId" id="deptId" value={this.state.deptId}
                             onChange={this.handleChange} required/>
                  </div>
                  <div className="col-sm-2">
                      <Button type="submit" color="primary" >Find</Button>
                  </div>
              </div>
            </Form> */}

            <div className="form-group row bg-light">
            <label for="deptId" className="col-sm-2 col-form-label">Cost Center</label>
            <div className="col-sm-4">
                <select className="form-control" name="deptId" id="deptId" value={this.state.idGroup.deptId}
                    onChange={this.handleChange} >
                      <option value="">Please Select</option>
                      {/* <option value="514.00">514.00</option>
                      <option value="514.10">514.10</option>
                      <option value="514.20">514.20</option> */}
                    {
                        (deptIds && deptIds.length>0) && deptIds.map((departId)=>{
                            return(<option value={departId}>{departId}</option>);
                        })
                    }
                    
                </select>
            </div>
            </div>

            <br></br>
            {(()=>{
            if(isDepotContractors){
              return(
                <div className="table-wrapper-scroll-y custom-scrollbar">
                <Table className="mt-4">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Jobs In Hand</th>
                    <th>Total Amount</th>
                    <th>Bond Number</th>
                    <th>Start Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
        
                    this.state.depotContractorList = depotContractors.map(contractor => {

                     return <tr key={[contractor.id.contractorId,contractor.id.deptId]}>
                       <td>{contractor.id.contractorId}</td>
                       <td>{contractor.contractorName}</td>
                       <td>{contractor.jobInHand}</td>
                                     <td>{contractor.totalAmount}</td>
                       <td>{contractor.bondNo}</td>
                       <td>{contractor.startDate}</td>

                     </tr>
                    })
                  }
                  </tbody>
                </Table>
                </div>
              )
            }    

            })()}
            </div>
            </div>
            
          </div>
        </Container>
      </div>
    );
  }
}

export default ContractorGroup;