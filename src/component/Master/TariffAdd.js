import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = ' Add Tariff'
class TariffAdd extends Component {
  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  emptyTariff = {
    tariffCode: '',
    isSmcActive: '',
    tariffCatCode:'',
    tariffName:'',

  };

  constructor(props) {
    super(props);
    this.state = {
      tariff: this.emptyTariff,
      TariffCodeList:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    fetch('/tariffCategory/getBy')             
    .then(response => response.json())
    .then(data => this.setState({TariffCodeList: data}));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;  
    let tariff = {...this.state.tariff};
    tariff[name] = value;
    this.setState({tariff});
  }

  async handleSubmit(event) {
  
    event.preventDefault();
    const {tariff} = this.state;
    const isPresent=await (await fetch(`/tariff/existsByTariffCode?tariffCatCode=${tariff.tariffCode}`)).json();
    console.log(isPresent)
    tariff.addUser='perera'
    if(isPresent){
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Data exist!',
        })
  }

    else {
    await fetch('/tariff/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     
      body: JSON.stringify(tariff),


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

    this.props.history.push('/tariff');
    
   }

  render() {
    
    const {tariff} = this.state;
    const title = <h2 align="center">Add Tariff</h2>;
    return <div>
  <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
     
      <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/tariff">  Tariff  </a> |
        <a className="path2" href="/tariff/add">  Add Tariff  </a>
        </div>
        <br/>      

      <Container>
        {title}
  <br/>
        <Form onSubmit={this.handleSubmit}>
        <div align="center"> 
          <FormGroup>
              <Label for=" tariffCode">Tariff Code</Label>
              <Input type="text" style={{ width: "400px",marginLeft: "30px" ,display: 'inline-block'}}  name="tariffCode" id="tariffCode"maxLength="3" minLength="3"value={tariff.tariffCode|| ''} 
                   onChange={this.handleChange } autoComplete="tariffCode" onInput={this.toInputUppercase}  required/>
          </FormGroup>
    
          <FormGroup>
              <Label for="tariffCatCode">Tariff CatCode</Label>
              <Input  type="select" style={{ width: "400px",marginLeft: "8px" ,display: 'inline-block'}}  name="tariffCatCode" id="tariffCatCode" value={tariff.tariffCatCode || '' }
               onChange={this.handleChange}  required autoComplete="tariffCatCode"   >
            { <option value="" disabled>Select Your Tariff CatCode</option>  }   
           {this.state.TariffCodeList.map((tariffCategory, key) =>                    
           <option value={tariffCategory.tariffCatCode}>{tariffCategory.tariffCatName}</option>)}
             </Input>
          </FormGroup>

          <FormGroup>
            <Label for="tariffName">Tariff Name</Label>
            <Input type="TEXT" style={{ width: "400px",marginLeft: "25px" ,display: 'inline-block'}}  name="tariffName" id="tariffName" value={tariff.tariffName|| ''}
                   onChange={this.handleChange} autoComplete="tariffName"onInput={this.toInputUppercase} required/>
          </FormGroup>
</div>
          <FormGroup style={{marginLeft: "305px"}} >
  
         <div className="form-check form-check-inline" >
            <label for="isSmcActive" >Is SMC Active</label>


   <div className="col-sm-6 col-form-label" style={{marginLeft: "25px"}} >
  <div className="row">

  <div className="col-sm-6">
  <div className="form-check form-check-inline">
     <input type="radio" name="isSmcActive" id="yes" value="1"         
        checked={this.state.tariff.isSmcActive==="1"}  onChange={this.handleChange} required />
     <label className="form-check-label" for="yes" >Yes</label>
     </div>
  </div>

  <div className="col-sm-6">
  <div className="form-check form-check-inline">
 <input type="radio" name="isSmcActive" id="no" value="0"  
          checked={this.state.tariff.isSmcActive==="0"} onChange={this.handleChange} required/>
     <label className="form-check-label" for="no">No</label>
  </div>
  </div>
  </div>
 </div>
</div>
   </FormGroup>
<br/>
          <FormGroup style={{marginLeft: "600px" }}>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/tariff" >Cancel</Button>
          </FormGroup>
          
        </Form>
      </Container>
    </div>
    
  }
}

export default withRouter(TariffAdd );