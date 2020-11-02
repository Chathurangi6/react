import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Add New Transport Labour Rates';

class SplbpoltAdd extends Component {
    emptySplbpolt={
        id:{
        deptId:sessionStorage.getItem('costCenterNo')
        ,
        matCd:'',
        labourCode:''
        },
        activityCode:"AC1",
        applicationType:"TC",
        labourHours:'',
        unitPrice:''

    }
    emptyLabour={
        labourHours:'',
        unitPrice:''
    }
    
    constructor(props) {
        super(props);
        this.state = {
            splbpolt : this.emptySplbpolt,
          matCds:[],
          matCd:'',
          labourCodes:[],
          labour:this.emptyLabour

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
        let splbpolt = {...this.state.splbpolt};
        splbpolt[name] = value;
        splbpolt.id[name]=value;
        this.setState({SplbpoltAdd});

      }

    async  handlechange(event) {
          console.log(event);
          this.state.splbpolt.id.labourCode=event;
        
        let splbpolt = {...this.state.splbpolt};
        
        this.setState({ splbpolt })  
        console.log(this.state.splbpolt.id.labourCode);
       await fetch(`/labour/findLabourHoursAndUnitPriceByIdDeptIdAndIdLabourCodeAndIdYear?deptId=${splbpolt.id.deptId}&labourCode=${splbpolt.id.labourCode}`)
          .then(response => response.json())
          .then(data => this.setState({labour: data}));
          console.log(this.state.labour);
          splbpolt.labourHours=this.state.labour[0];
          splbpolt.unitPrice=this.state.labour[1];
        

          this.setState({ splbpolt }) ;

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
          
        const {splbpolt} = this.state;
        splbpolt.id.matCd=this.state.matCd;
      
        await fetch('/splbpolt/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(splbpolt ),
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
        this.props.history.push('/splbpolt');
        console.log(splbpolt);
      }
    }

      render() {
        const {splbpolt, matCds, labourCodes} = this.state;
        return <div>
 <Helmet>
          <title>{ TITLE }</title>
        </Helmet>  
      
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/splbpolt">   Labour</a> |
        <a className="path" href="/splbpolt">   Transport Labour Rates</a> |
        <a className="path2" href="/addsplbpolt">   Add New Transport Labour Rate</a> 
        </div>
       
<div className="container" align="center">       
     

       <h2>Add New Transport Labour Rate </h2>
       <br/>
       <Form onSubmit={this.handleSubmit}>
       <div class="form-group row">
       <div className="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">DeptId</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="deptId" id="deptId" value={splbpolt.id.deptId} 
                  onChange={this.handleChange}  readOnly  />
                  </div>
                  <div class="col-sm-2">
           <Label for="name">MatCd</Label>
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
         
         <div class="form-group row">
         <div className="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">Labour Code</Label>
           </div>
           <div class="col-sm-3">
           <DropdownList filter
                       data={labourCodes}
                       value={this.state.splbpolt.id.labourCode}
                       
                       allowCreate="onFilter"
                       onChange={this.handlechange}
                />
                  </div>
         </div>
         
         <div class="form-group row">
         <div className="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">Labour Hours</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="labourHours" id="labourHours" value={splbpolt.labourHours} 
                  onChange={this.handleChange}  readOnly required />
                  </div>
                  <div class="col-sm-2">
           <Label for="name">Unit Price</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="unitPrice" id="unitprice" value={splbpolt.unitPrice} 
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
                   <Input type="select" value={splbpolt.labourCode} name="activityCode" id="activityCode" onChange={this.handleChange}>
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
          
                   <Input type="select" value={splbpolt.applicationType} name="applicationType" id="applicationType" onChange={this.handleChange}>
                          <option defaultValue="TC" value="TC">TC</option>
                          <option value="NC">NC</option>
                          <option value="CR">CR</option>

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
           <Button color="secondary" tag={Link} to="/splbpolt">Cancel</Button>
           </div>
         
         
           </div>


       </Form>
       </div>
      
        </div>
      }
}
export default SplbpoltAdd;