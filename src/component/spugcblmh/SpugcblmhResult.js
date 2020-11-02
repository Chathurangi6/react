import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, ButtonGroup, Input, Table, Label } from 'reactstrap';
import Swal from 'sweetalert2';


class SpugcblmhResult extends Component {

 
    emptySpugcblmh={
        id:{
        deptId:this.props.match.params.deptId,
        year:'',
        phase:this.props.match.params.phase,
        connectionType:this.props.match.params.connectionType,
        cableType:this.props.match.params.cableType
        },
        fixedCost:'',
        wireMeterPrice:''		    
  };

  constructor(props) {
    super(props);
    this.state={
        spugcblmh:this.emptySpugcblmh,
        spugcblmhs:[],
        spugcblmhss:[],

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
    let spugcblmh = {...this.state.spugcblmh};
    spugcblmh[name] = value;
    spugcblmh.id[name]=value;
    this.setState({spugcblmh});
    this.setState({isMaterial:true});
    fetch(`/spugcblmh/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdCableType?deptId=${spugcblmh.id.deptId}&phase=${spugcblmh.id.phase}&connectionType=${spugcblmh.id.connectionType}&cableType=${spugcblmh.id.cableType}`)
    .then(response => response.json())
    .then(data => this.setState({spugcblmhs: data, isLoading: false}));

    this.props.history.push("/spugcblmhresult/"+this.state.spugcblmh.id.deptId+"/"+this.state.spugcblmh.id.phase+"/"+this.state.spugcblmh.id.connectionType+"/"+this.state.spugcblmh.id.cableType)


  }
  
  

  async componentDidMount() {
    
    fetch(`/spugcblmh/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdCableType?deptId=${this.state.spugcblmh.id.deptId}&phase=${this.state.spugcblmh.id.phase}&connectionType=${this.state.spugcblmh.id.connectionType}&cableType=${this.state.spugcblmh.id.cableType}`)
    .then(response => response.json())
    .then(data => this.setState({spugcblmhss: data, isLoading: false}));

  }
  async remove(deptId, year, phase, connectionType, cableType) {
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
    await fetch(`/spugcblmh/delete?deptId=${deptId}&year=${year}&phase=${phase}&connectionType=${connectionType}&cableType=${cableType}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      fetch(`/spugcblmh/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdCableType?deptId=${deptId}&phase=${phase}&connectionType=${connectionType}&cableType=${cableType}`)
      .then(response => response.json())
      .then(data => this.setState({spugcblmhss: data, isLoading: false}));
    });
    Swal.fire(
      'Deleted!',
      'Material has been deleted.',
      'success'
    )
  }
}

  

  render() {
    const {spugcblmhs, spugcblmhss}=this.state;
    const spugcblmhList=spugcblmhs.map(spugcblmh=>{
      return <tr key={spugcblmh.id.deptId}>
        <td>{spugcblmh.id.deptId}</td>
        <td >{spugcblmh.id.year}</td>
        <td>{spugcblmh.id.phase}</td>
        <td>{spugcblmh.id.connectionType}</td>
        <td>{spugcblmh.id.cableType}</td>
        <td>{spugcblmh.fixedCost}</td>
        <td>{spugcblmh.wireMeterPrice}</td>
    
    
        <td>
          <ButtonGroup>
          <Button Size="sm" color="primary" tag={Link} to ={"/spugcblmhedit/" + spugcblmh.id.deptId+"/"+spugcblmh.id.year+"/"+spugcblmh.id.phase+"/"+spugcblmh.id.connectionType+"/"+spugcblmh.id.cableType}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(spugcblmh.id.deptId , spugcblmh.id.year,spugcblmh.id.phase, spugcblmh.id.connectionType, spugcblmh.id.cableType)}>Delete</Button>
    
          </ButtonGroup>
        </td>
      </tr>
    
    });
    const spugcblmhssList=spugcblmhss.map(spugcblmh=>{
      return <tr key={spugcblmh.id.deptId}>
        <td>{spugcblmh.id.deptId}</td>
        <td >{spugcblmh.id.year}</td>
        <td>{spugcblmh.id.phase}</td>
        <td>{spugcblmh.id.connectionType}</td>
        <td>{spugcblmh.id.cableType}</td>
        <td>{spugcblmh.fixedCost}</td>
        <td>{spugcblmh.wireMeterPrice}</td>
    
    
        <td>
          <ButtonGroup>
          <Button Size="sm" color="primary" tag={Link} to ={"/spugcblmhedit/" + spugcblmh.id.deptId+"/"+spugcblmh.id.year+"/"+spugcblmh.id.phase+"/"+spugcblmh.id.connectionType+"/"+spugcblmh.id.cableType}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(spugcblmh.id.deptId , spugcblmh.id.year,spugcblmh.id.phase, spugcblmh.id.connectionType, spugcblmh.id.cableType)}>Delete</Button>
    
          </ButtonGroup>
        </td>
      </tr>
    
    });
    return (
    <div>
      
      <Container>
        <br></br>
        <br></br>
        <h2><center>Under Ground Material - Cost Center - {this.state.spugcblmh.id.deptId}</center></h2>
        <div class="card bg-light mb-9" style={{width: '70rem'}}>

<div class="card-body ">
        <Form onSubmit={this.handleSubmit}>
            
            
        <div className="form-group row">
        <div className="col-sm-1">
           <Label for="name"><strong>Phase</strong></Label>
           </div>
           <div className="col-sm-1">
           <Input type="select"  name="phase" id="phase" value={this.state.spugcblmh.id.phase}  onChange={this.handleChange} required>
           {/* <option >Please Select</option> */}

                          <option  value="1">1</option>
                          <option value="3">3</option>
                        </Input>
                  </div>
         
                  <div className="col-sm-2">
           <Label for="name"><strong>Connection Type</strong></Label>
           </div>
           <div className="col-sm-2">
           <Input type="select"  name="connectionType" id="connectionType" value={this.state.spugcblmh.id.connectionType} onChange={this.handleChange} required>
           {/* <option >Please Select</option> */}

                          <option  value="15">15</option>
                          <option value="30">30</option>
                          <option value="60">60</option>

                        </Input>
                  </div>
                  <div className="col-sm-2">
           <Label for="name"><strong>Cable Type</strong></Label>
           </div>
           <div className="col-sm-2">
           <Input type="select"  name="cableType" id="cableType" value={this.state.spugcblmh.id.cableType} onChange={this.handleChange} required>
           {/* <option >Please Select</option> */}

           <option  value="16XPLE">16XPLE</option>
                          <option value="35XPLE">35XPLE</option>
                          <option value="70XPLE">70XPLE</option>
                          <option value="95XPLE">95XPLE</option>
                        </Input>
                  </div>
                  <div className="col-sm-1">
                        <Button color="success" tag={Link} to={"/spugcblmhadd/"+this.state.spugcblmh.id.deptId+"/"+this.state.spugcblmh.id.phase+"/"+this.state.spugcblmh.id.connectionType+"/"+this.state.spugcblmh.id.cableType}>Add New</Button>

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
            <th>Year</th>
            <th>Phase</th>
            <th>Connection Type</th>
            <th>Wiring Type</th>
            <th>Cable Type</th>
            <th>Fixed Cost</th>
            <th>WireMeter Price</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {spugcblmhList}
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
            <th>Year</th>
            <th>Phase</th>
            <th>Connection Type</th>
            <th>Cable Type</th>
            <th>Fixed Cost</th>
            <th>WireMeter Price</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {spugcblmhssList}
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

export default withRouter(SpugcblmhResult);