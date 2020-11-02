import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import DropdownList from 'react-widgets/lib/DropdownList';
import '../../css/Path.css';
import 'react-widgets/dist/css/react-widgets.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Add New Strut Labour Rate';

class SplbstrtAdd extends Component {
    emptySplbstrt={
        id:{
        deptId:sessionStorage.getItem('costCenterNo')
        ,
        labourCode:''
        },
        activityCode:"AC1",
        applicationType:"TC",
        labourHours:'',
        unitPrice:'',
        matCd:''

        

    }
    emptyLabour={
        labourHours:'',
        unitPrice:''
    }
    
    constructor(props) {
        super(props);
        this.state = {
            splbstrt: this.emptySplbstrt,
          
          labourCodes:[],
          labour:this.emptyLabour,
          matCds:[],
          matCd:''

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlechange = this.handlechange.bind(this);

    }

    async componentDidMount() {
        fetch('/inmatm/allMatCds')
        .then(response => response.json())
        .then(data => this.setState({matCds: data}));

          fetch('/labour/allLabourCodes')
          .then(response => response.json())
          .then(data => this.setState({labourCodes: data}));

          
    
        
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let splbstrt = {...this.state.splbstrt};
        splbstrt[name] = value;
        splbstrt.id[name]=value;
        this.setState({splbstrt});

      }

    async  handlechange(event) {
          console.log(event);
          this.state.splbstrt.id.labourCode=event;
       
        let splbstrt = {...this.state.splbstrt};
        
        this.setState({ splbstrt })  
        console.log(this.state.splbstrt.id.labourCode);
       await fetch(`/labour/findLabourHoursAndUnitPriceByIdDeptIdAndIdLabourCodeAndIdYear?deptId=${splbstrt.id.deptId}&labourCode=${splbstrt.id.labourCode}`)
          .then(response => response.json())
          .then(data => this.setState({labour: data}));
          console.log(this.state.labour);
          splbstrt.labourHours=this.state.labour[0];
          splbstrt.unitPrice=this.state.labour[1];
        
          this.setState({ splbstrt}) ;

     }
      async handleSubmit(event) {
        event.preventDefault();
        const message= await Swal.fire({
          title: 'Are you sure?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, save it!'
        })
        if(message.value){
          
        const {splbstrt} = this.state;
        splbstrt.matCd=this.state.matCd;

        await fetch('/splbstrt/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(splbstrt ),
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
        this.props.history.push('/splbstrt');
        console.log(splbstrt);
      }
    }

     render() {
        const {splbstrt,  labourCodes, matCds} = this.state;
        return <div>
           <Helmet>
          <title>{ TITLE }</title>
        </Helmet>  
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/splbstrt">   Labour</a> |
        <a className="path" href="/splbstrt">   Strut Labour Rates</a> |
        <a className="path2" href="/addsplbstrt">   Add New Strut Labour Rates</a> 
        </div>
         
<div className="container" align="center">       


       <h2>Add New Strut Labour Rate</h2>
       <br></br>
       <Form onSubmit={this.handleSubmit}>
       <div class="form-group row">
       <div className="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">DeptId</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="deptId" id="deptId" value={splbstrt.id.deptId} 
                  onChange={this.handleChange}  readOnly  />
                  </div>
                  <div class="col-sm-2">
           <Label for="name">Labour Code</Label>
           </div>
           <div class="col-sm-3">
           <DropdownList filter
                       data={labourCodes}
                       value={this.state.splbstrt.id.labourCode}
                       
                       allowCreate="onFilter"
                       onChange={this.handlechange}
                />
                  </div>
           
                  <div className="col-sm-1"></div>

         </div>
         
         
         
         <div class="form-group row">
         <div className="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">Labour Hours</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="labourHours" id="labourHours" value={splbstrt.labourHours} 
                  onChange={this.handleChange}  readOnly  />
                  </div>
                  <div class="col-sm-2">
           <Label for="name">Unit Price</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="unitPrice" id="unitprice" value={splbstrt.unitPrice} 
                  onChange={this.handleChange}  readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

         </div>
         
         <div class="form-group row" >
         <div className="col-sm-1"></div>

       <div class="col-sm-2">
           <Label for="name">Activity Code</Label>
           </div>
           <div class="col-sm-3">
           {/* <Input type="text" name="personalCorporate" id="personalCorporate" 
                  onChange={this.handleChange} autoComplete="personalCorporate"/> */}
                   <Input type="select" value={splbstrt.labourCode} name="activityCode" id="activityCode" onChange={this.handleChange}>
                   {/* <option value="AC1">AC!</option> */}
                          <option defaultValue="AC1" value="AC1">AC1</option>
                          <option value="AC2">AC2</option>
                          <option value="AC3">AC3</option>
                          <option value="AC4">AC4</option>
                          <option value="AC5">AC5</option>
                          <option value="AC6">AC6</option>
                          <option value="AC7">AC7</option>

                        </Input>
                  </div>
                  <div class="col-sm-2">
           <Label for="name">Application Type</Label>
           </div>
           <div class="col-sm-3">
          
                   <Input type="select" value={splbstrt.applicationType} name="applicationType" id="applicationType" onChange={this.handleChange}>
                          <option defaultValue="TC" value="TC">TC</option>
                          <option value="NC">NC</option>
                          <option value="CR">CR</option>

                        </Input>
                  </div>
                  <div className="col-sm-1"></div>
                  
         </div>
         <div class="form-group row">
         <div className="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">Material Code</Label>
           </div>
           <div class="col-sm-3">
           <DropdownList filter
                       data={matCds}
                       value={this.state.matCd}
                       
                       allowCreate="onFilter"
                       onChange={value => this.setState({ matCd:value })}
                />
                
                </div>
                  
                  <div className="col-sm-1"></div>

         </div>
         <br></br>
         <div class="form-group row" >
         <div className="col-sm-2"></div>

         <div class="col-sm-3">
           {/* <Button color="primary" type="submit">Save</Button>{' '} */}
           </div>
         <div class="col-sm-2">
           <Button color="primary" type="submit">Save</Button>{' '}
           </div>
           <div class="col-sm-2">
           <Button color="secondary" tag={Link} to="/splbstrt">Cancel</Button>
           </div>
         
         
           </div>


       </Form>
       </div>
      
        </div>
      }
}
export default SplbstrtAdd;