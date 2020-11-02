import React, { Component } from 'react'
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../css/Path.css';
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet'
const TITLE = 'Add Warehouse'

class WarehouseAdd extends Component {
        emptyItem = {
          id: {deptId:"",wrhDept:""},
          conRat:"0"  
        };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    item.id[name] = value;
    this.setState({item});
  }
  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
   
  await fetch('/inwrhmap/add', {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item),
  }).then(response=>{
    if(response.status === 200) {
    Swal.fire({    
        type: 'success',
        title: 'Sucessfully submited',
        showConfirmButton: false,
        timer: 1500
      })
      
    }else{
        if(response.status===500){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
        
    }})
}
  render() {
    
    
    const {item} = this.state;
    const title = <h2 align="center">Add Warehouse Mapping</h2>;
    return <div>
         <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Admin  </a> |
        <a className="path" href="/warehouse">  Warehouse Details </a> |
        <a className="path2" href="/warehouse/add"> Add Warehouse </a> 
     <br/><br/>
        </div>

      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
        <FormGroup>
            <Label for="deptId">Department</Label>
            <Input type="text" name="deptId" value={item.id.deptId || ''}
                   onChange={this.handleChange} required/>
          </FormGroup>
          <FormGroup>
            <Label for="name">Warehouse</Label>
            <Input type="text" name="wrhDept" value={item.id.wrhDept || ''}
                   onChange={this.handleChange} required/>
          </FormGroup>
          <FormGroup>
            <Label for="conRat">conRat</Label>
            <Input type="text" name="conRat"  value={item.conRat || ''}
                   onChange={this.handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Button style={{backgroundColor:"#880E4F",color:"#FCEB07"}} type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/warehouse">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>

    </div>
    
  }
}
export default WarehouseAdd;
