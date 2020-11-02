import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from 'react-helmet'
const TITLE = 'Add D-Notice'

class SpestpemAdd extends Component {
  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  emptySpestpem = {
    id:{
        deptId: localStorage.getItem('costCenterNo'),
        applicationNo: '',
        permissionType:[]
       
      },
         issuesDate1:'',
         issuesDate2:'',
         issuesDate3:'',
         issuesDate4:'',
         issuesDate5:'',

    };
  
  constructor(props) {
    super(props);
    this.state = {
      spestpem: this.emptySpestpem,
      isDNotice:false,
      isPSD:false,
      isRDA:false,
      isMunicipal:false,
      isPolice:false ,
    
        }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this)
    // this.handleClearForm = this.handleClearForm.bind(this);
  }
  async componentDidMount() {
    
  }
  handleClearForm(event) {
    this.form && this.form.reset();
}

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name; 
    let spestpem = {...this.state.spestpem};
    spestpem[name] = value;
    spestpem.id[name] = value;
    this.setState({spestpem});

  }

 handleSubmit(event) {
    event.preventDefault();
    const {spestpem,isDNotice,isPSD,isRDA,isMunicipal,isPolice} = this.state;
    if(isDNotice===true){
      const feed={permission:'DNotice',issuesDate:spestpem.issuesDate1}
     spestpem.id.permissionType.push(feed)
   
    }
    if(isPSD===true){
      const feed={permission:'PSD',issuesDate:spestpem.issuesDate2}
      spestpem.id.permissionType.push(feed)
      
    }
    if(isRDA===true){
      const feed={permission:'RDA',issuesDate:spestpem.issuesDate3}
      spestpem.id.permissionType.push(feed)
    }
    if(isMunicipal===true){
      const feed={permission:'Municipal',issuesDate:spestpem.issuesDate4}
      spestpem.id.permissionType.push(feed)
    }
    if(isPolice===true){
      const feed={permission:'Police',issuesDate:spestpem.issuesDate5}
      spestpem.id.permissionType.push(feed)
    }
    
      spestpem.id.permissionType.map(mapping=>{
        const item={
          id:{
            deptId: localStorage.getItem('costCenterNo'),
            applicationNo:spestpem.id.applicationNo ,
            permissionType:mapping.permission
           
          },
             issuesDate:mapping.issuesDate,
             
        }
      console.log(item)
        fetch('/spestpem/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
         
          body: JSON.stringify(item),
    
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
      })
  

    this.props.history.push('/home');
}

handleInputChange(event) {
  const target = event.target;
  const value =  target.checked ;
  const name = target.name;

  this.setState({
    [name]: value
    
  });
}

  render() {
    const {spestpem} = this.state;
    const title = <h2 align ="center">Add D-Notice</h2>;
   
   return <div>
          <Helmet>
          <title>{ TITLE }</title>
        </Helmet> 
      <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path2" href="/spestpemAdd">  Add Notice</a>
        </div>
 
        {title}
      <Container align="center">
       
        <br/>

        <Form onSubmit={this.handleSubmit}>
<FormGroup>
    <Label for="deptId">Dept Id    </Label>
    <Input  type="text"   name="deptId" id="deptId"  style={{ width: "200px" ,display: 'inline-block', marginLeft:'15px' }} 
     onChange={this.handleChange}  value={spestpem.id.deptId || '' } autoComplete="deptId"/>
{/* </FormGroup>     

<FormGroup> */}
    <Label for="applicationNo" style={{ marginLeft:'35px' }}>Estimate No</Label>
    <Input  type="text"  name="applicationNo" id="applicationNo" style={{ width: "200px" ,display: 'inline-block', marginLeft:'15px' }} 
     onChange={this.handleChange} value={spestpem.id.applicationNo || '' } required autoComplete="applicationNo"/>
</FormGroup> 

<br/>
<h6 style={{ fontWeight:'bold' ,marginLeft:'-375px'}}>Permission Types</h6>
<br/>

 <FormGroup>
     <Label for="dNotice"   style={{ marginRight:'60px' , }}>D - Notice</Label>
     <Input  type="checkbox" style={{ marginTop:'15px', marginLeft:'-50px'}} name="isDNotice" checked={this.state.isDNotice} onClick={this.handleInputChange}   />
     {/* </FormGroup>

<FormGroup> */}
    <Label for="issuesDate1" style={{ marginLeft:'70px', display: 'inline-block' }}>Issues Date</Label>
    <Input  type="date"  name="issuesDate1" checked={this.state.issuesDate1} id="issuesDate1" style={{ width: "200px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={spestpem.issuesDate1|| '' }  autoComplete="issuesDate1"/>
</FormGroup> 
<br/>
<FormGroup>
     <Label for="psd"   style={{ marginRight:'105px' }}>PSD</Label>
    <Input  type="checkbox"style={{ marginTop:'15px', marginLeft:'-50px'}}  name="isPSD" checked={this.state.isPSD} onClick={this.handleInputChange}   />
{/* </FormGroup>

<FormGroup> */}
    <Label for="issuesDate2"style={{ marginLeft:'70px' }}>Issues Date</Label>
    <Input  type="date"  name="issuesDate2"  checked={this.state.issuesDate2} id="issuesDate2" style={{ width: "200px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={spestpem.issuesDate2|| '' }  autoComplete="issuesDate2"/>
</FormGroup> 
<br/>
<FormGroup>
     <Label for="rda"   style={{ marginRight:'100px' }}>RDA</Label>
     <Input  type="checkbox" style={{ marginTop:'15px', marginLeft:'-50px'}} name="isRDA" checked={this.state.isRDA}  onClick={this.handleInputChange} />
{/* </FormGroup>

<FormGroup> */}
    <Label for="issuesDate3"style={{ marginLeft:'70px' }}>Issues Date</Label>
    <Input  type="date"  name="issuesDate3" checked={this.state.issuesDate3} id="issuesDate3" style={{ width: "200px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={spestpem.issuesDate3|| '' }  autoComplete="issuesDate3"/>
</FormGroup> 
<br/>
<FormGroup>
        <Label for="police"   style={{ marginRight:'88px' }}>Police</Label> 
        <Input  type="checkbox" style={{ marginTop:'15px', marginLeft:'-50px'}} name="isPolice" checked={this.state.isPolice}  onClick={this.handleInputChange}    />
{/* </FormGroup> 

<FormGroup> */}
    <Label for="issuesDate5"style={{ marginLeft:'70px' }}>Issues Date</Label>
    <Input  type="date"  name="issuesDate5" checked={this.state.issuesDate5} id="issuesDate5" style={{ width: "200px" ,display: 'inline-block',marginLeft:'20px' }} 
     onChange={this.handleChange} value={spestpem.issuesDate5|| '' } autoComplete="issuesDate5"/>
</FormGroup> 
<br/>
<FormGroup>
      <Label for="municipal"   style={{ marginRight:'60px' }}>Municipal</Label>
      <Input  type="checkbox" style={{ marginTop:'15px', marginLeft:'-50px'}} name="isMunicipal"  checked={this.state.isMunicipal}  onClick={this.handleInputChange}   />
{/* </FormGroup>

<FormGroup> */}
    <Label for="issuesDate4"style={{ marginLeft:'70px' }}>Issues Date</Label>
    <Input  type="date"  name="issuesDate4" checked={this.state.issuesDate4} id="issuesDate1" style={{ width: "200px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={spestpem.issuesDate4|| '' }  autoComplete="issuesDate4"/>
</FormGroup>  
<br/>
<FormGroup style={{marginLeft: "350px" }}>
<Button color="primary" type="submit" >Save</Button>{' '}
{/* <Button  color="primary" onClick={this.handleClearForm} >Clear</Button> */}
<Button color="secondary" tag={Link} to="/">Cancel</Button>
</FormGroup>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
        </Form>
      </Container>
    </div>
   
  }
}
export default withRouter(SpestpemAdd);