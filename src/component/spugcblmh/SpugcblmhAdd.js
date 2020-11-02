import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label, Container,   } from 'reactstrap';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Add Under Ground Material';

class SpugcblmhAdd extends Component {
    emptySpugcblmh={
        id:{
        deptId:this.props.match.params.deptId,
        year:"2019",
        phase:this.props.match.params.phase,
        connectionType:this.props.match.params.connectionType,
        cableType:this.props.match.params.cableType
        },
        fixedCost:'',
        wireMeterPrice:''
		    
  };

  constructor(props) {
    super(props);
    this.state={
        spugcblmh:this.emptySpugcblmh
        // matCds:[],
        // matCd:''
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
async componentDidMount() {
//   fetch('/inmatm/allMatCds')
//       .then(response => response.json())
//       .then(data => this.setState({matCds: data}));

    
}

handleChange(event) {
const target = event.target;
const value = target.value;
const name = target.name;
let spugcblmh = {...this.state.spugcblmh};
spugcblmh[name] = value;
spugcblmh.id[name]=value;
this.setState({spugcblmh});
console.log(spugcblmh.id);
}

      async handleSubmit(event) {
        event.preventDefault();
        const {spugcblmh} = this.state;
        const message= await Swal.fire({
          title: 'Are you sure?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, save it!'
        })
        if(message.value){
            // spugcblmh.id.matCd=this.state.matCd;
        await fetch('/spugcblmh/add', {
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
        console.log(spugcblmh.id);
        // console.log(sploopmt.id.matCd);
      }
    }


      render() {
        const {spugcblmh} = this.state;
        // const {MatCd}=spestmtm.id.matCd;
        // const matCd=matCds.map(matCd);
        let minOffset = 0, maxOffset = 10;
        let thisYear = (new Date()).getFullYear();
        let allYears = [];
        for(let x = 0; x <= maxOffset; x++) {
            allYears.push(thisYear + x)
        }
       return <div>              
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/home">   Material  </a> |
        <a className="path" href="/spugcblmh">   Under Ground Material </a> |
        <a className="path2" href="/spugcblmh">   Add New Under Ground Material </a> 
        <br/><br/>
           <Helmet>
          <title>{ TITLE }</title>
        </Helmet> 
        </div>
     
        
<Container>
 
  <h2><center>Add New Under Ground Material</center></h2>

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
           {/* <Input type="select"  name="year" id="year" onChange={this.handleChange} required>
           
           <option defaultValue="2019" value="2019">2019</option>
           <option value="2020">2020</option>
           <option value="2021">2021</option>
           <option value="2022">2022</option>
           <option value="2023">2023</option>
           <option value="2024">2024</option>
           <option value="2025">2025</option>
           <option value="2026">2026</option>


         </Input> */}
         <Input type="select"  name="year" id="year"  onChange={this.handleChange} required>
                   <option >Please Select The Year</option>
                   {(allYears.map((year)=>{
                                return(<option value={year}>{year}</option>)
                              }))}
                                </Input>
                  </div>
                  <div className="col-sm-1"></div>

                  <div className="col-sm-2">
           <Label for="name">Fixed Cost</Label>
           </div>
           <div className="col-sm-3">
           <Input type="number"  name="fixedCost" id="fixedCost" min="0" max="1" step=".01" value={spugcblmh.fixedCost}
                  onChange={this.handleChange} autoComplete="fixedCost"  required />
                  </div>
             </div>
             <div className="form-group row">
         <div className="col-sm-2">
           <Label for="name">WireMeter price </Label>
           </div>
           <div className="col-sm-3">
           <Input type="number" min="0" max="1" step=".01"  name="wireMeterPrice" id="wireMeterPrice"  value={spugcblmh.wireMeterPrice}
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
export default SpugcblmhAdd;