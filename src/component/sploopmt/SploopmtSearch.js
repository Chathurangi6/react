import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, ButtonGroup, Input, Table, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Loop Material';

class SploopmtSearch extends Component {

 
    emptySploopmt={
        id:{
        deptId:sessionStorage.getItem('costCenterNo'),
        matCd:'',
        phase:1,
        connectionType:15,
        wiringType:"OH"
        },
        matQty:''
		    
  };

  constructor(props) {
    super(props);
    this.state={
        sploopmt:this.emptySploopmt,
        sploopmts:[],
        sploopmtss:[],

        isLoading: true,
        isMaterial:false

    };
    this.handleChange = this.handleChange.bind(this);
    this.remove = this.remove.bind(this);

}
handleChange(event) {
  this.setState({isMaterial:false});
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let sploopmt = {...this.state.sploopmt};
    sploopmt[name] = value;
    sploopmt.id[name]=value;
    this.setState({sploopmt});
    this.setState({isMaterial:true});
    fetch(`/sploopmt/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdWiringType?deptId=${sploopmt.id.deptId}&phase=${sploopmt.id.phase}&connectionType=${sploopmt.id.connectionType}&wiringType=${sploopmt.id.wiringType}`)
    .then(response => response.json())
    .then(data => this.setState({sploopmts: data, isLoading: false}));
    this.props.history.push("/sploopmtresult/"+this.state.sploopmt.id.deptId+"/"+this.state.sploopmt.id.phase+"/"+this.state.sploopmt.id.connectionType+"/"+this.state.sploopmt.id.wiringType)

  }
  
  

  async componentDidMount() {
    
    fetch(`/sploopmt/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdWiringType?deptId=${this.state.sploopmt.id.deptId}&phase=${this.state.sploopmt.id.phase}&connectionType=${this.state.sploopmt.id.connectionType}&wiringType=${this.state.sploopmt.id.wiringType}`)
    .then(response => response.json())
    .then(data => this.setState({sploopmtss: data, isLoading: false}));

  }


