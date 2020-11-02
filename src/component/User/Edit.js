import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../Common/Foot/Footer';
//import HomeNavbar from '../Common/Nav/HomeNavbar'

class Edit extends Component {

  emptyItem = {
    id: '',
    email: '',
    name: '',
    
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
    if (this.props.match.params.id !== 'add') {
      const group = await (await fetch(`/user/findById?id=${this.props.match.params.id}`)).json();
      this.setState({item: group});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(id) {
    const {item} = this.state;
    //console.log(`The values are ${this.state.person_name}, ${this.state.business_name}, and ${this.state.business_gst_number}`)
    
    alert(item.name)
  

    await fetch(`/user/upd?id=${this.props.match.params.id}`, {
      method:  'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
   
    this.props.history.push('/groups');
  }

  render() {
    
    
    const {item} = this.state;
    const title = <h2>Edit Group</h2>;
    return <div>
           {/* <HomeNavbar/> */}
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
        <FormGroup>
            <Label for="name">ID</Label>
            <Input type="text" name="id" id="id" value={item.id || ''}
                   onChange={this.handleChange} autoComplete="id"/>
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="address">Email</Label>
            <Input type="text" name="email" id="email" value={item.email || ''}
                   onChange={this.handleChange} autoComplete="email"/>
          </FormGroup>
          
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
      <Footer/>
    </div>
  }
}

export default withRouter(Edit);