import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {validateDecimal} from './LabourValidate';
import '../../css/Path.css';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
const TITLE = 'Edit Labour Activity Rate';

class LabourEdit extends Component {

  emptyLabour = {
    id:{
      labourCode:'',
      deptId:sessionStorage.getItem('costCenterNo'),
      year:''
    },
    applicationType:'',
    description:'',
    labourHours:'',
    labourName: '',
    unitPrice: '',

  };

  

  constructor(props) {
    super(props);
    this.state = {
      labour: this.emptyLabour,
      
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handleValidation = this.handleValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toInputUppercase = this.toInputUppercase.bind(this);
    //this.getCurrentDate=this.getCurrentDate.bind(this);
    //this.validateNumber=this.validateNumber.bind(this);
    //this.validateId=this.validateId.bind(this);
    
  }

  async componentDidMount() {
    const person = await (await fetch(`/labour/findByIdLabourCodeAndIdDeptIdAndIdYear?labourCode=${this.props.match.params.labourCode}&deptId=${this.props.match.params.deptId}&year=${this.props.match.params.year}`)).json();
    this.setState({labour: person});

    // fetch('/applicationType/allApplicationTypes')
    //    .then(response => response.json())
    //    .then(data => this.setState({applicationTypes: data}));

    fetch('/applicationType/allApplicationTypesAndDescription')
       .then(response => response.json())
       .then(data => this.setState({applicationTypes: data}));
  }

  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

 

  
  handleChange(event){

    const id = event.target.id;
    //console.log(id);
    let e;
    switch(id){
      case 'labourHours':
      case 'unitPrice':
        e=validateDecimal(event);
        break;
      
      default:
        e=event;
        break;
    }

    if(e!=null){
      this.setState({value: e.target.value})
      const target = e.target;
      const value = target.value;
      const name = target.name;
      let labour = {...this.state.labour};
      labour[name] = value;
      labour.id[name]=value;
      this.setState({labour});
     
    }
  }

  

  async handleSubmit(event) {
   
    event.preventDefault();
    //this.getCurrentTime();
    //this.getCurrentDate();
    const message= await Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    })
    if(message.value){
      const {labour} = this.state;

      await fetch('/labour/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(labour),
      });

      await Swal.fire(
        'Saved!',
        'Labour has been saved.',
        'success'
      )
      console.log(this.props.match.params.currentPage);
      // this.props.history.push('/labour/list/'+labour.id.year+'/'+this.props.match.params.currentPage);
        this.props.history.push({pathname:'/labour/findByDeptId',state:{year:(labour.id.year),currentPage:(this.props.match.params.currentPage)}});
    }
  }

  render() {
    const {labour, applicationTypes}=this.state;

    return <div>
<Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/labour/findByDeptId">   Labour  </a> |
        <a className="path2" href="/labour/findByDeptId">   Edit Labour Activity Rates</a> 
        </div>
    

      <Container>
        <h2>Edit Labour Activity Rate</h2>
        <br></br>
        <br></br>
        <Form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label for="year" className="col-sm-2 col-form-label">Year</label>
          <div className="col-sm-4">
            <Input type="text" name="year" id="year" onInput={this.toInputUppercase} value={labour.id.year}
                   onChange={this.handleChange} autoComplete="year" disabled/>
          </div>
          {/* <label for="applicationType" className="col-sm-2 col-form-label">Application Type</label>
            <div className="col-sm-4">
                <select className="form-control" name="applicationType" id="applicationType" value={labour.applicationType}
                    onChange={this.handleChange} required>
                      <option value="">Please Select</option>
                    {
                        (applicationTypes && applicationTypes.length>0) && applicationTypes.map((applicationType)=>{
                            return(<option value={applicationType}>{applicationType}</option>);
                        })
                    }
                    
                </select>
            </div> */}
            <label for="applicationType" className="col-sm-2 col-form-label">Application Type</label>
            <div className="col-sm-4">
                <select className="form-control" name="applicationType" id="applicationType" value={labour.applicationType}
                    onChange={this.handleChange} required>
                      <option value="">Please Select</option>
                    {
                        (applicationTypes && applicationTypes.length>0) && applicationTypes.map((applicationType)=>{
                            return(<option value={applicationType[0]}>{applicationType[1]}</option>);
                        })
                    }
                    
                </select>
            </div>
        </div>
               
        <div className="form-group row">
          <label for="labourCode" className="col-sm-2 col-form-label">Labour Code</label>
          <div className="col-sm-4">
            <Input type="text" name="labourCode" id="labourCode" value={labour.id.labourCode} onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="labourCode" disabled/>
          </div>
          <label for="deptId" className="col-sm-2 col-form-label">Department ID</label>
          <div className="col-sm-4">
            <Input type="text" name="deptId" id="deptId" value={labour.id.deptId}
                   onChange={this.handleChange} autoComplete="deptId" disabled/>
          </div>
        </div>
        
        <div className="form-group row">
          <label for="labourName" className="col-sm-2 col-form-label">Labour Name</label>
          <div className="col-sm-4">
            <Input type="text" name="labourName" id="labourName" value={labour.labourName} onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="labourName" required/>
          </div>
          
        </div>
        <div className="form-group row">
        <label for="description" className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <textarea class="form-control" type="text" name="description" id="description" value={labour.description} onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="description" required>
            </textarea>
          </div>
        </div>
        <div className="form-group row">
          <label for="unitPrice" className="col-sm-2 col-form-label">Unit Price</label>
          <div className="col-sm-4">
            <Input type="text" name="unitPrice" id="unitPrice" value={labour.unitPrice}
                   onChange={this.handleChange} autoComplete="unitPrice" required/>
          </div>
        
        </div>
        <div className="form-group row">
          <label for="labourHours" className="col-sm-2 col-form-label">Labour Hours</label>
          <div className="col-sm-4">
            <Input type="text" name="labourHours" id="labourHours" value={labour.labourHours}
                   onChange={this.handleChange} autoComplete="labourHours" required/>
          </div>
        
        </div>
        
      
        
           
        <FormGroup>
          <Button color="primary" type="submit">Save</Button>{' '}
          <Button color="secondary" tag={Link} to="/labour/findByDeptId">Cancel</Button>
        </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(LabourEdit);