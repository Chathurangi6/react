import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Col } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Add Csc Bank'
class CscBankAdd extends Component {
  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };
  

  emptyCscBank = {
    id:{
        deptId: localStorage.getItem('costCenterNo'),
        bankCode: '',
        branchCode: '' ,
    },
      status: '' ,
    };
  
  constructor(props) {
    super(props);
    this.state = {
      cscBank: this.emptyCscBank,
      BankCodeList:[] ,
      BranchCodeList:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBank = this.handleBank.bind(this);

  }

  async componentDidMount() {
    fetch('/bank/getBy')               
        .then(response => response.json())
        .then(data => this.setState({BankCodeList: data}));
      
        fetch('/branch/getBy')               
        .then(response => response.json())
        .then(data => this.setState({BranchCodeList: data}));
    
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;   
    let cscBank = {...this.state.cscBank};
    cscBank[name] = value;
    cscBank.id[name] = value;
    this.setState({cscBank});
  }

handleBank(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let cscBank = {...this.state.cscBank};
    cscBank[name] = value;
    cscBank.id[name] = value;
    this.setState({ cscBank},()=>this.afterSetStateFinished())
}
afterSetStateFinished(){
    console.log(this.state.cscBank.bankCode)
    fetch(`/branch/findByIdBankCode?bankCode=${this.state.cscBank.bankCode}`)
       .then(response =>  response.json())
         .then(data => this.setState({BranchCodeList: data}))
}

  async handleSubmit(event) {
  
    event.preventDefault();
    const {cscBank} = this.state;
    const isPresent=await (await fetch(`/cscBank/existsByIdDeptIdAndIdBankCodeAndIdBranchCode?deptId=${cscBank.id.deptId}&bankCode=${cscBank.id.bankCode}&branchCode=${cscBank.id.branchCode}`)).json();
    console.log(isPresent)
    cscBank.addUser='perera'  

    if(isPresent){
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Data exist!',
        })
  }
  
    else {
    await fetch('/cscBank/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     
      body: JSON.stringify(cscBank),

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
    this.props.history.push('/cscBank');
    
   }

  render() {
    
    
    const {cscBank} = this.state;
    const title = <h2 align="center">Add Csc Bank</h2>;
    console.log(this.state.BranchCodeList)
    return <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
          
      <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/cscBank">  Csc Bank  </a> |
        <a className="path2" href="/cscBank/add">  Add Csc Bank</a>
        </div>
     
 
      <Container>
    
        {title}
        <div  align="center"  >    
        <Form onSubmit={this.handleSubmit}>
       
        <FormGroup>
            <Label for="deptId">Dept Id  </Label>
            <Input  type=""  name="deptId" id="deptId" value={cscBank.id.deptId || '' }
           onChange={this.handleChange} style={{ width: "400px",marginLeft: "70px" ,display: 'inline-block'}} required autoComplete="deptId"></Input>
        </FormGroup> 

        <FormGroup>
          <Label for="bankCode">Bank Code</Label>
          <Input  type="select" name="bankCode" id="bankCode" value={cscBank.id.bankCode || '' } onChange={this.handleBank} 
          style={{ width: "400px",marginLeft: "48px" ,display: 'inline-block'}}  required autoComplete="bankCode"   >
            { <option value="" disabled>Select Your Bank Code</option>  }   
           {this.state.BankCodeList.map((bank, key) =>                      
           <option value={bank.bankCode}>{bank.bankName}</option>)}
           </Input>
            
        </FormGroup>

        <FormGroup>
            <Label for="branchCode">Branch Code</Label>
            <Input  type="select" style={{ width: "400px",marginLeft: "35px" ,display: 'inline-block'}} name="branchCode" id="branchCode" value={cscBank.id.branchCode || '' }
           onChange={this.handleChange}  required autoComplete="branchCode"  >
            { <option value="" disabled>Select Your Branch Code</option>  }   
           {this.state.BranchCodeList.map((branch, key) =>                     
           <option value={branch.id.branchCode}>{branch.branchName}</option>)}
           </Input>
        </FormGroup>

        <FormGroup>
            <Label for="status">Status</Label>
            <Input type="text" className="TFWidth" name="status" id="status" value={cscBank.status|| ''}
                   onChange={this.handleChange } style={{ width: "400px",marginLeft: "82px" ,display: 'inline-block'}} autoComplete="status" 
                  required/>
        </FormGroup>
        
        <FormGroup style={{marginLeft: "380px" }}>
            <Button color="primary" type="submit" >Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/cscBank">Cancel</Button>
        </FormGroup>
        
        </Form>
        </div>
      </Container>

    
    </div>
  }
}

export default withRouter(CscBankAdd);