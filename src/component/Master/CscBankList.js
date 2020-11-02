import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../css/Path.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Helmet } from 'react-helmet'
const TITLE = ' Csc Bank Details'
class CscBank extends Component {

  constructor(props) {
    super(props);

    this.state = {cscBanks: [],currentPage: 0, isLoading: true, deptId:localStorage.getItem('costCenterNo')};
    this.remove = this.remove.bind(this);
    this.handlePageClick=this.handlePageClick.bind(this)
  }
 
  componentDidMount() {
    this.setState({isLoading: true});

    fetch(`cscBank/findByIdDeptId?deptId=${this.state.deptId}`)
     
      .then(response => response.json())
      .then(data => this.setState({cscBanks: data,isLoading:false}));

  }

  async remove(deptId,bankCode,branchCode) {
    await fetch(`/cscBank/delete?deptId=${deptId}&bankCode=${bankCode}&branchCode=${branchCode}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedCscBanks = [...this.state.cscBanks].filter(i =>  i.id.bankCode !== bankCode && i.id.branchCode !== branchCode);
      this.setState({cscBanks: updatedCscBanks});
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
    const {cscBanks, isLoading} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.cscBanks.length / pageSize);

    if (isLoading) {
      return <p>Loading...</p>;
    }
    
    return (
      <div>
          <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <Container fluid>
          
     
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/cscBank">  Master  </a> |
        <a className="path2" href="/cscBank">  Csc Bank  </a> 
        </div>
      
        <div className="Possition">
          <div className="float-right">
            <Button color="success" tag={Link} to="/cscBank/add">Add Csc Bank</Button>
          </div>
          <h3 align="center">Csc Bank Details</h3>

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
            <th width="20%">Dept Id</th>
              <th width="20%">Bank Code</th>
              <th width="20%">Branch Code</th>
              <th width="20%">Status</th>
             
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {cscBanks
            .slice(
              currentPage * pageSize,
              (currentPage + 1) * pageSize
            )
            .map(cscBank =>{

  return <tr key={cscBank.id}>
       <td style={{whiteSpace: 'nowrap'}}>{cscBank.id.deptId}</td> 
       <td style={{whiteSpace: 'nowrap'}}>{cscBank.id.bankCode}</td>
       <td style={{whiteSpace: 'nowrap'}}>{cscBank.id.branchCode}</td>
       <td style={{whiteSpace: 'nowrap'}}>{cscBank.status}</td>
    
        <td>
          <ButtonGroup>
           <Button size="sm" color="primary" tag={Link} to={"/cscBank/edit/"+ cscBank.id.deptId+"/"+ cscBank.id.bankCode+"/" +cscBank.id.branchCode}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => this.remove(cscBank.id.deptId,cscBank.id.bankCode,cscBank.id.branchCode)}>Delete</Button>
          </ButtonGroup>
          
        </td>
      </tr>
    })}

            </tbody>
          </Table>
          </div>
        </Container>

      </div>
    );
  }
}

export default CscBank;