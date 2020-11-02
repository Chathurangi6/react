import React, { Component } from 'react';
import { Button, Container, Jumbotron, Card, CardBody, CardTitle, CardText, Col, Row, Table } from 'reactstrap';
import Footer from '../Common/Foot/Footer';
import '../../css/GldeptinAdd.css';
import { Link } from 'react-router-dom';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Cost Center Details';


class GldeptinView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            GldeptinView: [],
            BankList: [],
            BranchList: [],
            DivisionList: [],
            DivisionBranchList: [],
            UnitList: [],
            // isLoading: true,
            deptId: sessionStorage.getItem('costCenterNo')
        };
    }

    componentDidMount() {
        // this.setState({ isLoading: true });
        // fetch(`/gldeptin/getCostCenter?deptId=${this.state.deptId}`)
        fetch("/gldeptin/" + this.state.deptId)
            .then(response => response.json())
            .then(data => this.setState({ GldeptinView: data }, () => this.afterSetStateGldeptinViewFinished()));
    }

    afterSetStateGldeptinViewFinished() {
        fetch(`/bank/findByBankCodeOrderByBankName?bankCode=${this.state.GldeptinView.bankCode}`)
            .then(response => response.json())
            .then(data => this.setState({ BankList: data }));


        fetch(`/branch/findByIdBranchCodeOrderByBranchName?branchCode=${this.state.GldeptinView.branchCode}`)
            .then(response => response.json())
            .then(data => this.setState({ BranchList: data }));

        fetch(`/division/${this.state.GldeptinView.deptRegion}`)
            .then(response => response.json())
            .then(data => this.setState({ DivisionList: data }));

        fetch(`/divisionbranch/${this.state.GldeptinView.deptRegion}/${this.state.GldeptinView.deptProvince}`)
            .then(response => response.json())
            .then(data => this.setState({ DivisionBranchList: data }));


        fetch(`/unit/${this.state.GldeptinView.deptProvince}/${this.state.GldeptinView.deptArea}`)
            .then(response => response.json())
            .then(data => this.setState({ UnitList: data, isLoading:false  }));
    }


    render() {
        const { GldeptinView, BankList, BranchList, DivisionList, DivisionBranchList, UnitList,isLoading } = this.state;
        
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
        <a className="path" href="/home">   Cost Center Details  </a> |
        <a className="path2" href="/gldeptin/view">   View CostCenter Details</a> 
        </div>
                <Container>
                    <Button style={{ float: "right" }} color="primary" tag={Link} to="/">Back</Button>
                </Container>

                <br></br>
                <br></br>
                <Container style={{ display: "flex", justifyContent: "center" }}>

                    <Card style={{ width: "100%" }}>
                        <CardBody>
                            <h4 style={{ textAlign: "center" }}>Cost Center No : {GldeptinView.deptId}</h4>
                            <Button style={{ float: "right" }} color="primary" tag={Link} to={"/gldeptin/edit/" + GldeptinView.deptId}>Edit</Button>
                            <br></br>
                            <br></br>
                            <Row>
                                <Col sm="6">
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Cost Center Full Name</th>
                                                <td>{GldeptinView.deptFullName}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Cost Center Address</th>
                                                <td>{GldeptinView.deptAdd}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Cost Center Telephone</th>
                                                <td>{GldeptinView.deptTel}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Cost center Email</th>
                                                <td>{GldeptinView.emailNo}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Cost Center Division</th>
                                                <td>{DivisionList.divisionName}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Cost Center Province</th>
                                                <td>{DivisionBranchList.branchName}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Cost Center Area</th>
                                                <td>{UnitList.unitName}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Cost Center Type</th>
                                                <td>{GldeptinView.deptType}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Head Person Role</th>
                                                <td>{GldeptinView.headPersonRole}</td>
                                            </tr>
                                            <tr className="tr_Application">
                                                <th scope="row">Head Person No</th>
                                                <td>{GldeptinView.headPersonNo}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col sm="6">
                                    <Table>
                                        <tbody>
                                            <br></br>
                                            <br></br>
                                            <tr>
                                                <th scope="row">Bulk Supplier Name</th>
                                                <td>{GldeptinView.bulkSupplierName}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Bulk Supplier Address</th>
                                                <td>{GldeptinView.bulkSupplierAdd}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Bulk Supplier Telephone</th>
                                                <td>{GldeptinView.bulkSupplierTel}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Bank Name</th>
                                                <td>{BankList.bankName}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Branch Name</th>
                                                <td>{BranchList.branchName}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">posA</th>
                                                <td>{GldeptinView.posA}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">pos Center</th>
                                                <td>{GldeptinView.posCenter}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Is Piv 1 Needed Default</th>
                                                <td>{GldeptinView.isPiv1NeededDefault}</td>
                                            </tr>
                                            <tr className="tr_Application">
                                                <th scope="row">Department Code</th>
                                                <td>{GldeptinView.deptCode}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
                <br></br>
                <br></br>
                <br></br>

                {/* <Jumbotron className='jumbotron'>
                    <Container className='container_gldeptin'>
                        <Card className='card_gldeptin'>
                            <CardBody>
                                <CardText>
                                    <Row className='height_gldeptin' >
                                        <Col sm="6"  ><h5 style={{ float: "right" }}>Cost Center No : {GldeptinView.deptId}</h5></Col>

                                        <Col sm="6" >
                                            <Col sm={{ offset: 3 }} >
                                                <Button color="primary" tag={Link} to={"/gldeptin/edit/" + GldeptinView.deptId}>Edit</Button>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row className='height_gldeptin'>
                                        <Col sm="6" >
                                            <Row >
                                                <Col sm={6}>Cost Center Full Name : </Col>
                                                <Col sm={6}>{GldeptinView.deptFullName}</Col>
                                            </Row>
                                        </Col>

                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Bulk Supplier Name : </Col>
                                                <Col sm={6}>{GldeptinView.bulkSupplierName}</Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row className='height_gldeptin'>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Cost Center Address : </Col>
                                                <Col sm={6}>{GldeptinView.deptAdd}</Col>
                                            </Row>
                                        </Col>

                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Bulk Supplier Address : </Col>
                                                <Col sm={6}>{GldeptinView.bulkSupplierAdd}</Col>
                                            </Row>
                                        </Col>
                                    </Row>


                                    <Row className='height_gldeptin'>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Cost Center Telephone : </Col>
                                                <Col sm={6}>{GldeptinView.deptTel}</Col>
                                            </Row>
                                        </Col>

                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Bulk Supplier Telephone : </Col>
                                                <Col sm={6}>{GldeptinView.bulkSupplierTel}</Col>
                                            </Row>
                                        </Col>
                                    </Row>


                                    <Row className='height_gldeptin'>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Cost center Email</Col>
                                                <Col sm={6}>{GldeptinView.emailNo}</Col>
                                            </Row>
                                        </Col>

                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Bank Name</Col>
                                                <Col sm={6}>{BankList.bankName}</Col>
                                            </Row>
                                        </Col>
                                    </Row>


                                    <Row className='height_gldeptin'>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Cost Center Division</Col>
                                                <Col sm={6}>{DivisionList.divisionName}</Col>
                                            </Row>
                                        </Col>

                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Branch Name</Col>
                                                <Col sm={6}>{BranchList.branchName}</Col>
                                            </Row>
                                        </Col>
                                    </Row>


                                    <Row className='height_gldeptin'>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Cost Center Province</Col>
                                                <Col sm={6}>{DivisionBranchList.branchName}</Col>
                                            </Row>
                                        </Col>

                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>posA</Col>
                                                <Col sm={6}>{GldeptinView.posA}</Col>
                                            </Row>
                                        </Col>
                                    </Row>


                                    <Row className='height_gldeptin'>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Cost Center Area</Col>
                                                <Col sm={6}>{UnitList.unitName}</Col>
                                            </Row>
                                        </Col>

                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>pos Center</Col>
                                                <Col sm={6}>{GldeptinView.posCenter}</Col>
                                            </Row>
                                        </Col>
                                    </Row>


                                    <Row className='height_gldeptin'>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Cost Center Type</Col>
                                                <Col sm={6}>{GldeptinView.deptType}</Col>
                                            </Row>
                                        </Col>

                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Is Piv 1 Needed Default</Col>
                                                <Col sm={6}>{GldeptinView.isPiv1NeededDefault}</Col>
                                            </Row>
                                        </Col>
                                    </Row>


                                    <Row className='height_gldeptin'>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Head Person Role</Col>
                                                <Col sm={6}>{GldeptinView.headPersonRole}</Col>
                                            </Row>
                                        </Col>

                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Department Code</Col>
                                                <Col sm={6}>{GldeptinView.deptCode}</Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row className='height_gldeptin'>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm={6}>Head Person No</Col>
                                                <Col sm={6}>{GldeptinView.headPersonNo}</Col>
                                            </Row>
                                        </Col>

                                        <Col sm="6" >

                                        </Col>
                                    </Row>

                                </CardText>
                            </CardBody>
                        </Card>
                    </Container>
                </Jumbotron>
                 */}
                <Footer />
            </div>
        );


    }
}

export default GldeptinView;