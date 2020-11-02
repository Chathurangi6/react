import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
 import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Stay Material';

class Spstaymt extends Component {

    constructor(props) {
        super(props);
        
        this.state = {spstaymts: [], isLoading: true};
        this.state.deptid=sessionStorage.getItem('costCenterNo');
        
    this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(`spstaymt/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({spstaymts: data, isLoading: false}));
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
        if(message.value){
        await fetch(`/spstaymt/delete?deptId=${deptId}&matCd=${matCd}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedspstaymts = [...this.state.spstaymts].filter(i => i.id.deptId  !==(deptId)   && i.id.matCd  !== (matCd));
          this.setState({spstaymts: updatedspstaymts});
        });
        fetch(`spstaymt/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({spstaymts: data, isLoading: false}));
        Swal.fire(
          'Deleted!',
          'Pole has been deleted.',
          'success'
        )
        }
      }
    

    render(){
        const {spstaymts, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const spstaymtList=spstaymts.map(spstaymt=>{
      return <tr key={spstaymt.deptId}>
        <td>{spstaymt.id.deptId}</td>
        <td style={{whiteSpace:'nowrap'}}>{spstaymt.id.matCd}</td>
        <td>{spstaymt.matQty}</td>
        <td>
          <ButtonGroup>
            <Button Size="sm" color="primary" tag={Link} to ={"/spstaymtedit/" + spstaymt.id.deptId+"/"+spstaymt.id.matCd}>Edit</Button>
           
            <Button size="sm" color="danger" onClick={() => this.remove(spstaymt.id.deptId , spstaymt.id.matCd)}>Delete</Button>

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
        <a className="path2" href="/spstaymt">   Stay Material </a> 
        </div>
       
          
            <Container fluid>
              <h2><center>Stay Materials</center></h2>
              <br></br>
            <div className="float-right">
            <Button color="success" tag={Link} to={'/addspstaymt'}>Add New Stay Material</Button>
          </div>
          <br></br>
          <br></br>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">DeptId</th>
              <th width="20%">MatCd</th>
              <th width="20%">Material Quntity</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {spstaymtList}
            </tbody>
          </Table>
            </Container>
            
        </div>
    )

    }

}
export default Spstaymt;
