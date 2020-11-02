import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = ' Phase Convension Rates'

class ConversionRateList extends Component {

  constructor(props) {
    super(props);
    this.state = {conversionRates: [], isLoading: true, currentPage:0};
    
    this.handlePageClick=this.handlePageClick.bind(this)
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/conversionRate/all')
      .then(response => response.json())
      .then(data => this.setState({conversionRates: data, isLoading: false}));
  }

  // async remove(id) {
  //   await fetch(`/user/delete/${id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(() => {
  //     let updatedconversionRates = [...this.state.conversionRates].filter(i => i.id !== id);
  //     this.setState({conversionRates: updatedconversionRates});
  //   });
  // }

  handlePageClick(e, index) {
    e.preventDefault()
    this.setState({
      currentPage: index
    });
    
  }

  render() {
    const {conversionRates, isLoading, currentPage} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.conversionRates.length / pageSize);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const conversionRateList = conversionRates.slice(currentPage*pageSize,
      (currentPage+1)*pageSize).map(conversionRate => {
      
      return <tr key={[conversionRate.id.fromPhase,conversionRate.id.toPhase,conversionRate.id.fromConnectionType,conversionRate.id.toConnectionType]}>
        <td>{conversionRate.id.fromPhase}</td>
        <td>{conversionRate.id.fromConnectionType}</td>
        <td>{conversionRate.id.toPhase}</td>
        <td>{conversionRate.id.toConnectionType}</td>
        <td className="text-right">{conversionRate.fixedCost.toLocaleString()}</td>
        <td className="text-right">{conversionRate.wireMeterPrice.toLocaleString()}</td>
        
        
      </tr>
    });

    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path2" href="/conversionRate/all">   Phase Convension Rates</a>
        </div>
        <div className="Possition">
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
          <h3 align="center"> PHASE CONVERSION RATES</h3>
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
                <th width="10%">From Phase</th>
                <th width="20%">From Connection Type</th>
                <th width="10%">To Phase</th>          
              <th width="20%">To Connection Type</th>
              <th width="20%">Fixed Cost</th>
              <th width="20%">Wire Meter Price</th>
              
            </tr>
            </thead>
            <tbody>
            {conversionRateList}
            </tbody>
          </Table>
        </Container>
        </div>
      </div>
    );
  }
}

export default ConversionRateList;