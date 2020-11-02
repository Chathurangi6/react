import React, { Component } from 'react';
import {  withRouter, Link } from 'react-router-dom';
import {  Container, Form, Input, Table, Label,Button } from 'reactstrap';
//import HomeNavbar from '../Common/Nav/HomeNavbar';
import Footer from '../Common/Foot/Footer';

class Spugcblmh extends Component {
    emptySpugcblmh={
        id:{
            phase:'',
            deptId:'',
            connectionType:'',
            cableType:'',
            year:''      
        },
        fixedCost:'',
        wireMeterPrice:''
  };

  constructor(props) {
    super(props);
    this.state={
        spugcblmhView:this.emptySpugcblmh,
        spugcblmhViews:[],
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
      let spugcblmhView = {...this.state.spugcblmhView};
      spugcblmhView[name] = value;
      spugcblmhView.id[name]=value;
      this.setState({spugcblmhView},()=>this.getData());
      this.setState({isMaterial:true});
   
    }

    getData(){
        console.log(this.state.spugcblmhView.id.year)
        fetch(`/spugcblmh/findByIdYear?year=${this.state.spugcblmhView.id.year}`)
      .then(response => response.json())
      .then(data => this.setState({spugcblmhViews: data, isLoading: false}));
      console.log(this.state.spugcblmhViews);
    }
  
    async componentDidMount() {
    
      }

      render() {
        const {spugcblmhViews}=this.state;
        const spugcblmhViewList=spugcblmhViews.map(spugcblmhView=>{
          return <tr key={spugcblmhView.id.year}>
            <td>{spugcblmhView.id.phase}</td>
            <td>{spugcblmhView.id.deptId}</td>
            <td>{spugcblmhView.id.connectionType}</td>
            <td>{spugcblmhView.id.cableType}</td>
            <td >{spugcblmhView.id.year}</td>
            <td>{spugcblmhView.fixedCost}</td>
            <td>{spugcblmhView.wireMeterPrice}</td>
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
             
              <h3><center>History Of Under Ground Materials</center></h3>
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
                    <th>Cable Type</th>
                    <th>Year</th>
                    <th>Fixed Cost</th>
                    <th>Wire Meter Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  {spugcblmhViewList}
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
export default withRouter(Spugcblmh);
