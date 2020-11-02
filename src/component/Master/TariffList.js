import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../css/Path.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Helmet } from 'react-helmet'
const TITLE = 'Tariff Details'
class Tariff extends Component {

  constructor(props) {
    super(props);
    this.state = {tariffs: [],currentPage: 0};
    this.remove = this.remove.bind(this);
    this.handlePageClick=this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('tariff/all')
      .then(response => response.json())
      .then(data => this.setState({tariffs: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/tariff/delete?tariffCode=${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedTariffs = [...this.state.tariffs].filter(i => i.tariffCode !== id);
      this.setState({tariffs: updatedTariffs});
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
    const {tariffs, isLoading} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.tariffs.length / pageSize);

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
        <a className="path" href="/tariff">  Master  </a> |
        <a className="path2" href="/tariff" >  Tariff  </a>
        </div>

  

        <div className="Possition">
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/tariff/add">Add Tariff</Button>
          </div>
          <h3 align="center">Tariff Details</h3>
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
            <th width="20%">Tariff Code</th>
              <th width="20%">Tariff Category Code</th>
              <th width="20%">Tariff Name</th>
              <th width="20%">Is Smc Active</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {tariffs
            .slice(
              currentPage * pageSize,
              (currentPage + 1) * pageSize
            )
            .map(tariff =>{
              return <tr key={tariff.tariffCode}>
                   <td style={{whiteSpace: 'nowrap'}}>{tariff.tariffCode}</td> 
                   <td style={{whiteSpace: 'nowrap'}}>{tariff.tariffCatCode}</td>
                   <td style={{whiteSpace: 'nowrap'}}>{tariff.tariffName}</td>
                   <td style={{whiteSpace: 'nowrap'}}>{tariff.isSmcActive}</td>
                   <td>
                     <ButtonGroup>
                       <Button size="sm" color="primary" tag={Link} to={"/tariff/edit/" + tariff.tariffCode}>Edit</Button>
                       <Button size="sm" color="danger" onClick={() => this.remove(tariff.tariffCode)}>Delete</Button>
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

export default Tariff;