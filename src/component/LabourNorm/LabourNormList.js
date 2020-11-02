import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class LabourNormList extends Component {

  constructor(props) {
    super(props);
    this.state = {labourNorms: [], isLoading: true, currentPage:0};
    this.handlePageClick=this.handlePageClick.bind(this)
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/labourNorm/all')
      .then(response => response.json())
      .then(data => this.setState({labourNorms: data, isLoading: false}));
  }


  handlePageClick(e, index) {
    e.preventDefault()
    this.setState({
      currentPage: index
    });
    
  }

  render() {
    const {labourNorms, isLoading, currentPage} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.labourNorms.length / pageSize);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const labourNormList = labourNorms.slice(currentPage*pageSize,
      (currentPage+1)*pageSize).map(labourNorm => {
      
      return <tr key={labourNorm.activityCode}>
        <td>{labourNorm.activityCode}</td>
        <td>{labourNorm.activityName}</td>
        <td>{labourNorm.description}</td>
        
      </tr>
    });

    return (
      <div>
        <Container fluid>
          <h3>LABOUR NORMS</h3>
          <br></br>
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

            <PaginationItem disabled={currentPage >= pagesCount - 1}>
              
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
              <th width="30%">Activity Code</th>
              <th width="30%">Activity Name</th>
              <th width="40%">Description</th>
            </tr>
            </thead>
            <tbody>
            {labourNormList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default LabourNormList;