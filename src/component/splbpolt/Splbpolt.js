import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Transport Labour Rates';

class Splbpolt extends Component {

    deptid=sessionStorage.getItem('costCenterNo')
    ;
    constructor(props) {
        super(props);
        
        this.state = {Splbpolts: [], isLoading: true};
        this.state.deptid=sessionStorage.getItem('costCenterNo')
        ;
        
    this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(`splbpolt/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({splbpolts: data, isLoading: false}));
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
        await fetch(`/splbpolt/delete?deptId=${deptId}&matCd=${matCd}&labourCode=${labourCode}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedsplbpolts = [...this.state.splbpolts].filter(i => i.id.deptId  !==(deptId)   && i.id.matCd  !== (matCd) && i.id.labourCode  !== (labourCode) );
          this.setState({splbpolts: updatedsplbpolts});
        });
        fetch(`splbpolt/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({splbpolts: data, isLoading: false}));
        Swal.fire(
          'Deleted!',
          'Pole has been deleted.',
          'success'
        )
        }
      }
    

    render(){
        const {splbpolts, isLoading, splbpolt } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const splbpoltList=splbpolts.map(splbpolt=>{
      return <tr key={splbpolt.deptId}>
        <td>{splbpolt.id.deptId}</td>
        <td>{splbpolt.id.matCd}</td>

        <td >{splbpolt.id.labourCode}</td>
        <td>{splbpolt.activityCode}</td>
        <td>{splbpolt.applicationType}</td>
        <td>{splbpolt.labourHours}</td>
        <td>{splbpolt.unitPrice}</td>

        <td>
          <ButtonGroup>
            <Button Size="sm" color="primary" tag={Link} to ={"/splbpoltedit/" + splbpolt.id.deptId+"/"+splbpolt.id.matCd+"/"+splbpolt.id.labourCode}>Edit</Button>
           
            <Button size="sm" color="danger" onClick={() => this.remove(splbpolt.id.deptId , splbpolt.id.matCd, splbpolt.id.labourCode)}>Delete</Button>

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
        <a className="path" href="/splbpolt">   Labour </a> |
        <a className="path2" href="/splbpolt">   Transport Labour Rates </a>
        </div>
        <div className="Possition">
            <Container fluid>
              <h2><center> Transport Labour Rates </center></h2>
              <br/>
            <div className="float-right">
            <Button color="success" tag={Link} to={'/addsplbpolt'}>Add New  Transport Labour Rate</Button>
          </div>
          <br></br>
          <br></br>
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
            {splbpoltList}
            </tbody>
          </Table>
            </Container>
            </div>
        </div>
    )

    }

}
export default Splbpolt;
