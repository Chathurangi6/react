import React, { Component } from 'react'
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Warehouse Details'
class Warehouse extends Component {
    constructor(props){
        super(props);
        this.state={
            deptId:sessionStorage.getItem('costCenterNo'),
            groups:[]

        }
    }
   async componentDidMount(){
        await  fetch(`inwrhmap/findByIdDeptId?deptId=${this.state.deptId}`)
            .then(response =>  response.json())
           .then(data => this.setState({groups:data}))

           console.log(this.state.groups)
          
    }

    async remove(deptId,wrhDept) {
      await fetch(`/inwrhmap/delete?deptId=${deptId}&wrhDept=${wrhDept}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(() => {
        let updatedGroups = [...this.state.groups].filter(i => i.id.deptId !== deptId || i.id.wrhDept!==wrhDept);
        this.setState({groups: updatedGroups});
      });
    }

  render() {
      const {groups}=this.state;
      const groupList = groups && groups.map(group => {
          
        return <tr key={group.id}>
          <td style={{whiteSpace: 'nowrap'}}>{group.id.deptId}</td>
          <td style={{whiteSpace: 'nowrap'}}>{group.id.wrhDept}</td>
          <td style={{whiteSpace: 'nowrap'}}>{group.conRat}</td>
                     
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={"/warehouse/edit/" + group.id.deptId+"/"+group.id.wrhDept}>Edit</Button>
              <Button size="sm" color="danger" onClick={() => this.remove(group.id.deptId,group.id.wrhDept)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      });
    return (
      <div>
         <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Admin  </a> |
        <a className="path2" href="/warehouse"> Warehouse Details </a> 
     
        </div>
       
        <div className="container" align="center">
        
          <h2 align ="center">Warehouse Map</h2>
          
          <h5 class="card-title">Department:{this.state.deptId}</h5>
          <div className="float-right">
                <Button color="success" tag={Link} to="/warehouse/add">Add Warehouse</Button>
                <br/><br/>
          </div>
          <Table className="mt-4">
                <thead>
                <tr>
                  <th width="20%">Department</th>
                  <th width="20%">Warehouse</th>
                  <th width="20%">conRat</th>
                  <th width="10%">Actions</th>
                </tr>
                </thead>
                <tbody>
                {groupList}
                </tbody>
              </Table>
          
          </div>
       
        </div>
        
      
    )
  }
}

export default Warehouse;