import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Edit Bank'

class BankEdit extends Component {
  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  emptyBank = {
    bankCode: '',
    bankName: '',
    isBank:'',
    sortKey:'',
    updUser:'',
   
  };

  constructor(props) {
    super(props);
    this.state = {
      bank: this.emptyBank
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'add') {
      const bank= await (await fetch(`/bank/findByBankCode?bankCode=${this.props.match.params.bankCode}`)).json();
      this.setState({bank: bank});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let bank = {...this.state.bank};
    bank[name] = value;
    this.setState({bank});
  }

  async handleSubmit(event) {
    event.preventDefault();
  
    const {bank} = this.state;
    bank.updUser='Silva'
   
    await fetch('/bank/upd', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bank),
    });
    this.props.history.push('/bank');
   }
  render() {
    
    const {bank} = this.state;
    const title = <h2 align="center">Edit Bank</h2>;
    return <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
 
       <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/bank">  Bank  </a> |
        <a className="path2" href="/bank">  Edit Bank</a>
        </div>
 
      <Container>
     
        {title}
        <br/>
        <Form onSubmit={this.handleSubmit}>
        <div align="center">  
        <FormGroup>
          <Label for="bankCode">BankCode</Label>
          <Input type="number" style={{ width: "300px",marginLeft: "20px" ,display: 'inline-block'}} name="bankCode" id="bankCode" value={bank.bankCode || ''}
              autoComplete="bankCode"/>
        </FormGroup>

        <FormGroup>
            <Label for="bankName">Name</Label>
            <Input type="text" style={{ width: "300px",marginLeft: "48px" ,display: 'inline-block'}} name="bankName" id="bankName" onInput={this.toInputUppercase} value={bank.bankName || ''}
                   onChange={this.handleChange} autoComplete="bankName"/>
        </FormGroup>
        
        <FormGroup>
            <Label for="sortKey">Sort Key</Label>
            <Input type="number" style={{ width: "300px",marginLeft: "33px" ,display: 'inline-block'}} name="sortKey" id="sortKey" value={bank.sortKey || ''}
                   onChange={this.handleChange} autoComplete="sortKey"/>
        </FormGroup>
        </div>
          
   
        <FormGroup style={{marginLeft: "360px"}}>
          <div className="form-check form-check-inline">
              <label for="isBank">Is Bank</label>
           <div className="col-sm-8 col-form-label" style={{marginLeft: "25px"}}>
          <div className="row">
          <div className="col-sm-6">
          <div className="form-check form-check-inline">
             <input type="radio"  name="isBank" id="yes" value="Y"
                  checked={this.state.bank.isBank==="Y"}  onChange={this.handleChange} required/>
             <label className="form-check-label" for="yes">Yes</label>
             </div>
          </div>
          <div className="col-sm-6">
          <div className="form-check form-check-inline">
         <input type="radio" name="isBank" id="no" value="N"
                   checked={this.state.bank.isBank==="N"} onChange={this.handleChange} required/>
             <label className="form-check-label" for="no">No</label>
          </div>
          </div>
          </div>
          
         </div>
       </div>
          </FormGroup>
          <FormGroup style={{marginLeft: "600px" }}>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/bank">Cancel</Button>
          </FormGroup>
         
        </Form>
      
      </Container>
  
    </div>
    
  }
}

export default withRouter(BankEdit);