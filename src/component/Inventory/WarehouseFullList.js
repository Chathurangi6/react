import React, { Component } from 'react'
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class WarehouseFullList extends Component {
    constructor(props) {
        super(props);
        this.state = {groups: [],currentPage: 0};
        this.remove = this.remove.bind(this);
       this.handlePageClick=this.handlePageClick.bind(this)
      }
    
      componentDidMount() {
    
        fetch('inwrhmap/all')
          .then(response => response.json())
          .then(data => this.setState({groups: data}));
          
      }
      handlePageClick(e, index) {
        e.preventDefault()
        this.setState({
          currentPage: index
        });
        
      }
      async remove(deptId,wrhDept) {
        await fetch(`/inwrhmap/delete?deptId=${deptId}&wrhDept=${wrhDept}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedGroups = [...this.state.groups].filter(i => i.id.deptId !== deptId && i.id.wrhDept!==wrhDept);
          this.setState({groups: updatedGroups});
        });
      }
    
      render() {
        
        const { currentPage } = this.state;
        const {groups} = this.state;
        const pageSize = 7;
        const pagesCount = Math.ceil(this.state.groups.length / pageSize);
    
        return (
          <div>
            
            <br/><br/><br/><br/><br/>
            <Container fluid>
              <div className="float-right">
                <Button color="success" tag={Link} to="/warehouse/add">Add Warehouse</Button>
              </div>
              <h3>Warehouse Mapping List</h3>
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
                  <th width="20%">Warehouse</th>
                  <th width="20%">conRat</th>
                  
                 
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
            })}
                </tbody>
              </Table>
            </Container>
          </div>
        );
      }
}
export default WarehouseFullList;