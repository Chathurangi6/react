import React, { Component } from 'react';
import {  withRouter, Link } from 'react-router-dom';
import {  Container, Form, Input, Table, Label,Button } from 'reactstrap';
//import HomeNavbar from '../Common/Nav/HomeNavbar';
import Footer from '../Common/Foot/Footer';

class Spcstngmh extends Component {
    emptySpcstngmh={
        id:{
            phase:'',
            connectionType:'',
            tariffCatCode:'',
            deptId:'',
            year:''   ,
            fromLength:'',
            toLength :'',  
        },
        fixedCost:'',
        wireMeterPrice:''    
  };

  constructor(props) {
    super(props);
    this.state={
        spcstngmh:this.emptySpcstngmh,
        spcstngmhs:[],
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
      let spcstngmh = {...this.state.spcstngmh};
      spcstngmh[name] = value;
      spcstngmh.id[name]=value;
      this.setState({spcstngmh},()=>this.getData());
      this.setState({isMaterial:true});
   
    }

    getData(){
        console.log(this.state.spcstngmh.id.year)
        fetch(`/spcstngmh/findByIdYear?year=${this.state.spcstngmh.id.year}`)
      .then(response => response.json())
      .then(data => this.setState({spcstngmhs: data, isLoading: false}));
      console.log(this.state.spcstngmhs);
    }
  
    async componentDidMount() {
    
      }

      render() {
        const {spcstngmhs}=this.state;
        const spcstngmhList=spcstngmhs.map(spcstngmh=>{
          return <tr key={spcstngmh.id.year}>
            <td>{spcstngmh.id.phase}</td>
            <td>{spcstngmh.id.connectionType}</td>
            <td>{spcstngmh.id.tariffCatCode}</td>
            <td>{spcstngmh.id.deptId}</td>
            <td >{spcstngmh.id.year}</td>
            <td>{spcstngmh.id.fromLength}</td>
            <td>{spcstngmh.id.toLength}</td>
            <td>{spcstngmh.wireMeterPrice}</td>
            <td>{spcstngmh.fixedCost}</td>

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
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <h3><center>History Of Standard Construction Rates</center></h3>
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
                    <th> Phase</th>
                    <th>Connection Type</th>
                    <th>Tariff Cat Code</th>
                    <th>DeptId</th>
                    <th>Year</th>
                    <th>From Length</th>
                    <th>To Length</th>
                    <th>Wire Meter Price </th>
                    <th>Fixed Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                  {spcstngmhList}
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
export default withRouter(Spcstngmh);
