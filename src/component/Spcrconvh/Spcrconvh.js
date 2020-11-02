import React, { Component } from 'react';
import {  withRouter, Link } from 'react-router-dom';
import {  Container, Form, Input, Table, Label, Button } from 'reactstrap';
//import HomeNavbar from '../Common/Nav/HomeNavbar';
import Footer from '../Common/Foot/Footer';

class Spcrconvh extends Component {
    emptySpcrconvh={
        id:{
            fromPhase:'',
            toPhase:'',
            fromConnectionType:'',
            fromConnectionType:'',
            year:''      
        },
        fixedCost:'',
        wireMeterPrice:''    
  };

  constructor(props) {
    super(props);
    this.state={
        spcrconvh:this.emptySpcrconvh,
        spcrconvhs:[],
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
      let spcrconvh = {...this.state.spcrconvh};
      spcrconvh[name] = value;
      spcrconvh.id[name]=value;
      this.setState({spcrconvh},()=>this.getData());
      this.setState({isMaterial:true});
   
    }

    getData(){
        console.log(this.state.spcrconvh.id.year)
        fetch(`/spcrconvh/findByIdYear?year=${this.state.spcrconvh.id.year}`)
      .then(response => response.json())
      .then(data => this.setState({spcrconvhs: data, isLoading: false}));
      console.log(this.state.spcrconvhs);
    }
  
    async componentDidMount() {
    
      }

      render() {
        const {spcrconvhs}=this.state;
        const spcrconvhList=spcrconvhs.map(spcrconvh=>{
          return <tr key={spcrconvh.id.year}>
            <td>{spcrconvh.id.fromPhase}</td>
            <td>{spcrconvh.id.toPhase}</td>
            <td>{spcrconvh.id.fromConnectionType}</td>
            <td>{spcrconvh.id.toConnectionType}</td>
            <td >{spcrconvh.id.year}</td>
            <td>{spcrconvh.wireMeterPrice}</td>
            <td>{spcrconvh.fixedCost}</td>

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
              
              <h3><center>History Of Phase Construction Rates</center></h3>
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
                    <th>From Phase</th>
                    <th>To Phase</th>
                    <th>From ConnectionType</th>
                    <th>To ConnectionType</th>
                    <th>Year</th>
                    <th>Wire Meter Price </th>
                    <th>Fixed Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                  {spcrconvhList}
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
export default withRouter(Spcrconvh);
