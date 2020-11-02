import React, { Component } from 'react';
import {  withRouter, Link } from 'react-router-dom';
import {  Button,ListGroup, Card, ListGroupItem} from 'react-bootstrap';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import {estimateStatus} from '../Estimate/EstimateStatus';


class Estimatedashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
          Status:'',
          jobStatus:'',
          UserId:sessionStorage.getItem('userName'),
          userLevel:sessionStorage.getItem('userLevel'),
            estimatesToBeApprovedLists:[],
            approvedEstimatesLists:[],
            rejectedEstimatesLists:[],
            paidEstimatePIVLists:[],
            paidSecurityDepositPIVLists:[],
            rejectedJobsLists:[],
            jobsToBeRevicedLists:[],
            jobsToBeApprovedLists:[],
            doorStepApplicationListLists:[],
            onlineFieldApplicationsLists:[],

        };
        
    }
    async componentDidMount() {
      
      // const UserId=sessionStorage.getItem('userName');
      // const  userLevel=sessionStorage.getItem('userLevel');
      console.log( this.state.UserId);
      console.log( this.state.userLevel);
      if(this.state.userLevel=="ES"){
        this.state.Status=estimateStatus.EST_APPROVAL_ES;
        this.state.jobStatus=estimateStatus.JOB_APPROVAL_ES;

      }else if(this.state.userLevel=="EA"){
        this.state.Status=estimateStatus.EST_APPROVAL_EA;
        this.state.jobStatus=estimateStatus.JOB_APPROVAL_EA;

      }else if(this.state.userLevel=="EE"){
        this.state.Status=estimateStatus.EST_APPROVAL_EE;
        this.state.jobStatus=estimateStatus.JOB_APPROVAL_EE;

      }else if(this.state.userLevel=="CE"){
        this.state.Status=estimateStatus.EST_APPROVAL_CE;
        this.state.jobStatus=estimateStatus.JOB_APPROVAL_CE;

      }else if(this.state.userLevel=="DGM"){
        this.state.Status=estimateStatus.EST_APPROVAL_DGM;
        this.state.jobStatus=estimateStatus.JOB_APPROVAL_DGM;

      }else if(this.state.userLevel=="AGM"){
        this.state.Status=estimateStatus.EST_APPROVAL_AGM;
      }else if(this.state.userLevel=="PEN"){
        this.state.Status=estimateStatus.EST_APPROVAL_PEN;
      }else if(this.state.userLevel=="PCE"){
        this.state.Status=estimateStatus.EST_APPROVAL_PCE;
      }
      console.log(this.state.Status+"uuyuuy");
// to be edittttt
       await  fetch(`/pcesthtt/findEstimateNosByStatusAndUserId?status=${this.state.Status}&userId=${this.state.UserId}`)
        .then(response => response.json())
        .then(data => this.setState({estimatesToBeApprovedLists: data, isLoading: false}));
        console.log(this.state.estimatesToBeApprovedLists);

      await  fetch(`/pcesthtt/findEstimateNosByStatusAndUserId?status=${estimateStatus.EST_APPROVED}&userId=${this.state.UserId}`)
       .then(response => response.json())
         .then(data => this.setState({approvedEstimatesLists: data, isLoading: false}));
         console.log(estimateStatus.EST_APPROVED);
         console.log(this.state.approvedEstimatesLists);

      await  fetch(`/pcesthtt/findEstimateNosByStatusAndUserId?status=${estimateStatus.EST_REJECTED}&userId=${this.state.UserId}`)
       .then(response => response.json())
      .then(data => this.setState({rejectedEstimatesLists: data, isLoading: false}));
      console.log(this.state.rejectedEstimatesLists);

      await  fetch(`/pcesthtt/findEstimateNosByStatus?status=31`)
      .then(response => response.json())
     .then(data => this.setState({paidEstimatePIVLists: data, isLoading: false}));
      console.log(this.state.paidEstimatePIVLists);

      await  fetch(`/pcesthtt/findEstimateNosByStatus?status=31`)
      .then(response => response.json())
      .then(data => this.setState({paidSecurityDepositPIVLists: data, isLoading: false}));
      console.log(this.state.paidSecurityDepositPIVLists);

      await  fetch(`/pcesthmt/findProjectNosByStatusAndUserId?status=${estimateStatus.JOB_REJECTED}&userId=${this.state.UserId}`)
      .then(response => response.json())
      .then(data => this.setState({rejectedJobsLists: data, isLoading: false}));
      console.log(this.state.rejectedJobsLists);

      await  fetch(`/pcesthmt/findProjectNosByStatusAndUserId?status=${estimateStatus.JOB_RIVISION}&userId=${this.state.UserId}`)
      .then(response => response.json())
      .then(data => this.setState({jobsToBeRevicedLists: data, isLoading: false}));
      console.log(this.state.jobsToBeRevicedLists);

      await  fetch(`/pcesthmt/findProjectNosByStatusAndUserId?status=31&userId=${this.state.UserId}`)
      .then(response => response.json())
      .then(data => this.setState({jobsToBeApprovedLists: data, isLoading: false}));
      console.log(this.state.jobsToBeApprovedLists);

      await  fetch(`/pcesthtt/findEstimateNosByStatus?status=31`)
      .then(response => response.json())
      .then(data => this.setState({doorStepApplicationListLists: data, isLoading: false}));
      console.log(this.state.doorStepApplicationListLists);

      await  fetch(`/pcesthtt/findEstimateNosByStatus?status=31`)
      .then(response => response.json())
      .then(data => this.setState({onlineFieldApplicationsLists: data, isLoading: false}));
      console.log(this.state.onlineFieldApplicationsLists);

      
    }


    render() {
      

        const modal1lists=this.state.estimatesToBeApprovedLists.map(x=>{
       return  <ListGroupItem><Link to={{pathname:'/estimate/approveOrReject/',state:{estNo:x[0],costCenter:x[1]}}}>{x[0] +" , "+ x[1]}</Link></ListGroupItem>
        });

        const modal2lists=this.state.approvedEstimatesLists.map(a=>{
          return  <ListGroupItem><Link to={{pathname:'/estimate/undoRejects/',state:{estNo:a[0],costCenter:a[1]}}}>{a[0] +" , "+ a[1]}</Link></ListGroupItem>
           });

        const modal3lists=this.state.rejectedEstimatesLists.map(b=>{
        return   <ListGroupItem><Link to={{pathname:'/estimate/undoRejects/',state:{estNo:b[0],costCenter:b[1]}}}>{b[0] +" , "+ b[1]}</Link></ListGroupItem>
        });

        // const modal4lists=this.state.paidEstimatePIVLists.map(c=>{
        // return  <ListGroupItem><Card.Link href={c}>{c}</Card.Link></ListGroupItem>
        // });

        // const modal5lists=this.state.paidSecurityDepositPIVLists.map(d=>{
        // return  <ListGroupItem><Card.Link href={d}>{d}</Card.Link></ListGroupItem>
        // });

        const modal6lists=this.state.rejectedJobsLists.map(e=>{
        return  <ListGroupItem><Link to={{pathname:'/job/undoRejects/',state:{jobNo:e[1],estNo:e[0],costCenter:e[2]}}}>{e[1] +" , "+ e[2]}</Link></ListGroupItem>
        });

        const modal7lists=this.state.jobsToBeRevicedLists.map(f=>{
        return  <ListGroupItem><Link to={{pathname:'/job/undoRejects/',state:{jobNo:f[1],estNo:f[0],costCenter:f[2]}}}>{f[1] +" , "+ f[2]}</Link></ListGroupItem>
        });

        const modal8lists=this.state.jobsToBeApprovedLists.map(g=>{
          return  <ListGroupItem><Link to={{pathname:'/job/approveOrReject/',state:{jobNo:g[1],estNo:g[0],costCenter:g[2]}}}>{g[1] +" , "+ g[2]}</Link></ListGroupItem>
          });

      // const modal9lists=this.state.doorStepApplicationListLists.map(h=>{
      //   return  <ListGroupItem><Card.Link href={h}>{h}</Card.Link></ListGroupItem>
      //   });

      //   const modal10lists=this.state.onlineFieldApplicationsLists.map(i=>{
      //    return  <ListGroupItem><Card.Link href={i}>{i}</Card.Link></ListGroupItem>
      //   });


        
        return (
            <div>
           
            <br></br>
            <br></br>
           
<div>
    <div className="row">
    <div className="col-sm-1"></div>
    <div className="col-sm-2">
 <Card  border="danger" style={{ width: '10rem' }}>
 <Card.Header variant="danger" ><h6>Estimates To Be Approved</h6></Card.Header>
  <Card.Body>
    
<Button  style={{backgroundColor: "#8f0b0b" }}  block size="md" active onClick={() => this.refs.modal1.open() }>{"   "+this.state.estimatesToBeApprovedLists.length} </Button>

   </Card.Body>
 </Card>
</div>

<div className="col-sm-2">
 <Card bg="light" border="danger" style={{ width: '10rem' }}>
 <Card.Header><h6>Approved Estimates</h6></Card.Header>
  <Card.Body>
     <Button style={{backgroundColor: "#8f0b0b" }} block size="md" active onClick={() => this.refs.modal2.open() }>{this.state.approvedEstimatesLists.length} </Button>
   </Card.Body>
 </Card>
</div>

<div className="col-sm-2">
 <Card bg="light" border="danger" style={{ width: '10rem' }}>
 <Card.Header><h6>Rejected Estimates</h6></Card.Header>
  <Card.Body>
     <Button style={{backgroundColor: "#8f0b0b" }}  block size="md" active onClick={() => this.refs.modal3.open() }>{this.state.rejectedEstimatesLists.length} </Button>
   </Card.Body>
 </Card>
</div>

<div className="col-sm-2">
 <Card bg="light" border="danger" style={{ width: '10rem' }}>
 <Card.Header><h6>Paid Estimate PIV</h6></Card.Header>
  <Card.Body>
     <Button style={{backgroundColor: "#8f0b0b" }} block size="md" active onClick={() => this.refs.modal4.open() }>{this.state.paidEstimatePIVLists.length} </Button>
   </Card.Body>
 </Card>
</div>

<div className="col-sm-2">
 <Card bg="light" border="danger" style={{ width: '10rem' }}>
 <Card.Header><h6>Paid Security Deposit PIV</h6></Card.Header>
  <Card.Body>
     <Button style={{backgroundColor: "#8f0b0b" }}  block size="md" active onClick={() => this.refs.modal5.open() }>{this.state.paidSecurityDepositPIVLists.length} </Button>
   </Card.Body>
 </Card>
</div>

</div>
<br></br>
<br></br>
<div className="row">
  <div className="col-sm-1"></div>

<div className="col-sm-2">
 <Card bg="light" border="danger" style={{ width: '10rem' }}>
 <Card.Header><h6>Rejected Jobs</h6><br></br></Card.Header>
  <Card.Body>
     <Button style={{backgroundColor: "#8f0b0b" }}  block size="md" active onClick={() => this.refs.modal6.open() }>{this.state.rejectedJobsLists.length} </Button>
   </Card.Body>
 </Card>
</div>

<div className="col-sm-2">
 <Card bg="light" border="danger" style={{ width: '10rem' }}>
 <Card.Header><h6>Jobs To Be Reviced</h6></Card.Header>
  <Card.Body>
     <Button style={{backgroundColor: "#8f0b0b" }} block size="md" active onClick={() => this.refs.modal7.open() }>{this.state.jobsToBeRevicedLists.length} </Button>
   </Card.Body>
 </Card>
</div>

<div className="col-sm-2">
 <Card bg="light" border="danger" style={{ width: '10rem' }}>
 <Card.Header><h6>Jobs To Be Approved</h6></Card.Header>
  <Card.Body>
     <Button style={{backgroundColor: "#8f0b0b" }}  block size="md" active onClick={() => this.refs.modal8.open() }>{this.state.jobsToBeApprovedLists.length} </Button>
   </Card.Body>
 </Card>
</div>

<div className="col-sm-2">
 <Card bg="light" border="danger" style={{ width: '10rem' }}>
 <Card.Header><h6>Door Step Application List</h6></Card.Header>
  <Card.Body>
     <Button style={{backgroundColor: "#8f0b0b" }}  block size="md" active onClick={() => this.refs.modal9.open() }>{this.state.doorStepApplicationListLists.length} </Button>
   </Card.Body>
 </Card>
</div>

<div className="col-sm-2">
 <Card bg="light" border="danger" style={{ width: '10rem' }}>
 <Card.Header><h6>Online field Applications</h6></Card.Header>
  <Card.Body>
     <Button style={{backgroundColor: "#8f0b0b" }} block size="md" active onClick={() => this.refs.modal10.open() }>{this.state.onlineFieldApplicationsLists.length} </Button>
   </Card.Body>
 </Card>
</div>

</div>
</div>
<PureModal width="400px" height="100px"
  header="Estimates To Be Approved" onClose={() => {
    console.log('handle closing');
    return true;
  }} ref="modal1">
<div className="scroller">
<ListGroup className="list-group-flush">
  <ul>{modal1lists}</ul>
  </ListGroup>
</div>
</PureModal>

<PureModal width="400px" height="300px"
  header="Approved Estimates" onClose={() => {
    console.log('handle closing');
    return true;
  }} ref="modal2">
<div className="scroller">
<ListGroup className="list-group-flush">
  <ul>{modal2lists}</ul>
  </ListGroup>
</div>
</PureModal>

<PureModal width="400px" height="300px"
  header="Rejected Estimates" onClose={() => {
    console.log('handle closing');
    return true;
  }} ref="modal3">
<div className="scroller">
<ListGroup className="list-group-flush">
  <ul>{modal3lists}</ul>
  </ListGroup>
</div>
</PureModal>

<PureModal width="400px" height="300px"
  header="Rejected Estimates" onClose={() => {
    console.log('handle closing');
    return true;
  }} ref="modal4">
<div className="scroller">
<ListGroup className="list-group-flush">
  {/* <ul>{modal4lists}</ul> */}
  </ListGroup>
</div>
</PureModal>

<PureModal width="400px" height="300px"
  header="Paid Security Deposit PIV" onClose={() => {
    console.log('handle closing');
    return true;
  }} ref="modal5">
<div className="scroller">
<ListGroup className="list-group-flush">
  {/* <ul>{modal5lists}</ul> */}
  </ListGroup>
</div>
</PureModal>

<PureModal width="400px" height="300px"
  header="Rejected Jobs" onClose={() => {
    console.log('handle closing');
    return true;
  }} ref="modal6">
<div className="scroller">
<ListGroup className="list-group-flush">
  <ul>{modal6lists}</ul>
  </ListGroup>
</div>
</PureModal>

<PureModal width="400px" height="300px"
  header="Jobs To Be Reviced" onClose={() => {
    console.log('handle closing');
    return true;
  }} ref="modal7">
<div className="scroller">
<ListGroup className="list-group-flush">
  <ul>{modal7lists}</ul>
  </ListGroup>
</div>
</PureModal>

<PureModal width="400px" height="300px"
  header="Jobs To Be Approved" onClose={() => {
    console.log('handle closing');
    return true;
  }} ref="modal8">
<div className="scroller">
<ListGroup className="list-group-flush">
  <ul>{modal8lists}</ul>
  </ListGroup>
</div>
</PureModal>

<PureModal width="400px" height="300px"
  header="Door Step Application List" onClose={() => {
    console.log('handle closing');
    return true;
  }} ref="modal9">
<div className="scroller">
<ListGroup className="list-group-flush">
  {/* <ul>{modal9lists}</ul> */}
  </ListGroup>
</div>
</PureModal>

<PureModal width="400px" height="300px"
  header="Online field Applications" onClose={() => {
    console.log('handle closing');
    return true;
  }} ref="modal10">
<div className="scroller">
<ListGroup className="list-group-flush">
  {/* <ul>{modal10lists}</ul> */}
  </ListGroup>
</div>
</PureModal>
{/* 
<Footer/> */}
</div>

        );
    }
}
export default withRouter(Estimatedashboard);


