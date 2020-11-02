import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../css/Path.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Helmet } from 'react-helmet';
const TITLE = 'Contractors';

class ContractorList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contractors: [], 
      deptId:sessionStorage.getItem('costCenterNo'),
      isLoading: true, 
      currentPage:0,
      
    };
    this.handlePageClick=this.handlePageClick.bind(this);
    this.handleStatus=this.handleStatus.bind(this);
    this.handleStatusColor=this.handleStatusColor.bind(this);
    this.setPage=this.setPage.bind(this);
    this.getPageNum=this.getPageNum.bind(this);
   
  }

  async componentDidMount() {
    this.setState({isLoading: true});

    await fetch(`/contractor/findByIdDeptId?deptId=${this.state.deptId}`)
      .then(response => response.json())
      .then(data => this.setState({contractors: data, isLoading: false},()=>this.setPage()));
 
  }
    
  setPage(){
      
    if(!this.props.location.state){
      this.setState({currentPage:0});       
    }else{
      this.setState({currentPage:this.props.location.state.currentPage-1});
      this.props.history.replace('/contractor/findByDeptId',null)
    }
  }
  getPageNum(pageSize,pagesCount){
    if(this.state.contractors.length%pageSize==0){
      return (pagesCount+1);
    }else{
      return pagesCount;
    }
  }


  // async remove(contractorId,deptId) {
  //   await fetch(`/contractor/delete?contractorId=${contractorId}&deptId=${deptId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   // .then(() => {
  //   //   let updatedContractors = [...this.state.contractors].filter(i =>( (i.contractorId !== contractorId)&&(i.deptId !==deptId)));
  //   //   this.setState({contractors: updatedContractors});
  //   // });
    
  //   fetch('/contractor/all')
  //     .then(response => response.json())
  //     .then(data => this.setState({contractors: data, isLoading: false}));
  // }

  handlePageClick(e, index) {
    e.preventDefault()
    this.setState({
      currentPage: index
    });
    
  }

  handleStatus(status){
    if(status=="1"){
      status="Active";
    }else if(status=="0"){
      status="Inactive";
    }
    return status;
  }

  handleStatusColor(status){
    let color;
    if(status=="1"){
      color='black';
    }else if(status=="0"){
      color='red';
    }
    return color;
  }

  render() {
    const {contractors, isLoading, currentPage} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.contractors.length / pageSize);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const contractorList = contractors.slice(currentPage*pageSize,
      (currentPage+1)*pageSize).map(contractor => {
      

      return <tr key={[contractor.id.contractorId,contractor.id.deptId]}>
        <td>{contractor.id.contractorId}</td>
        <td>{contractor.contractorName}</td>
        <td>{contractor.contractorAddress}</td>
        <td>{contractor.jobInHand}</td>
        <td>{contractor.totalAmount}</td>
        <td>{contractor.bondNo}</td>
        <td>{contractor.startDate}</td>
        <td>{contractor.endDate}</td>
        <td>{contractor.performanceAmount}</td>
        <td>{contractor.vat}</td>
        <td>{contractor.nbt}</td>
        <td style={{color:this.handleStatusColor(contractor.status)}}>{this.handleStatus(contractor.status)}</td>
        
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/contractor/edit/" + contractor.id.contractorId+"/"+contractor.id.deptId+"/"+(currentPage+1)}>Edit</Button>
            {/* <Button size="sm" color="danger" onClick={() => this.remove(contractor.id.contractorId, contractor.id.deptId)}>Delete</Button> */}
          </ButtonGroup>
        </td>
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
        <a className="path" href="/home">  Manage Contractor </a> |
        <a className="path2" href="/contractor/findByDeptId">   Contractors</a> 
        </div>
        <Container fluid>
          <div className="row float-right">
            
            <div className="col-md-4 mb-3">

            <Button color="success" tag={Link} to={{pathname:'/contractor/add',state:{page:this.getPageNum(pageSize,pagesCount)}}}>Add contractor</Button>
            </div>
            
          </div>
          <h3>CONTRACTORS - {this.state.deptId}</h3>
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
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Jobs In Hand</th>
              <th>Total Amount</th>
              <th>Bond Number</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Performance Amount</th>
              <th>VAT</th>
              <th>NBT</th>
              <th>STATUS</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {contractorList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ContractorList;