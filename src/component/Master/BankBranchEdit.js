import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Edit Branch'
class BankBranchEdit extends Component {
 toInputUppercase(e) {
   e.target.value = ("" + e.target.value).toUpperCase();
  }
 emptyBranch = {
   id:{
     bankCode: '',
     branchCode: '' 
   },
   branchAddress: '',
   branchName: '',
   updUser: '',
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
  console.log(this.props.match.params)
     const branch = await (await fetch( `/branch/findByIdBankCodeAndIdBranchCode?bankCode=${this.props.match.params.bankCode}&branchCode=${this.props.match.params.branchCode}`)).json();

     this.setState({branch: branch});
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
   const {branch} = this.state;
   branch.updUser='Silva'
    await fetch('/branch/upd', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(branch),
   });
   this.props.history.push('/branch');
  }
 render() {
   const {branch} = this.state;
   const title = <h2>Edit Branch</h2>;
   return <div>
  <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/branch">  Branch </a> |
        <a className="path2" href="/branch">  Update Branch</a>
        </div>
     

        <div align="center">  
     <Container>
       {title}
       <br/>
       <Form onSubmit={this.handleSubmit}>
     
       <FormGroup>
          <Label for="bankCode">Bank Code</Label>

          <Input  type="select" style={{ width: "300px",marginLeft: "40px" ,display: 'inline-block'}} name="bankCode" id="bankCode" value={branch.id.bankCode || '' }
           onChange={this.handleChange}  required autoComplete="bankCode"   >
            { <option value="" disabled>Select Your Bank Code</option>  }   
           {this.state.BankCodeList.map((bank, key) =>                       
           <option value={bank.bankCode}>{bank.bankName}</option>)}
           </Input>
            
         </FormGroup>

        <FormGroup>
           <Label for="branchCode">Branch Code</Label>
           <Input type="text" style={{ width: "300px",marginLeft: "25px" ,display: 'inline-block'}} pattern="[0-9.]+" placeholder="XXXX" minLength="3" maxLength="3" name="branchCode" id="branchCode" value={branch.id.branchCode || ''}
           onChange={this.handleChange} autoComplete="branchCode"/>
        </FormGroup>

        <FormGroup>
           <Label for="branchName">Branch Name</Label>
           <Input type="text" style={{ width: "300px",marginLeft: "20px" ,display: 'inline-block'}} name="branchName" id="branchName" onInput={this.toInputUppercase}  value={branch.branchName || ''}
                  onChange={this.handleChange} autoComplete="branchName"/>
        </FormGroup>

        <FormGroup>
           <Label for="branchAddress">Branch Address</Label>
           <Input type="text" style={{ width: "300px",marginLeft: "8px" ,display: 'inline-block'}} name="branchAddress" id="branchAddress" onInput={this.toInputUppercase} value={branch.branchAddress || ''}
                  onChange={this.handleChange} autoComplete="branchAddress"/>
        </FormGroup>
<br/>
        <FormGroup style={{marginLeft: "250px" }}>
           <Button color="primary" type="submit">Save</Button>{' '}
           <Button color="secondary" tag={Link} to="/branch">Cancel</Button>
        </FormGroup>

       </Form>
     </Container>

     </div>
   </div>
 }
}
export default withRouter(BankBranchEdit );
 

 