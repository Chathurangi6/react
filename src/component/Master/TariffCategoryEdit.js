import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = ' Edit Tariff Category'
class TariffCategoryEdit extends Component {
  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  emptyTariffCategory = {
    tariffCatCode: '',
    isSmcActive: '',
    tariffCatName:'',
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
    if (this.props.match.params.id !== 'add') {
      const tariffCategory= await (await fetch(`/tariffCategory/findByTariffCatCode?tariffCatCode=${this.props.match.params.tariffCatCode}`)).json();
      this.setState({tariffCategory: tariffCategory});
    }
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
    tariffCategory.updUser='Silva'
   
    await fetch('/tariffCategory/upd', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tariffCategory),
    });
    this.props.history.push('/tariffCategory');
   }
  render() {
    
    const {tariffCategory} = this.state;
    const title = <h2 align="center">Edit Tariff category</h2>;
    return <div>
  <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

     <div className="padding">
        <a className="path" href="/home">    Home  </a> |
        <a className="path" href="/home">   Master  </a> |
        <a className="path" href="/tariffCategory">  Tariff Category  </a> |
        <a className="path2" href="/tariffCategory">  Edit Tariff Category</a>
        </div>
  

      <Container>
        {title}
        <br/>
        <Form onSubmit={this.handleSubmit}>
        <div align="center">   
        <FormGroup>
            <Label for=" tariffCatCode">Tariff CatCode</Label>
            <Input type="text" style={{ width: "300px",marginLeft: "50px" ,display: 'inline-block'}} pattern="[0-9.]+" name="tariffCatCode" id="tariffCatCode"  value={tariffCategory.tariffCatCode|| ''} //click text box
                 autoComplete="tariffCatCode"  required/>
          </FormGroup>

          <FormGroup>
            <Label for="tariffCatName">Tariff Category Name</Label>
            <Input type="TEXT" style={{ width: "300px",marginLeft: "4px" ,display: 'inline-block'}} name="tariffCatName" id="tariffCatName" value={tariffCategory.tariffCatName|| ''}
                   onChange={this.handleChange} autoComplete="tariffCatName"required/>
          </FormGroup>
          </div>
          <FormGroup style={{marginLeft: "333px"}}>
      
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
          
          <FormGroup style={{marginLeft: "640px" }}>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/tariffCategory">Cancel</Button>
          </FormGroup>
          
        </Form>
      </Container>
   
   
    </div>
  }
}

export default withRouter(TariffCategoryEdit);