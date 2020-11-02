import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label, Container } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Edit Material';
class SppolemtEdit extends Component {
    emptySppolemt={
        id:{
        deptId:this.props.match.params.deptId,
        matCd:this.props.match.params.matCd,
        phase:this.props.match.params.phase,
        poleType:this.props.match.params.poleType,
        fromConductor:this.props.match.params.fromConductor,
        toConductor:this.props.match.params.toConductor,

        },
        matQty:''
        // updUser:''
		    
  };

  constructor(props) {
    super(props);
    this.state={
        sppolemt:this.emptySppolemt,
        // matCds:[],
        
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
async componentDidMount() {
  console.log("jjj");
  // console.log(this.state.spestmtm.id.matCd);
    await fetch(`/sppolemt/findByIdDeptIdAndIdPhaseAndIdPoleTypeAndIdFromConducterAndIdToConductorAndIdMatCd?deptId=${this.props.match.params.deptId}&phase=${this.props.match.params.phase}&poleType=${this.props.match.params.poleType}&fromConductor=${this.props.match.params.fromConductor}&toConductor=${this.props.match.params.toConductor}&matCd=${this.props.match.params.matCd}`
  
    )
      .then(response => response.json()
      .then(data => this.setState({sppolemt: data})));
      console.log(this.state.sppolemt.id);

    

}

handleChange(event) {
const target = event.target;
const value = target.value;
const name = target.name;
let sppolemt = {...this.state.sppolemt};
sppolemt[name] = value;
sppolemt.id[name]=value;
this.setState({sppolemt});
// spestmtm.id.matCd=this.state.matCd;
console.log(sppolemt.id);
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
        // const {spestmtm} = this.state;
        // spestmtm.updUser=localStorage.getItem('userName')

        // spestmtm.id.matCd=this.state.matCd;

        await fetch('/sppolemt/upd', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.sppolemt ),
          
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
     
        this.props.history.push("/sppolemtresult/"+this.props.match.params.deptId+"/"+this.props.match.params.phase+"/"+this.props.match.params.poleType+"/"+this.props.match.params.fromConductor+"/"+this.props.match.params.toConductor);
        console.log(this.state.sppolemt);
      }
    }

       render() {
        const {sppolemt} = this.state;
        return <div>
           <Helmet>
          <title>{ TITLE }</title>
        </Helmet>  
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/home">   Material  </a> |
        <a className="path" href="/sppolemt">   Pole Material  </a> |
        <a className="path2" href="/sppolemt">   Edit Material  </a> 
        </div>
      
<Container>
  
      <h2><center>Edit Material</center></h2>
        <Form onSubmit={this.handleSubmit}>
         
            <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Cost Center</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="deptId" id="deptId"  value={sppolemt.id.deptId}
                  onChange={this.handleChange} autoComplete="deptId" readOnly  />
                  </div>
                  </div>
        <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Phase</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="phase" id="phase"  value={sppolemt.id.phase}
                  onChange={this.handleChange} autoComplete="phase" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>
                  <div className="col-sm-2">
           <Label for="name">Pole Type</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="poleType" id="poleType"  value={sppolemt.id.poleType}
                  onChange={this.handleChange} autoComplete="poleType" readOnly  />
                  </div>
         </div>
         <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">From Conductor</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="fromConductor" id="fromConductor"  value={sppolemt.id.fromConductor}
                  onChange={this.handleChange} autoComplete="fromConductor" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">To Conductor</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="toConductor" id="toConductor"  value={sppolemt.id.toConductor}
                  onChange={this.handleChange} autoComplete="toConductor" readOnly  />
                  </div>
         </div>
         <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Material Code</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="matCd" id="matCd"  value={sppolemt.id.matCd}
                  onChange={this.handleChange} autoComplete="matCd" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Material Quntity</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="matQty" id="matQty"  value={sppolemt.matQty}
                  onChange={this.handleChange} autoComplete="matQty"   />
                  </div>
             </div>
             <div className="form-group row">
          
          <div className="col-sm-4"></div>
          <div className="col-sm-2">
          <Button color="primary" type="submit">Save</Button>{' '}

          </div>
          <div className="col-sm-2">
          <Button color="secondary" tag={Link} to={"/sppolemtresult/"+sppolemt.id.deptId+"/"+sppolemt.id.phase+"/"+sppolemt.id.poleType+"/"+sppolemt.id.fromConductor+"/"+sppolemt.id.toConductor}>Cancel</Button>

          </div>
     </div>

        </Form>
       
      </Container>
      
        </div>
      }
}
export default SppolemtEdit;