import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../Common/Foot/Footer';
import { Helmet } from 'react-helmet';
const TITLE = 'Wire Labour Rates';

class Splbsrvc extends Component {

    deptid=sessionStorage.getItem('costCenterNo')
    ;
    constructor(props) {
        super(props);
        
        this.state = {Splbsrvcs: [], isLoading: true};
        this.state.deptid=sessionStorage.getItem('costCenterNo')
        ;
        
    this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(`splbsrvc/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({splbsrvcs: data, isLoading: false}));
      }

      async remove(deptId,labourCode ) {
        const message= await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it!'
        })
        if(message.value){
        await fetch(`/splbsrvc/delete?deptId=${deptId}&labourCode=${labourCode}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedsplbsrvcs = [...this.state.splbsrvcs].filter(i => i.id.deptId  !==(deptId)    && i.id.labourCode  !== (labourCode) );
          this.setState({splbsrvcs: updatedsplbsrvcs});
        });
        fetch(`splbsrvc/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({splbsrvcs: data, isLoading: false}));
        Swal.fire(
          'Deleted!',
          'Pole has been deleted.',
          'success'
        )
        }
      }
    

    render(){
        const {splbsrvcs, isLoading, splbsrvc } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const splbsrvcList=splbsrvcs.map(splbsrvc=>{
      return <tr key={splbsrvc.deptId}>
        <td>{splbsrvc.id.deptId}</td>
        <td >{splbsrvc.id.labourCode}</td>
        <td>{splbsrvc.activityCode}</td>
        <td>{splbsrvc.applicationType}</td>
        <td>{splbsrvc.labourHours}</td>
        <td>{splbsrvc.unitPrice}</td>
        <td>{splbsrvc.spanType}</td>
        <td>{splbsrvc.phase}</td>


        <td>
          <ButtonGroup>
            <Button Size="sm" color="primary" tag={Link} to ={"/splbsrvcedit/" + splbsrvc.id.deptId+"/"+splbsrvc.id.labourCode}>Edit</Button>
           
            <Button size="sm" color="danger" onClick={() => this.remove(splbsrvc.id.deptId , splbsrvc.id.labourCode)}>Delete</Button>

          </ButtonGroup>
        </td>
      </tr>

    });

    return(
        <div>
   <Helmet>
          <title>{ TITLE }</title>
        </Helmet>  
               <br/>
        <div className="padd-left">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/splbsrvc">   Labour</a> |
        <a className="path2" href="/splbsrvc">   Wire Labour Rates</a> 
        </div>
          
            <Container fluid>
              <h2><center>Wire Labour Rates</center></h2>
              <br></br>
            <div className="float-right">
            <Button color="success" tag={Link} to={'/addsplbsrvc'}>Add New Wire Labour Rates</Button>
          </div>
          <br></br>
          <br></br>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">DeptId</th>
              <th width="10%">Labour Code</th>
              <th width="10%">Activity Code</th>
              <th width="15%">Application Type</th>
              <th width="10%">Labour Hours</th>
              <th width="10%">Unit Price</th>
              <th width="10%">Span Type</th>
              <th width="10%">Phase</th>

              <th width="15%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {splbsrvcList}
            </tbody>
          </Table>
            </Container>
           
        </div>
    )

    }

}
export default Splbsrvc;