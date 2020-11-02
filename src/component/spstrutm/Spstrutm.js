import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Struct Material';

class Spstrutm extends Component {

    deptid=sessionStorage.getItem('costCenterNo');
    constructor(props) {
        super(props);
        
        this.state = {spstrutms: [], isLoading: true};
        this.state.deptid=23;
        
    this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(`spstrutm/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({spstrutms: data, isLoading: false}));
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
        await fetch(`/spstrutm/delete?deptId=${deptId}&matCd=${matCd}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedspstrutms = [...this.state.spstrutms].filter(i => i.id.deptId  !==(deptId)   && i.id.matCd  !== (matCd));
          this.setState({spstrutms: updatedspstrutms});
        });
        fetch(`spstrutm/findByIdDeptId?deptId=${this.state.deptid}`)
          .then(response => response.json())
          .then(data => this.setState({spstrutms: data, isLoading: false}));
        Swal.fire(
          'Deleted!',
          'Pole has been deleted.',
          'success'
        )
        }
      }
    

    render(){
        const {spstrutms, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const spstrutmList=spstrutms.map(spstrutm=>{
      return <tr key={spstrutm.deptId}>
        <td>{spstrutm.id.deptId}</td>
        <td style={{whiteSpace:'nowrap'}}>{spstrutm.id.matCd}</td>
        <td>{spstrutm.matQty}</td>
        <td>
          <ButtonGroup>
            <Button Size="sm" color="primary" tag={Link} to ={"/spstrutmedit/" + spstrutm.id.deptId+"/"+spstrutm.id.matCd}>Edit</Button>
           
            <Button size="sm" color="danger" onClick={() => this.remove(spstrutm.id.deptId , spstrutm.id.matCd)}>Delete</Button>

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
                 <a className="path2" href="/spstaymt">   Struct Material </a> 
                 </div>
         
            <Container fluid>
              <h2><center>Strut Materials</center></h2>
              <br/>
            <div className="float-right">
            <Button color="success" tag={Link} to={'/addspstrutm'}>Add New Strut Material</Button>
          </div>
          <br/>
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
            {spstrutmList}
            </tbody>
          </Table>
            </Container>
           
        </div>
    )

    }

}
export default Spstrutm;
