import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Pole';
class Spdppolm extends Component {

   
    constructor(props) {
        super(props);
        
        this.state = {spdppolms: [], isLoading: true};
        this.state.deptid=sessionStorage.getItem('costCenterNo');
        
    this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(`spdppolm/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({spdppolms: data, isLoading: false}));
      }

      async remove(deptId, matCd) {
        const message= await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it!'
        })
        if(message){
        await fetch(`/spdppolm/delete?deptId=${deptId}&matCd=${matCd}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedspdppolms = [...this.state.spdppolms].filter(i => i.id.deptId  !==(deptId)   && i.id.matCd  !== (matCd));
          this.setState({spdppolms: updatedspdppolms});
        });
        fetch(`spdppolm/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({spdppolms: data, isLoading: false}));
        Swal.fire(
          'Deleted!',
          'Pole has been deleted.',
          'success'
        )
        }
      }
    

    render(){
        const {spdppolms, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const spdppolmList=spdppolms.map(spdppolm=>{
      return <tr key={spdppolm.deptId}>
        <td>{spdppolm.id.deptId}</td>
        <td style={{whiteSpace:'nowrap'}}>{spdppolm.id.matCd}</td>
        <td>{spdppolm.isActive}</td>
        <td>
          <ButtonGroup>
            <Button Size="sm" color="primary" tag={Link} to ={"/spdppolmedit/" + spdppolm.id.deptId+"/"+spdppolm.id.matCd}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(spdppolm.id.deptId , spdppolm.id.matCd)}>Delete</Button>

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
        <a className="path" href="/home">   Material  </a> |
        <a className="path2" href="/Spdppolm">   Pole  </a> 
        </div>
        <div className="Possition">
            <Container fluid>
            <div className="float-right">
            <Button color="success" tag={Link} to={'/addspdppolm'}>Add Pole</Button>
          </div>
          <br/>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">DeptId</th>
              <th width="20%">MatCd</th>
              <th width="20%">isActive</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {spdppolmList}
            </tbody>
          </Table>
            </Container>
           </div>
        </div>
    )

    }

}
export default Spdppolm;
