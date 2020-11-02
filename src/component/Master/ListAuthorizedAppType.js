import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import '../../css/Path.css';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet'
const TITLE = ' App Type Details'
// import AddAuthorizedAppType from './AddAuthorizedAppType'

class ListAuthorizedAppType extends Component {
    constructor(props) {
        super(props);
        this.state = {
          deptId:sessionStorage.getItem('costCenterNo'),
          userId:sessionStorage.getItem('userName'),
          validCostCenter:[],groups: [],currentPage: 0};
        this.remove = this.remove.bind(this);
        this.handlePageClick=this.handlePageClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.afterSetStateFinished=this.afterSetStateFinished.bind(this)
      }
     
     async componentDidMount() {
       
       fetch(`applicationType/getAuthorizedType?deptId=${this.state.deptId}`)
          .then(response => response.json())
          .then(data => this.setState({groups: data}));  

         await fetch(`/sausrdpm/getAuthorizedCostCenters?userId=${this.state.userId}`)
          .then(response =>  response.json())
            .then(data => this.setState({validCostCenter: data}))
 
      }
      handleChange(e){
        this.setState({[e.target.name]:e.target.value},()=> this.afterSetStateFinished())
      }
      afterSetStateFinished(){
        fetch(`applicationType/getAuthorizedType?deptId=${this.state.deptId}`)
          .then(response => response.json())
          .then(data => this.setState({groups: data}));  
      }

      remove(deptId,applicationType) {
        // await fetch(`/authorizedType/delete?deptId=${deptId}&applicationType=${applicationType}`, {
        //   method: 'GET',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //   }
        // }).then(() => {
        //   let updatedGroups = [...this.state.groups].filter(i =>i.applicationType!==applicationType);
        //   this.setState({groups: updatedGroups});
        // });

        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            fetch(`/authorizedType/delete?deptId=${deptId}&applicationType=${applicationType}`, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }).then(() => {
              let updatedGroups = [...this.state.groups].filter(i =>i.applicationType!==applicationType);
              this.setState({groups: updatedGroups});
            });
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
          .catch(err => console.log(err))
      }
    
      handlePageClick(e, index) {
        e.preventDefault()
        this.setState({
          currentPage: index
        });
        
      }
  render() {
    const { currentPage } = this.state;
    const {groups} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.groups.length / pageSize);

    return (
      <div>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/authorizedAppType">  Admin  </a> |
        <a className="path2" href="/authorizedAppType"> Authorized App Type Details </a> 
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        </div>
        <br/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to={"/authorizedAppType/add/"+this.state.deptId}>Add AuthorizedAppType</Button>
          </div>
          <h3 align="center">AuthorizedAppType List</h3>
          <br/>
          <div className="form-group row">
          <label className="col-sm-4 col-form-label">Department</label>
          <div className="col-sm-6"> 
                        <select type="text" style={{marginLeft:'-50vh',width: "200px"}} value={this.state.deptId} name="deptId" className="form-control"  onChange={this.handleChange} >
                            <option >{this.state.deptId}</option>
                            {this.state.validCostCenter.map(num=><option >{num}</option>)}    
                        </select>
            </div>  
            </div>          
        <div className="pagination-wrapper">  
          <Pagination aria-label="Page navigation example">
            
            <PaginationItem disabled={currentPage <= 0}>
              
              <PaginationLink
                onClick={e => this.handlePageClick(e, currentPage - 1)}
                previous
                href="#"
              />
              
            </PaginationItem>

            {[...Array(pagesCount)].map((page, i) => 
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={e => this.handlePageClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
              
              <PaginationLink
                onClick={e => this.handlePageClick(e, currentPage + 1)}
                next
                href="#"
              />
              
            </PaginationItem>
            
          </Pagination>
          
        </div>
        <Table className="mt-4">
            <thead>
            <tr>
            <th width="20%">Department</th>
              <th width="20%">Application Type</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {groups
            .slice(
              currentPage * pageSize,
              (currentPage + 1) * pageSize
            )
            .map(group => {
              
                return <tr key={group}>
        <td style={{whiteSpace: 'nowrap'}}>{this.state.deptId}</td>
        <td style={{whiteSpace: 'nowrap'}}>{group.description}</td>
 
        <td>
          <ButtonGroup>
            <Button size="sm" color="danger" onClick={() => this.remove(this.state.deptId,group.applicationType)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>  
            })}
            
            </tbody>
          </Table>
        </Container>
     
      </div>
    )
  }
}
export default ListAuthorizedAppType