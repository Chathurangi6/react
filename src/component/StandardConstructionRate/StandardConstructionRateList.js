import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class StandardConstructionRateList extends Component {

  constructor(props) {
    super(props);
    this.state = {deptId:sessionStorage.getItem('costCenterNo'),standardRates: [], isLoading: true, currentPage:0};
    
    this.handlePageClick=this.handlePageClick.bind(this)
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch(`/standardConstructionRate/findByIdDeptId?deptId=${this.state.deptId}`)
      .then(response => response.json())
      .then(data => this.setState({standardRates: data, isLoading: false}));
  }

  // async remove(id) {
  //   await fetch(`/user/delete/${id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(() => {
  //     let updatedstandardRates = [...this.state.standardRates].filter(i => i.id !== id);
  //     this.setState({standardRates: updatedstandardRates});
  //   });
  // }

  handlePageClick(e, index) {
    e.preventDefault()
    this.setState({
      currentPage: index
    });
    
  }

  render() {
    const {standardRates, isLoading, currentPage} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.standardRates.length / pageSize);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const standardRateList = standardRates.slice(currentPage*pageSize,
      (currentPage+1)*pageSize).map(standardRate => {
      
      return <tr key={[standardRate.id.phase,standardRate.id.connectionType,standardRate.id.tariffCatCode,standardRate.id.deptId,standardRate.id.fromLength,standardRate.id.toLength]}>
        <td>{standardRate.id.tariffCatCode}</td>
        <td>{standardRate.id.phase}</td>
        <td>{standardRate.id.connectionType}</td>
        <td>{standardRate.id.fromLength}</td>
        <td>{standardRate.id.toLength}</td>
        <td className="text-right">{standardRate.fixedCost.toLocaleString()}</td>
        <td className="text-right">{standardRate.securityDeposit.toLocaleString()}</td>
        <td className="text-right">{standardRate.temporaryDeposit.toLocaleString()}</td>
        <td className="text-right">{standardRate.wireMeterPrice.toLocaleString()}</td>
        
        
      </tr>
    });

    return (
      <div>
        <Container fluid>
          {/* <div className="row float-right">
            <div className="col-md-4 mb-3">

            <Button color="success" tag={Link} to="/user/add">Add User</Button>
            </div>
            <div className="col-md-4 mb-3">

            <Button color="success" tag={Link} to="/contractor/add">Add contractor</Button>
            </div>
            <div className="col-md-4 mb-3">
            <Button color="success" tag={Link} to="/applicant/search">Search Applicant</Button>
            </div>

          </div> */}
          <h3>STANDARD CONSTRUCTION RATES - {this.state.deptId}</h3>
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
              <th width="10%">Tariff Cat Code</th>
              <th width="10%">Phase</th>
              <th width="10%">Connection Type</th>
              <th width="10%">From Length</th>
              <th width="10%">To Length</th>
              <th width="10%">Fixed Cost</th>
              <th width="10%">Security Deposit</th>
              <th width="15%">Temporary Deposit</th>
              <th width="15%">Wire Meter Price</th>
              
            </tr>
            </thead>
            <tbody>
            {standardRateList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default StandardConstructionRateList;