import React, { Component } from 'react';
import {  withRouter,Link } from 'react-router-dom';
import {  Container, Form, Input, Table, Label,Button } from 'reactstrap';
//import HomeNavbar from '../Common/Nav/HomeNavbar';
import Footer from '../Common/Foot/Footer';

class Splpsvcmh extends Component {
    emptySplpsvcmh={
        id:{
            phase:'',
            deptId:'',
            connectionType:'',
            wiringType:'',
            year:''      
        },
        fixedCost:'',
        wireMeterPrice:''    
  };

  constructor(props) {
    super(props);
    this.state={
        splpsvcmh:this.emptySplpsvcmh,
        splpsvcmhs:[],
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
      let splpsvcmh = {...this.state.splpsvcmh};
      splpsvcmh[name] = value;
      splpsvcmh.id[name]=value;
      this.setState({splpsvcmh},()=>this.getData());
      this.setState({isMaterial:true});
   
    }

    getData(){
        console.log(this.state.splpsvcmh.id.year)
        fetch(`/splpsvcmh/findByIdYear?year=${this.state.splpsvcmh.id.year}`)
      .then(response => response.json())
      .then(data => this.setState({splpsvcmhs: data, isLoading: false}));
      console.log(this.state.splpsvcmhs);
    }
  
    async componentDidMount() {
    
      }

      render() {
        const {splpsvcmhs}=this.state;
        const splpsvcmhList=splpsvcmhs.map(splpsvcmh=>{
          return <tr key={splpsvcmh.id.year}>
            <td>{splpsvcmh.id.phase}</td>
            <td>{splpsvcmh.id.deptId}</td>
            <td>{splpsvcmh.id.connectionType}</td>
            <td>{splpsvcmh.id.wiringType}</td>
            <td >{splpsvcmh.id.year}</td>
            <td>{splpsvcmh.wireMeterPrice}</td>
            <td>{splpsvcmh.fixedCost}</td>

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
              
              <h3><center>History Of Loop Service Wire Master</center></h3>
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
                    <th>Phase</th>
                    <th>DeptId</th>
                    <th>ConnectionType</th>
                    <th>Wiring Type</th>
                    <th>Year</th>
                    <th>Wire Meter Price </th>
                    <th>Fixed Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                  {splpsvcmhList}
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
export default withRouter(Splpsvcmh);
