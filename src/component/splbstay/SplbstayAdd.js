import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Add New stay labour Rate';

class SplbstayAdd extends Component {
    emptySplbstay={
        id:{
        deptId:sessionStorage.getItem('costCenterNo')
        ,
        labourCode:''
        },
        activityCode:"AC1",
        applicationType:"TC",
        labourHours:'',
        unitPrice:'',
        stayType:"FLYING"

        

    }
    emptyLabour={
        labourHours:'',
        unitPrice:''
    }
    
    constructor(props) {
        super(props);
        this.state = {
            splbstay : this.emptySplbstay,
          
          labourCodes:[],
          labour:this.emptyLabour

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlechange = this.handlechange.bind(this);

    }

    async componentDidMount() {
      

          fetch('/labour/allLabourCodes')
          .then(response => response.json())
          .then(data => this.setState({labourCodes: data}));

          
    
        
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let splbstay = {...this.state.splbstay};
        splbstay[name] = value;
        splbstay.id[name]=value;
        this.setState({splbstay});

      }

    async  handlechange(event) {
          console.log(event);
          this.state.splbstay.id.labourCode=event;
       
        let splbstay = {...this.state.splbstay};
        
        this.setState({ splbstay })  
        console.log(this.state.splbstay.id.labourCode);
       await fetch(`/labour/findLabourHoursAndUnitPriceByIdDeptIdAndIdLabourCodeAndIdYear?deptId=${splbstay.id.deptId}&labourCode=${splbstay.id.labourCode}`)
          .then(response => response.json())
          .then(data => this.setState({labour: data}));
          console.log(this.state.labour);
          splbstay.labourHours=this.state.labour[0];
          splbstay.unitPrice=this.state.labour[1];
        
          this.setState({ splbstay }) ;

     }
      async handleSubmit(event) {
        event.preventDefault();
        const message= await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, save it!'
        })
        if(message.value){
          
        const {splbstay} = this.state;
        await fetch('/splbstay/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(splbstay ),
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
        this.props.history.push('/splbstay');
        console.log(splbstay);
      }
    }

      render() {
        const {splbstay,  labourCodes} = this.state;
        return <div>
           <Helmet>
          <title>{ TITLE }</title>
        </Helmet>  
        
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/splbstay">   Labour</a> |
        <a className="path" href="/splbstay">   Stay Labour Rates</a> |
        <a className="path2" href="/addsplbstay">   Add New Stay Labour Rates</a> 
        </div>
         
<div className="container" align="center">       


       <h2>Add New Stay Labour Rate </h2>
       <br/>
       <Form onSubmit={this.handleSubmit}>
       <div class="form-group row">
       <div className="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">DeptId</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="deptId" id="deptId" value={splbstay.id.deptId} 
                  onChange={this.handleChange}  readOnly  />
                  </div>
                  <div class="col-sm-2">
           <Label for="name">Labour Code</Label>
           </div>
           <div class="col-sm-3">
           <DropdownList filter
                       data={labourCodes}
                       value={this.state.splbstay.id.labourCode}
                       
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
           <Input type="text"  name="labourHours" id="labourHours" value={splbstay.labourHours} 
                  onChange={this.handleChange}  readOnly  />
                  </div>
                  <div class="col-sm-2">
           <Label for="name">Unit Price</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="unitPrice" id="unitprice" value={splbstay.unitPrice} 
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
                   <Input type="select" value={splbstay.labourCode} name="activityCode" id="activityCode" onChange={this.handleChange}>
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
          
                   <Input type="select" value={splbstay.applicationType} name="applicationType" id="applicationType" onChange={this.handleChange}>
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
           <Label for="name">Stay Type</Label>
           </div>
           <div class="col-sm-3">
           <Input type="select" value={splbstay.stayType} name="stayType" id="stayType" onChange={this.handleChange}>
                          <option defaultValue="FLYING" value="FLYING">FLYING</option>
                          <option value="NORMAL">NORMAL</option>

                        </Input>
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
           <Button color="secondary" tag={Link} to="/splbstay">Cancel</Button>
           </div>
         
         
           </div>


       </Form>
       </div>
       
        </div>
      }
}
export default SplbstayAdd;