import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import '../../css/Path.css';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Helmet } from 'react-helmet'
const TITLE = ' Tariff Category Details'
class TariffCategory extends Component {

  constructor(props) {
    super(props);

    this.state = {tariffCategorys: [],currentPage: 0};
    this.remove = this.remove.bind(this);
    this.handlePageClick=this.handlePageClick.bind(this);

  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('tariffCategory/all')
      .then(response => response.json())
      .then(data => this.setState({tariffCategorys: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/tariffCategory/delete?tariffCatCode=${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedTariffCategorys = [...this.state.tariffCategorys].filter(i => i.tariffCatCode !== id);
      this.setState({tariffCategorys: updatedTariffCategorys});
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
    const {tariffCategorys, isLoading} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.tariffCategorys.length / pageSize);

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
        <a className="path" href="/tariffCategory">   Master  </a> |
        <a className="path2" href="/tariffCategory">  Tariff Category</a>
        </div>

  

        <div className="Possition">
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/tariffCategory/add">Add Tariff Category</Button>
          </div>
          <h3 align="center">Tariff Category Details</h3>

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
            <th width="20%">Tariff Category Code</th>
             <th width="20%">Tariff Name</th>
             <th width="20%">Is Smc Active</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {tariffCategorys
            .slice(
              currentPage * pageSize,
              (currentPage + 1) * pageSize
            )
            .map(tariffCategory =>{
              
      return <tr key={tariffCategory.tariffCatCode}>
        <td style={{whiteSpace: 'nowrap'}}>{tariffCategory.tariffCatCode}</td> 
        <td style={{whiteSpace: 'nowrap'}}>{tariffCategory.tariffCatName}</td>
        <td style={{whiteSpace: 'nowrap'}}>{tariffCategory.isSmcActive}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/tariffCategory/edit/" + tariffCategory.tariffCatCode}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(tariffCategory.tariffCatCode)}>Delete</Button>
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

export default TariffCategory;