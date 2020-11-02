import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label, Container } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Edit Under Ground Material';

class SpugcblmhEdit extends Component {
    emptySpugcblmh={
        id:{
        deptId:this.props.match.params.deptId,
        year:this.props.match.params.year,
        phase:this.props.match.params.phase,
        connectionType:this.props.match.params.connectionType,
        cableType:this.props.match.params.cableType
        },
        fixedCost:'',
        wireMeterPrice:'',
        updatedBy:''
		    
  };

  constructor(props) {
    super(props);
    this.state={
        spugcblmh:this.emptySpugcblmh,
        // matCds:[],
        
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
async componentDidMount() {
  console.log("jjj");
  // console.log(this.state.spestmtm.id.matCd);
    await fetch(`/spugcblmh/findByIdDeptIdAndIdPhaseAndIdConnectionTypeAndIdCableTypeAndIdYear?deptId=${this.props.match.params.deptId}&phase=${this.props.match.params.phase}&connectionType=${this.props.match.params.connectionType}&cableType=${this.props.match.params.cableType}&year=${this.props.match.params.year}`
  
    )
      .then(response => response.json()
      .then(data => this.setState({spugcblmh: data})));
      console.log(this.state.spugcblmh.id);

    //  await fetch('/inmatm/allMatCds')
    //   .then(response => response.json())
    //   .then(data => this.setState({matCds: data}));
    //   console.log(this.state.matCds);

}

handleChange(event) {
const target = event.target;
const value = target.value;
const name = target.name;
let spugcblmh = {...this.state.spugcblmh};
spugcblmh[name] = value;
spugcblmh.id[name]=value;
this.setState({spugcblmh});
// spestmtm.id.matCd=this.state.matCd;
// console.log(sploopmt.id);
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
        const {spugcblmh} = this.state;
        spugcblmh.updatedBy=localStorage.getItem('userName')

        // spestmtm.id.matCd=this.state.matCd;

        await fetch('/spugcblmh/upd', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(spugcblmh ),
          
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
     
        this.props.history.push("/spugcblmhresult/"+this.props.match.params.deptId+"/"+this.props.match.params.phase+"/"+this.props.match.params.connectionType+"/"+this.props.match.params.cableType);
        console.log(spugcblmh);
      }
    }

     render() {
        const {spugcblmh} = this.state;
        return <div>
               <Helmet>
          <title>{ TITLE }</title>
        </Helmet>                   
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/home">   Material  </a> |
        <a className="path" href="/spugcblmh">   Under Ground Material </a> |
        <a className="path2" href="/spugcblmh">   Edit Under Ground Material </a> 
        </div>
      
        
<Container>
  
      <h2><center>Edit Under Ground Material</center></h2>
        <Form onSubmit={this.handleSubmit}>
            <br/>
        <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Cost Center</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="deptId" id="deptId"  value={spugcblmh.id.deptId}
                  onChange={this.handleChange} autoComplete="deptId" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>
                  <div className="col-sm-2">
           <Label for="name">Phase</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="phase" id="phase"  value={spugcblmh.id.phase}
                  onChange={this.handleChange} autoComplete="phase" readOnly  />
                  </div>
         </div>
         <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Connection Type</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="connectionType" id="connectionType"  value={spugcblmh.id.connectionType}
                  onChange={this.handleChange} autoComplete="connectionType" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Cable Type</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="cableType" id="cableType"  value={spugcblmh.id.cableType}
                  onChange={this.handleChange} autoComplete="cableType" readOnly  />
                  </div>
         </div>
         <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Year</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="year" id="year"  value={spugcblmh.id.year}
                  onChange={this.handleChange} autoComplete="year" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Fixed Cost</Label>
           </div>
           <div className="col-sm-3">
           <Input type="number"  name="fixedCost" id="fixedCost" min="0" max="1" step=".01" value={spugcblmh.fixedCost}
                  onChange={this.handleChange} autoComplete="fixedCost"   />
                  </div>
             </div>
             <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">WireMeter price </Label>
           </div>
           <div className="col-sm-3">
           <Input type="number"  name="wireMeterPrice" id="wireMeterPrice" min="0" max="1" step=".01" value={spugcblmh.wireMeterPrice}
                  onChange={this.handleChange} autoComplete="wireMeterPrice"   />
                  </div>
                  <div className="col-sm-1"></div>

                  
         </div>
         <br></br>
             <div className="form-group row">
          
          <div className="col-sm-4"></div>
          <div className="col-sm-2">
          <Button color="primary" type="submit">Save</Button>{' '}

          </div>
          <div className="col-sm-2">
          <Button color="secondary" tag={Link} to={"/spugcblmhresult/"+spugcblmh.id.deptId+"/"+spugcblmh.id.phase+"/"+spugcblmh.id.connectionType+"/"+spugcblmh.id.wiringType}>Cancel</Button>

          </div>
     </div>

        </Form>
       
      </Container>

        </div>
      }
}
export default SpugcblmhEdit;