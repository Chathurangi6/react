import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Strut Labour Rates ';

class Splbstrt extends Component {

    deptid=sessionStorage.getItem('costCenterNo')
    ;
    constructor(props) {
        super(props);
        
        this.state = {Splbstrts: [], isLoading: true};
        this.state.deptid=sessionStorage.getItem('costCenterNo')
        ;
        
    this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(`splbstrt/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({splbstrts: data, isLoading: false}));
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
        await fetch(`/splbstrt/delete?deptId=${deptId}&labourCode=${labourCode}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedsplbstrts = [...this.state.splbstrts].filter(i => i.id.deptId  !==(deptId)    && i.id.labourCode  !== (labourCode) );
          this.setState({splbstrts: updatedsplbstrts});
        });
        fetch(`splbstrt/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({splbstrts: data, isLoading: false}));
        Swal.fire(
          'Deleted!',
          'Pole has been deleted.',
          'success'
        )
        }
      }
    

    render(){
        const {splbstrts, isLoading, splbstrt} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const splbstrtList=splbstrts.map(splbstrt=>{
      return <tr key={splbstrt.deptId}>
        <td>{splbstrt.id.deptId}</td>
        <td >{splbstrt.id.labourCode}</td>
        <td>{splbstrt.activityCode}</td>
        <td>{splbstrt.applicationType}</td>
        <td>{splbstrt.labourHours}</td>
        <td>{splbstrt.unitPrice}</td>
        <td>{splbstrt.matCd}</td>

        <td>
          <ButtonGroup>
            <Button Size="sm" color="primary" tag={Link} to ={"/splbstrtedit/" + splbstrt.id.deptId+"/"+splbstrt.id.labourCode}>Edit</Button>
           
            <Button size="sm" color="danger" onClick={() => this.remove(splbstrt.id.deptId , splbstrt.id.labourCode)}>Delete</Button>

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
        <a className="path" href="/splbstrt">   Labour</a> |
        <a className="path2" href="/splbstrt">   Strut Labour Rates</a> 
        </div>
         
            <Container fluid>
              <h2><center>Strut Labour Rates </center></h2>
              <br></br>
            <div className="float-right">
            <Button color="success" tag={Link} to={'/addsplbstrt'}>Add New Strut Labour Rate</Button>
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
              <th width="10%">Material Code</th>
              <th width="15%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {splbstrtList}
            </tbody>
          </Table>
            </Container>
           
        </div>
    )

    }

}
export default Splbstrt;