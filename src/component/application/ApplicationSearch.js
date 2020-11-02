import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Row, Col, Container } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Search Application'
class ApplicationSearch extends Component {

    initialSearch = {
        id: {
            applicationId: sessionStorage.getItem('costCenterNo')+'/ANC/'+ (new Date().getFullYear().toString().substr(-2)+'/'),
            deptId: ''
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            // id: {
            //     applicationId: '',
            //     deptId: ''
            // },
            search : this.initialSearch,
            AddButtonDisabled: true,
            searched: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    handleChange(event) {
        if (this.state.searched) {
            this.setState({ AddButtonDisabled: true });
        }
        const target = event.target;
        const value = target.value;
        const name = target.name;
        // let id = { ...this.state.id }
        // id[name] = value
        // console.log(id)
        // this.setState({ id });
        let search = { ...this.state.search }
         search.id[name] = value
         console.log(search)
         this.setState({ search });
    }



    // handleChange(event) {
    //   this.setState({idNo:event.target.value});
    // }

    //   async handleSubmit(event){
    //     event.preventDefault();
    //     //this.setState({AddButtonDisabled:true});
    //     const person = await (await fetch(`/applicant/existsByIdNo?idNo=${this.state.idNo}`)).json();
    //     if(!person){
    //       //alert("contractor exist");
    //       Swal.fire(
    //         'Error!',
    //         "applicant doesn't exist",
    //         'error'
    //       )
    //       this.setState({AddButtonDisabled:false});
    //       this.setState({searched:true});

    //     }else{
    //     this.props.history.push("/applicant/result/" + this.state.idNo);
    //     }
    //  }

    async handleSubmit(event) {
        event.preventDefault();
        //this.setState({AddButtonDisabled:true});
        const person = await (await fetch(`/application/existsByIdApplicationId/${this.state.search.id.deptId}/${this.state.search.id.applicationId}`)).json();
        if (!person) {

            const message = await Swal.fire({
                title: 'Warning',
                text: "Application doesn't exist",
                type: 'warning',
                //showCancelButton: true,
                //cancelButtonColor: '#3085d6',
                //cancelButtonText: 'OK',
                //reverseButtons: true
            })
            if (message.value) {
                
            }
            this.setState({ AddButtonDisabled: false });
            this.setState({ searched: true });

        } else {
            console.log(this.state.id)
            const encodedApplicationId = encodeURIComponent(this.state.search.id.applicationId);
            this.props.history.push("/application/view/" + encodedApplicationId);
            console.log('nnnn')
        }
    }



    render() {
        // console.log(this.state.id)
        const {search} = this.state;

        return (
            <div>
                 <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home"> Application  </a> |
        <a className="path2" href="/applicant/add">Search Application</a>
       
        </div>
                  <Helmet>
            <title>{ TITLE }</title>
                     </Helmet>
                <Container>
                    <Button style={{ float: "right" }} color="primary" tag={Link} to="/">Back</Button>
                </Container>
                <br></br>
                <br></br>

                <Container>
                    <h2 style={{ textAlign: "center" }}>Search Application</h2>
                    <br></br>
                    <AvForm onValidSubmit={this.handleSubmit} >
                        <Row>
                            <Col sm={3} ></Col>
                            <Col sm={6} >
                                <AvGroup className="height_application">
                                    <FormGroup row >
                                        <Col sm={4}><Label for="applicationId" inline="true" >Temp ID</Label></Col>
                                        <Col sm={8}><AvField type="text" name="applicationId" id="applicationId" value={search.id.applicationId} onChange={this.handleChange}
                                            validate={{
                                                required: { value: true, errorMessage: 'This field is required' },
                                            pattern: { value: '^([0-9]{3}(.)[0-9]{2}(/)(ANC)(/)[0-9]{2}(/)[0-9]{4})$', errorMessage: 'please enter valid Id number' }
                                            }} autoComplete="applicationId" inline="true" bsSize="sm" />
                                        </Col>
                                    </FormGroup>
                                </AvGroup>
                            </Col>
                            <Col sm={3} ></Col>
                        </Row>

                        <Row>
                            <Col sm={3} ></Col>
                            <Col sm={6}>
                                <FormGroup row>
                                    <Col>
                                      <Button style={{ float: "right" }} type="submit" color="primary" >Search</Button>{' '}
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col sm={3} ></Col>
                        </Row>
                        <Row>
                            <Col sm={3} ></Col>
                            <Col sm={6}>
                                <FormGroup row>
                                    <Col>
                                        {/* <Button   type="submit" color="success" >Add Applicaton</Button>{' '} */}
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col sm={3} ></Col>
                        </Row>
                    </AvForm>
                </Container>
            </div>
        )




    }
}

export default ApplicationSearch;