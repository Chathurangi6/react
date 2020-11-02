import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label, Container } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Edit Wire Material';

class SpsvcwrmEdit extends Component {
    emptySpsvcwrm={
        id:{
        deptId:this.props.match.params.deptId,
        matCd:this.props.match.params.matCd,
        phase:this.props.match.params.phase,
        connectionType:this.props.match.params.connectionType,
        wiringType:this.props.match.params.wiringType
        },
        extraQty:''
		    
  };

  constructor(props) {
    super(props);
    this.state={
        spsvcwrm:this.emptySpsvcwrm,
        // matCds:[],
        
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
async componentDidMount() {
  console.log("jjj");
  // console.log(this.state.spestmtm.id.matCd);
    await fetch(`/spsvcwrm/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdWiringTypeAndIdMatCd?deptId=${this.props.match.params.deptId}&phase=${this.props.match.params.phase}&connectionType=${this.props.match.params.connectionType}&wiringType=${this.props.match.params.wiringType}&matCd=${this.props.match.params.matCd}`
  
    )
      .then(response => response.json()
      .then(data => this.setState({spsvcwrm: data})));
      console.log(this.state.spsvcwrm.id);

    //  await fetch('/inmatm/allMatCds')
    //   .then(response => response.json())
    //   .then(data => this.setState({matCds: data}));
    //   console.log(this.state.matCds);

}

handleChange(event) {
const target = event.target;
const value = target.value;
const name = target.name;
let spsvcwrm = {...this.state.spsvcwrm};
spsvcwrm[name] = value;
spsvcwrm.id[name]=value;
this.setState({spsvcwrm});
// spestmtm.id.matCd=this.state.matCd;
console.log(spsvcwrm.id);
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
        const {spsvcwrm} = this.state;
        // spestmtm.updUser=localStorage.getItem('userName')

        // spestmtm.id.matCd=this.state.matCd;

        await fetch('/spsvcwrm/upd', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(spsvcwrm ),
          
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
     
        this.props.history.push("/spsvcwrmresult/"+this.props.match.params.deptId+"/"+this.props.match.params.phase+"/"+this.props.match.params.connectionType+"/"+this.props.match.params.wiringType);
        console.log(spsvcwrm);
      }
    }

      render() {
        const {spsvcwrm} = this.state;
        return <div>
          <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
              
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/home">   Material  </a> |
        <a className="path" href="/spsvcwrm">   Wire Material  </a> |
        <a className="path2" href="/spsvcwrm">   Edit Wire Material  </a> 
        </div>
          
<Container>
   
      <h2><center>Edit Material</center></h2>
        <Form onSubmit={this.handleSubmit}>
            <br/>
        <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Cost Center</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="deptId" id="deptId"  value={spsvcwrm.id.deptId}
                  onChange={this.handleChange} autoComplete="deptId" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>
                  <div className="col-sm-2">
           <Label for="name">Phase</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="phase" id="phase"  value={spsvcwrm.id.phase}
                  onChange={this.handleChange} autoComplete="phase" readOnly  />
                  </div>
         </div>
         <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Connection Type</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="connectionType" id="connectionType"  value={spsvcwrm.id.connectionType}
                  onChange={this.handleChange} autoComplete="connectionType" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Wiring Type</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="wiringType" id="wiringType"  value={spsvcwrm.id.wiringType}
                  onChange={this.handleChange} autoComplete="wiringType" readOnly  />
                  </div>
         </div>
         <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Material Code</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="matCd" id="matCd"  value={spsvcwrm.id.matCd}
                  onChange={this.handleChange} autoComplete="matCd" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Extra Quntity</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="extraQty" id="extraQty"  value={spsvcwrm.extraQty}
                  onChange={this.handleChange} autoComplete="extraQty"   />
                  </div>
             </div>
             <div className="form-group row">
          
          <div className="col-sm-4"></div>
          <div className="col-sm-2">
          <Button color="primary" type="submit">Save</Button>{' '}

          </div>
          <div className="col-sm-2">
          <Button color="secondary" tag={Link} to={"/spsvcwrmresult/"+spsvcwrm.id.deptId+"/"+spsvcwrm.id.phase+"/"+spsvcwrm.id.connectionType+"/"+spsvcwrm.id.wiringType}>Cancel</Button>

          </div>
     </div>

        </Form>
       
      </Container>
      
        </div>
      }
}
export default SpsvcwrmEdit;