import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label, Container } from 'reactstrap';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import Footer from '../Common/Foot/Footer';
import { Helmet } from 'react-helmet';
const TITLE = 'Add Material';
class SpestmtmAdd extends Component {
    emptySpestmtm={
        id:{
        deptId:this.props.match.params.deptId,
        matCd:'',
        phase:this.props.match.params.phase,
        connectionType:this.props.match.params.connectionType,
        wiringType:this.props.match.params.wiringType
        },
        matQty:'',
        updUser:''
		    
  };

  constructor(props) {
    super(props);
    this.state={
        spestmtm:this.emptySpestmtm,
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
let spestmtm = {...this.state.spestmtm};
spestmtm[name] = value;
spestmtm.id[name]=value;
this.setState({spestmtm});
console.log(spestmtm.id);
}

      async handleSubmit(event) {
        event.preventDefault();
        const {spestmtm} = this.state;
        const message= await Swal.fire({
          title: 'Are you sure?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, save it!'
        })
        if(message.value){
        spestmtm.id.matCd=this.state.matCd;
        await fetch('/spestmtm/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(spestmtm ),
          
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
        this.props.history.push("/spestmtmresult/"+this.props.match.params.deptId+"/"+this.props.match.params.phase+"/"+this.props.match.params.connectionType+"/"+this.props.match.params.wiringType);
        console.log(spestmtm.id);
        console.log(spestmtm.id.matCd);
      }
    }

      render() {
        const {spestmtm, matCds} = this.state;
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
        <a className="path" href="/spestmtm">   Search Material </a> |
        <a className="path2" href="/spestmtmadd">   Add Material </a> 
        </div>
        
<Container>
  <br></br>
  <br></br>
  <h2><center>Add Material</center></h2>

        <Form onSubmit={this.handleSubmit}>
            <br></br>
            <br></br>
        <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Cost Center</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="deptId" id="deptId"  value={spestmtm.id.deptId}
                  onChange={this.handleChange} autoComplete="deptId" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Phase</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="phase" id="phase"  value={spestmtm.id.phase}
                  onChange={this.handleChange} autoComplete="phase" readOnly  />
                  </div>
         </div>
         <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Connection Type</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="connectionType" id="connectionType"  value={spestmtm.id.connectionType}
                  onChange={this.handleChange} autoComplete="connectionType" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Wiring Type</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="wiringType" id="wiringType"  value={spestmtm.id.wiringType}
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
           <Label for="name">Material Quntity</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="matQty" id="matQty"  value={spestmtm.matQty}
                  onChange={this.handleChange} autoComplete="matQty"  required />
                  </div>
             </div>


      
         <br></br>
          
          <div className="form-group row">
          
               <div className="col-sm-4"></div>
               <div className="col-sm-2">
               <Button color="primary" type="submit">Save</Button>{' '}

               </div>
               <div className="col-sm-2">
               <Button color="secondary" tag={Link} to={"/spestmtmresult/"+spestmtm.id.deptId+"/"+spestmtm.id.phase+"/"+spestmtm.id.connectionType+"/"+spestmtm.id.wiringType}>Cancel</Button>

               </div>
          </div>
        </Form>
        
      </Container>
      
        </div>
      }
}
export default SpestmtmAdd;