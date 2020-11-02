import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { array } from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Labour Activity Rates';

class LabourList extends Component {

  emptyIdGroup={
    // year:this.props.match.params.year,
    year:'',
    deptId:sessionStorage.getItem('costCenterNo'),
  };

  constructor(props) {
    super(props);
    this.state = {
      labours: [], 
      years:[],
      lastYear:'',
      //deptId:sessionStorage.getItem('costCenterNo'),
      isLoading: true, 
      idGroup:this.emptyIdGroup,
      currentPage:0
      
     };
    //this.remove = this.remove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setPage=this.setPage.bind(this);
    this.getPageNum=this.getPageNum.bind(this);
  }


  async componentDidMount() {
    this.setState({isLoading: true});

    if(!this.props.location.state){
      
    }else{
      this.setState({currentPage:this.props.match.params.currentPage});
    }
    await fetch(`/labour/findYearByDeptId?deptId=${this.state.idGroup.deptId}`)
      .then(response => response.json())
      .then(data => this.setState({years: data,lastYear:Math.max(...data)}));
      
    if(!this.props.location.state){
        this.state.idGroup.year=this.state.lastYear;
    }else{
        this.state.idGroup.year=this.props.location.state.year;
    }
      

    await fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${this.state.idGroup.deptId}&year=${this.state.idGroup.year}`)
        .then(response => response.json())
        .then(data => this.setState({labours: data, isLoading: false},()=>this.setPage()));
      
    }

    setPage(){
      if(!this.props.location.state){
        this.setState({currentPage:0});
      }else{
        this.setState({currentPage:this.props.location.state.currentPage-1});
        this.props.history.replace('/labour/findByDeptId',null)
      }
    }

    getPageNum(pageSize,pagesCount){
      if(this.state.labours.length%pageSize==0){
        return (pagesCount+1);
      }else{
        return pagesCount;
      }
    }
  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let idGroup = {...this.state.idGroup};
    idGroup[name] = value;
    this.setState({idGroup});
    //console.log(this.state.currentPage)
    //console.log(idGroup.year);
    this.setState({currentPage:0})
    if(idGroup.year){
      fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${idGroup.deptId}&year=${idGroup.year}`)
      .then(response => response.json())
      .then(data => this.setState({labours: data}));
    }else{

      fetch(`/labour/findByIdDeptId?deptId=${this.state.idGroup.deptId}`)
        .then(response => response.json())
        .then(data => this.setState({labours: data, isLoading: false}));
      }
  }

  handlePageClick(e, index) {
    e.preventDefault()
    this.setState({
      currentPage: index
    });
    
  }

  render() {
    const {labours, isLoading, years, currentPage} = this.state;
    const pageSize = 7;
    const pagesCount = Math.ceil(this.state.labours.length / pageSize);
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const labourList = labours.slice(currentPage*pageSize,
      (currentPage+1)*pageSize).map(labour => {
      
      return <tr key={[labour.id.labourCode,labour.id.deptId,labour.id.year]}>
        <td>{labour.id.labourCode}</td>
        <td>{labour.labourName}</td>
        <td>{labour.applicationType}</td>
        <td>{labour.description}</td>
        <td>{labour.unitPrice}</td>
        <td>{labour.labourHours}</td>
        
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/labour/edit/" + labour.id.labourCode+"/"+labour.id.deptId+"/"+labour.id.year+"/"+(currentPage+1)}>Edit</Button>
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
        <a className="path" href="/home">   Labour Activity Rates </a> |
        <a className="path2" href="/labour/findByDeptId">   Manage Labour Activity Rates</a> 
        </div>
        
        <Container fluid>
          <div className="row float-right">
            
            <div className="col-md-4 mb-3">

            <Button color="success" tag={Link} to={{pathname:'/labour/add/',state:{year:this.state.idGroup.year,page:this.getPageNum(pageSize,pagesCount)}}}>Add labour</Button>

            </div>
            
          </div>
          <h3 align="center">LABOUR ACTIVITY RATES - {this.state.idGroup.deptId}</h3>
          <br/>
          <div className="form-group row">
            <label for="year" className="col-sm-2 col-form-label">Year</label>
            <div className="col-sm-4">
                <select className="form-control" name="year" id="year" value={this.state.idGroup.year}
                    onChange={this.handleChange} >
                      <option value="">All</option>
                     
                    {
                        (years && years.length>0) && years.map((year)=>{
                            return(<option value={year}>{year}</option>);
                        })
                    }
                    
                </select>
            </div>
            </div>
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
              <th>Labour Code</th>
              <th>Labour Name</th>
              <th>Application Type</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Labour Hours</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {labourList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default LabourList;