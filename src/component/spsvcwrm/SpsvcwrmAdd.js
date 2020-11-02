import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label, Container,   } from 'reactstrap';
import '../../css/Path.css';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
const TITLE = 'Add Wire Material';

class SpsvcwrmAdd extends Component {
    emptySpsvcwrm={
        id:{
        deptId:this.props.match.params.deptId,
        matCd:'',
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
let spsvcwrm = {...this.state.spsvcwrm};
spsvcwrm[name] = value;
spsvcwrm.id[name]=value;
this.setState({spsvcwrm});
console.log(spsvcwrm.id);
}

      async handleSubmit(event) {
        event.preventDefault();
        const {spsvcwrm} = this.state;
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
            spsvcwrm.id.matCd=this.state.matCd;
        await fetch('/spsvcwrm/add', {
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
        console.log(spsvcwrm.id);
        console.log(spsvcwrm.id.matCd);
      }
    }

      render() {
        const {spsvcwrm, matCds} = this.state;
        // const {MatCd}=spestmtm.id.matCd;
        // const matCd=matCds.map(matCd);
        return <div>
          <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
       
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/home">   Material  </a> |
        <a className="path" href="/spsvcwrm">   Wire Material  </a> |
        <a className="path2" href="/spsvcwrm">   Add Wire Material  </a> 
        </div>
       
<Container>

  <h2><center>Add Wire Material</center></h2>
<br/>
        <Form onSubmit={this.handleSubmit}>
         
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
                  onChange={this.handleChange} autoComplete="deptId" readOnly  />
                  </div>
         </div>
         <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Material Code</Label>
           </div>
           <div className="col-sm-3">
           <DropdownList filter
                       data={matCds}
                       value={this.state.matCd}
                       
                       allowCreate="onFilter"
                       onChange={value => this.setState({ matCd:value })}
                />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Extra Quntity</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="extraQty" id="extraQty"  value={spsvcwrm.extraQty}
                  onChange={this.handleChange} autoComplete="extraQty"  required />
                  </div>
             </div>


      
         <br></br>
          
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
export default SpsvcwrmAdd;