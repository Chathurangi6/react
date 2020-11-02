import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2'
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = ' Add Tariff Category'
class TariffCategoryAdd extends Component {
  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
};

 emptyTariffCategory = {
    tariffCatCode: '',
    tariffCatName:'',
    isSmcActive: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      tariffCategory: this.emptyTariffCategory
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
    let tariffCategory = {...this.state.tariffCategory};
    tariffCategory[name] = value;
    this.setState({tariffCategory});

  }

  async handleSubmit(event) {
  
    event.preventDefault();
    const {tariffCategory} = this.state;
    const isPresent=await (await fetch(`/tariffCategory/existsByTariffCatCode?tariffCatCode=${tariffCategory.tariffCatCode}`)).json();
    console.log(isPresent)

    tariffCategory.addUser='perera'
    if(isPresent){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Data exist!',
          })
    }

    else {
    await fetch('/tariffCategory/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      body: JSON.stringify(tariffCategory),

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

    this.props.history.push('/tariffCategory');
    
   }

  render() {
    
    
    const {tariffCategory} = this.state;
    const title = <h2 align="center">Add Tariff Category</h2>;
    return <div>
  <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
    
     <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/tariffCategory">  Tariff Category  </a> |
        <a className="path2" href="/tariffCategory/add">  Add Tariff Category</a>
        </div>
     
  
      <Container>
        {title}
        <br/>
        <Form onSubmit={this.handleSubmit}>
        <div align="center"> 

          <FormGroup>
            <Label for=" tariffCatCode">Tariff CatCode</Label>
            <Input type="text" style={{ width: "400px",marginLeft: "8px" ,display: 'inline-block'}} name="tariffCatCode" id="tariffCatCode"maxLength="3" minLength="3"  value={tariffCategory.tariffCatCode|| ''} //click text box
                   onChange={this.handleChange } autoComplete="tariffCatCode" onInput={this.toInputUppercase}   required/>
          </FormGroup>

          <FormGroup>
            <Label for="tariffCatName">Tariff CatName</Label>
            <Input type="Text" style={{ width: "400px",marginLeft: "4px" ,display: 'inline-block'}} name="tariffCatName" id="tariffCatName" value={tariffCategory.tariffCatName|| ''}
                   onChange={this.handleChange} autoComplete="tariffCatName"onInput={this.toInputUppercase} required/>
          </FormGroup>

          </div>
          <FormGroup style={{marginLeft: "305px"}}>
      
  <div className="form-check form-check-inline" >
      <label for="IsSmcActive">Is SMC Active</label>


   <div className="col-sm-6 col-form-label" style={{ marginLeft: "50px" ,display: 'inline-block'}}>
  <div className="row">
  <div className="col-sm-6">
  <div className="form-check form-check-inline">
     <input type="radio" name="isSmcActive" id="yes" value="1"        
        checked={this.state.tariffCategory.isSmcActive==="1"}  onChange={this.handleChange} required />
     <label className="form-check-label" for="yes" >Yes</label>
     </div>
  </div>
  <div className="col-sm-6">
  <div className="form-check form-check-inline">
 <input type="radio" name="isSmcActive" id="no" value="0"
          checked={this.state.tariffCategory.isSmcActive==="0"} onChange={this.handleChange} required/>
     <label className="form-check-label" for="no">No</label>
  </div>
  </div>
  </div>
  
 </div>
</div>
   </FormGroup>

          <FormGroup style={{marginLeft: "600px" }}>
            <Button  color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/tariffCategory">Cancel</Button>
          </FormGroup>
          
        </Form>
      </Container>
    
    </div>
  
  }
}

export default withRouter(TariffCategoryAdd );