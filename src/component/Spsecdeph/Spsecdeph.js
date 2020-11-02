import React, { Component } from 'react';
import {  withRouter,Link } from 'react-router-dom';
import {  Container, Form, Input, Table, Label,Button } from 'reactstrap';
//import HomeNavbar from '../Common/Nav/HomeNavbar';
import Footer from '../Common/Foot/Footer';
class Spsecdeph extends Component {
    emptySpsecdeph={
        id:{
            phase:'',
            deptId:'',
            connectionType:'',
            tariffCatCode:'',
            year:''      
        },
        securityDeposit:''
  };
  constructor(props) {
    super(props);
    this.state={
        spsecdeph:this.emptySpsecdeph,
        spsecdephs:[],
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
      let spsecdeph = {...this.state.spsecdeph};
      spsecdeph[name] = value;
      spsecdeph.id[name]=value;
      this.setState({spsecdeph},()=>this.getData());
      this.setState({isMaterial:true});
   
    }
    getData(){
        console.log(this.state.spsecdeph.id.year)
        fetch(`/spsecdeph/findByIdYear?year=${this.state.spsecdeph.id.year}`)
      .then(response => response.json())
      .then(data => this.setState({spsecdephs: data, isLoading: false}));
      console.log(this.state.spsecdephs);
    }
  
    async componentDidMount() {
    
      }
      render() {
        const {spsecdephs}=this.state;
        const spsecdephList=spsecdephs.map(spsecdeph=>{
          return <tr key={spsecdeph.id.year}>
            <td>{spsecdeph.id.phase}</td>
            <td>{spsecdeph.id.deptId}</td>
            <td>{spsecdeph.id.connectionType}</td>
            <td>{spsecdeph.id.tariffCatCode}</td>
            <td >{spsecdeph.id.year}</td>
            <td>{spsecdeph.securityDeposit}</td>
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
             
              <h3><center>History Of Security Deposit</center></h3>
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
                                  
                   {allYears.map((year)=>{
                                return(<option value={year}>{year}</option>)
                              })}
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
                    <th>Tariff Cat Code</th>
                    <th>Year</th>
                    <th>Security Deposit</th>
                    </tr>
                  </thead>
                  <tbody>
                  {spsecdephList}
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
export default withRouter(Spsecdeph);