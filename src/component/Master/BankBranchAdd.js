import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Add Branch'

class BankBranchAdd extends Component {
toInputUppercase(e) {
e.target.value = ("" + e.target.value).toUpperCase();
}
emptyBranch = {
  id:{
    bankCode: '',
    branchCode: '' ,
  },
  branchName: '',
  branchAddress:'',
  addUser:'',
};
constructor(props) {
  super(props);
  this.state = {
    
    branch: this.emptyBranch,
    BankCodeList:[]                          

  };
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
async componentDidMount() {

    fetch('/bank/getBy')               
        .then(response => response.json())
        .then(data => this.setState({BankCodeList: data}));
      
}
handleChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;  
  let branch = {...this.state.branch};
  branch[name] = value;
  branch.id[name] = value;
  this.setState({branch});
}

async handleSubmit(event) {
  event.preventDefault();
  const {branch } = this.state; 
  const isPresent=await (await fetch(`/branch/existsByIdBankCodeAndIdBranchCode?bankCode=${branch.id.bankCode}&branchCode=${branch.id.branchCode}`)).json();
    console.log(isPresent)
  branch.addUser='perera'
  if(isPresent){
    Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Data exist!',
      })
}

  else {
await fetch('/branch/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(branch ),

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
  this.props.history.push('/branch');
 }

render() {
  const {branch} = this.state;
  const title = <h2>Add Branch</h2>;
  console.log(this.state.BankCodeList)
  return <div>
  <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/branch">   Branch</a> |
        <a className="path2" href="/branch/Add">   Add Branch </a>
        </div>

    <div align="center">  
    <Container>
      {title}
      <br/>
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
          <Label for="bankCode">Bank Code</Label>

          <Input  type="select" name="bankCode" id="bankCode" value={branch.id.bankCode || '' }
           onChange={this.handleChange}  style={{ width: "400px",marginLeft: "40px" ,display: 'inline-block'}} required autoComplete="bankCode"   >
            { <option value="" disabled>Select Your Bank Code</option>  }   
           {this.state.BankCodeList.map((bank, key) =>                      
           <option value={bank.bankCode}>{bank.bankName}</option>)}
           </Input>
      </FormGroup>

      <FormGroup>
          <Label for="branchCode">Branch Code</Label>
          <Input  type="text" pattern="[0-9.]+" placeholder="XXX" minLength="3" maxLength="3" name="branchCode" id="branchCode" value={branch.id.branchCode  || '' }
           onChange={this.handleChange}  style={{ width: "400px",marginLeft: "30px" ,display: 'inline-block'}} required autoComplete="branchCode"/>
      </FormGroup>
        
      <FormGroup>
          <Label for="branchNamne">Branch Name</Label>
          <Input type="text"  onInput={this.toInputUppercase} name="branchName" id="branchName"  value={branch.branchName || ''}
              onChange={this.handleChange}  style={{ width: "400px",marginLeft: "25px" ,display: 'inline-block'}} required autoComplete="branchName"/>
      </FormGroup>

      <FormGroup>
          <Label for="branchAddress">Branch Address</Label>
          <Input type="text"  onInput={this.toInputUppercase} name="branchAddress" id="branchAddress"  value={branch.branchAddress || ''}
                 onChange={this.handleChange}  style={{ width: "400px",marginLeft: "12px" ,display: 'inline-block'}} required autoComplete="branchAddress"/>
      </FormGroup>

      <FormGroup style={{marginLeft: "350px" }}>
          <Button color="primary" type="submit">Save</Button>{' '}
          <Button color="secondary" tag={Link} to="/branch">Cancel</Button>
        </FormGroup>

      </Form>
    </Container>
    </div>

  </div>
  
}
}
export default withRouter(BankBranchAdd);