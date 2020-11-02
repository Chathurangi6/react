import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, ButtonGroup, Input, Table, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Pole Material';

class SppolemtSearch extends Component {

 
    emptySppolemt={
        id:{
        deptId:sessionStorage.getItem('costCenterNo'),
        matCd:'',
        phase:1,
        poleType:"TAPPING",
        fromConductor:"SERVICE",
        toConductor:"SERVICE"
        },
        matQty:''
		    
  };

  constructor(props) {
    super(props);
    this.state={
        sppolemt:this.emptySppolemt,
        sppolemts:[],
        sppolemtss:[],

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
    let sppolemt = {...this.state.sppolemt};
    sppolemt[name] = value;
    sppolemt.id[name]=value;
    this.setState({sppolemt});
    this.setState({isMaterial:true});
    fetch(`/sppolemt/findByIdDeptIdAndIdPhaseAndIdPoleTypeAndIdFromConducterAndIdToConductor?deptId=${sppolemt.id.deptId}&phase=${sppolemt.id.phase}&poleType=${sppolemt.id.poleType}&fromConductor=${sppolemt.id.fromConductor}&toConductor=${sppolemt.id.toConductor}`)
    .then(response => response.json())
    .then(data => this.setState({sppolemts: data, isLoading: false}));
    this.props.history.push("/sppolemtresult/"+this.state.sppolemt.id.deptId+"/"+this.state.sppolemt.id.phase+"/"+this.state.sppolemt.id.poleType+"/"+this.state.sppolemt.id.fromConductor+"/"+this.state.sppolemt.id.toConductor)

  }
  
  

  async componentDidMount() {
    
    fetch(`/sppolemt/findByIdDeptIdAndIdPhaseAndIdPoleTypeAndIdFromConducterAndIdToConductor?deptId=${this.state.sppolemt.id.deptId}&phase=${this.state.sppolemt.id.phase}&poleType=${this.state.sppolemt.id.poleType}&fromConductor=${this.state.sppolemt.id.fromConductor}&toConductor=${this.state.sppolemt.id.toConductor}`)
    .then(response => response.json())
    .then(data => this.setState({sppolemtss: data, isLoading: false}));

  }


  async remove(deptId, matCd, phase, poleType, fromConductor, toConductor) {
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
    await fetch(`/sppolemt/delete?deptId=${deptId}&matCd=${matCd}&phase=${phase}&poleType=${poleType}&fromConductor=${fromConductor}&toConductor=${toConductor}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      fetch(`/sppolemt/findByIdDeptIdAndIdPhaseAndIdPoleTypeAndIdFromConducterAndIdToConductor?deptId=${deptId}&phase=${phase}&poleType=${poleType}&fromConductor=${fromConductor}&toConductor=${toConductor}`)
      .then(response => response.json())
      .then(data => this.setState({sppolemtss: data, isLoading: false}));
    });
    Swal.fire(
      'Deleted!',
      'Material has been deleted.',
      'success'
    )
  }
}

  

  render() {
    const {sppolemts, sppolemtss}=this.state;
    const sppolemtList=sppolemts.map(sppolemt=>{
      return <tr key={sppolemt.id.deptId}>
        <td>{sppolemt.id.deptId}</td>
        <td style={{whiteSpace:'nowrap'}}>{sppolemt.id.matCd}</td>
        <td>{sppolemt.id.phase}</td>
        <td>{sppolemt.id.poleType}</td>
        <td>{sppolemt.id.fromConductor}</td>
        <td>{sppolemt.id.toConductor}</td>

        <td>{sppolemt.matQty}</td>
    
    
        <td>
          <ButtonGroup>
          <Button Size="sm" color="primary" tag={Link} to ={"/sppolemtedit/" + sppolemt.id.deptId+"/"+sppolemt.id.matCd+"/"+sppolemt.id.phase+"/"+sppolemt.id.poleType+"/"+sppolemt.id.fromConductor+"/"+sppolemt.id.toConductor}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(sppolemt.id.deptId , sppolemt.id.matCd,sppolemt.id.phase, sppolemt.id.poleType, sppolemt.id.fromConductor, sppolemt.id.toConductor)}>Delete</Button>
    
          </ButtonGroup>
        </td>
      </tr>
    
    });
    const sppolemtssList=sppolemtss.map(sppolemt=>{
      return <tr key={sppolemt.id.deptId}>
        <td>{sppolemt.id.deptId}</td>
        <td style={{whiteSpace:'nowrap'}}>{sppolemt.id.matCd}</td>
        <td>{sppolemt.id.phase}</td>
        <td>{sppolemt.id.poleType}</td>
        <td>{sppolemt.id.fromConductor}</td>
        <td>{sppolemt.id.toConductor}</td>
        <td>{sppolemt.matQty}</td>

    
    
        <td>
          <ButtonGroup>
          <Button Size="sm" color="primary" tag={Link} to ={"/sppolemtedit/" + sppolemt.id.deptId+"/"+sppolemt.id.matCd+"/"+sppolemt.id.phase+"/"+sppolemt.id.poleType+"/"+sppolemt.id.fromConductor+"/"+sppolemt.id.toConductor}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(sppolemt.id.deptId , sppolemt.id.matCd,sppolemt.id.phase, sppolemt.id.poleType, sppolemt.id.fromConductor, sppolemt.id.toConductor)}>Delete</Button>
    
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
        <a className="path2" href="/sppolemt">   Pole Material  </a> 
        </div>

      
      <Container>
        
        <h2><center>Pole Material - Cost Center - {this.state.sppolemt.id.deptId}</center></h2>
        <div class="card bg-light mb-9" style={{width: '70rem'}}>

<div class="card-body ">
        <Form onSubmit={this.handleSubmit}>
            <div className="form-group row">
            
                  <div className="col-sm-2">
           <Label for="name"><strong>Phase</strong></Label>
           </div>
           <div className="col-sm-2">
           <Input type="select"  name="phase" id="phase"  onChange={this.handleChange} required>
                          <option defaultValue="1" value="1">1</option>
                          <option value="3">3</option>
                        </Input>
                  </div>
                  <div className="col-sm-2">
           <Label for="name"><strong>Pole Type</strong></Label>
           </div>
           <div className="col-sm-2">
           <Input type="select"  name="poleType" id="poleType"  onChange={this.handleChange} required>
                          <option defaultValue="TAPPING" value="TAPPING">TAPPING</option>
                          <option value="INTERMEDIATE">INTERMEDIATE</option>
                        </Input>
                  </div>
                  
                  </div>
        <div className="form-group row">
         
                  
                  <div className="col-sm-2">
           <Label for="name"><strong>From Conductor</strong></Label>
           </div>
           <div className="col-sm-2">
           <Input type="select"  name="fromConductor" id="fromConductor" onChange={this.handleChange} required>
                          <option defaultValue="SERVICE" value="SERVICE">SERVICE</option>
                          <option value="FLY">FLY</option>
                          <option value="ABC">ABC</option>
                        </Input>
                  </div>
                  <div className="col-sm-2">
           <Label for="name"><strong>To Conductor</strong></Label>
           </div>
           <div className="col-sm-2">
           <Input type="select"  name="toConductor" id="toConductor" onChange={this.handleChange} required>
                          <option defaultValue="SERVICE" value="SERVICE">SERVICE</option>
                          <option value="FLY">FLY</option>
                          <option value="ABC">ABC</option>
                        </Input>
                  </div>
                  <div className="col-sm-2">
                  </div>
                  <div className="col-sm-1">
                        <Button color="success" tag={Link} to={"/sppolemtadd/"+this.state.sppolemt.id.deptId+"/"+this.state.sppolemt.id.phase+"/"+this.state.sppolemt.id.poleType+"/"+this.state.sppolemt.id.fromConductor+"/"+this.state.sppolemt.id.toConductor}>Add New</Button>

                        </div>
                        <div className="col-sm-1">
                        <Button color="secondary" tag={Link} to={"/home"}>Exit</Button>

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
            <th>Pole Type</th>
            <th>From Conductor</th>
            <th>To Conductor</th>
            <th>Material Quntity</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {sppolemtList}
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
            <th>Pole Type</th>
            <th>From Conductor</th>
            <th>To Conductor</th>
            <th>Material Quntity</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {sppolemtssList}
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

export default withRouter(SppolemtSearch);