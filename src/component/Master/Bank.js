import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../css/Path.css';
import Swal from 'sweetalert2';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Helmet } from 'react-helmet'
const TITLE = 'Bank Details'

class Bank extends Component {

  constructor(props) {
    super(props);
    this.state = {banks: [],currentPage: 0};
    this.handlePageClick=this.handlePageClick.bind(this);
    this.remove = this.remove.bind(this);
   
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('bank/all')
      .then(response => response.json())
      .then(data => this.setState({banks: data, isLoading: false}));
  }

  async remove(id) {
   
    await fetch(`/bank/delete?bankCode=${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }


    }).then(() => {
      let updatedBanks = [...this.state.banks].filter(i => i.bankCode !== id);
      this.setState({banks: updatedBanks});
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
    const {banks, isLoading} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.banks.length / pageSize);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
          <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path2" href="/bank">   Bank</a>
        </div>
      

        <div className="Possition">
       
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/bank/add">Add Bank</Button>
          </div>
          <h3 align="center">Bank Details</h3>
       
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
            <th width="20%">Bank Code</th>
              <th width="20%">Bank Name</th>
              <th width="20%">Is Bank</th>
              <th width="20%">Sort Key</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>

            {banks
            .slice(
              currentPage * pageSize,
              (currentPage + 1) * pageSize
            )
            .map(bank =>{

      
      return <tr key={bank.bankCode}>
        <td style={{whiteSpace: 'nowrap'}}>{bank.bankCode}</td> 
        <td style={{whiteSpace: 'nowrap'}}>{bank.bankName}</td>
        <td style={{whiteSpace: 'nowrap'}}>{bank.isBank}</td>
        <td style={{whiteSpace: 'nowrap'}}>{bank.sortKey}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/bank/edit/" + bank.bankCode}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(bank.bankCode)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    })}

            </tbody>
          </Table>
        </Container>
        </div>
     
      </div>
    );
  }
}

export default Bank;