import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, ButtonGroup, Input, Table, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import Footer from '../Common/Foot/Footer';
import { Helmet } from 'react-helmet';
import '../../css/Path.css';
const TITLE = 'Search Material';
class SpestmtmSearch extends Component {

 
    emptySpestmtm={
        id:{
        deptId:sessionStorage.getItem('costCenterNo'),
        matCd:'',
        phase:1,
        connectionType:15,
        wiringType:"OH"
        },
        matQty:'',
        updUser:''
		    
  };

  constructor(props) {
    super(props);
    this.state={
        spestmtm:this.emptySpestmtm,
        spestmtms:[],
        spestmtmss:[],

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
    let spestmtm = {...this.state.spestmtm};
    spestmtm[name] = value;
    spestmtm.id[name]=value;
    this.setState({spestmtm});
    this.setState({isMaterial:true});
    fetch(`/spestmtm/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdWiringType?deptId=${spestmtm.id.deptId}&phase=${spestmtm.id.phase}&connectionType=${spestmtm.id.connectionType}&wiringType=${spestmtm.id.wiringType}`)
    .then(response => response.json())
    .then(data => this.setState({spestmtms: data, isLoading: false}));
    this.props.history.push("/spestmtmresult/"+this.state.spestmtm.id.deptId+"/"+this.state.spestmtm.id.phase+"/"+this.state.spestmtm.id.connectionType+"/"+this.state.spestmtm.id.wiringType)

  }
  
  

  async componentDidMount() {
    
    fetch(`/spestmtm/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdWiringType?deptId=${this.state.spestmtm.id.deptId}&phase=${this.state.spestmtm.id.phase}&connectionType=${this.state.spestmtm.id.connectionType}&wiringType=${this.state.spestmtm.id.wiringType}`)
    .then(response => response.json())
    .then(data => this.setState({spestmtmss: data, isLoading: false}));

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
    await fetch(`/spestmtm/delete?deptId=${deptId}&matCd=${matCd}&phase=${phase}&connectionType=${connectionType}&wiringType=${wiringType}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      fetch(`/spestmtm/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdWiringType?deptId=${deptId}&phase=${phase}&connectionType=${connectionType}&wiringType=${wiringType}`)
      .then(response => response.json())
      .then(data => this.setState({spestmtmss: data, isLoading: false}));
    });
    Swal.fire(
      'Deleted!',
      'Material has been deleted.',
      'success'
    )
  }
}

  

  render() {
    const {spestmtms, spestmtmss}=this.state;
    const spestmtmList=spestmtms.map(spestmtm=>{
      return <tr key={spestmtm.id.deptId}>
        <td>{spestmtm.id.deptId}</td>
        <td style={{whiteSpace:'nowrap'}}>{spestmtm.id.matCd}</td>
        <td>{spestmtm.id.phase}</td>
        <td>{spestmtm.id.connectionType}</td>
        <td>{spestmtm.id.wiringType}</td>
        <td>{spestmtm.matQty}</td>
    
    
        <td>
          <ButtonGroup>
          <Button Size="sm" color="primary" tag={Link} to ={"/spestmtmedit/" + spestmtm.id.deptId+"/"+spestmtm.id.matCd+"/"+spestmtm.id.phase+"/"+spestmtm.id.connectionType+"/"+spestmtm.id.wiringType}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(spestmtm.id.deptId , spestmtm.id.matCd,spestmtm.id.phase, spestmtm.id.connectionType, spestmtm.id.wiringType)}>Delete</Button>
    
          </ButtonGroup>
        </td>
      </tr>
    
    });
    const spestmtmssList=spestmtmss.map(spestmtm=>{
      return <tr key={spestmtm.id.deptId}>
        <td>{spestmtm.id.deptId}</td>
        <td style={{whiteSpace:'nowrap'}}>{spestmtm.id.matCd}</td>
        <td>{spestmtm.id.phase}</td>
        <td>{spestmtm.id.connectionType}</td>
        <td>{spestmtm.id.wiringType}</td>
        <td>{spestmtm.matQty}</td>
    
    
        <td>
          <ButtonGroup>
          <Button Size="sm" color="primary" tag={Link} to ={"/spestmtmedit/" + spestmtm.id.deptId+"/"+spestmtm.id.matCd+"/"+spestmtm.id.phase+"/"+spestmtm.id.connectionType+"/"+spestmtm.id.wiringType}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(spestmtm.id.deptId , spestmtm.id.matCd,spestmtm.id.phase, spestmtm.id.connectionType, spestmtm.id.wiringType)}>Delete</Button>
    
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
        <a className="path2" href="/spestmtm">   Search Material </a> 
        </div>
    
      <Container>
      
       <h2><center>Search Material - Cost Center - {this.state.spestmtm.id.deptId}</center></h2>

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
                        <Button color="success" tag={Link} to={"/spestmtmadd/"+this.state.spestmtm.id.deptId+"/"+this.state.spestmtm.id.phase+"/"+this.state.spestmtm.id.connectionType+"/"+this.state.spestmtm.id.wiringType}>Add New</Button>

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
            <th>Connection Type</th>
            <th>Wiring Type</th>
            <th>Material Quntity</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {spestmtmList}
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
          {spestmtmssList}
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

export default withRouter(SpestmtmSearch);