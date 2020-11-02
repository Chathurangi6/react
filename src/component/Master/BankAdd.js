import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../css/Path.css';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet'
const TITLE = 'Add Bank'
class BankAdd extends Component {
  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };
  
  emptyBank = {
    bankCode: '',
    bankName: '',
    addUser:'',
    isBank:'Y',
    sortKey:''
  
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
    const isPresent=await (await fetch(`/bank/existsByBankCode?bankCode=${bank.bankCode}`)).json();
    console.log(isPresent)
    bank.addUser='perera'
    if(isPresent){
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Data exist!',
        })
  }

    else {
    await fetch('/bank/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     
      body: JSON.stringify(bank),

    
    }).then(response=>{
      if(response.status === 200) {
      Swal.fire({
          type: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }},error=>{
          if(error.response.status===500)
          alert("Try Again!")
      }
  )
}
    this.props.history.push('/bank');
    
   }

  render() {
    
    
    const {bank} = this.state;
    const title = <h2 align="center">Add Bank</h2>;
    return <div>


      <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/bank">   Bank </a> |
        <a className="path2" href="/bank/add"> Add Bank</a>
        </div>

       <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <Container>
        {title}
        <br/>
        <Form onSubmit={this.handleSubmit}>
        <div align="center">  
        <FormGroup>
            <Label for="bankCode">Bank Code</Label>
            <Input type="text" pattern="[0-9.]+"name="bankCode" id="bankCode"maxLength="4" minLength="4" placeholder="xxxx" value={bank.bankCode || ''} //click text box
                   onChange={this.handleChange } style={{ width: "300px",marginLeft: "20px" ,display: 'inline-block'}} autoComplete="bankCode"  required/>
          </FormGroup>
          
          <FormGroup>
            <Label for="bankName">Bank Name</Label>
            <Input type="text"  name="bankName" id="bankName"onInput={this.toInputUppercase} value={bank.bankName || ''}
                   onChange={this.handleChange } style={{ width: "300px",marginLeft: "15px" ,display: 'inline-block'}} autoComplete="bankName" 
                  required/>
          </FormGroup>

          <FormGroup>
            <Label for="sortKey">Sort Key</Label>
            <Input type="number" name="sortKey" id="sortKey" value={bank.sortKey || ''}
                   onChange={this.handleChange} style={{ width: "300px",marginLeft: "37px" ,display: 'inline-block'}} autoComplete="sortKey"required/>
          </FormGroup>
</div>
          <FormGroup style={{marginLeft: "360px"}}>
  
          <div className="form-check form-check-inline" >
              <label for="isBank">Is Bank</label>
 
 
           <div className="col-sm-8 col-form-label" style={{marginLeft: "25px"}}>
          <div className="row">
          <div className="col-sm-6">
          <div className="form-check form-check-inline">
             <input type="radio" name="isBank" id="yes" value="Y"        
                checked={this.state.bank.isBank==="Y"}  onChange={this.handleChange} required />
             <label className="form-check-label" for="yes" >Yes</label>
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
          <FormGroup style={{marginLeft: "600px"}}>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/bank">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
   
    </div>
  }
}

export default withRouter(BankAdd);