  async remove(deptId, matCd, phase, connectionType, wiringType) {
    const message= await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    })
    if(message.value){
    await fetch(`/sploopmt/delete?deptId=${deptId}&matCd=${matCd}&phase=${phase}&connectionType=${connectionType}&wiringType=${wiringType}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      fetch(`/sploopmt/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdWiringType?deptId=${deptId}&phase=${phase}&connectionType=${connectionType}&wiringType=${wiringType}`)
      .then(response => response.json())
      .then(data => this.setState({sploopmtss: data, isLoading: false}));
    });
    Swal.fire(
      'Deleted!',
      'Material has been deleted.',
      'success'
    )
  }
}

  

  render() {
    const {sploopmts, sploopmtss}=this.state;
    const sploopmtList=sploopmts.map(sploopmt=>{
      return <tr key={sploopmt.id.deptId}>
        <td>{sploopmt.id.deptId}</td>
        <td >{sploopmt.id.matCd}</td>
        <td>{sploopmt.id.phase}</td>
        <td>{sploopmt.id.connectionType}</td>
        <td>{sploopmt.id.wiringType}</td>
        <td>{sploopmt.matQty}</td>
    
    
        <td>
          <ButtonGroup>
          <Button Size="sm" color="primary" tag={Link} to ={"/sploopmtedit/" + sploopmt.id.deptId+"/"+sploopmt.id.matCd+"/"+sploopmt.id.phase+"/"+sploopmt.id.connectionType+"/"+sploopmt.id.wiringType}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(sploopmt.id.deptId , sploopmt.id.matCd,sploopmt.id.phase, sploopmt.id.connectionType, sploopmt.id.wiringType)}>Delete</Button>
    
          </ButtonGroup>
        </td>
      </tr>
    
    });
    const sploopmtssList=sploopmtss.map(sploopmt=>{
      return <tr key={sploopmt.id.deptId}>
        <td>{sploopmt.id.deptId}</td>
        <td >{sploopmt.id.matCd}</td>
        <td>{sploopmt.id.phase}</td>
        <td>{sploopmt.id.connectionType}</td>
        <td>{sploopmt.id.wiringType}</td>
            <td>{sploopmt.matQty}</td>

    
        <td>
          <ButtonGroup>
          <Button Size="sm" color="primary" tag={Link} to ={"/sploopmtedit/" + sploopmt.id.deptId+"/"+sploopmt.id.matCd+"/"+sploopmt.id.phase+"/"+sploopmt.id.connectionType+"/"+sploopmt.id.wiringType}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(sploopmt.id.deptId , sploopmt.id.matCd,sploopmt.id.phase, sploopmt.id.connectionType, sploopmt.id.wiringType)}>Delete</Button>
    
          </ButtonGroup>
        </td>
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
        <a className="path" href="/home">   Material  </a> |
        <a className="path2" href="/sploopmt">   Loop Material </a> 
        </div>
       
      <Container>
        
       <h2><center>Loop Material - Cost Center - {this.state.sploopmt.id.deptId}</center></h2>

        <div class="card bg-light mb-9" style={{width: '70rem'}}>

<div class="card-body ">
        <Form onSubmit={this.handleSubmit}>           
            
        <div className="form-group row">
         
                  <div className="col-sm-1">
           <Label for="name"><strong>Phase</strong></Label>
           </div>
           <div className="col-sm-1">
           <Input type="select"  name="phase" id="phase"  onChange={this.handleChange} required>
           {/* <option >Please Select</option> */}

                          <option defaultValue="1" value="1">1</option>
                          <option value="3">3</option>
                        </Input>
                  </div>
                  <div className="col-sm-2">
           <Label for="name"><strong>Connection Type</strong> </Label>
           </div>
           <div className="col-sm-2">
           <Input type="select"  name="connectionType" id="connectionType" onChange={this.handleChange} required>
           {/* <option >Please Select</option> */}

                          <option defaultValue="15" value="15">15</option>
                          <option value="30">30</option>
                          <option value="60">60</option>

                        </Input>
                  </div>
                  <div className="col-sm-2">
           <Label for="name"><strong>Wiring Type</strong></Label>
           </div>
           <div className="col-sm-2">
           <Input type="select"  name="wiringType" id="wiringType" onChange={this.handleChange} required>
           {/* <option >Please Select</option> */}

                          <option defaultValue="OH" value="OH">OVER HEAD</option>
                          <option value="UG">Under Ground</option>
                        </Input>
                  </div>
                  <div className="col-sm-1">
                        <Button color="success" tag={Link} to={"/sploopmtadd/"+this.state.sploopmt.id.deptId+"/"+this.state.sploopmt.id.phase+"/"+this.state.sploopmt.id.connectionType+"/"+this.state.sploopmt.id.wiringType}>Add New</Button>

                        </div>
                        <div className="col-sm-1">
                        <Button color="secondary" tag={Link} to={"/"}>Exit</Button>

                        </div>
         </div>
      
      
      
        </Form>
        </div>
        </div>
        {( ()=>{
    if(this.state.isMaterial){
      return(
        <Table className="mt-4">
          <thead>
          <tr>
            <th>Cost Center</th>
            <th>Material Code</th>
            <th>Phase</th>
            <th>Connection Type</th>
            <th>Wiring Type</th>
            <th>Material Quntity</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {sploopmtList}
          </tbody>
        </Table>
      )
    }
    else{
      return(
        <Table className="mt-4">
          <thead>
          <tr>
            <th>Cost Center</th>
            <th>Material Code</th>
            <th>Phase</th>
            <th>Connection Type</th>
            <th>Wiring Type</th>
            <th>Material Quntity</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {sploopmtssList}
          </tbody>
        </Table>
      )
    }
  }) ()}
      </Container>

    </div>
    );
    
  }
  
}

export default withRouter(SploopmtSearch);