import React, { Component } from 'react'
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Warehouse Details'
class WarehouseEdit extends Component {
    emptyItem = {
        id: {deptId:"",wrhDept:""},
        conRat:""  
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
const details=await(await fetch(`/inwrhmap/findByIdDeptIdAndIdWrhDept?deptId=${this.props.match.params.deptId}&wrhDept=${this.props.match.params.wrhDept}`)).json();
  this.setState({item:details})
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
 
await fetch('/inwrhmap/upd', {
  method:'PUT',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(item),
});
  this.props.history.push('/warehouse');
}

render() {
  
  
  const {item} = this.state;
  
  const title = <h2 align="center">Edit Warehouse Mapping</h2>;
  return <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Admin  </a> |
        <a className="path" href="/warehouse">  Warehouse Details </a> |
        <a className="path2" href="/warehouse/add"> Edit Warehouse </a> 
     <br/><br/>
        </div>
 
    <Container>
      {title}
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
          <Label for="deptId">Department</Label>
          <Input type="text" name="deptId" value={item.id.deptId || ''}
                 onChange={this.handleChange} disabled/>
        </FormGroup>
        <FormGroup>
          <Label for="name">Warehouse</Label>
          <Input type="text" name="wrhDept" value={item.id.wrhDept || ''}
                 onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="conRat">conRat</Label>
          <Input type="text" name="conRat"  value={item.conRat || ''}
                 onChange={this.handleChange} />
        </FormGroup>
        
        <FormGroup>
          <Button color="primary" type="submit">Save</Button>{' '}
          <Button color="secondary" tag={Link} to="/warehouse">Cancel</Button>
        </FormGroup>
      </Form>
    </Container>

  </div>
  
}
}
export default WarehouseEdit;