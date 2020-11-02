import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import '../../css/Path.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
const TITLE = ' Branch Details'
class BankBranchList extends Component {
 constructor(props) {
   super(props);
   this.state = {
     branches: [],
     BankBranchList: [],
     BankList: [],
     isLoading: true,
     currentPage: 0
    };
   this.remove = this.remove.bind(this);
   this.handlePageClick=this.handlePageClick.bind(this)
 
 }
async componentDidMount() {
   this.setState({isLoading: true});
  await fetch('bank/getBankNameList')
     .then(response => response.json())
     .then(data => this.setState({branches: data, isLoading: false}));
  

 }
  
 async remove(bankCode,branchCode) {
   console.log(bankCode)
   await fetch(`/branch/delete?bankCode=${bankCode}&branchCode=${branchCode}`, {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     }

   }).then(() => {
     let updatedBranches = [...this.state.branches].filter(i => i[0]  !== (bankCode) && i[2]  !== (branchCode) );
     this.setState({branches: updatedBranches});
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
  const {branches, isLoading} = this.state;

  const pageSize = 7;
  const pagesCount = Math.ceil(this.state.branches.length / pageSize);

   if (isLoading) {
     return <p>Loading...</p>;
   }

   console.log(this.state.branches.bankCode)

   return (
     <div>
         <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path2" href="/branch">  Branch</a>
        </div>
    
        <div className="Possition">
       <Container fluid>
         <div className="float-right">
           <Button color="success" tag={Link} to="/branch/add">Add Branch</Button>
         </div>
         <h3 align="center">Bank Branch Details</h3>
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
          <th width="20%">Branch Code</th>
             <th width="20%">Branch Name</th>
             <th width="20%">Branch Address</th>
            <th width="10%">Actions</th>
           </tr>
           </thead>
           <tbody>

           {branches
            .slice(
              currentPage * pageSize,
              (currentPage + 1) * pageSize
            )
            .map(branch =>{
              return <tr key={branch}>
                   
                    <td style={{whiteSpace: 'nowrap'}}>{branch[1]}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{branch[2]}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{branch[3]}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{branch[4]}</td>
                   
                  <td>
                     <ButtonGroup>
                       <Button size="sm" color="primary" tag={Link} to={"/branch/edit/" + branch[0]+"/"+branch[2]}>Edit</Button>
                       <Button size="sm" color="danger" onClick={() => this.remove(branch[0],branch[2])}>Delete</Button>
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
export default BankBranchList;