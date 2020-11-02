import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Stay Labour Rates';

class Splbstay extends Component {

    deptid=sessionStorage.getItem('costCenterNo')
    ;
    constructor(props) {
        super(props);
        
        this.state = {Splbstays: [], isLoading: true};
        this.state.deptid=sessionStorage.getItem('costCenterNo')
        ;
        
    this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(`splbstay/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({splbstays: data, isLoading: false}));
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
        await fetch(`/splbstay/delete?deptId=${deptId}&labourCode=${labourCode}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedsplbstays = [...this.state.splbstays].filter(i => i.id.deptId  !==(deptId)    && i.id.labourCode  !== (labourCode) );
          this.setState({splbstays: updatedsplbstays});
        });
        fetch(`splbstay/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({splbstays: data, isLoading: false}));
        Swal.fire(
          'Deleted!',
          'Pole has been deleted.',
          'success'
        )
        }
      }
    

    render(){
        const {splbstays, isLoading, splbstay} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const splbstayList=splbstays.map(splbstay=>{
      return <tr key={splbstay.deptId}>
        <td>{splbstay.id.deptId}</td>
        <td >{splbstay.id.labourCode}</td>
        <td>{splbstay.activityCode}</td>
        <td>{splbstay.applicationType}</td>
        <td>{splbstay.labourHours}</td>
        <td>{splbstay.unitPrice}</td>
        <td>{splbstay.stayType}</td>

        <td>
          <ButtonGroup>
            <Button Size="sm" color="primary" tag={Link} to ={"/splbstayedit/" + splbstay.id.deptId+"/"+splbstay.id.labourCode}>Edit</Button>
           
            <Button size="sm" color="danger" onClick={() => this.remove(splbstay.id.deptId , splbstay.id.labourCode)}>Delete</Button>

          </ButtonGroup>
        </td>
      </tr>

    });

    return(
        <div>
           <Helmet>
          <title>{ TITLE }</title>
        </Helmet>  
      
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/splbstay">   Labour</a> |
        <a className="path2" href="/splbstay">   Stay Labour Rates</a> 
        </div>
        <div className="Possition">
            <Container fluid>
              <h2><center>Stay Labour Rates</center></h2>
              <br/>
            <div className="float-right">
            <Button color="success" tag={Link} to={'/addsplbstay'}>Add New Stay Labour Rate</Button>
          </div>
          <br/>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">DeptId</th>
              <th width="10%">Labour Code</th>
              <th width="10%">Activity Code</th>
              <th width="15%">Application Type</th>
              <th width="10%">Labour Hours</th>
              <th width="10%">Unit Price</th>
              <th width="10%">Stay Type</th>
              <th width="15%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {splbstayList}
            </tbody>
          </Table>
            </Container>
            </div>
        </div>
    )

    }

}
export default Splbstay;
