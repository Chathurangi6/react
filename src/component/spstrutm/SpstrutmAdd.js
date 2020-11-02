import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Add New Struct Material';

class SpstrutmAdd extends Component {
    emptySpstrutm={
        id:{
        deptId:sessionStorage.getItem('costCenterNo'),
        matCd:''
        },
        
        matQty:''

        

    }
    constructor(props) {
        super(props);
        this.state = {
            spstrutm: this.emptySpstrutm,
          matCds:[],
          matCd:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
      fetch('/inmatm/allMatCds')
          .then(response => response.json())
          .then(data => this.setState({matCds: data}));
    
        
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let spstrutm = {...this.state.spstrutm};
        spstrutm[name] = value;
        spstrutm.id[name]=value;
        this.setState({spstrutm});
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
          
        const {spstrutm} = this.state;
        spstrutm.id.matCd=this.state.matCd;
        // spstrutm.addUser=localStorage.getItem('userName')
        await fetch('/spstrutm/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(spstrutm ),
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
        this.props.history.push('/spstrutm');
        console.log(spstrutm);
      }
    }

      render() {
        const {spstrutm, matCds} = this.state;
        return <div>
                 <Helmet>
          <title>{ TITLE }</title>
        </Helmet>                
  
                 <div className="padding">
                 <a className="path" href="/home">  Home  </a> |
                 <a className="path" href="/home">  Master  </a> |
                 <a className="path" href="/home">   Material  </a> |
                 <a className="path" href="/spstaymt">   Struct Material </a> |
                 <a className="path2" href="/spstaymt">   Add New Struct Material </a> 
                 </div>
              
<div className="container" align="center">       
 
       <h2>Add New Strut Material</h2>
       <br/>
       <Form onSubmit={this.handleSubmit}>
       <div class="form-group row">
         <div className="col-sm-2"></div>
         <div class="col-sm-3">
           <Label for="name">DeptId</Label>
           </div>
           <div class="col-sm-4">
           <Input type="text"  name="23" id="deptId" value={spstrutm.id.deptId} placeholder="23"
                  onChange={this.handleChange} autoComplete="23" readOnly  />
                  </div>
         </div>
         <div class="form-group row">
         <div className="col-sm-2"></div>

         <div class="col-sm-3">
           <Label for="name">MatCd</Label>
           </div>
           <div class="col-sm-4">
           <DropdownList filter
                       data={matCds}
                       value={this.state.matCd}
                       
                       allowCreate="onFilter"
                       onChange={value => this.setState({ matCd:value })}
                />
                  </div>
         </div>
         <div class="form-group row">
         <div className="col-sm-2"></div>

         <div class="col-sm-3">
           <Label for="name">MatQty</Label>
           </div>
           <div class="col-sm-4">
           <Input type="text"  name="matQty" id="matQty"  value={spstrutm.matQty}
                  onChange={this.handleChange} autoComplete="matQty"  required />
                  </div>
         </div>
         <div class="form-group row">
         <div className="col-sm-2"></div>

         <div class="col-sm-3">
           {/* <Button color="primary" type="submit">Save</Button>{' '} */}
           </div>
         <div class="col-sm-2">
           <Button color="primary" type="submit">Save</Button>{' '}
           </div>
           <div class="col-sm-2">
           <Button color="secondary" tag={Link} to="/spstrutm">Cancel</Button>
           </div>
         
         
           </div>


       </Form>
       </div>
       
        </div>
      }
}
export default SpstrutmAdd;