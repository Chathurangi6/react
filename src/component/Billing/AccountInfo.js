import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import '../../css/Path.css';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink,Label,Input,FormGroup } from 'reactstrap';
import { Helmet } from 'react-helmet'
const TITLE = 'Account Info'


class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {spexpjobs: [],currentPage: 0};
   this.handlePageClick=this.handlePageClick.bind(this)

   this.state = {
    startDate: new Date(),
    endDate: new Date(),
    }
  }
  componentDidMount() {
    fetch('spexpjob/recent')
      .then(response => response.json())
      .then(data => this.setState({spexpjobs: data, isLoading: false}));
  }
  handlePageClick(e, index) {
    e.preventDefault()
    this.setState({
      currentPage: index
    });
  }
  render() {
    const { currentPage } = this.state;
    const {spexpjobs} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.spexpjobs.length / pageSize);
    return (
      <div>
      <Helmet>
      <title>{ TITLE }</title>
    </Helmet>
  
    <div className="padding">
    <a className="path" href="/home">  Home  </a> |
    <a className="path" href="/home">   Billing </a>|
    <a className="path2" href="/accountInfo">   Account Info</a>
    </div>

     
        <Container fluid>
        <h3 align="center">Account Info</h3>
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
 <FormGroup>
    <Label for="startDate" style={{ marginLeft:'10px', display: 'inline-block' }}>Start Date</Label>
    <Input  type="date"  name="startDate"  id="startDate" selected={this.state.startDate} style={{ width: "175px" ,display: 'inline-block', marginLeft:'20px' }} />
    <Label for="endDate" style={{ marginLeft:'50px', display: 'inline-block' }}>End Date</Label>
    <Input  type="date"  name="endDate"  id="endDate" selected={this.state.endDate} style={{ width: "175px" ,display: 'inline-block', marginLeft:'20px' }} />
    <Button color="success"style={{ marginLeft:'100px' }} tag={Link} to="/accountInfo">Retrive</Button>
 </FormGroup>
          <Table className="mt-4"  >
            <thead>
            <tr>
            <th width="10%">Job No</th>
              <th width="10%">Csc No</th>
              <th width="10%">Account No</th>
              <th width="10%">Acc Created Date</th>
            </tr>
            </thead>
            <tbody>
            {spexpjobs
            .slice(
              currentPage * pageSize,
              (currentPage + 1) * pageSize
            )
            .map(spexpjob => {
                return <tr key={spexpjob.id} >
        <td style={{whiteSpace: 'nowrap'}}>{spexpjob.id.projectNo}</td>
        <td style={{whiteSpace: 'nowrap'}}>{spexpjob.id.deptId}</td>
        <td style={{whiteSpace: 'nowrap'}}>{spexpjob.accountNo}</td>
        <td style={{whiteSpace: 'nowrap'}}>{spexpjob.accCreatedDate}</td>
      </tr>
            })}
            </tbody>
          </Table>
            <FormGroup >
            <Button color="primary" tag={Link} to="/home" >Exit</Button>
           
          </FormGroup>
        </Container>
      
      </div>
    );
  }
}
export default AccountInfo ;