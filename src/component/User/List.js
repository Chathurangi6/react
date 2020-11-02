import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Footer from '../Common/Foot/Footer';
//import HomeNavbar from '../Common/Nav/HomeNavbar'
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {groups: [],currentPage: 0};
    this.remove = this.remove.bind(this);
    this.handlePageClick=this.handlePageClick.bind(this)
  }
 

  componentDidMount() {

    fetch('user/all')
      .then(response => response.json())
      .then(data => this.setState({groups: data, isLoading: false}));
  
  }

  async remove(id) {
    await fetch(`/user/delete?id=${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
      this.setState({groups: updatedGroups});
    });
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
             {/* <HomeNavbar/> */}
        <br/><br/><br/><br/><br/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/groups/add">Add Group</Button>
          </div>
          <h3>User List</h3>
          
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
            <th width="20%">ID</th>
              <th width="20%">Name</th>
              <th width="20%">Email</th>
              
             
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
        <td style={{whiteSpace: 'nowrap'}}>{group.id}</td>
        <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{group.email}</td>
 
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/groups/edit/" + group.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>  
            })}
            
            </tbody>
          </Table>
        </Container>
        <Footer/>
      </div>
    );
  }
}

export default List;