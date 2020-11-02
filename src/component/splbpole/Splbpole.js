import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Labour Rates';

class Splbpole extends Component {

    deptid=sessionStorage.getItem('costCenterNo')
    ;
    constructor(props) {
        super(props);
        
        this.state = {Splbpoles: [], isLoading: true};
        this.state.deptid=sessionStorage.getItem('costCenterNo')
        ;
        
    this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(`splbpole/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({splbpoles: data, isLoading: false}));
      }

      async remove(deptId, matCd,labourCode ) {
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
        await fetch(`/splbpole/delete?deptId=${deptId}&matCd=${matCd}&labourCode=${labourCode}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedsplbpoles = [...this.state.splbpoles].filter(i => i.id.deptId  !==(deptId)   && i.id.matCd  !== (matCd) && i.id.labourCode  !== (labourCode) );
          this.setState({splbpoles: updatedsplbpoles});
        });
        fetch(`splbpole/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({splbpoles: data, isLoading: false}));
        Swal.fire(
          'Deleted!',
          'Pole has been deleted.',
          'success'
        )
        }
      }
    

    render(){
        const {splbpoles, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const splbpoleList=splbpoles.map(splbpole=>{
      return <tr key={splbpole.deptId}>
        <td>{splbpole.id.deptId}</td>
        <td>{splbpole.id.matCd}</td>

        <td >{splbpole.id.labourCode}</td>
        <td>{splbpole.activityCode}</td>
        <td>{splbpole.applicationType}</td>
        <td>{splbpole.labourHours}</td>
        <td>{splbpole.unitPrice}</td>

        <td>
          <ButtonGroup>
            <Button Size="sm" color="primary" tag={Link} to ={"/splbpoleedit/" + splbpole.id.deptId+"/"+splbpole.id.matCd+"/"+splbpole.id.labourCode}>Edit</Button>
           
            <Button size="sm" color="danger" onClick={() => this.remove(splbpole.id.deptId , splbpole.id.matCd, splbpole.id.labourCode)}>Delete</Button>

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
        <a className="path" href="/splbpole">   Labour </a> |
        <a className="path2" href="/splbpole">   Pole Labour Rates</a>
        </div>
        <div className="Possition">
            <Container fluid>
              <h2><center>Labour rates</center></h2>
              <br></br>
            <div className="float-right">
            <Button color="success" tag={Link} to={'/addsplbpole'}>Add New Labour Rates</Button>
          </div>
         <br/>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">DeptId</th>
              <th width="15%">MatCd</th>
              <th width="15%">Labour Code</th>
              <th width="15%">Activity Code</th>
              <th width="15%">Application Type</th>
              <th width="15%">Labour Hours</th>
              <th width="20%">Unit Price</th>

              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {splbpoleList}
            </tbody>
          </Table>
            </Container>
            </div>
        </div>
    )

    }

}
export default Splbpole;
