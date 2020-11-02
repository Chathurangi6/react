import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Edit D-Notice'
class SpestpemEdit extends Component {
  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  emptySpestpem = {
    id:{
        deptId: localStorage.getItem('costCenterNo'),
        applicationNo: '',
        permissionType:[]
       
      },
         issuesDate:'',
    };

  constructor(props) {
    super(props);
    this.state = {
      spestpem: this.emptySpestpem,
      EditDataList:[],applicationNo:'',
      isDNotice:false,dNoticeIssuesDate:"",clearDate1:"",
      isPSD:false,psdIssuesDate:"",clearDate2:"",
      isRDA:false,rdaIssuesDate:"",clearDate3:"",
      isPolice:false,policeIssuesDate:"",clearDate4:"",
      isMunicipal:false,municipalIssuesDate:"",clearDate5:"",
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this)
    this.handleFind=this.handleFind.bind(this);
    this.mapFoundValues=this.mapFoundValues.bind(this);

  }
  async componentDidMount() {
   
    }



  


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name; 
    this.setState({[name]:value});

  }





  async handleFind(){
    await fetch(`/spestpem/findByIdApplicationNo?applicationNo=${this.state.applicationNo}`)              
    .then(response => response.json())
    .then(data => this.setState({EditDataList: data},()=>this.mapFoundValues()));

    
  }

  mapFoundValues(){
    this.state.EditDataList.map(mapping=>{
      if(mapping.id.permissionType=="DNotice"){
        this.setState({isDNotice:true,dNoticeIssuesDate:mapping.issuesDate,clearDate1:mapping.clearDate})
  
      }
      if(mapping.id.permissionType=="PSD"){
        this.setState({isPSD:true,psdIssuesDate:mapping.issuesDate,clearDate2:mapping.clearDate})
        
      }

      if(mapping.id.permissionType=="RDA"){
        this.setState({isRDA:true,rdaIssuesDate:mapping.issuesDate,clearDate3:mapping.clearDate})
        
      }
      if(mapping.id.permissionType=="Police"){
        this.setState({isPolice:true,policeIssuesDate:mapping.issuesDate,clearDate4:mapping.clearDate})
        
      }
      if(mapping.id.permissionType=="Municipal"){
        this.setState({ isMunicipal:true,municipalIssuesDate:mapping.issuesDate,clearDate5:mapping.clearDate})
        
      }
    }
      )
  }
       
 handleSubmit(event) {
    event.preventDefault();
    const {spestpem,isDNotice,isPSD,isRDA,isPolice,isMunicipal} = this.state;
    if(isDNotice===true){
      const feed={permission:'DNotice',clearDate:this.state.clearDate1,issuesDate:this.state.dNoticeIssuesDate}
     spestpem.id.permissionType.push(feed)
    
    }
    if(isPSD===true){
      const feed={permission:'PSD',clearDate:this.state.clearDate2,issuesDate:this.state.psdIssuesDate}
      spestpem.id.permissionType.push(feed) 
    }
    if(isRDA===true){
      const feed={permission:'RDA',clearDate:this.state.clearDate3,issuesDate:this.state.rdaIssuesDate}
      spestpem.id.permissionType.push(feed)
    }
  
    if(isPolice===true){
      const feed={permission:'Police',clearDate:this.state.clearDate4,issuesDate:this.state.policeIssuesDate}
      spestpem.id.permissionType.push(feed)
    }
    if(isMunicipal===true){
      const feed={permission:'Municipal',clearDate:this.state.clearDate5,issuesDate:this.state.municipalIssuesDate}
      spestpem.id.permissionType.push(feed)
    }
   
      spestpem.id.permissionType.map(mapping=>{
        const item={
          id:{
            deptId: localStorage.getItem('costCenterNo'),
            applicationNo:this.state.applicationNo ,
            permissionType:mapping.permission
           },
           
             clearDate:mapping.clearDate,
             issuesDate:mapping.issuesDate,
        }
        console.log(spestpem.id.permissionType)
      console.log(JSON.stringify(item))
       fetch('/spestpem/upd', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
         
          body: JSON.stringify(item),
        }
    )

  
      .then(response=>{
        if(response.status === 200) {
        Swal.fire({
            type: 'success',
             title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          
        }},
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
    
    const {spestpem,EditDataList} = this.state;
    const title = <h2 align="center">Edit D-Notice</h2>;
    
    return <div>
     <Helmet>
          <title>{ TITLE }</title>
        </Helmet> 

       <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path2" href="/spestpemEdit"> Update D-Notice</a>
        </div>

        {title}
<div style={{ marginLeft:'300px' }}>
      <Container>
   
        <Form onSubmit={this.handleSubmit}>

<FormGroup>
    <Label for="applicationNo" >Estimate No</Label>
    <Input  type="text"  name="applicationNo" id="applicationNo" style={{ width: "200px" ,display: 'inline-block', marginLeft:'7px' }} 
     onChange={this.handleChange} value={this.state.applicationNo || '' } required autoComplete="applicationNo"/>

<Button size="m" color="primary" style={{ marginLeft:'15px' }} onClick={this.handleFind}>find</Button>
{/* </FormGroup>

<FormGroup> */}
    <Label for="deptId" style={{ marginLeft:'120px' }}>Dept Id    </Label>
    <Input  type="text"   name="deptId" id="deptId"  style={{ width: "200px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange}  value={spestpem.id.deptId || '' } autoComplete="deptId"/>
</FormGroup>     
<br/>
<h6 style={{ fontWeight:'bold' }}>Permission Types</h6>
<br/>
 <FormGroup>

     <Label for="dNotice"   style={{ marginRight:'60px'}}>D - Notice</Label>
     <Input  type="checkbox" style={{ marginTop:'15px', marginLeft:'-50px'}}  name="isDNotice" value={this.state.isDNotice} checked={this.state.isDNotice} onClick={this.handleInputChange}   />
{/* </FormGroup>  

<FormGroup> */}
    <Label for="issuesDate"style={{ marginLeft:'70px',display: 'inline-block'}}>Issues Date</Label>
    <Input  type="date"  name="dNoticeIssuesDate" id="dNoticeIssuesDate" style={{ width: "175px" ,display: 'inline-block', marginLeft:'15px' }} 
     onChange={this.handleChange} value={this.state.dNoticeIssuesDate|| '' }  autoComplete="dNoticeIssuesDate"/>

         <Label for="clearDate1"style={{ marginLeft:'20px' }}>Clear Date</Label>
    <Input  type="date"  name="clearDate1" id="clearDate1" style={{ width: "175px" ,display: 'inline-block', marginLeft:'15px' }} 
     onChange={this.handleChange} value={this.state.clearDate1|| '' }  autoComplete="clearDate1"/>
</FormGroup> 
<br/>
<br/>
<br/>
<FormGroup>
     <Label for="psd"   style={{ marginRight:'60px' }}>PSD</Label>
    <Input  type="checkbox"   style={{ marginTop:'15px',marginLeft:'-10px'}}  name="isPSD" checked={this.state.isPSD} onClick={this.handleInputChange}   />
{/* </FormGroup>

<FormGroup> */}
    <Label for="issuesDate2"style={{ marginLeft:'115px' }}>Issues Date</Label>
    <Input  type="date"  name="psdIssuesDate"  id="psdIssuesDate" style={{ width: "175px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={this.state.psdIssuesDate|| '' }  autoComplete="psdIssuesDate"/>
     
    <Label for="clearDate2"style={{ marginLeft:'20px' }}>Clear Date</Label>
    <Input  type="date"  name="clearDate2" checked={this.state.clearDate2} id="clearDate2" style={{ width: "175px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={this.state.clearDate2|| '' }  autoComplete="clearDate2"/>
</FormGroup> 
<br/>
<br/>
<br/>
<FormGroup>
     <Label for="rda"   style={{ marginRight:'40px' }}>RDA</Label>
     <Input  type="checkbox"  style={{ marginTop:'15px', marginLeft:'8px'}}  name="isRDA" checked={this.state.isRDA}  onClick={this.handleInputChange} />
{/* </FormGroup>

<FormGroup> */}
    <Label for="rdaIssuesDate"style={{ marginLeft:'130px' }}>Issues Date</Label>
    <Input  type="date"  name="rdaIssuesDate"  id="rdaIssuesDate" style={{ width: "175px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={this.state.rdaIssuesDate|| '' }  autoComplete="rdaIssuesDate"/>
 
    <Label for="clearDate3"style={{ marginLeft:'20px' }}>Clear Date</Label>
    <Input  type="date"  name="clearDate3" checked={this.state.clearDate3} id="clearDate3" style={{ width: "175px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={this.state.clearDate3|| '' }  autoComplete="clearDate3"/>
</FormGroup> 
<br/>
<br/>
<br/>
<FormGroup>
        <Label for="police"   style={{ marginRight:'88px' }}>Police</Label> 
        <Input  type="checkbox"  style={{ marginTop:'15px', marginLeft:'-50px'}}  name="isPolice" checked={this.state.isPolice}  onClick={this.handleInputChange}    />
{/* </FormGroup> 

<FormGroup> */}
    <Label for="policeIssuesDate"style={{ marginLeft:'70px' }}>Issues Date</Label>
    <Input  type="date"  name="policeIssuesDate"  id="policeIssuesDate" style={{ width: "175px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={this.state.policeIssuesDate|| '' }  autoComplete="policeIssuesDate"/>

    <Label for="clearDate4"style={{ marginLeft:'20px' }}>Clear Date</Label>
    <Input  type="date"  name="clearDate4"  id="clearDate4" checked={this.state.clearDate4} style={{ width: "175px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={this.state.clearDate4|| '' }  autoComplete="clearDate4"/>
</FormGroup> 
<br/>
<br/>
<br/>
<FormGroup>
      <Label for="municipal"   style={{ marginRight:'60px' }}>Municipal</Label>
      <Input  type="checkbox"  style={{ marginTop:'15px', marginLeft:'-50px'}}  name="isMunicipal"  checked={this.state.isMunicipal}  onClick={this.handleInputChange}   />
{/* </FormGroup>
<FormGroup> */}
    <Label for="municipalIssuesDate"style={{ marginLeft:'70px' }}>Issues Date</Label>
    <Input  type="date"  name="municipalIssuesDate" id="municipalIssuesDate" style={{ width: "175px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={this.state.municipalIssuesDate|| '' }  autoComplete="municipalIssuesDate"/>

    <Label for="clearDate5"style={{ marginLeft:'20px' }}>Clear Date</Label>
    <Input  type="date"  name="clearDate5"  id="clearDate5" checked={this.state.clearDate5} style={{ width: "175px" ,display: 'inline-block', marginLeft:'20px' }} 
     onChange={this.handleChange} value={this.state.clearDate5|| '' }  autoComplete="clearDate5"/>
</FormGroup> 
<br/>

<FormGroup style={{marginLeft: "20px" }}>
    <Button color="primary" type="submit">Save</Button>{' '}
    <Button color="secondary" tag={Link} to="/home" style={{marginLeft: "10px" }}>Cancel</Button>
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
    </div>
  
  }

}

export default withRouter(SpestpemEdit);