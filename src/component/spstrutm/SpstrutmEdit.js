import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label } from 'reactstrap';
import '../../css/Path.css';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
const TITLE = 'Edit Struct Material';

class SpstrutmEdit extends Component {
    emptySpstrutm={
        id:{
        deptId:'',
        matCd:''
        },
        
        matQty:''
    }
  
    constructor(props) {
        super(props);
       
        this.state = {
          
            spstrutm: this.emptySpstrutm,
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {

      console.log("kk"+this.props)
    
        const abc = await(await fetch(`/spstrutm/findByIdDeptIdAndIdMatCd?deptId=${this.props.match.params.deptId}&matCd=${this.props.match.params.matCd}`)).json();
        this.setState({spstrutm: abc});
        console.log("gfgffg"+this.props)
    };
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
        // spdppolm.updUser=localStorage.getItem('userName')

        await fetch('/spstrutm/upd', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        //   body: JSON.stringify(spdppolmuser),
          body: JSON.stringify(spstrutm ),
          
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
     
        this.props.history.push('/spstrutm');
        console.log(spstrutm.id);
      }
    }

      render() {
        const {spstrutm} = this.state;
        return <div>
             <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        
        <div className="padding">
                 <a className="path" href="/home">  Home  </a> |
                 <a className="path" href="/home">  Master  </a> |
                 <a className="path" href="/home">   Material  </a> |
                 <a className="path" href="/spstaymt">   Struct Material </a> |
                 <a className="path2" href="/spstaymt">   Edit Struct Material </a> 
                 </div>
         
<div className="container" align="center">     
       <br></br>
       <h2>Edit Strut Material</h2>
       <br></br>
       <Form onSubmit={this.handleSubmit}>
       <div class="form-group row">
       <div class="col-sm-2"></div>

         <div class="col-sm-2">
           <Label for="name">DeptId</Label>
           </div>
           <div class="col-sm-4">
           <Input type="text"  name="deptId" id="deptId" 
                  onChange={this.handleChange} autoComplete="deptId" value={spstrutm.id.deptId || ''} readOnly  />
                  </div>
         </div>
         <div class="form-group row">
         <div class="col-sm-2"></div>

         <div class="col-sm-2">                                  
           <Label for="name">MatCd</Label>
           </div>
           <div class="col-sm-4">
           <Input type="text"  name="matCd" id="matCd" 
                  onChange={this.handleChange} autoComplete="matCd" value={spstrutm.id.matCd || ''} readOnly  />
                  </div>
         </div>
         
         <div class="form-group row">
         <div class="col-sm-2"></div>

         <div class="col-sm-2">
           <Label for="name">MatQty</Label>
           </div>

           <div class="col-sm-4">
           
           <Input type="text"  name="matQty" id="matQty"  value={spstrutm.matQty}
                  onChange={this.handleChange} autoComplete="matQty"   />
                  </div>
         </div>
         <br></br>
         <div class="form-group row">
         <div class="col-sm-4"></div>
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
export default SpstrutmEdit;