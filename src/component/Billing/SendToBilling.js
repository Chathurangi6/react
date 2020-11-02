import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink ,Input} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { FormGroup } from 'react-bootstrap';
import '../../css/Path.css';
const TITLE = 'Send To Billing'

class SendToBilling extends Component {

    constructor(props) {
      super(props);
    }

    componentDidMount() {
    }
        render() {
            return (
                <div>
                <Helmet>
                <title>{ TITLE }</title>
              </Helmet>
         
              <div className="padding">
              <a className="path" href="/home">  Home  </a> |
              <a className="path" href="/home">   Billing </a> |
              <a className="path2" href="/sendToBilling">   Send To Billing</a>
              </div>
           
              <h3 align="center">Send To Biling</h3>
              <div className="Possition">
​
              <Container fluid>
          
              <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Check</th>
              <th width="20%">Job No.</th>
              <th width="20%">SMC Type</th>
              <th width="20%">Sub type</th>
              <th width="10%">Customer Name</th>
              <th width="10%">Address</th>
              <th width="10%">NIC No.</th>
              <th width="10%">Application Date</th>
              <th width="10%">Connected Date</th>
              <th width="10%">ApplicationNo.</th>
              <th width="10%">Temp ID(ANC).</th>
​
            </tr>
            </thead>
            <tbody>
​

 {/* return <tr key={billing.jobNo}> */}
 <tr>
        <td style={{whiteSpace: 'nowrap'}}><Input  type="checkbox"></Input></td> 
        <td style={{whiteSpace: 'nowrap'}}>001</td>
        <td style={{whiteSpace: 'nowrap'}}>Yes</td>
        <td style={{whiteSpace: 'nowrap'}}>AB</td>
        <td style={{whiteSpace: 'nowrap'}}>ABC</td>
        <td style={{whiteSpace: 'nowrap'}}>Homagama</td>
        <td style={{whiteSpace: 'nowrap'}}>895342245V</td>
        <td style={{whiteSpace: 'nowrap'}}>2019-02-12</td>
        <td style={{whiteSpace: 'nowrap'}}>2018-01-30</td>
        <td style={{whiteSpace: 'nowrap'}}>0002</td> 
        <td style={{whiteSpace: 'nowrap'}}>1000001</td> 
    
      </tr>
    
​
         </tbody>
          </Table>
          <br></br> 
        
          <FormGroup >
            <Button color="primary" tag={Link} to="/home" >Exit</Button>{' '}
            <Button  color="success" >Send To Billing</Button>
         
          </FormGroup>
        </Container>
        </div>
      
      </div>
    );
  }
}
export default SendToBilling;

























