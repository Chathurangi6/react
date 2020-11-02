import React, { Component } from 'react';
import {  withRouter,Link} from 'react-router-dom';
import {  Container, Form, Input, Table, Label,Button} from 'reactstrap';
//import HomeNavbar from '../Common/Nav/HomeNavbar';
import Footer from '../Common/Foot/Footer';
import { Helmet } from 'react-helmet';
const TITLE = 'History Of Conductor Rate';

class Spcndctmh extends Component {
    emptySpcndctmh={
        id:{
            phase:'',
            conductorType:'',
            year:''      
        },
        updatedBy:'',
        wireMeterPrice:''    
  };

  constructor(props) {
    super(props);
    this.state={
        spcndctmh:this.emptySpcndctmh,
        spcndctmhs:[],
        isLoading: true,
        isMaterial:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData=this.getData.bind(this);
}

handleChange(event) {
    this.setState({isMaterial:false});
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let spcndctmh = {...this.state.spcndctmh};
      spcndctmh[name] = value;
      spcndctmh.id[name]=value;
      this.setState({spcndctmh},()=>this.getData());
      this.setState({isMaterial:true});
    //    fetch(`/spcndctmh/findByIdYear?year=${spcndctmh.id.year}`)
    //   .then(response => response.json())
    //   .then(data => this.setState({spcndctmhs: data, isLoading: false}));
    //   console.log(this.state.spcndctmhs);
    //   this.props.history.push("/spestmtmresult/"+this.state.spestmtm.id.deptId+"/"+this.state.spestmtm.id.phase+"/"+this.state.spestmtm.id.connectionType+"/"+this.state.spestmtm.id.wiringType)

    }

    getData(){
        console.log(this.state.spcndctmh.id.year)
        fetch(`/spcndctmh/findByIdYear?year=${this.state.spcndctmh.id.year}`)
      .then(response => response.json())
      .then(data => this.setState({spcndctmhs: data, isLoading: false}));
      console.log(this.state.spcndctmhs);
    }
  
    async componentDidMount() {
    
      }

      render() {
        const {spcndctmhs}=this.state;
        const spcndctmhList=spcndctmhs.map(spcndctmh=>{
          return <tr key={spcndctmh.id.phase}>
            <td>{spcndctmh.id.phase}</td>
            <td>{spcndctmh.id.conductorType}</td>
            <td >{spcndctmh.id.year}</td>
            <td>{spcndctmh.wireMeterPrice}</td>
            <td>{spcndctmh.updatedBy}</td>
            <td>{spcndctmh.updatedDate}</td>

          </tr>
        
        });
        let minOffset = 0, maxOffset = 10;
        let thisYear = (new Date()).getFullYear();
        let allYears = [];
        for(let x = 0; x <= maxOffset; x++) {
            allYears.push(thisYear - x)
        }
        return (
            <div>
              
<Helmet>
          <title>{ TITLE }</title>
        </Helmet>
               <br/>
        <div className="padd-left">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/spcndctmh">   Labour</a> |
        <a className="path2" href="/spcndctmh">   History Of Coductor Rates</a> 
        </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <h3 ><center>History Of Conductor Rates</center></h3>
              <Container>
                <br></br>
        
                <div class="card bg-light mb-9" style={{width: '70rem'}}>
        
        <div class="card-body ">
                <Form onSubmit={this.handleSubmit}>           
                    
                <div className="form-group row">
                <div className="col-sm-2">
                    </div>

                          <div className="col-sm-2">
                   <Label for="name"><strong>Year</strong></Label>
                   </div>
                   <div className="col-sm-3">
                   <Input type="select"  name="year" id="year"  onChange={this.handleChange} required>
                   <option >Please Select The Year</option>
                   {(allYears.map((year)=>{
                                return(<option value={year}>{year}</option>)
                              }))}


                                </Input>
                          </div>
                          <div className="col-sm-2"></div>
                          <div className="col-sm-3">
                        <Button color="secondary" tag={Link} to={"/"}>Exit</Button>

                        </div>
                 </div>
                </Form>
                </div>
                </div>
                {( ()=>{
            if(this.state.isMaterial){
              return(
                <Table className="mt-4">
                  <thead>
                  <tr>
                    <th>Phase</th>
                    <th>Conductor Type</th>
                    <th>Year</th>
                    <th>Wire Meter Price </th>
                    <th>Updated By</th>
                    <th>Updated Date</th>

                    </tr>
                  </thead>
                  <tbody>
                  {spcndctmhList}
                  </tbody>
                </Table>
              )
            }
            
          }) ()}
              </Container>
              <Footer/>
            </div>
            );
      }
}
export default withRouter(Spcndctmh);