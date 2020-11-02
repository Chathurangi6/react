import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = ' Conductor Rates'

class ConductorRateList extends Component {

  constructor(props) {
    super(props);
    this.state = {conductorRates: [], isLoading: true, currentPage:0};
    
    this.handlePageClick=this.handlePageClick.bind(this)
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/conductorRate/all')
      .then(response => response.json())
      .then(data => this.setState({conductorRates: data, isLoading: false}));
  }

  // async remove(id) {
  //   await fetch(`/user/delete/${id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(() => {
  //     let updatedConductors = [...this.state.conductors].filter(i => i.id !== id);
  //     this.setState({conductors: updatedConductors});
  //   });
  // }

  handlePageClick(e, index) {
    e.preventDefault()
    this.setState({
      currentPage: index
    });
    
  }

  render() {
    const {conductorRates, isLoading, currentPage} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.conductorRates.length / pageSize);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const conductorList = conductorRates.slice(currentPage*pageSize,
      (currentPage+1)*pageSize).map(conductor => {
      
      return <tr key={[conductor.id.phase,conductor.id.conductorType]}>
        <td>{conductor.id.phase}</td>
        <td>{conductor.id.conductorType}</td>
        <td className="text-right">{conductor.wireMeterPrice.toLocaleString()}</td>
        <td className="text-right">{conductor.secondCircuit.toLocaleString()}</td>
        
        
      </tr>
    });

    return (
      <div>
        <Container fluid>
<Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path2" href="/conductorRate/all">   Conductor Rates</a>
        </div>
      
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
          <h3>CONDUCTOR RATES</h3>
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
                <th width="20%">Phase</th>
              <th width="20%">Conductor Type</th>
              <th width="20%">Wire Meter Price</th>
              <th width="20%">Second Circuit</th>
              
            </tr>
            </thead>
            <tbody>
            {conductorList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ConductorRateList;