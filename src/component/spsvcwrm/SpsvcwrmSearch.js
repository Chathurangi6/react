import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, ButtonGroup, Input, Table, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Wire Material';

class SpsvcwrmSearch extends Component {

 
    emptySpsvcwrm={
        id:{
        deptId:sessionStorage.getItem('costCenterNo'),
        matCd:'',
        phase:1,
        connectionType:15,
        wiringType:"OH"
        },
        extraQty:''
		    
  };

  constructor(props) {
    super(props);
    this.state={
        spsvcwrm:this.emptySpsvcwrm,
        spsvcwrms:[],
        spsvcwrmss:[],

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
    let spsvcwrm = {...this.state.spsvcwrm};
    spsvcwrm[name] = value;
    spsvcwrm.id[name]=value;
    this.setState({spsvcwrm});
    this.setState({isMaterial:true});
    fetch(`/spsvcwrm/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdWiringType?deptId=${spsvcwrm.id.deptId}&phase=${spsvcwrm.id.phase}&connectionType=${spsvcwrm.id.connectionType}&wiringType=${spsvcwrm.id.wiringType}`)
    .then(response => response.json())
    .then(data => this.setState({spsvcwrms: data, isLoading: false}));
    this.props.history.push("/spsvcwrmresult/"+this.state.spsvcwrm.id.deptId+"/"+this.state.spsvcwrm.id.phase+"/"+this.state.spsvcwrm.id.connectionType+"/"+this.state.spsvcwrm.id.wiringType)

  }
  
  

  async componentDidMount() {
    
    fetch(`/spsvcwrm/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdWiringType?deptId=${this.state.spsvcwrm.id.deptId}&phase=${this.state.spsvcwrm.id.phase}&connectionType=${this.state.spsvcwrm.id.connectionType}&wiringType=${this.state.spsvcwrm.id.wiringType}`)
    .then(response => response.json())
    .then(data => this.setState({spsvcwrmss: data, isLoading: false}));

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
    await fetch(`/spsvcwrm/delete?deptId=${deptId}&matCd=${matCd}&phase=${phase}&connectionType=${connectionType}&wiringType=${wiringType}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      fetch(`/spsvcwrm/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdWiringType?deptId=${deptId}&phase=${phase}&connectionType=${connectionType}&wiringType=${wiringType}`)
      .then(response => response.json())
      .then(data => this.setState({spsvcwrmss: data, isLoading: false}));
    });
    Swal.fire(
      'Deleted!',
      'Material has been deleted.',
      'success'
    )
  }
}

  

  render() {
    const {spsvcwrms, spsvcwrmss}=this.state;
    const spsvcwrmList=spsvcwrms.map(spsvcwrm=>{
      return <tr key={spsvcwrm.id.deptId}>
        <td>{spsvcwrm.id.deptId}</td>
        <td style={{whiteSpace:'nowrap'}}>{spsvcwrm.id.matCd}</td>
        <td>{spsvcwrm.id.phase}</td>
        <td>{spsvcwrm.id.connectionType}</td>
        <td>{spsvcwrm.id.wiringType}</td>
        <td>{spsvcwrm.extraQty}</td>
    
    
        <td>
          <ButtonGroup>
          <Button Size="sm" color="primary" tag={Link} to ={"/spsvcwrmedit/" + spsvcwrm.id.deptId+"/"+spsvcwrm.id.matCd+"/"+spsvcwrm.id.phase+"/"+spsvcwrm.id.connectionType+"/"+spsvcwrm.id.wiringType}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(spsvcwrm.id.deptId , spsvcwrm.id.matCd,spsvcwrm.id.phase, spsvcwrm.id.connectionType, spsvcwrm.id.wiringType)}>Delete</Button>
    
          </ButtonGroup>
        </td>
      </tr>
    
    });
    const spsvcwrmssList=spsvcwrmss.map(spsvcwrm=>{
      return <tr key={spsvcwrm.id.deptId}>
        <td>{spsvcwrm.id.deptId}</td>
        <td style={{whiteSpace:'nowrap'}}>{spsvcwrm.id.matCd}</td>
        <td>{spsvcwrm.id.phase}</td>
        <td>{spsvcwrm.id.connectionType}</td>
        <td>{spsvcwrm.id.wiringType}</td>
            <td>{spsvcwrm.extraQty}</td>

    
        <td>
          <ButtonGroup>
          <Button Size="sm" color="primary" tag={Link} to ={"/spsvcwrmedit/" + spsvcwrm.id.deptId+"/"+spsvcwrm.id.matCd+"/"+spsvcwrm.id.phase+"/"+spsvcwrm.id.connectionType+"/"+spsvcwrm.id.wiringType}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(spsvcwrm.id.deptId , spsvcwrm.id.matCd,spsvcwrm.id.phase, spsvcwrm.id.connectionType, spsvcwrm.id.wiringType)}>Delete</Button>
    
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
                 <a className="path2" href="/spsvcwrm">   Wire Material </a> 
        
                 </div>
             
      <Container>
       
       <h2><center>Wire Material - Cost Center - {this.state.spsvcwrm.id.deptId}</center></h2>

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
                        <Button color="success" tag={Link} to={"/spsvcwrmadd/"+this.state.spsvcwrm.id.deptId+"/"+this.state.spsvcwrm.id.phase+"/"+this.state.spsvcwrm.id.connectionType+"/"+this.state.spsvcwrm.id.wiringType}>Add New</Button>

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
            <th>Extra Quntity</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {spsvcwrmList}
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
            <th>Extra Quntity</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {spsvcwrmssList}
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

export default withRouter(SpsvcwrmSearch);