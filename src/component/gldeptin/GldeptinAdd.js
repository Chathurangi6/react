import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, FormGroup, Label, Card, CardBody, CardTitle, CardText, Col, Row, CustomInput } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField } from 'availity-reactstrap-validation';
import '../../css/Path.css';
import '../../css/GldeptinAdd.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
const TITLE = 'Add Cost Center Details';


class GldeptinAdd extends Component {

    initialGldeptin = {
        deptId: sessionStorage.getItem('costCenterNo'),
        addDate: '',
        addUser: '',
        areaCeNo: '',
        areaEeNo: '',
        bankCode: '',
        branchCode: '',
        bulkSupplierAdd: '',
        bulkSupplierName: '',
        bulkSupplierTel: '',
        deptAdd: '',
        deptArea: '',
        deptCode: '',
        deptFullName: '',
        deptProvince: '',
        deptRegion: '',
        deptTel: '',
        deptType: '',
        emailNo: '',
        isPiv1NeededDefault: 'N',
        posA: '',
        posCenter: '',
        headPersonRole: '',
        headPersonNo: '',
        updDate: '',
        updUser: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            gldeptin: this.initialGldeptin,
            RegionList:[],
            ProvinceList: [],
            AreaList:[],
            BankList: [],
            BranchList: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpperCase = this.handleUpperCase.bind(this);
        this.handleBank = this.handleBank.bind(this);
        this.handleRegion = this.handleRegion.bind(this);
        this.handleProvince = this.handleProvince.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);

    }

    async componentDidMount() {
        fetch('/division/all')
            .then(response => response.json())
            .then(data => this.setState({ RegionList: data }));

        fetch('/bank/getBy')
            .then(response => response.json())
            .then(data => this.setState({ BankList: data }));

    }





    handleUpperCase(event) {
        event.target.value = event.target.value.toUpperCase();
    }

    handleClearForm(event) {
        this.form && this.form.reset();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let gldeptin = { ...this.state.gldeptin };
        gldeptin[name] = value;
        this.setState({ gldeptin });
    }

    handleBank(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let gldeptin = { ...this.state.gldeptin };
        gldeptin[name] = value;
        this.setState({ gldeptin }, () => this.afterBankSetStateFinished())

    }
    afterBankSetStateFinished() {
        console.log(this.state.gldeptin.bankCode)
        fetch(`/branch/findByIdBankCodeOrderByBranchName?bankCode=${this.state.gldeptin.bankCode}`)
            .then(response => response.json())
            .then(data => this.setState({ BranchList: data }))
    }

    handleRegion(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let gldeptin = { ...this.state.gldeptin };
        gldeptin[name] = value;
        this.setState({ gldeptin }, () => this.afterRegionSetStateFinished())
    }
    afterRegionSetStateFinished() {
        console.log(this.state.gldeptin.deptRegion)
        fetch(`/divisionbranch/getByIdDivisionId/${this.state.gldeptin.deptRegion}`)
            .then(response => response.json())
            .then(data => this.setState({ ProvinceList: data }))
    }

    handleProvince(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let gldeptin = { ...this.state.gldeptin };
        gldeptin[name] = value;
        this.setState({ gldeptin }, () => this.afterProvinceSetStateFinished())
    }
    afterProvinceSetStateFinished() {
        console.log(this.state.gldeptin.deptProvince)
        fetch(`/unit/getUnitByIdBranchId/${this.state.gldeptin.deptProvince}`)
            .then(response => response.json())
            .then(data => this.setState({ AreaList: data }))
    }
    


    async handleSubmit(event) {
        event.preventDefault();
        const { gldeptin } = this.state;
        gldeptin.addUser = "Saman"

        await fetch('/gldeptin/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gldeptin)

        }).then(response => {
            console.log(response.status)
            if (response.status === 201) {
                Swal.fire({
                    type: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.props.history.push('/gldeptin/view');
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Try Again'
                })
                this.props.history.push('/');
            }
        }
            // ,error=>{
            //     console.log(error.response.status)
            //     if(error.response.status===400)
            //     alert("Try Again!")
            // }
        )


    }

    render() {

        const { gldeptin } = this.state;

        const defaultValues = {
            deptId: sessionStorage.getItem('costCenterNo'),
            
          };

          console.log(this.ProvinceList)

       return <div>
           <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/home">   Cost Center Details</a> |
        <a className="path2" href="/gldeptin/add">   Add CostCenter Details</a> 
        <br/><br/>
        </div>
            {/* <Jumbotron className='jumbotron'> */}
                {/* <Container className='container_gldeptin'> */}
                    <Card className='card_gldeptin'>
                        <CardBody>
                            <CardTitle className="text-center" >Add Cost Center Details</CardTitle>
                            <CardText>
                                <AvForm onValidSubmit={this.handleSubmit} model={defaultValues} ref={c => (this.form = c)} >

                                    <Row>
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="deptId" inline="true" >Cost Center ID</Label></Col>
                                                    <Col sm={8}><AvInput disabled type="text" name="deptId" id="deptId" initialValue="123" value={gldeptin.deptId || ''} onChange={this.handleChange}
                                                        validate={{
                                                            required: { value: true }
                                                        }} autoComplete="deptId" inline="true" bsSize="sm" />
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>

                                        <Col sm="6" >

                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="deptFullName" inline="true" >Cost Center Full Name</Label></Col>
                                                    <Col sm={8}><AvInput type="text" name="deptFullName" id="deptFullName" value={gldeptin.deptFullName || ''} onChange={this.handleChange} onInput={this.handleUpperCase}
                                                        validate={{
                                                            required: { value: true }
                                                        }} autoComplete="deptFullName" inline="true" bsSize="sm" />
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>

                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="bulkSupplierName" inline="true" >Bulk Supplier Name</Label></Col>
                                                    <Col sm={8}><AvInput type="text" name="bulkSupplierName" id="bulkSupplierName" value={gldeptin.bulkSupplierName || ''} onInput={this.handleUpperCase} onChange={this.handleChange}
                                                        validate={{
                                                            required: { value: true, errorMessage: 'Please enter a name' },
                                                        }} autoComplete="bulkSupplierName" inline="true" bsSize="sm" />
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="deptAdd" inline="true" >Cost Center Address</Label></Col>
                                                    <Col sm={8}><AvInput type="textarea" name="deptAdd" id="deptAdd" value={gldeptin.deptAdd || ''} onChange={this.handleChange} onInput={this.handleUpperCase}
                                                        validate={{
                                                            required: { value: true, errorMessage: 'Please enter a name' },
                                                        }} autoComplete="deptAdd" inline="true" bsSize="sm" />
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>

                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="bulkSupplierAdd" inline="true" >Bulk Supplier Address</Label></Col>
                                                    <Col sm={8}><AvInput type="textarea" name="bulkSupplierAdd" id="bulkSupplierAdd" value={gldeptin.bulkSupplierAdd || ''} onChange={this.handleChange} onInput={this.handleUpperCase}
                                                        validate={{
                                                            required: { value: true },
                                                        }} autoComplete="bulkSupplierAdd" inline="true" bsSize="sm" />
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>
                                    </Row>

                                    <Row className="height_gldeptin">
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="​deptTel" inline="true" >Cost Center Telephone</Label></Col>
                                                    <Col sm={8} >
                                                        <AvField type="number" name="deptTel" id="deptTel" placeholder="0xxxxxxxxx" value={gldeptin.deptTel || ''} onChange={this.handleChange}
                                                            validate={{
                                                                required: { value: true, errorMessage: 'This field is required' },
                                                                pattern: { value: '^([0]{1}[0-9]{9})$', errorMessage: 'Please enter a valid phone number' }
                                                            }} autoComplete="deptTel" inline="true" bsSize="sm" >
                                                        </AvField>

                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>

                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="bulkSupplierTel" inline="true" >Bulk Supplier Telephone</Label></Col>
                                                    <Col sm={8} className="height_gldeptin">
                                                        <AvField type="number" name="bulkSupplierTel" id="bulkSupplierTel" value={gldeptin.bulkSupplierTel || ''} onChange={this.handleChange}
                                                            validate={{
                                                                required: { value: true, errorMessage: 'This field is required' },
                                                                pattern: { value: '^([0]{1}[0-9]{9})$', errorMessage: 'Please enter a valid phone number' }
                                                            }} autoComplete="bulkSupplierTel" inline="true" bsSize="sm" />
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>
                                    </Row>

                                    <Row className="height_gldeptin">
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="emailNo" inline="true" >Cost center Email</Label></Col>
                                                    <Col sm={8} className="height_gldeptin"><AvField type="text" name="emailNo" id="emailNo" placeholder="example@gmail.com" value={gldeptin.emailNo || ''} onChange={this.handleChange}
                                                        validate={{
                                                            required: { value: true, errorMessage: 'This field is required' },
                                                            email: { value: true, errorMessage: 'Please enter a valid email' }
                                                        }} autoComplete="emailNo" inline="true" bsSize="sm" />
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>

                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="bankCode" inline="true" >Bank Code</Label></Col>
                                                    <Col sm={8}>
                                                        <AvInput type="select" name="bankCode" id="bankCode" value={gldeptin.bankCode} onChange={this.handleBank} validate={{ required: { value: true } }} autoComplete="bankCode" bsSize="sm">
                                                            <option value="" disabled >Select Bank Code...</option>
                                                            {this.state.BankList.map((bank, key) =>
                                                                <option value={bank.bankCode}>{bank.bankName}</option>)}
                                                        </AvInput>
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="​deptRegion" inline="true" >Cost Center Division</Label></Col>
                                                    <Col sm={8}>
                                                        <AvInput type="select" name="deptRegion" id="​deptRegion" value={gldeptin.deptRegion} onChange={this.handleRegion} validate={{ required: { value: true } }} autoComplete="deptRegion" bsSize="sm">
                                                            <option value="" disabled >Select Division...</option>
                                                            {/* <option value="R1">R1</option>
                                                            <option value="R2">R2</option>
                                                            <option value="R3">R3</option>
                                                            <option value="R4">R4</option> */}
                                                            {this.state.RegionList.map((region, key) =>
                                                                <option value={region.divisionId}>{region.divisionName}</option>)}
                                                        </AvInput>
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>

                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="branchCode" inline="true" >Branch Code</Label></Col>
                                                    <Col sm={8}>

                                                        <AvInput type="select" name="branchCode" id="​branchCode" value={gldeptin.branchCode} onChange={this.handleChange} validate={{ required: { value: true } }} autoComplete="branchCode" bsSize="sm">
                                                            <option value="" disabled >Select Type...</option>
                                                            {this.state.BranchList.map((branch, key) =>
                                                                <option value={branch.id.branchCode}>{branch.branchName}</option>)}
                                                        </AvInput>
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="​deptProvince" inline="true" >Cost Center Province</Label></Col>
                                                    <Col sm={8}>
                                                        <AvInput type="select" name="deptProvince" id="deptProvince" value={gldeptin.deptProvince} onChange={this.handleProvince} validate={{ required: { value: true } }} autoComplete="deptProvince " bsSize="sm">
                                                            <option value="" disabled >Select province...</option>
                                                            {/* <option value="Colombo City">Colombo City</option>
                                                            <option value="Central">Central</option>
                                                            <option value="Eastern">Eastern</option>
                                                            <option value="Northern">Northern</option>
                                                            <option value="North Central">North Central</option>
                                                            <option value="North Western">North Western</option>
                                                            <option value="Sabaragamuwa">Sabaragamuwa</option>
                                                            <option value="Southern">Southern</option>
                                                            <option value="Uva">Uva</option>
                                                            <option value="Western Prov North">Western Prov North</option>
                                                            <option value="Western Prov South 1">Western Prov South 1</option>
                                                            <option value="Western prov South 2">Western prov South 2ooo</option> */}
                                                            {this.state.ProvinceList.map((province, key) =>
                                                                <option value={province.id.branchId}>{province.branchName}</option>)}
                                                        </AvInput>
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>

                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="posA" inline="true" >posA</Label></Col>
                                                    <Col sm={8}><AvInput type="number" name="posA" id="posA" value={gldeptin.posA || ''} onChange={this.handleChange}
                                                        validate={{
                                                            required: { value: true },
                                                            maxLength: { value: 15 }
                                                        }} autoComplete="posA" inline="true" bsSize="sm" />
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="deptArea" inline="true" >Cost Center Area</Label></Col>
                                                    <Col sm={8}>
                                                        <AvInput type="select" name="deptArea" id="deptArea" value={gldeptin.deptArea} onChange={this.handleChange} onInput={this.handleUpperCase} validate={{required: { value: true } }} autoComplete="deptArea" inline="true" bsSize="sm" >
                                                            <option value="" disabled >Select Area...</option>
                                                            {this.state.AreaList.map((area, key) =>
                                                            <option value={area.id.unitId}>{area.unitName}</option>)}
                                                        </AvInput>
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>

                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="posCenter" inline="true" >pos Center</Label></Col>
                                                    <Col sm={8}><AvInput type="number" name="posCenter" id="posCenter" value={gldeptin.posCenter || ''} onChange={this.handleChange}
                                                        validate={{
                                                            required: { value: true },
                                                            maxLength: { value: 15 }
                                                        }} autoComplete="posCenter" inline="true" bsSize="sm" />
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="deptType" inline="true" >Cost Center Type</Label></Col>
                                                    <Col sm={8}>
                                                        <AvInput type="select" name="deptType" id="deptType" value={gldeptin.deptType} onChange={this.handleChange} validate={{ required: { value: true } }} autoComplete="deptType" bsSize="sm">
                                                            <option value="" disabled >Select Type...</option>
                                                            <option value="DEPOT">DEPOT</option>
                                                            <option value="AREA">AREA</option>
                                                            <option value="REGIONAL">REGIONAL</option>
                                                            <option value="PROVINCIAL">PROVINCIAL</option>
                                                        </AvInput>
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>

                                        <Col sm="6" >
                                            <FormGroup row >
                                                <Col sm={4}><Label className="font_gldeptin" for="isPiv1NeededDefault" inline="true" >Is Piv 1 Needed Default</Label></Col>
                                                <Col sm={8}>
                                                    <div>
                                                        {/* <AvRadioGroup  name="isPiv1NeededDefault" inline required errorMessage="This feild is required" > */}
                                                        {/* <AvRadio label="yes" value="yes" checked={gldeptin.isPiv1NeededDefault === 'yes'? true:false}  onChange={this.handleChange} autoComplete="isPiv1NeededDefault"/> */}
                                                        {/* <AvRadio label="no" value="no" checked={gldeptin.isPiv1NeededDefault === 'no'? true:false}  onChange={this.handleChange} autoComplete="isPiv1NeededDefault"/> */}
                                                        <CustomInput type="radio" id="isPiv1NeededDefault1" name="isPiv1NeededDefault" label="Yes" value="Y" checked={gldeptin.isPiv1NeededDefault === 'Y' ? true : false} onChange={this.handleChange} autoComplete="isPiv1NeededDefault" inline="true" className="font" />
                                                        <CustomInput type="radio" id="isPiv1NeededDefault2" name="isPiv1NeededDefault" label="No" value="N" checked={gldeptin.isPiv1NeededDefault === 'N' ? true : false} onChange={this.handleChange} autoComplete="isPiv1NeededDefault" inline="true" className="font" />
                                                        {/* </AvRadioGroup> */}
                                                    </div>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="headPersonRole" inline="true" >Head Person Role</Label></Col>
                                                    <Col sm={8}>
                                                        <AvInput type="select" name="headPersonRole" id="headPersonRole" value={gldeptin.headPersonRole} onChange={this.handleChange} validate={{ required: { value: true } }} autoComplete="headPersonRole" bsSize="sm">
                                                            <option value="" disabled >Select Type...</option>
                                                            <option value="ES">ES</option>
                                                            <option value="EA">EA</option>
                                                            <option value="EE">EE</option>
                                                            <option value="CE">CE</option>
                                                            <option value="PE">PE</option>
                                                            <option value="DGM">DGM</option>
                                                            <option value="AGM">AGM</option>
                                                        </AvInput>
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="deptCode" inline="true" >Department Code</Label></Col>
                                                    <Col sm={8}><AvInput type="text" name="deptCode" id="deptCode" value={gldeptin.deptCode || ''} onChange={this.handleChange} onInput={this.handleUpperCase}
                                                        validate={{
                                                            minLength: { value: 1 },
                                                            maxLength: { value: 1 }
                                                        }} autoComplete="deptCode" inline="true" bsSize="sm" />
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>
                                    </Row>

                                    <Row >
                                        <Col sm="6" >
                                            <AvGroup>
                                                <FormGroup row >
                                                    <Col sm={4}><Label for="headPersonNo" inline="true" >Head Person Telephone</Label></Col>
                                                    <Col sm={8}><AvField type="number" name="headPersonNo" id="headPersonNo" value={gldeptin.headPersonNo || ''} onChange={this.handleChange}
                                                        validate={{
                                                            required: { value: true, errorMessage: 'This field is required' },
                                                            pattern: { value: '^([0]{1}[0-9]{9})$', errorMessage: 'Please enter a valid phone number' }
                                                        }} autoComplete="headPersonNo" inline="true" bsSize="sm" />
                                                        <AvFeedback>This Feild is required</AvFeedback>
                                                    </Col>
                                                </FormGroup>
                                            </AvGroup>
                                        </Col>

                                        <Col sm="6" >
                                            <Col sm={{ offset: 5 }} >
                                                <Button className="button_gldeptin" color="primary"  >Save</Button>{' '}
                                                <Button className="button_gldeptin" color="primary" ><Link className="button_font_gldeptin" to="/">Exit</Link></Button>{' '}
                                                <Button className="button_gldeptin" color="primary" onClick={this.handleClearForm} >Clear</Button>
                                            </Col>
                                        </Col>
                                    </Row>

                                </AvForm>

                            </CardText>
                        </CardBody>
                    </Card>
                {/* </Container> */}
            {/* </Jumbotron> */}
           

        </div>


    }
}

export default withRouter(GldeptinAdd);