import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = ' Edit Csc Bank'
class CscBankEdit extends Component {
  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  emptyCscBank = {
    id:{
        deptId: '' ,
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
    if (this.props.match.params.id !== 'add') {
      const cscBank= await (await fetch(`/cscBank/findByIdDeptIdAndIdBankCodeAndIdBranchCode?deptId=${this.props.match.params.deptId}&bankCode=${this.props.match.params.bankCode}&branchCode=${this.props.match.params.branchCode}`)).json();
      this.setState({cscBank: cscBank});
    
      fetch('/bank/getBy')               
          .then(response => response.json())
          .then(data => this.setState({BankCodeList: data}));
        
          fetch('/branch/getBy')               
          .then(response => response.json())
          .then(data => this.setState({BranchCodeList: data}));
     
    }
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
    cscBank.updUser='Silva'
   
    await fetch('/cscBank/upd', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cscBank),
    });
    this.props.history.push('/cscBank');
   }
  render() {
    
    
    const {cscBank} = this.state;
    const title = <h2>Edit Csc Bank</h2>;
    return <div>
  <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/cscBank">  Csc Bank  </a> |
        <a className="path2" href="/cscBank">  Edit Csc Bank</a>
        </div>


        <div align="center">
      <Container>
    
        {title}
        <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="deptId">Dept ID</Label>
          <Input type="number"  name="deptId" id="deptId" value={cscBank.id.deptId || ''}
             onChange={this.handleChange} style={{ width: "400px",marginLeft: "70px" ,display: 'inline-block'}}   autoComplete="bankCode"/>
        </FormGroup>

        <FormGroup>
          <Label for="bankCode">Bank Code</Label>

          <Input  type="select" style={{ width: "400px",marginLeft: "48px" ,display: 'inline-block'}} name="bankCode" id="bankCode" value={cscBank.id.bankCode || '' }
           onChange={this.handleBank}  required autoComplete="bankCode"   >
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
            <Input type="text" style={{ width: "400px",marginLeft: "82px" ,display: 'inline-block'}} name="status" id="status" onInput={this.toInputUppercase} value={cscBank.status || ''}
                   onChange={this.handleChange} autoComplete="status"/>
        </FormGroup>
      
        <FormGroup style={{marginLeft: "380px" }}>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/cscBank">Cancel</Button>
        </FormGroup>
        
        </Form>
      </Container>
      </div>
    
    </div>
  }
}

export default withRouter(CscBankEdit);