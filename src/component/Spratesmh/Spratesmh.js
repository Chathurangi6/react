import React, { Component } from 'react';
import {  withRouter ,Link} from 'react-router-dom';
import {  Container, Form, Input, Table, Label,Button } from 'reactstrap';
//import HomeNavbar from '../Common/Nav/HomeNavbar';
import Footer from '../Common/Foot/Footer';
class Spratesmh extends Component {
    emptySpratesmh={
        id:{
            applicationType:'',
            deptId:'',
            year:''      
        },
        conversionRate:'',
        conversionRate2p:'',
        fixedTransportAmt:'',
        fixedTransportDistance:'',
        labourRate:'',
        overheadRate:'',
        secondCircuit:'',
        transportRate:''
  };

  constructor(props) {
    super(props);
    this.state={
        spratesmh:this.emptySpratesmh,
        spratesmhs:[],
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
      let spratesmh = {...this.state.spratesmh};
      spratesmh[name] = value;
      spratesmh.id[name]=value;
      this.setState({spratesmh},()=>this.getData());
      this.setState({isMaterial:true});
   
    }

    getData(){
        console.log(this.state.spratesmh.id.year)
        fetch(`/spratesmh/findByIdYear?year=${this.state.spratesmh.id.year}`)
      .then(response => response.json())
      .then(data => this.setState({spratesmhs: data, isLoading: false}));
      console.log(this.state.spratesmhs);
    }
  
    async componentDidMount() {
    
      }

      render() {
        const {spratesmhs}=this.state;
        const spratesmhList=spratesmhs.map(spratesmh=>{
          return <tr key={spratesmh.id.year}>
            <td>{spratesmh.id.applicationType}</td>
            <td>{spratesmh.id.deptId}</td>
            <td >{spratesmh.id.year}</td>
            <td>{spratesmh.conversionRate}</td>
            <td>{spratesmh.conversionRate2p}</td>
            <td>{spratesmh.fixedTransportAmt}</td>
            <td>{spratesmh.fixedTransportDistance}</td>
            <td>{spratesmh.labourRate}</td>
            <td>{spratesmh.overheadRate}</td>
            <td>{spratesmh.secondCircuit}</td>
            <td>{spratesmh.transportRate}</td>
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
              {/* <HomeNavbar/> */}
             
              <h3><center>History Of Special Rates</center></h3>
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
                        <Button color="secondary" tag={Link} to={"/home"}>Exit</Button>

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
                    <th>Application Type</th>
                    <th>DeptId</th>
                    <th>Year</th>
                    <th>Conversion Rate  </th>
                    <th>Conversion Rate 2p </th>
                    <th>Fixed Transport Amt</th>
                    <th>Fixed Transport Distance</th>
                    <th>Labour Rate</th>
                    <th>Overhead Rate</th>
                    <th>Second Circuit</th>
                    <th>Transport Rate</th>

                    </tr>
                  </thead>
                  <tbody>
                  {spratesmhList}
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
export default withRouter(Spratesmh);
