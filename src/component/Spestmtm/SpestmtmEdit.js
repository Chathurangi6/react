import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label, Container } from 'reactstrap';
import 'react-widgets/dist/css/react-widgets.css';
import '../../css/Path.css';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
const TITLE = 'Edit Material';
class SpestmtmEdit extends Component {
    emptySpestmtm={
        id:{
        deptId:this.props.match.params.deptId,
        matCd:this.props.match.params.matCd,
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
        // matCds:[],
        
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
async componentDidMount() {
  console.log("jjj");
  // console.log(this.state.spestmtm.id.matCd);
    await fetch(`/spestmtm/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdWiringTypeAndIdMatCd?deptId=${this.props.match.params.deptId}&phase=${this.props.match.params.phase}&connectionType=${this.props.match.params.connectionType}&wiringType=${this.props.match.params.wiringType}&matCd=${this.props.match.params.matCd}`
  
    )
      .then(response => response.json()
      .then(data => this.setState({spestmtm: data})));
      console.log(this.state.spestmtm.id);

    //  await fetch('/inmatm/allMatCds')
    //   .then(response => response.json())
    //   .then(data => this.setState({matCds: data}));
    //   console.log(this.state.matCds);

}

handleChange(event) {
const target = event.target;
const value = target.value;
const name = target.name;
let spestmtm = {...this.state.spestmtm};
spestmtm[name] = value;
spestmtm.id[name]=value;
this.setState({spestmtm});
// spestmtm.id.matCd=this.state.matCd;
console.log(spestmtm.id);
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
        const {spestmtm} = this.state;
        spestmtm.updUser=localStorage.getItem('userName')

        // spestmtm.id.matCd=this.state.matCd;

        await fetch('/spestmtm/upd', {
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
        console.log(spestmtm);
      }
    }

      render() {
        const {spestmtm} = this.state;
        return <div>
              <Helmet>
          <title>{ TITLE }</title>
        </Helmet>                   
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/home">   Material  </a> |
        <a className="path" href="/spestmtm">   Search Material </a> |
        <a className="path2" href="/spestmtm">   Edit Material </a> 
        </div>
       
<Container>

      <h2><center>Edit Material</center></h2>
        <Form onSubmit={this.handleSubmit}>
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
                  onChange={this.handleChange} autoComplete="wiringType" readOnly  />
                  </div>
         </div>
         <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Material Code</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="matCd" id="matCd"  value={spestmtm.id.matCd}
                  onChange={this.handleChange} autoComplete="matCd" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Material Quntity</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="matQty" id="matQty"  value={spestmtm.matQty}
                  onChange={this.handleChange} autoComplete="matQty"   />
                  </div>
             </div>
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
export default SpestmtmEdit;