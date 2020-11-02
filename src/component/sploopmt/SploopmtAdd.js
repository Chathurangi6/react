import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label, Container,   } from 'reactstrap';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Add Loop Material';
class SploopmtAdd extends Component {
    emptySploopmt={
        id:{
        deptId:this.props.match.params.deptId,
        matCd:'',
        phase:this.props.match.params.phase,
        connectionType:this.props.match.params.connectionType,
        wiringType:this.props.match.params.wiringType
        },
        matQty:''
		    
  };

  constructor(props) {
    super(props);
    this.state={
        sploopmt:this.emptySploopmt,
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
let sploopmt = {...this.state.sploopmt};
sploopmt[name] = value;
sploopmt.id[name]=value;
this.setState({sploopmt});
console.log(sploopmt.id);
}

      async handleSubmit(event) {
        event.preventDefault();
        const {sploopmt} = this.state;
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
            sploopmt.id.matCd=this.state.matCd;
        await fetch('/sploopmt/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sploopmt ),
          
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
        this.props.history.push("/sploopmtresult/"+this.props.match.params.deptId+"/"+this.props.match.params.phase+"/"+this.props.match.params.connectionType+"/"+this.props.match.params.wiringType);
        console.log(sploopmt.id);
        console.log(sploopmt.id.matCd);
      }
    }

      render() {
        const {sploopmt, matCds} = this.state;
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
        <a className="path" href="/sploopmt">   Loop Material </a> |
        <a className="path2" href="/sploopmt">   Add New Loop Material </a> 
        </div>
<Container>

  <h2><center>Add New Loop Material</center></h2>
<br/>
        <Form onSubmit={this.handleSubmit}>
            <br></br>
            <br></br>
        <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Cost Center</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="deptId" id="deptId"  value={sploopmt.id.deptId}
                  onChange={this.handleChange} autoComplete="deptId" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Phase</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="phase" id="phase"  value={sploopmt.id.phase}
                  onChange={this.handleChange} autoComplete="phase" readOnly  />
                  </div>
         </div>
         <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">Connection Type</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="connectionType" id="connectionType"  value={sploopmt.id.connectionType}
                  onChange={this.handleChange} autoComplete="connectionType" readOnly  />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Wiring Type</Label>
           </div>
           <div className="col-sm-3">
           <Input type="text"  name="wiringType" id="wiringType"  value={sploopmt.id.wiringType}
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
                       placeholder="Please Select"
                       allowCreate="onFilter"
                       onChange={value => this.setState({ matCd:value })}
                />
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Material Quntity</Label>
           </div>
           <div className="col-sm-3">
           <Input type="number"  name="matQty" id="matQty" min="0" max="1" step=".01" value={sploopmt.matQty}
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
               <Button color="secondary" tag={Link} to={"/sploopmtresult/"+sploopmt.id.deptId+"/"+sploopmt.id.phase+"/"+sploopmt.id.connectionType+"/"+sploopmt.id.wiringType}>Cancel</Button>

               </div>
          </div>
        </Form>
        
      </Container>
        </div>
      }
}
export default SploopmtAdd;