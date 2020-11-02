import React from 'react';
import { withRouter } from 'react-router-dom';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField } from 'availity-reactstrap-validation';
import { Button, FormGroup, Label, Col, Row, CustomInput, Alert, Jumbotron, UncontrolledTooltip } from 'reactstrap';
import './css/ApplicationAdd.css'
import * as FontAwesome from 'react-icons/lib/fa'
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { animateScroll as scroll, } from 'react-scroll'
import Correction from './css/correct-symbol.png'
import { Helmet } from 'react-helmet'
const TITLE = 'Add Application'
class ApplicationAdd extends React.Component {

    months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    date = new Date().getFullYear() + '-' + this.months[new Date().getMonth()] + '-' + new Date().getDate();

    initialApplication = {
        id: {
            applicationId: '',
            deptId: sessionStorage.getItem('costCenterNo')
        },
        addDate: '',
        addTime: '',
        addUser: '',
        allocatedBy: '',
        allocatedDate: '',
        allocatedTime: '',
        allocatedTo: '',
        applicationNo: '',
        applicationSubType: 'PM',
        applicationType: 'NC',
        confirmedBy: sessionStorage.getItem('userName'),
        confirmedDate: '',
        confirmedTime: '',
        contactAddress: '',
        contactEmail: '',
        contactIdNo: '',
        contactMobile: '',
        contactName: '',
        contactTelephone: '',
        description: '',
        disconnectedWithin: '',
        duration: '',
        durationInDays: '',
        durationType: '',
        finalizedWithin: '',
        fromDate: '',
        idNo: '',
        isLoanApp: 'N',
        isPiv1Needed: 'N',
        isVisitngNeeded: '',
        linkedWith: '',
        preparedBy: sessionStorage.getItem('userName'),
        samurdhiMember: 'N',
        status: '',
        submitDate: '',
        toDate: '',
        updDate: '',
        updTime: '',
        updUser: '',
    }

    initialWiringLandDetails = {
        id: {
            applicationId: '',
            deptId: sessionStorage.getItem('costCenterNo')
        },
        assessmentNo: '',
        connectionType: '30',
        customerCategory: 'PRIV',
        customerType: 'DOME',
        existingAccNo: '',
        isGovernmentPlace: 'N',
        metalCrusher: '1',
        motorTotal: '1',
        neighboursAccNo: '',
        noOfBulbs: '',
        noOfDmgMeters: '',
        noOfFans: '',
        noOfPlugs15a: '',
        noOfPlugs5a: '',
        occupyOwnerCertified: 'Y',
        ownership: 'Occupy',
        phase: '1',
        sawMills: '1',
        serviceCity: '',
        serviceDistrict: '',
        servicePostalCode: '',
        serviceStreetAddress: '',
        serviceSuburb: '',
        tariffCatCode: 'DP',
        tariffCode: '11',
        weldingPlant: '1',
        zoneId: '',
    }

    initialApplicant = {
        idType: 'NIC',
        idNo: '',
        firstName: '',
        lastName: '',
        streetAddress: '',
        telephoneNo: '',
        suburb: '',
        mobileNo: '',
        city: '',
        email: '',
        postalCode: '',
        preferredLanguage: 'English',
        cebEmployee: 'N',
    }

    initialSpapplon = {

        id: {
            applicationNo: '',
            deptId: sessionStorage.getItem('costCenterNo')
        },
        addDate: '',
        addTime: '',
        addUser: '',
        approvalDs: '',
        approvalSbm: '',
        approvalSdo: '',
        installment: '',
        interestRate: '',
        isLoan4Share: '',
        loanAmount: '',
        loanReference: '',
        memberOfSamurdhi: '',
        noOfShares: '',
        samurdhiId: '',
        samurdhiSharePrice: '',
        totalInterest: '',
        wiringComponent: '',
        years: '',
        updDate: '',
        updTime: '',
        updUser: ''
    }

   

    
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {
            isLoading: true,
            currentStep: 1,
            previousStep: 1,
            isActive: [],
            isCompleted: [],
            buttonDisabled: true,
            validate: false,
            preStep: false,
            connectionType60: 'hidden',
            application: this.initialApplication,
            wiringLandDetail: this.initialWiringLandDetails,
            applicant: this.initialApplicant,
            spapplon: this.initialSpapplon,
            title: ["Personal Details", "Application Details", "Contact Personal Details", "Service Location Details", "Details of wiring", "Finish"],
            csc: {},
            tariffCategoryList: [],
            tariffList: [],
            autoApplicationId: '',
            //createdApplication: this.initialApplication,


        }
        this.handleChangeApplication = this.handleChangeApplication.bind(this)
        this.handleChangeWiringLandDetails = this.handleChangeWiringLandDetails.bind(this)
        this.handleChangeApplicant = this.handleChangeApplicant.bind(this)
        //this.handleChange = this.handleChange.bind(this)
        this.handleWiringLandDetailsAddress = this.handleWiringLandDetailsAddress.bind(this)
        this.handletChangeTariffCatCode = this.handletChangeTariffCatCode.bind(this)
        this.handleApplicationIdAnaDeptId = this.handleApplicationIdAnaDeptId.bind(this)
        this.handleChangeApplicationSubType = this.handleChangeApplicationSubType.bind(this)
        this._next = this._next.bind(this)
        this.setApplicationIdNo = this.setApplicationIdNo.bind(this)
        this._next_finish = this._next_finish.bind(this)




    }

    async componentDidMount() {

        // Events.scrollEvent.register('begin', function () {
        //     console.log("begin", arguments);
        //   });

        //  Events.scrollEvent.register('end', function () {
        //     console.log("end", arguments);
        //   });

        // await (await fetch(`/application/setApplicationAutoId?deptId=${sessionStorage.getItem('costCenterNo')}&jobType=${sessionStorage.getItem('jobType')}`)
        //     .then(response => response.json())
        //     .then(data => this.setState({ autoApplicationId: data }, () => this.handleApplicationIdAnaDeptId()))
        // )
        await (await fetch(`/application/setApplicationAutoId?deptId=${sessionStorage.getItem('costCenterNo')}`)
            .then(response => response.json())
            .then(data => this.setState({ autoApplicationId: data }, () => this.handleApplicationIdAnaDeptId()))
        )

        // await (await fetch(`/applicant/findByIdNo?idNo=433454345v`)
        //     .then(response => response.json())
        //     .then(data => this.setState({ applicant: data }, () => this.setApplicationIdNo()))
        // )

        await (await fetch(`/applicant/findByIdNo?idNo=${this.props.match.params.idNo}`)
        .then(response => response.json())
        .then(data => this.setState({ applicant: data }, () => this.setApplicationIdNo()))
        )

        await (await fetch(`/gldeptin/getCostCenterName?deptId=${sessionStorage.getItem('costCenterNo')}`)//edited
            .then(response => response.json())
            .then(data => this.setState({ csc: data }))
            .catch((error) => {
                this.setState({ csc: ''})
            })
        )

        await (await fetch(`/tariffCategory/findTariffCatCodeOrderByTariffCatName`)
            .then(response => response.json())
            .then(data => data === null ? this.setState({ tariffCategoryList: 'No data' }) : this.setState({ tariffCategoryList: data }))
        )

        await (await fetch(`/tariff/findTariffCode?tariffCatCode=${this.state.wiringLandDetail.tariffCatCode}`)
        .then(response => response.json())
        .then(data => this.setState({ tariffList: data })))


        let isActive = this.state.isActive;
        isActive = [];
        isActive[0] = 'active'//Active first circle in multisteps progress bar
        this.setState({ isActive,isLoading: false });



    }


    // scrollTo() {
    //     scroller.scrollTo('scroll-to-element', {
    //       duration: 800,
    //       delay: 0,
    //       smooth: 'easeInOutQuart'
    //     })
    //   }
    //   scrollToWithContainer() {

    //     let goToContainer = new Promise((resolve, reject) => {

    //      Events.scrollEvent.register('end', () => {
    //         resolve();
    //         Events.scrollEvent.remove('end');
    //       });

    //      scroller.scrollTo('scroll-container', {
    //         duration: 800,
    //         delay: 0,
    //         smooth: 'easeInOutQuart'
    //       });

    //     });

    //     goToContainer.then(() =>
    //     scroller.scrollTo('scroll-container-second-element', {
    //         duration: 800,
    //         delay: 0,
    //         smooth: 'easeInOutQuart',
    //         containerId: 'scroll-container'
    //       }));
    //   }

    // componentWillUnmount() {
    // Events.scrollEvent.remove('begin');
    //     Events.scrollEvent.remove('end');
    // }



    setApplicationIdNo = () => {

        const idNo = 'idNo';

        let application = this.state.application;
        application[idNo] = this.state.applicant.idNo;
        this.setState({ application });

    }



    handleApplicationIdAnaDeptId() {

        const applicationId = 'applicationId';
        const deptId = 'deptId';
        const applicationNo = 'applicationNo';

        let application = this.state.application;
        //console.log(this.state.autoApplicationId.applicationId)
        application.id[applicationId] = this.state.autoApplicationId.applicationId;
        application.id[deptId] = this.state.autoApplicationId.deptId;
        this.setState({ application });
        let wiringLandDetail = this.state.wiringLandDetail;
        wiringLandDetail.id[applicationId] = this.state.autoApplicationId.applicationId;
        wiringLandDetail.id[deptId] = this.state.autoApplicationId.deptId;
        this.setState({ wiringLandDetail });
        let spapplon = this.state.spapplon;
        spapplon.id[applicationNo] = this.state.autoApplicationId.applicationId;
        spapplon.id[deptId] = this.state.autoApplicationId.deptId;
        this.setState({ spapplon });

    }

    handleWiringLandDetailsAddress = event => {
        event.preventDefault()

        const serviceStreetAddress = 'serviceStreetAddress';
        const serviceCity = 'serviceCity';
        const servicePostalCode = 'servicePostalCode';
        const serviceSuburb = 'serviceSuburb';

        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let preStep = this.state.preStep
        let wiringLandDetail = this.state.wiringLandDetail;
        wiringLandDetail[serviceStreetAddress] = this.state.applicant.streetAddress;
        wiringLandDetail[serviceCity] = this.state.applicant.city;
        wiringLandDetail[servicePostalCode] = this.state.applicant.postalCode;
        wiringLandDetail[serviceSuburb] = this.state.applicant.suburb;
        this.setState({ wiringLandDetail })
        if (preStep === true) {
            for (let i = currentStep - 1; i < 5; i++) {
                isCompleted[i] = ' '
            }
        }
    }


    // handleChange = event => {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //     //const applicationNo = 'applicationNo';
    //     let application = { ...this.state.application };
    //     application.id[name] = value;
    //     this.setState({ application });
    //     let wiringLandDetail = { ...this.state.wiringLandDetail };
    //     wiringLandDetail.id[name] = value;
    //     this.setState({ wiringLandDetail });
    //     let spapplon = { ...this.state.spapplon };
    //     // spapplon.id[applicationNo] = value;
    //     spapplon.id[name] = value;
    //     this.setState({ spapplon });

    // }

    handleChangeWiringLandDetails = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let preStep = this.state.preStep
        let wiringLandDetail = { ...this.state.wiringLandDetail };
        wiringLandDetail[name] = value;
        //wiringLandDetail.id[name] = value;
        this.setState({ wiringLandDetail });
        if (preStep === true) {
            for (let i = currentStep - 1; i < 5; i++) {
                isCompleted[i] = ' '
            }
        }
    }

    handletChangeTariffCatCode(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let preStep = this.state.preStep
        let wiringLandDetail = { ...this.state.wiringLandDetail };
        wiringLandDetail[name] = value;
        if (preStep === true) {
            for (let i = currentStep - 1; i < 5; i++) {
                isCompleted[i] = ' '
            }
        }
        this.setState({ wiringLandDetail }, () => this.afterTariffCatCodeSetStateFinished())

    }
    afterTariffCatCodeSetStateFinished() {
        console.log(this.state.wiringLandDetail.tariffCatCode)
        fetch(`/tariff/findTariffCode?tariffCatCode=${this.state.wiringLandDetail.tariffCatCode}`)
            .then(response => response.json())
            .then(data => this.setState({ tariffList: data }))
    }

    handleChangeApplicationSubType = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let preStep = this.state.preStep
        let application = { ...this.state.application }
        application[name] = value;
        console.log(isCompleted)
        if (preStep === true) {
            for (let i = currentStep - 1; i < 5; i++) {
                isCompleted[i] = ' '
            }
        }
        console.log(isCompleted)
        this.setState({ application }, () => this.afterApplicationSubTypeSetStateFinished());


    }
    async afterApplicationSubTypeSetStateFinished() {

        let wiringLandDetail = this.state.wiringLandDetail;
        let buttonDisabled
        let validate
        let customerType = 'customerType'
        let tariffCatCode = 'tariffCatCode'
        let tariffCode = 'tariffCode'
        let customerCategory = 'customerCategory'
        console.log(wiringLandDetail)
        switch (this.state.application.applicationSubType) {
            case 'C1':
                buttonDisabled = false;
                validate = true;
                if (wiringLandDetail.tariffCatCode === 'AG' || wiringLandDetail.tariffCatCode === 'DP') {
                    wiringLandDetail[customerType] = 'DOME'
                    wiringLandDetail[tariffCatCode] = 'DP'
                    wiringLandDetail[tariffCode] = '11'
                    wiringLandDetail[customerCategory] = 'PRIV'
                } else {
                    wiringLandDetail[customerType] = wiringLandDetail.customerType
                    wiringLandDetail[tariffCatCode] = wiringLandDetail.tariffCatCode
                    wiringLandDetail[tariffCode] = wiringLandDetail.tariffCode
                    wiringLandDetail[customerCategory] = wiringLandDetail.customerCategory
                }
                break;
            case 'C2':
                buttonDisabled = false;
                validate = true;
                if (wiringLandDetail.tariffCatCode === 'AG' || wiringLandDetail.tariffCatCode === 'DP') {
                    wiringLandDetail[customerType] = 'DOME'
                    wiringLandDetail[tariffCatCode] = 'DP'
                    wiringLandDetail[tariffCode] = '11'
                    wiringLandDetail[customerCategory] = 'PRIV'
                } else {
                    wiringLandDetail[customerType] = wiringLandDetail.customerType
                    wiringLandDetail[tariffCatCode] = wiringLandDetail.tariffCatCode
                    wiringLandDetail[tariffCode] = wiringLandDetail.tariffCode
                    wiringLandDetail[customerCategory] = wiringLandDetail.customerCategory
                }
                break;
            case 'C3':
                buttonDisabled = false
                validate = true
                if (wiringLandDetail.tariffCatCode === 'AG' || wiringLandDetail.tariffCatCode === 'DP') {
                    wiringLandDetail[customerType] = 'DOME'
                    wiringLandDetail[tariffCatCode] = 'DP'
                    wiringLandDetail[tariffCode] = '11'
                    wiringLandDetail[customerCategory] = 'PRIV'
                } else {
                    wiringLandDetail[customerType] = wiringLandDetail.customerType
                    wiringLandDetail[tariffCatCode] = wiringLandDetail.tariffCatCode
                    wiringLandDetail[tariffCode] = wiringLandDetail.tariffCode
                    wiringLandDetail[customerCategory] = wiringLandDetail.customerCategory
                }
                break;
            case 'TA':
                buttonDisabled = true;
                validate = false
                wiringLandDetail[customerType] = 'AGRI';
                wiringLandDetail[tariffCatCode] = 'AG'
                wiringLandDetail[tariffCode] = '7.1'
                wiringLandDetail[customerCategory] = 'PRIV'
                break;
            case 'TU':
                buttonDisabled = true;
                validate = false
                wiringLandDetail[customerType] = 'DOME';
                wiringLandDetail[tariffCatCode] = 'DP'
                wiringLandDetail[tariffCode] = '13'
                wiringLandDetail[customerCategory] = 'PRIV'
                break;
            default:
                console.log(wiringLandDetail.tariffCatCode)
                buttonDisabled = true;
                validate = false
                if (wiringLandDetail.tariffCatCode === 'AG' || wiringLandDetail.tariffCatCode === 'DP') {
                    wiringLandDetail[customerType] = 'DOME'
                    wiringLandDetail[tariffCatCode] = 'DP'
                    wiringLandDetail[tariffCode] = '11'
                    wiringLandDetail[customerCategory] = 'PRIV'
                } else {
                    wiringLandDetail[customerType] = wiringLandDetail.customerType
                    wiringLandDetail[tariffCatCode] = wiringLandDetail.tariffCatCode
                    wiringLandDetail[tariffCode] = wiringLandDetail.tariffCode
                    wiringLandDetail[customerCategory] = wiringLandDetail.customerCategory
                }

        }
        console.log(wiringLandDetail)
        this.setState({ buttonDisabled: buttonDisabled, wiringLandDetail: wiringLandDetail, validate: validate }, () => this.afterSetState())

    }
    async afterSetState() {

        await (await fetch(`/tariff/findTariffCode?tariffCatCode=${this.state.wiringLandDetail.tariffCatCode}`)
            .then(response => response.json())
            .then(data => this.setState({ tariffList: data })))
    }

    handleChangeCustomerType = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let preStep = this.state.preStep
        let wiringLandDetail = { ...this.state.wiringLandDetail }
        wiringLandDetail[name] = value;
        //console.log(isCompleted)
        if (preStep === true) {
            for (let i = currentStep - 1; i < 5; i++) {
                isCompleted[i] = ' '
            }
        }
        //console.log(isCompleted)
        this.setState({ wiringLandDetail }, () => this.afterCustomerTypeSetStateFinished());


    }
    
    async afterCustomerTypeSetStateFinished() {

        let wiringLandDetail = this.state.wiringLandDetail;
        let tariffCatCode = 'tariffCatCode'
        let tariffCode = 'tariffCode'
        console.log(this.state.wiringLandDetail.customerType)
        switch (this.state.wiringLandDetail.customerType) {
            case 'DOME':
                wiringLandDetail[tariffCatCode] = 'DP'
                wiringLandDetail[tariffCode] = '11'
                break;
            case 'CONS':
                wiringLandDetail[tariffCatCode] = 'GP'
                wiringLandDetail[tariffCode] = '31'
                break;
            case 'SHOP':
                wiringLandDetail[tariffCatCode] = 'GP'
                wiringLandDetail[tariffCode] = '31'
                break;
            case 'SCHL':
                wiringLandDetail[tariffCatCode] = 'GP'
                wiringLandDetail[tariffCode] = '31'
                break;
            case 'INDT':
                wiringLandDetail[tariffCatCode] = 'IP'
                wiringLandDetail[tariffCode] = '21'
                break;
            case 'HOTE':
                wiringLandDetail[tariffCatCode] = 'GP'
                wiringLandDetail[tariffCode] = '31'
                break;
            case 'GARM':
                wiringLandDetail[tariffCatCode] = 'IP'
                wiringLandDetail[tariffCode] = '21'
                break;
            case 'FORC':
                wiringLandDetail[tariffCatCode] = 'GP'
                wiringLandDetail[tariffCode] = '31'
                break;
            case 'TEMP':
                wiringLandDetail[tariffCatCode] = 'RP'
                wiringLandDetail[tariffCode] = '51'
                break;
            case 'CHUR':
                wiringLandDetail[tariffCatCode] = 'RP'
                wiringLandDetail[tariffCode] = '51'
                break;
            case 'MOSQ':
                wiringLandDetail[tariffCatCode] = 'RP'
                wiringLandDetail[tariffCode] = '51'
                break;
            case 'AGRI':
                wiringLandDetail[tariffCatCode] = 'AG'
                wiringLandDetail[tariffCode] = '71'
                break;
            default:
                wiringLandDetail[tariffCatCode] = ''
                wiringLandDetail[tariffCode] = ''
        }
        console.log(wiringLandDetail)
        this.setState({ wiringLandDetail: wiringLandDetail }, () => this.afterSetState2())
    }
    async afterSetState2() {

        await (await fetch(`/tariff/findTariffCode?tariffCatCode=${this.state.wiringLandDetail.tariffCatCode}`)
            .then(response => response.json())
            .then(data => this.setState({ tariffList: data })))
    }

    handleChangePhase = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let preStep = this.state.preStep
        let wiringLandDetail = { ...this.state.wiringLandDetail }
        wiringLandDetail[name] = value;
        //console.log(isCompleted)
        if (preStep === true) {
            for (let i = currentStep - 1; i < 5; i++) {
                isCompleted[i] = ' '
            }
        }
        //console.log(isCompleted)
        this.setState({ wiringLandDetail }, () => this.afterPhaseSetStateFinished());


    }
    async afterPhaseSetStateFinished() {

        console.log(this.state.wiringLandDetail.phase)
        let connectionType60 = this.state.connectionType60
        switch (this.state.wiringLandDetail.phase) {
            case '3':
                connectionType60 = 'radio'
                break;
            default:
                connectionType60 = 'hidden'
        }
        console.log(connectionType60)
        this.setState({connectionType60: connectionType60 })
    }

    handleChangeApplication = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let preStep = this.state.preStep
        let application = { ...this.state.application };
        application[name] = value;
        //application.id[name] = value;
        this.setState({ application });
        if (preStep === true) {
            for (let i = currentStep - 1; i < 5; i++) {
                isCompleted[i] = ' '
            }
        }
    }

    handleChangeApplicant = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let applicant = { ...this.state.applicant };
        applicant[name] = value;
        this.setState({ applicant });
    }

    handleSubmit = async (event) => {

        let currentStep = this.state.currentStep
        if (currentStep === 5) {
            event.persist()
            const { application, wiringLandDetail, spapplon } = this.state;
            //     alert(`Your registration detail: \n  
            // ${application.id.applicationId}\n
            // ${application.id.deptId}\n
            // ${application.linkedWith}\n
            // ${wiringLandDetail.serviceStreetAddress}\n
            // ${wiringLandDetail.serviceSuburb}\n
            //  `)
            console.log(typeof(wiringLandDetail.phase))

            application.addUser = sessionStorage.getItem('userName')
            wiringLandDetail.addUser = sessionStorage.getItem('userName')


            let ApplicationAddService = await fetch('/transactionalApplication/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    application,
                    wiringLandDetail
                }),
            });
            // console.log(JSON.stringify({
            //     application,
            //     wiringLandDetail,
            //     spapplon
            // }))
            console.log(ApplicationAddService.status)
            if (ApplicationAddService.status === 201) {
            let jsonApplicationAddService = await ApplicationAddService.json(); 
            this.setState({estimateNo: jsonApplicationAddService.application.applicationNo})
            await Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Your work has been saved',
                text: 'Your estimate No : ' + this.state.estimateNo,
                confirmButtonText: 'OK',
              })
            // await Swal.queue([{
            //                     type: 'success',
            //                     title: 'Your work has been saved',
            //                     position: 'top',
            //                     heightAuto: false,
            //                     width: 400,
            //                     confirmButtonText: 'Show My Estimate No',
            //                     showLoaderOnConfirm: true,
            //                     buttonsStyling: false,
            //                     customClass: {
            //                         confirmButton: 'btn btn-primary btn-sm'
            //                     },
            //                     preConfirm: () => {
            //                         Swal.insertQueueStep({
            //                             text: 'Your estimate No : ' + this.state.estimateNo,
            //                             position: 'top',
            //                             width: 400,
            //                             buttonsStyling: false,
            //                             customClass: {
            //                                 confirmButton: 'btn btn-primary btn-sm'
            //                             }
            //                         })
            //                     }
            //                 }])
    
                            let currentStep = this.state.currentStep
                            let isCompleted = this.state.isCompleted;
                            isCompleted[currentStep - 1] = 'completed';
                            isCompleted[currentStep] = 'completed';//Complete the last circle in multistep progress bar
                            this.setState({ isCompleted }, () => this._next_finish());
                            setTimeout(() => {
                                this.props.history.push('/home');
                            }, 4000);
            }else{
                Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong! Try Again'
                        })
                        this.props.history.push('/home');
                        alert("HTTP-Error: " + ApplicationAddService.status);
            }


            // console.log(addApplication)

            // if (addApplication.status === 201) {
            //     let jsonAddApplication = await addApplication.json();
            //     console.log(jsonAddApplication)
            //     console.log(JSON.stringify(wiringLandDetail))
            //     let addWiringLandDetails = await fetch('/wiringLandDetail/add', {
            //         method: 'POST',
            //         headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(wiringLandDetail),

            //     });
            //     console.log(addWiringLandDetails.status)
            //     if (addWiringLandDetails.status === 201) {
            //         let jsonAddWiringLandDetails = await addWiringLandDetails.json();
            //         console.log(jsonAddWiringLandDetails)
            //         let addSpapplon = await fetch('/spapplon/add', {
            //             method: 'POST',
            //             headers: {
            //                 'Accept': 'application/json',
            //                 'Content-Type': 'application/json'
            //             },
            //             body: JSON.stringify(spapplon),

            //         });
            //         if (addSpapplon.status === 201) {
            //             let jsonAddSpapplon = await addSpapplon.json();
            //             console.log(jsonAddSpapplon)
            //             this.setState({ returnOfAddApplication: jsonAddApplication })
            //             console.log(this.state.returnOfAddApplication)

            //             // Swal.fire({
            //             //     type: 'success',
            //             //     title: 'Your work has been saved',
            //             //     position: 'top',
            //             //     showConfirmButton: false,
            //             //     heightAuto: false,
            //             //     width: 400,
            //             //     timer: 3000
            //             // }).then(() => {
            //             //     Swal.fire({
            //             //         text: 'Your estimate No : ' + this.state.returnOfAddApplication.applicationNo,
            //             //         position: 'top',
            //             //         width: 400,
            //             //         buttonsStyling: false,
            //             //         customClass: {
            //             //             confirmButton: 'btn btn-primary btn-sm'
            //             //         },

            //             //     })
            //             // })


            //             await Swal.queue([{
            //                 type: 'success',
            //                 title: 'Your work has been saved',
            //                 position: 'top',
            //                 heightAuto: false,
            //                 width: 400,
            //                 confirmButtonText: 'Show My Estimate No',
            //                 showLoaderOnConfirm: true,
            //                 buttonsStyling: false,
            //                 customClass: {
            //                     confirmButton: 'btn btn-primary btn-sm'
            //                 },
            //                 preConfirm: () => {
            //                     Swal.insertQueueStep({
            //                         text: 'Your estimate No : ' + this.state.returnOfAddApplication.applicationNo,
            //                         position: 'top',
            //                         width: 400,
            //                         buttonsStyling: false,
            //                         customClass: {
            //                             confirmButton: 'btn btn-primary btn-sm'
            //                         }
            //                     })
            //                 }
            //             }])

            //             let currentStep = this.state.currentStep
            //             let isCompleted = this.state.isCompleted;
            //             isCompleted[currentStep - 1] = 'completed';
            //             isCompleted[currentStep] = 'completed';//Complete the last circle in multistep progress bar
            //             this.setState({ isCompleted }, () => this._next_finish());
            //             setTimeout(() => {
            //                 this.props.history.push('/');
            //             }, 4000);
            //         } else {
            //             fetch(`/application/delete?deptId=${application.id.deptId}&applicationId=${application.id.applicationId}`, {
            //                 method: 'GET',
            //                 headers: {
            //                     'Accept': 'application/json',
            //                     'Content-Type': 'application/json'
            //                 }
            //             })
            //             fetch(`/wiringLandDetail/delete?deptId=${application.id.deptId}&applicationId=${application.id.applicationId}`, {
            //                 method: 'GET',
            //                 headers: {
            //                     'Accept': 'application/json',
            //                     'Content-Type': 'application/json'
            //                 }
            //             })
            //             Swal.fire({
            //                 type: 'error',
            //                 title: 'Oops...Oops...Oops...',
            //                 text: 'Something went wrong! Try Again'
            //             })
            //             this.props.history.push('/');
            //             alert("HTTP-Error: " + addSpapplon.status);
            //         }
            //     } else {
            //         fetch(`/application/delete?deptId=${application.id.deptId}&applicationId=${application.id.applicationId}`, {
            //             method: 'GET',
            //             headers: {
            //                 'Accept': 'application/json',
            //                 'Content-Type': 'application/json'
            //             }
            //         })
            //         Swal.fire({
            //             type: 'error',
            //             title: 'Oops...opps',
            //             text: 'Something went wrong! Try Again'
            //         })
            //         this.props.history.push('/');
            //         alert("HTTP-Errorr: " + addWiringLandDetails.status);
            //     }
            // } else {
            //     Swal.fire({
            //         type: 'error',
            //         title: 'Oops...',
            //         text: 'Something went wrong! Try Again'
            //     })
            //     this.props.history.push('/');
            //     alert("HTTP-Error: " + addApplication.status);
            // }



           
        } else {

            let isCompleted = this.state.isCompleted;
            isCompleted[currentStep - 1] = 'completed';
            this.setState({ isCompleted }, () => this._next());

        }



    }



    _next = () => {
        let currentStep = this.state.currentStep
        let isCompleted = this.state.isCompleted
        let previousStep = this.state.previousStep
        if (currentStep === 5) {
        } else {
            currentStep = currentStep >= 5 ? 5 : currentStep + 1
            this.setState({ currentStep: currentStep }, () => this.setActive())
            for (let i = currentStep - 1; i < previousStep - 1; i++) {
                isCompleted[i] = 'completed'
            }
        }
        scroll.scrollToTop();

    }

    _next_finish = () => {
        let currentStep = this.state.currentStep
        let isCompleted = this.state.isCompleted
        currentStep = currentStep >= 6 ? 6 : currentStep + 1
        this.setState({ currentStep: currentStep }, () => this.setActiveFinish())
        for (let i = 0; i < 5; i++) {
            isCompleted[i] = 'completed'
        }
        scroll.scrollToTop()
    }


    _prev = () => {
        let currentStep = this.state.currentStep
        let isCompleted = this.state.isCompleted
        //let handlePreChange = this.state.handlePreChange
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        // console.log(isCompleted)
        // if(handlePreChange === true){

        // }
        // console.log(isCompleted)
        this.setState(
            { currentStep: currentStep, isCompleted: isCompleted, preStep: true },
            () => this.setActive()
        )
        scroll.scrollToTop();
    }


    setActive = () => {
        let currentStep = this.state.currentStep
        let isActive = this.state.isActive;
        isActive = [];
        isActive[currentStep - 1] = 'active'
        this.setState({ isActive });
    }

    setActiveFinish = () => {
        let isActive = this.state.isActive;
        isActive = [];
        this.setState({ isActive });
    }

    goToStep(num) {

        let currentStep = this.state.currentStep;
        let previousStep = this.state.previousStep
        let isCompleted = this.state.isCompleted;
        if (num === 1) {
            previousStep = currentStep
            currentStep = num;
            this.setState({ currentStep: currentStep, previousStep: previousStep }, () => this.setActive());

        } else if (isCompleted[num - 2] === 'completed' && currentStep <= num) {
            console.log('up')
            previousStep = currentStep
            currentStep = num;
            this.setState({ currentStep: currentStep, previousStep: previousStep }, () => this.setActive());
        } else if (isCompleted[num - 2] === 'completed' && currentStep > num) {
            console.log('down')
            console.log('pre true')
            previousStep = currentStep
            currentStep = num;
            this.setState({ currentStep: currentStep, previousStep: previousStep, preStep: true }, () => this.setActive());
        }
        // else if (isCompleted[num - 2] === ' ') {


        // }

    }

    /*
    * the functions for our button
    */
    previousButton() {

        let currentStep = this.state.currentStep;
        if (currentStep === 1) {
            return (
                <Button disabled style={{ paddingLeft: 50, paddingRight: 50, textAlign: "center", opacity: 0.2 }} color="primary" onClick={this._prev}>
                    <FontAwesome.FaAngleDoubleLeft />Previous
             </Button>
            );
        } else if (currentStep === 6) {
            return (
                null
            );
        }
        else {
            return (
                <Button style={{ paddingLeft: 50, paddingRight: 50, textAlign: "center" }} color="primary" onClick={this._prev}>
                    <FontAwesome.FaAngleDoubleLeft />Previous
                </Button>
            );
        }

    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 5) {
            return (
                <Button style={{ float: "right", paddingLeft: 60, paddingRight: 60, textAlign: "center" }} color="primary" >
                    Next<FontAwesome.FaAngleDoubleRight />
                </Button>
            );
        }
        return null;
    }

    saveButton() {
        let currentStep = this.state.currentStep;
        if (currentStep === 5) {
            return (
                <Button style={{ float: "right", paddingLeft: 60, paddingRight: 60, textAlign: "center" }} color="primary" >
                    <FontAwesome.FaFloppyO />Save
                </Button>
            );
        }
        return null;
    }







    render() {

        const { application, wiringLandDetail, applicant, title, currentStep, csc,isLoading  } = this.state;


        // console.log(wiringLandDetail)
        // console.log(this.serviceStreetAddress)
        // console.log(this.state.applicant.streetAddress)

        if (isLoading) {
            return <p>Loading...</p>;
        }


        return (
            

            <React.Fragment>
                 <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/applicant/search"> Search Applicant  </a> |
        <a className="path2" href="/applicant/add"> Add Application </a>
       
        </div>
                <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
                {/* <UncontrolledTooltip placement="right" target="hh">
        Hello world!
      </UncontrolledTooltip> */}

                <Jumbotron className="jum_application" >

                    {/* <Card className='card_gldeptin'>
                    <CardBody>
                        <CardTitle className="text-center" >APPLICATION FORM CEYLON ELECTRICITY BOARD</CardTitle>
                        <CardSubtitle style={{ textAlign: "center" }}>Step {this.state.currentStep} - {title[currentStep - 1]}</CardSubtitle>
                        <br />
                        <CardText> */}


                    <h5 style={{ textAlign: "center" }} >APPLICATION FORM CEYLON ELECTRICITY BOARD</h5>
                    <br />
                    <ul className="progressbar_ApplicationAddEdit" >
                        <li className={this.state.isCompleted[0] + ' ' + this.state.isActive[0]} onClick={() => this.goToStep(1)}>Personal Details</li>
                        <li className={this.state.isCompleted[1] + ' ' + this.state.isActive[1]} onClick={() => this.goToStep(2)}>Application Details</li>
                        <li className={this.state.isCompleted[2] + ' ' + this.state.isActive[2]} onClick={() => this.goToStep(3)}>Contact Personal Details</li>
                        <li id="hh" className={this.state.isCompleted[3] + ' ' + this.state.isActive[3]} onClick={() => this.goToStep(4)}>Service Location Details</li>
                        <li className={this.state.isCompleted[4] + ' ' + this.state.isActive[4]} onClick={() => this.goToStep(5)}>Details of wiring</li>
                        <li className={this.state.isCompleted[5] + ' ' + this.state.isActive[5]} onClick={() => this.goToStep(6)}>Finish</li>
                    </ul>

                    <Jumbotron className="jum_application_form" >
                        <h6 style={{ textAlign: "center" }} >Step {this.state.currentStep} - {title[currentStep - 1]}</h6>
                        <AvForm onValidSubmit={this.handleSubmit} >

                            {/* 
          render the form steps and pass required props in
        */}
                            <Step1
                                //refProp={this.myRef}
                                currentStep={this.state.currentStep}
                                handleChangeApplicant={this.handleChangeApplicant}
                                idType={applicant.idType}
                                idNo={applicant.idNo}
                                firstName={applicant.firstName}
                                lastName={applicant.lastName}
                                streetAddress={applicant.streetAddress}
                                telephoneNo={applicant.telephoneNo}
                                suburb={applicant.suburb}
                                mobileNo={applicant.mobileNo}
                                city={applicant.city}
                                email={applicant.email}
                                postalCode={applicant.postalCode}
                                preferredLanguage={applicant.preferredLanguage}
                                cebEmployee={applicant.cebEmployee}

                            />
                            <Step2
                                currentStep={this.state.currentStep}
                                handleChangeApplication={this.handleChangeApplication}
                                handleChangeWiringLandDetails={this.handleChangeWiringLandDetails}
                                //handleChange={this.handleChange}
                                handleChangeApplicationSubType={this.handleChangeApplicationSubType}
                                buttonDisabled={this.state.buttonDisabled}
                                applicationId={application.id.applicationId}
                                addDate={application.addDate}
                                deptId={application.id.deptId}
                                applicationType={application.applicationType}
                                existingAccNo={wiringLandDetail.existingAccNo}
                                applicationSubType={application.applicationSubType}
                                linkedWith={application.linkedWith}
                                duration={application.duration}
                                durationType={application.durationType}
                                allocatedTo={application.allocatedTo}
                                fromDate={application.fromDate}
                                toDate={application.toDate}
                                applicationNo={application.applicationNo}
                                status={application.status}
                                isPiv1Needed={application.isPiv1Needed}
                                description={application.description}
                                isLoanApp={application.isLoanApp}
                                samurdhiMember={application.samurdhiMember}
                                //submitDate={application.submitDate}
                                csc={csc.deptFullName}
                                date={this.date}
                                validate={this.state.validate}

                            />
                            <Step3
                                currentStep={this.state.currentStep}
                                handleChangeApplication={this.handleChangeApplication}
                                contactIdNo={application.contactIdNo}
                                contactName={application.contactName}
                                contactAddress={application.contactAddress}
                                contactTelephone={application.contactTelephone}
                                contactMobile={application.contactMobile}
                                contactEmail={application.contactEmail}
                            />

                            <Step4
                                currentStep={this.state.currentStep}
                                handleChangeWiringLandDetails={this.handleChangeWiringLandDetails}
                                handleWiringLandDetailsAddress={this.handleWiringLandDetailsAddress}
                                deptId={application.id.deptId}
                                serviceStreetAddress={wiringLandDetail.serviceStreetAddress}
                                serviceSuburb={wiringLandDetail.serviceSuburb}
                                serviceCity={wiringLandDetail.serviceCity}
                                servicePostalCode={wiringLandDetail.servicePostalCode}
                                zoneId={wiringLandDetail.zoneId}
                                assessmentNo={wiringLandDetail.assessmentNo}
                                neighboursAccNo={wiringLandDetail.neighboursAccNo}
                                ownership={wiringLandDetail.ownership}
                                isGovernmentPlace={wiringLandDetail.isGovernmentPlace}
                                occupyOwnerCertified={wiringLandDetail.occupyOwnerCertified}
                            />

                            <Step5
                                currentStep={this.state.currentStep}
                                handleChangeWiringLandDetails={this.handleChangeWiringLandDetails}
                                handleChange={this.handleChangeApplication}
                                handletChangeTariffCatCode={this.handletChangeTariffCatCode}
                                handleChangeCustomerType={this.handleChangeCustomerType}
                                tariffCategoryList={this.state.tariffCategoryList}
                                tariffList={this.state.tariffList}
                                handleChangePhase ={this.handleChangePhase}
                                connectionType60 ={this.state.connectionType60}
                                noOfBulbs={wiringLandDetail.noOfBulbs} 
                                noOfFans={wiringLandDetail.noOfFans}
                                noOfPlugs5a={wiringLandDetail.noOfPlugs5a}
                                noOfPlugs15a={wiringLandDetail.noOfPlugs15a}
                                motorTotal={wiringLandDetail.motorTotal}
                                weldingPlant={wiringLandDetail.weldingPlant}
                                metalCrusher={wiringLandDetail.metalCrusher}
                                sawMills={wiringLandDetail.sawMills}
                                phase={wiringLandDetail.phase}
                                connectionType={wiringLandDetail.connectionType}
                                customerCategory={wiringLandDetail.customerCategory}
                                customerType={wiringLandDetail.customerType}
                                tariffCatCode={wiringLandDetail.tariffCatCode}
                                tariffCode={wiringLandDetail.tariffCode}
                                confirmedBy={application.confirmedBy}
                                preparedBy={application.preparedBy}
                               
                            />

                            <Step6
                                currentStep={this.state.currentStep}
                                Correction={this.Correction}
                            />



                            <br />

                            {this.previousButton()}
                            {this.nextButton()}
                            {this.saveButton()}

                        </AvForm>
                    </Jumbotron>

                    {/* </CardText>
                    </CardBody>
                </Card> */}
                </Jumbotron>


            </React.Fragment>
        );
    }
    scrollToMyRef = () => window.scrollTo(0, 1000)

}

function Step1(props) {
    //ref={}

    let disabledIdTypeNic = true
    let disabledIdTypePassport = true
    let disabledIdTypeBusRegNo = true
    switch (props.idType) {

        case 'NIC':
            disabledIdTypeNic = false
            break;

        case 'PASSPORT':
            disabledIdTypePassport = false
            break;
        case 'BUS REG NO':
            disabledIdTypeBusRegNo = false
            break;
        default:
    }

    let disabledLanguageSinhala = true
    let disabledLanguageEnglish = true
    let disabledLanguageTamil = true

    switch (props.preferredLanguage) {

        case 'Sinhala':
            disabledLanguageSinhala = false
            break;
        case 'English':
            disabledLanguageEnglish = false
            break;
        case 'Tamil':
            disabledLanguageTamil = false
            break;
        default:
    }

    let disabledYes = true
    let disabledNo = true

    switch (props.cebEmployee) {
        case 'Y':
            disabledYes = false
            break;
        case 'N':
            disabledNo = false
            break;
        default:
    }

    if (props.currentStep !== 1) {
        return null
    }
    return (

        <React.Fragment >


            <Row  >
                <AvGroup className="height_application">

                </AvGroup>
            </Row>
            <Row >
                <Col sm={6} >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="idType" >ID Type</Label></Col>
                            <Col sm={8} >
                                <div>
                                    <CustomInput disabled={disabledIdTypeNic} type="radio" id="idType1" name="idType" label="NIC" value="NIC" checked={props.idType === 'NIC'} onChange={props.handleChangeApplicant} autoComplete="idType" inline />
                                    <CustomInput disabled={disabledIdTypePassport} type="radio" id="idType2" name="idType" label="PASSPORT" value="PASSPORT" checked={props.idType === 'PASSPORT'} onChange={props.handleChangeApplicant} autoComplete="idType" inline />
                                    <CustomInput disabled={disabledIdTypeBusRegNo} type="radio" id="idType3" name="idType" label="BUS REG NO" value="BUS REG NO" checked={props.idType === 'BUS REG NO'} onChange={props.handleChangeApplicant} autoComplete="idType" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup> 
                </Col>
                <Col sm={6}>

                </Col>
            </Row>

            <Row  >
                <Col sm={6} >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="idNo" >ID No</Label></Col>
                            <Col sm={8} ><AvInput disabled type="text" name="idNo" id="idNo" value={props.idNo} onChange={props.handleChangeApplicant}
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' },
                                    pattern: { value: '^([0-9]{9}(V|v)|[0-9]{12})$', errorMessage: 'please enter valid Id number' }
                                }} autoComplete="idNo" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter valid ID No</Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
                <Col sm={6} >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="postalCode" >Postal Code</Label></Col>
                            <Col sm={8}><AvInput disabled type="number" name="postalCode" id="postalCode" value={props.postalCode} onChange={props.handleChangeApplicant}
                                validate={{
                                    minLength: { value: 5, errorMessage: 'please enter valid postal code [format(xxxxx)]' },
                                    maxLength: { value: 5, errorMessage: 'please enter valid postal code [format(xxxxx)]' }

                                }} autoComplete="postalCode" bsSize="sm" />
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row >
                <Col sm={6} >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="firstName" >First Name (Initial)</Label></Col>
                            <Col sm={8}> <AvInput disabled type="text" name="firstName" id="firstName" value={props.firstName} onInput={props.handleUpperCase} onChange={props.handleChangeApplicant} autoComplete="firstName"
                                validate={{
                                    maxLength: { value: 15, errorMessage: 'please enter name within 15 characters' }
                                }} bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your name </Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="telephoneNo" >Telephone No</Label></Col>
                            <Col sm={8} > <AvInput disabled type="number" name="telephoneNo" id="telephoneNo" value={props.telephoneNo} onChange={props.handleChangeApplicant}
                                validate={{
                                    pattern: { value: '^([0]{1}[0-9]{9})$', errorMessage: 'please enter valid telephone number' }
                                }} autoComplete="telephoneNo" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter valid Telephone Number</Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={6} >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="lastName" >Last Name (Initial)</Label></Col>
                            <Col sm={8}><AvInput disabled type="text" name="lastName" id="lastName" value={props.lastName} onInput={props.handleUpperCase} onChange={props.handleChangeApplicant} autoComplete="lastName"
                                validate={{
                                    maxLength: { value: 15, errorMessage: 'please enter name within 15 characters' }
                                }} bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your name </Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="mobileNo" >Mobile No/SMS NO</Label></Col>
                            <Col sm={8}><AvInput disabled type="number" name="mobileNo" id="mobileNo" value={props.mobileNo} onChange={props.handleChangeApplicant}
                                validate={{
                                    pattern: { value: '^([0]{1}[0-9]{9})$', errorMessage: 'please enter valid mobile number' }
                                }} autoComplete="mobileNo" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter valid Telephone Number</Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="streetAddress" >Street Address (line 1)</Label></Col>
                            <Col sm={8}><AvInput disabled type="text" name="streetAddress" id="streetAddress" value={props.streetAddress} onInput={props.handleUpperCase} onChange={props.handleChangeApplicant}
                                validate={{
                                    maxLength: { value: 30, errorMessage: 'please enter Address within 30 characters' }
                                }} autoComplete="streetAddress" placeholder="1234 Main St" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your street address</Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="email" >Email</Label></Col>
                            <Col sm={8}><AvInput disabled type="text" name="email" id="email" value={props.email} onChange={props.handleChangeApplicant} autoComplete="email"
                                validate={{
                                    email: { value: true, errorMessage: 'please enter valid email' }
                                }} bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Enter a valid Email</Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="suburb" >Suburb (line 2)</Label></Col>
                            <Col sm={8}><AvInput disabled type="text" name="suburb" id="suburb" value={props.suburb} onInput={props.handleUpperCase} onChange={props.handleChangeApplicant}
                                validate={{
                                    maxLength: { value: 25, errorMessage: 'please enter suburb within 25 characters' }
                                }} autoComplete="suburb" placeholder="Apartment, studio, or floor" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your suburb</Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="preferredLanguage" >Preferred Language</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput disabled={disabledLanguageEnglish} type="radio" id="preferredLanguage1" name="preferredLanguage" label="English" value="English" checked={props.preferredLanguage === 'English'} onChange={props.handleChangeApplicant} autoComplete="preferredLanguage" inline />
                                    <CustomInput disabled={disabledLanguageSinhala} type="radio" id="preferredLanguage2" name="preferredLanguage" label="Sinhala" value="Sinhala" checked={props.preferredLanguage === 'Sinhala'} onChange={props.handleChangeApplicant} autoComplete="preferredLanguage" inline />
                                    <CustomInput disabled={disabledLanguageTamil} type="radio" id="preferredLanguage3" name="preferredLanguage" label="Tamil" value="Tamil" checked={props.preferredLanguage === 'Tamil'} onChange={props.handleChangeApplicant} autoComplete="preferredLanguage" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="city" >City (line 3)</Label></Col>
                            <Col sm={8}><AvInput disabled type="text" name="city" id="city" placeholder="City" value={props.city} onInput={props.handleUpperCase} onChange={props.handleChangeApplicant}
                                validate={{
                                    maxLength: { value: 20, errorMessage: 'please enter city within 20 characters' }
                                }} autoComplete="city" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your city</Alert></AvFeedback> </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="cebEmployee" >CEB Employee</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput disabled={disabledYes} type="radio" id="cebEmployee1" name="cebEmployee" label="Yes" value="Y" checked={props.cebEmployee === 'Y'} onChange={props.handleChangeApplicant} autoComplete="cebEmployee" inline />
                                    <CustomInput disabled={disabledNo} type="radio" id="cebEmployee2" name="cebEmployee" label="No" value="N" checked={props.cebEmployee === 'N'} onChange={props.handleChangeApplicant} autoComplete="cebEmployee" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <AvGroup className="height_application">
                </AvGroup>
            </Row>




        </React.Fragment>

    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return (
        <React.Fragment>



            <Row >
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="applicationId" inline="true" >Temp ID</Label></Col>
                            <Col sm={8}><AvInput disabled type="text" name="applicationId" id="applicationId" value={props.applicationId} onChange={props.handleChange}
                                validate={{

                                }} autoComplete="applicationId" inline="true" bsSize="sm" />
                                <AvFeedback>This Feild is required</AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="date" inline="true" >Date</Label></Col>
                            <Col sm={8}><AvInput disabled type="text" name="date" id="date" value={props.date} onChange={props.handleChangeApplication}
                                validate={{

                                }} autoComplete="date" inline="true" bsSize="sm" />
                                <AvFeedback>This Feild is required</AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row >
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="deptId" inline="true" >Cost Center No</Label></Col>
                            <Col sm={8}><AvInput disabled type="text" name="deptId" id="deptId" value={props.deptId} onChange={props.handleChange} onInput={props.handleUpperCase}
                                validate={{

                                }} autoComplete="deptId" inline="true" bsSize="sm" />
                                <AvFeedback>This Feild is required</AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="csc" inline="true" >CSC</Label></Col>
                            <Col sm={8}><AvInput disabled type="text" name="csc" id="csc" value={props.csc} onChange={props.handleChange}
                                validate={{

                                }} autoComplete="csc" inline="true" bsSize="sm" />
                                <AvFeedback>This Feild is required</AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row >
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="applicationType" inline="true" >Application Type</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput type="radio" id="applicationType1" name="applicationType" label="New Connection" value='NC' checked={props.applicationType === 'NC'} onChange={props.handleChangeApplication} autoComplete="applicationType" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="existingAccNo" inline="true" >Old Acc No</Label></Col>
                            <Col sm={8}><AvInput type="text" name="existingAccNo" id="existingAccNo" value={props.existingAccNo} onChange={props.handleChangeWiringLandDetails} onInput={props.handleUpperCase}
                                validate={{

                                }} autoComplete="existingAccNo" inline="true" bsSize="sm" />
                                <AvFeedback>This Feild is required</AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row >
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="applicationSubType" inline="true" >Application Sub Type</Label></Col>
                            <Col sm={8} >
                                <AvInput type="select" name="applicationSubType" id="​applicationSubType" value={props.applicationSubType} onChange={props.handleChangeApplicationSubType}
                                    validate={{

                                    }} autoComplete="applicationSubType" bsSize="sm">
                                    <option value="" disabled >Select </option>
                                    <option value="PM">Permanent</option>
                                    <option value="C1">Temp Cons1</option>
                                    <option value="C2">Temp Cons2</option>
                                    <option value="C3">Temp Cons3</option>
                                    <option value="FF">First Fifty</option>
                                    <option value="SP">School Program</option>
                                    <option value="FS">Free Service</option>
                                    <option value="TU">Time Of Use</option>
                                    <option value="TA">Agriculture(TOU)</option>
                                </AvInput>
                                <AvFeedback>This Feild is required</AvFeedback>

                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="linkedWith" inline="true" >Linked With</Label></Col>
                            <Col sm={8} >
                                <AvInput type="text" name="linkedWith" id="linkedWith" value={props.linkedWith} onChange={props.handleChangeApplication}
                                    validate={{

                                    }} autoComplete="linkedWith" inline="true" bsSize="sm" />
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row >
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="durationType" inline="true" >Duration</Label></Col>
                            <Col sm={4} >
                                <AvInput disabled={props.buttonDisabled} type="select" name="durationType" id="durationType" value={props.durationType} onChange={props.handleChangeApplication}
                                    validate={{
                                        required: { value: props.validate, errorMessage: 'This field is required' },
                                    }} autoComplete="durationType" bsSize="sm">
                                    <option value="" disabled >Select </option>
                                    <option value="Months">Months</option>
                                    <option value="Years">Years</option>
                                </AvInput>
                                <AvFeedback>This Feild is required</AvFeedback>
                            </Col>
                            <Col sm={4} ><AvField disabled={props.buttonDisabled} type="number" name="duration" id="duration" value={props.duration} onChange={props.handleChangeApplication}
                                validate={{
                                    required: { value: props.validate, errorMessage: 'This field is required' }
                                }} autoComplete="duration" inline="true" bsSize="sm" />
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="status" inline="true" >Confirm PIV</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput type="radio" id="status1" name="status" label="Yes" value="Y" checked={props.status === 'M' || props.status === 'N'} onChange={props.handleChangeApplication} autoComplete="status" inline />
                                    <CustomInput type="radio" id="status2" name="status" label="No" value="N" checked={props.status !== 'M' || props.status !== 'N'} onChange={props.handleChangeApplication} autoComplete="status" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row >
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="fromDate" inline="true" >From Date</Label></Col>
                            <Col sm={8}><AvField disabled={props.buttonDisabled} type="date" name="fromDate" id="fromDate" value={props.fromDate} onChange={props.handleChangeApplication}
                                validate={{
                                    required: { value: props.validate, errorMessage: 'This field is required' }
                                }} autoComplete="fromDate" inline="true" bsSize="sm" />
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="isPiv1Needed" inline="true" >Is Piv 1 Needed Default</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput type="radio" id="isPiv1Needed1" name="isPiv1Needed" label="Yes" value="Y" checked={props.isPiv1Needed === 'Y'} onChange={props.handleChangeApplication} autoComplete="isPiv1Needed" inline />
                                    <CustomInput type="radio" id="isPiv1Needed2" name="isPiv1Needed" label="No" value="N" checked={props.isPiv1Needed === 'N'} onChange={props.handleChangeApplication} autoComplete="isPiv1Needed" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row >
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="toDate" inline="true" >To Date</Label></Col>
                            <Col sm={8}><AvField disabled={props.buttonDisabled} type="date" name="toDate" id="toDate" value={props.toDate} onChange={props.handleChangeApplication}
                                validate={{
                                    required: { value: props.validate, errorMessage: 'This field is required' }
                                }} autoComplete="toDate" inline="true" bsSize="sm" />
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>


                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="isLoanApp" >Is Applying For a Loan***</Label></Col>
                            <Col sm={8}>
                                <AvInput type="select" name="isLoanApp" id="​isLoanApp" value={props.isLoanApp} onChange={props.handleChangeApplication}
                                    validate={{

                                    }} autoComplete="isLoanApp" bsSize="sm">
                                    <option value="" disabled >Select </option>
                                    <option value="N">NO</option>
                                    <option value="D">Domestic Loan 100%</option>

                                </AvInput>

                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row >
                <Col sm="6">
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="applicationNo" inline="true" >estimate No</Label></Col>
                            <Col sm={8}><AvField type="text" name="applicationNo" id="applicationNo" value={props.applicationNo} onChange={props.handleChange}
                                validate={{
                                    // required: { value: true,errorMessage: 'This field is required' },
                                }} autoComplete="applicationNo" inline="true" bsSize="sm" />
                                <AvFeedback>This Feild is required</AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="samurdhiMember" >Samurdhi Member***</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput type="radio" id="samurdhiMember1" name="samurdhiMember" label="Yes" value="Y" checked={props.samurdhiMember === 'Y'} onChange={props.handleChangeApplication} autoComplete="samurdhiMember" inline />
                                    <CustomInput type="radio" id="samurdhiMember2" name="samurdhiMember" label="No" value="N" checked={props.samurdhiMember === 'N'} onChange={props.handleChangeApplication} autoComplete="samurdhiMember" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row >
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="allocatedTo" inline="true" >Allocated To</Label></Col>
                            <Col sm={3}><AvInput type="number" name="allocatedTo" id="allocatedTo" value={props.allocatedTo} onChange={props.handleChangeApplication}
                                validate={{

                                }} autoComplete="allocatedTo" inline="true" bsSize="sm" />
                                <AvFeedback>This Feild is required</AvFeedback>
                            </Col>
                            <Col sm={2}><AvInput type="number" name="posCenter" id="posCenter" value={'  '} onChange={props.handleChange}
                                validate={{

                                }} autoComplete="posCenter" inline="true" bsSize="sm" />
                                <AvFeedback>This Feild is required</AvFeedback>
                            </Col>
                            <Col sm={3}><AvInput type="number" name="posCenter" id="posCenter" value={'  '} onChange={props.handleChange}
                                validate={{

                                }} autoComplete="posCenter" inline="true" bsSize="sm" />
                                <AvFeedback>This Feild is required</AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="description" inline="true" >Description</Label></Col>
                            <Col sm={8}><AvInput type="textarea" name="description" id="description" value={props.description} onChange={props.handleChangeApplication} onInput={props.handleUpperCase}
                                validate={{

                                }} autoComplete="description" inline="true" bsSize="sm" />
                                <AvFeedback>This Feild is required</AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>


        </React.Fragment>


    );
}

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return (
        <React.Fragment>

            <Row  >
                <AvGroup className="height_application"></AvGroup>
            </Row>
            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="contactIdNo" >ID No</Label></Col>
                            <Col sm={8}><AvField type="text" name="contactIdNo" id="contactIdNo" value={props.contactIdNo} onInput={props.handleUpperCase} onChange={props.handleChangeApplication}
                                validate={{
                                    //required: { value: true, errorMessage: 'This field is required' },
                                    pattern: { value: '^([0-9]{9}(V|v)|[0-9]{11}(X|x))$', errorMessage: 'This Id number is invalid' }
                                }} autoComplete="contactIdNo" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your city</Alert></AvFeedback> </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>


            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="contactName" >Contact Name</Label></Col>
                            <Col sm={8}><AvField type="text" name="contactName" id="contactName" value={props.contactName} onInput={props.handleUpperCase} onChange={props.handleChangeApplication}
                                validate={{
                                    //required: { value: true, errorMessage: 'This field is required' },
                                    maxLength: { value: 30, errorMessage: 'Length should be 30 characters ' }
                                }} autoComplete="contactName" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your city</Alert></AvFeedback> </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>


            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="contactAddress" >Contact Address</Label></Col>
                            <Col sm={8}><AvField type="text" name="contactAddress" id="contactAddress" value={props.contactAddress} onInput={props.handleUpperCase} onChange={props.handleChangeApplication}
                                validate={{
                                    //required: { value: true, errorMessage: 'This field is required' },
                                    maxLength: { value: 30, errorMessage: 'Length should be 30 characters' }
                                }} autoComplete="contactAddress" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your city</Alert></AvFeedback> </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>


            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="contactTelephone" >Telephone No</Label></Col>
                            <Col sm={8}><AvField type="text" name="contactTelephone" id="contactTelephone" value={props.contactTelephone} onInput={props.handleUpperCase} onChange={props.handleChangeApplication}
                                validate={{
                                    //required: { value: true, errorMessage: 'This field is required' },
                                    pattern: { value: '^([0]{1}[0-9]{9})$', errorMessage: 'Please enter valid Telephone number' }
                                }} autoComplete="contactTelephone" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your city</Alert></AvFeedback> </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>


            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="contactMobile" >Mobile No</Label></Col>
                            <Col sm={8}><AvField type="text" name="contactMobile" id="contactMobile" value={props.contactMobile} onInput={props.handleUpperCase} onChange={props.handleChangeApplication}
                                validate={{
                                    //required: { value: true, errorMessage: 'This field is required' },
                                    pattern: { value: '^([0]{1}[0-9]{9})$', errorMessage: 'please enter valid mobile No' }
                                }} autoComplete="contactMobile" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your city</Alert></AvFeedback> </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>


            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="contactEmail" >Email</Label></Col>
                            <Col sm={8}><AvField type="text" name="contactEmail" id="contactEmail" value={props.contactEmail} onInput={props.handleUpperCase} onChange={props.handleChangeApplication}
                                validate={{
                                    //required: { value: true, errorMessage: 'This field is required' },
                                    email: { value: true, errorMessage: 'Please enter valid email' }
                                }} autoComplete="contactEmail" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your city</Alert></AvFeedback> </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>


            <Row  >
                <AvGroup className="height_application"></AvGroup>
            </Row>


            <Row  >
                <AvGroup className="height_application"></AvGroup>
            </Row>




            {/* <button className="btn btn-success btn-block">Sign up</button> */}
        </React.Fragment>
    );

}

function Step4(props) {
    
    let serviceCityType = 'text'
    let ZoneIdType = 'number'
    let deptIdFirstNo = props.deptId.slice(0, 2)
    
    if (deptIdFirstNo === "54") {
        serviceCityType = 'select'
        ZoneIdType = 'select'
    }
    if (props.currentStep !== 4) {
        return null
    }
    return (
        <React.Fragment>
            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="serviceStreetAddress" >Street Address(line 1)</Label></Col>
                            <Col sm={7}><AvField type="text" name="serviceStreetAddress" id="serviceStreetAddress" value={props.serviceStreetAddress} onInput={props.handleUpperCase} onChange={props.handleChangeWiringLandDetails}
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' },
                                    maxLength: { value: 30, errorMessage: 'please add a address which length is below 30 characters' }

                                }} autoComplete="serviceStreetAddress" placeholder="1234 Main St" bsSize="sm" />
                                {/* <AvFeedback><Alert className="alert" color="danger" >Please enter your street address</Alert></AvFeedback> */}
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="serviceSuburb" >Suburb (line 2)</Label></Col>
                            <Col sm={8}><AvField type="text" name="serviceSuburb" id="serviceSuburb" value={props.serviceSuburb} onInput={props.handleUpperCase} onChange={props.handleChangeWiringLandDetails}
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' },
                                    maxLength: { value: 25, errorMessage: 'please add a suburb which length is below 25 characters' }
                                }} autoComplete="serviceSuburb" placeholder="Apartment, studio, or floor" bsSize="sm" />
                                {/* <AvFeedback><Alert className="alert" color="danger" >Please enter your suburb</Alert></AvFeedback> */}
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="serviceCity" >City (line 3)</Label></Col>
                            <Col sm={8}>
                                <AvField type={serviceCityType} name="serviceCity" id="serviceCity" placeholder="City" value={props.serviceCity} onInput={props.handleUpperCase} onChange={props.handleChangeWiringLandDetails}
                                    validate={{
                                        required: { value: true, errorMessage: 'This field is required' },
                                        maxLength: { value: 20, errorMessage: 'please add a city which length is below 20 characters' }
                                    }} autoComplete="serviceCity" bsSize="sm">
                                    <option value="" disabled >Select City</option>
                                    <option value="COLOMBO_01">COLOMBO_01</option>
                                    <option value="COLOMBO_02">COLOMBO_02</option>
                                    <option value="COLOMBO_03">COLOMBO_03</option>
                                    <option value="COLOMBO_04">COLOMBO_04</option>
                                    <option value="COLOMBO_05">COLOMBO_05</option>
                                    <option value="COLOMBO_06">COLOMBO_06</option>
                                    <option value="COLOMBO_07">COLOMBO_07</option>
                                    <option value="COLOMBO_08">COLOMBO_08</option>
                                    <option value="COLOMBO_09">COLOMBO_09</option>
                                    <option value="COLOMBO_10">COLOMBO_10</option>
                                    <option value="COLOMBO_11">COLOMBO_11</option>
                                    <option value="COLOMBO_12">COLOMBO_12</option>
                                    <option value="COLOMBO_13">COLOMBO_13</option>
                                    <option value="COLOMBO_14">COLOMBO_14</option>
                                    <option value="COLOMBO_15">COLOMBO_15</option>
                                </AvField>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={2}></Col>
                <Col sm={4} >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={5}><Label for="servicePostalCode" >Postal Code</Label></Col>
                            <Col sm={7}><AvField type="number" name="servicePostalCode" id="servicePostalCode" value={props.servicePostalCode} onChange={props.handleChangeWiringLandDetails}
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' },
                                    minLength: { value: 5, errorMessage: 'Invalid postal code [format(xxxxx)] ' },
                                    maxLength: { value: 5, errorMessage: 'Invalid postal code [format(xxxxx)] ' }
                                }} autoComplete="servicePostalCode" bsSize="sm" />
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
                <Col sm={3} >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="zoneId" >Zone(*)</Label></Col>
                            <Col sm={8}><AvField type={ZoneIdType} name="zoneId" id="zoneId" value={props.zoneId} onChange={props.handleChangeWiringLandDetails}
                                validate={{
                                    max: { value: 15, errorMessage: 'please enter value below 15 ' },
                                    minLength: { value: 2, errorMessage: 'Invalid postal code [format(xx)] ' },
                                    maxLength: { value: 2, errorMessage: 'Invalid postal code [format(xx)] ' }
                                }} autoComplete="zoneId" bsSize="sm" >
                                    <option value="" disabled >Select Zone</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                </AvField>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
                <Col sm={3} >

                    <Button style={{ paddingLeft: 50, paddingRight: 50, textAlign: "center" }} color="primary" onClick={props.handleWiringLandDetailsAddress} >Fill</Button>

                </Col>

            </Row>

            <Row  >
                <Col sm={2}></Col>
                <Col sm={10} >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="assessmentNo" >Assessment No</Label></Col>
                            <Col sm={8}><AvField type="number" name="assessmentNo" id="assessmentNo" value={props.assessmentNo} onChange={props.handleChangeWiringLandDetails}
                                validate={{


                                }} autoComplete="assessmentNo" bsSize="sm" />
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={2}></Col>
                <Col sm={10} >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="neighboursAccNo" >Neighbors Acc. No </Label></Col>
                            <Col sm={8}><AvField type="text" name="neighboursAccNo" id="neighboursAccNo" value={props.neighboursAccNo} onChange={props.handleChangeWiringLandDetails}
                                validate={{
                                    number: { value: true, errorMessage: 'Neighbors Acc. No content only numbers' },
                                    required: { value: true, errorMessage: 'This field is required' },
                                    minLength: { value: 10 },
                                    maxLength: { value: 10 }
                                }} autoComplete="neighboursAccNo" bsSize="sm" />
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="ownership" >Ownership</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput type="radio" id="ownership1" name="ownership" label="Occupy" value="Occupy" checked={props.ownership === 'Occupy'} onChange={props.handleChangeWiringLandDetails} autoComplete="ownership" inline />
                                    <CustomInput type="radio" id="ownership2" name="ownership" label="Rent" value="Rent" checked={props.ownership === 'Rent'} onChange={props.handleChangeWiringLandDetails} autoComplete="ownership" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="isGovernmentPlace" >Is Goverment Place</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput type="radio" id="isGovernmentPlace1" name="isGovernmentPlace" label="Yes" value="Y" checked={props.isGovernmentPlace === 'Y'} onChange={props.handleChangeWiringLandDetails} autoComplete="isGovernmentPlace" inline />
                                    <CustomInput type="radio" id="isGovernmentPlace2" name="isGovernmentPlace" label="No" value="N" checked={props.isGovernmentPlace === 'N'} onChange={props.handleChangeWiringLandDetails} autoComplete="isGovernmentPlace" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={2}></Col>
                <Col sm={10}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={2}><Label for="occupyOwnerCertified" >Occupy / Owner Certified</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput type="radio" id="occupyOwnerCertified1" name="occupyOwnerCertified" label="Yes" value="Y" checked={props.occupyOwnerCertified === 'Y'} onChange={props.handleChangeWiringLandDetails} autoComplete="occupyOwnerCertified" inline />
                                    <CustomInput type="radio" id="occupyOwnerCertified2" name="occupyOwnerCertified" label="No" value="N" checked={props.occupyOwnerCertified === 'N'} onChange={props.handleChangeWiringLandDetails} autoComplete="occupyOwnerCertified" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

        </React.Fragment>
    );
}

function Step5(props) {
    if (props.currentStep !== 5) {
        return null
    }
    return (
        <React.Fragment>

            <Row  >
                <AvGroup className="height_application"></AvGroup>
            </Row>

            <Row  >
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="noOfBulbs" >Number of Bulbs</Label></Col>
                            <Col sm={8}><AvInput type="text" name="noOfBulbs" id="noOfBulbs" value={props.noOfBulbs} onInput={props.handleUpperCase} onChange={props.handleChangeWiringLandDetails}
                                validate={{


                                }} autoComplete="noOfBulbs" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your suburb</Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="noOfFans" >Number of Fans</Label></Col>
                            <Col sm={8}><AvInput type="text" name="noOfFans" id="noOfFans" value={props.noOfFans} onInput={props.handleUpperCase} onChange={props.handleChangeWiringLandDetails}
                                validate={{

                                }} autoComplete="noOfFans" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your suburb</Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="noOfPlugs5a" >Number of Plugs(5A)</Label></Col>
                            <Col sm={8}><AvInput type="text" name="noOfPlugs5a" id="noOfPlugs5a" value={props.noOfPlugs5a} onInput={props.handleUpperCase} onChange={props.handleChangeWiringLandDetails}
                                validate={{


                                }} autoComplete="noOfPlugs5a" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your suburb</Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="noOfPlugs15a" >Number of Plugs(15A)</Label></Col>
                            <Col sm={8}><AvInput type="text" name="noOfPlugs15a" id="noOfPlugs15a" value={props.noOfPlugs15a} onInput={props.handleUpperCase} onChange={props.handleChangeWiringLandDetails}
                                validate={{


                                }} autoComplete="noOfPlugs15a" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your suburb</Alert></AvFeedback>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="motorTotal" >Motors Total(hp/Kw)</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput  type="radio" id="motorTotal1" name="motorTotal" label="Yes" value="1" checked={props.motorTotal === '1'} onChange={props.handleChangeWiringLandDetails} autoComplete="motorTotal" inline />
                                    <CustomInput  type="radio" id="motorTotal2" name="motorTotal" label="No" value="0" checked={props.motorTotal === '0'} onChange={props.handleChangeWiringLandDetails} autoComplete="motorTotal" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="weldingPlant" >Welding Plant(KVA)</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput  type="radio" id="weldingPlant1" name="weldingPlant" label="Yes" value="1" checked={props.weldingPlant === '1'} onChange={props.handleChangeWiringLandDetails} autoComplete="weldingPlant" inline />
                                    <CustomInput  type="radio" id="weldingPlant2" name="weldingPlant" label="No" value="0" checked={props.weldingPlant === '0'} onChange={props.handleChangeWiringLandDetails} autoComplete="weldingPlant" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="metalCrusher" >Metal Crusher(hp/Kw)</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput  type="radio" id="metalCrusher1" name="metalCrusher" label="Yes" value="1" checked={props.metalCrusher === '1'} onChange={props.handleChangeWiringLandDetails} autoComplete="metalCrusher" inline />
                                    <CustomInput  type="radio" id="metalCrusher2" name="metalCrusher" label="No" value="0" checked={props.metalCrusher === '0'} onChange={props.handleChangeWiringLandDetails} autoComplete="metalCrusher" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="sawMills" >Saw Mills(hp/Kw)</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput  type="radio" id="sawMills1" name="sawMills" label="Yes" value="1" checked={props.sawMills === '1'} onChange={props.handleChangeWiringLandDetails} autoComplete="sawMills" inline />
                                    <CustomInput  type="radio" id="sawMills2" name="sawMills" label="No" value="0" checked={props.sawMills === '0'} onChange={props.handleChangeWiringLandDetails} autoComplete="sawMills" inline />
                                </div>
                         </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="phase" >Phase</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput type="radio" id="phase1" name="phase" label="1 ph" value="1" checked={props.phase === '1'} onChange={props.handleChangePhase} autoComplete="phase" inline />
                                    <CustomInput type="radio" id="phase2" name="phase" label="3 ph" value="3" checked={props.phase === '3'} onChange={props.handleChangePhase} autoComplete="phase" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm={6}>
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="connectionType" >Connection Type</Label></Col>
                            <Col sm={8}>
                                <div>
                                    <CustomInput type="radio" id="connectionType1" name="connectionType" label="15" value="15" checked={props.connectionType === '15'} onChange={props.handleChangeWiringLandDetails} autoComplete="connectionType" inline />
                                    <CustomInput type="radio" id="connectionType2" name="connectionType" label="30" value="30" checked={props.connectionType === '30'} onChange={props.handleChangeWiringLandDetails} autoComplete="connectionType" inline />
                                    <CustomInput type={props.connectionType60} id="connectionType3" name="connectionType" label="60" value="60" checked={props.connectionType === '60'} onChange={props.handleChangeWiringLandDetails} autoComplete="connectionType" inline />
                                </div>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="customerCategory" inline="true" >Customer Category</Label></Col>
                            <Col sm={8} >
                                <AvField type="select" name="customerCategory" value={props.customerCategory} onChange={props.handleChangeWiringLandDetails} 
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' }
                                }} autoComplete="customerCategory" bsSize="sm">
                                    <option value="" disabled >Select </option>
                                    <option value="PRIV">Private</option>
                                    <option value="GOVE">Government</option>
                                    <option value="SEGO">Semi_Government</option>
                                    <option value="FORE">Foreign</option>
                                    <option value="RELI">Religious</option>
                                </AvField>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="customerType" inline="true" >Customer Type</Label></Col>
                            <Col sm={8} >
                                <AvField type="select" name="customerType" id="​customerType" value={props.customerType} onChange={props.handleChangeCustomerType} 
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' }
                                }} autoComplete="customerType" bsSize="sm">
                                    <option value="" disabled >Select </option>
                                    <option value="DOME">Domestic</option>
                                    <option value="CONS">Construction</option>
                                    <option value="SHOP">Shop/Office</option>
                                    <option value="SCHL">School</option>
                                    <option value="INDT">Industrial</option>
                                    <option value="HOTE">Hotel</option>
                                    <option value="GARM">Garment</option>
                                    <option value="FORC">Forces</option>
                                    <option value="TEMP">Temple</option>
                                    <option value="CHUR">Church</option>
                                    <option value="MOSQ">MOSQUE</option>
                                    <option value="FSER">Free Service</option>
                                    <option value="AGRI">Agriculture</option>
                                </AvField>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="​tariffCatCode" inline="true" >Tariff Category Code</Label></Col>
                            <Col sm={8} >
                                <AvField type="select" name="tariffCatCode" id="tariffCatCode" value={props.tariffCatCode} onChange={props.handletChangeTariffCatCode} 
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' }
                                }} autoComplete="tariffCatCode" bsSize="sm">
                                    <option value="" disabled >Select Traffic Category Code...</option>
                                    {props.tariffCategoryList.map((tariffCategory, key) =>
                                        <option value={tariffCategory.tariffCatCode} key={key}>{tariffCategory.tariffCatCode}</option>)}
                                </AvField>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>

                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row >
                            <Col sm={4}><Label for="tariffCode" inline="true" >Tariff Code </Label></Col>
                            <Col sm={8} >
                                <AvField type="select" name="tariffCode" id="​tariffCode" value={props.tariffCode} onChange={props.handleChangeWiringLandDetails} 
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' }
                                }} autoComplete="tariffCode" bsSize="sm">
                                    <option value="" disabled >Select Traffic Code...</option>
                                    {props.tariffList.map((tariff, key) =>
                                        <option value={tariff.tariffCode}>{tariff.tariffCode}</option>)}
                                </AvField>
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>

            <Row  >
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="preparedBy" >Prepared By</Label></Col>
                            <Col sm={8}><AvField disabled type="text" name="preparedBy" id="preparedBy" value={props.preparedBy} onInput={props.handleUpperCase} onChange={props.handleChange}
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' },

                                }} autoComplete="preparedBy" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your city</Alert></AvFeedback> </Col>
                        </FormGroup>
                    </AvGroup>

                </Col>
                <Col sm="6" >
                    <AvGroup className="height_application">
                        <FormGroup row>
                            <Col sm={4}><Label for="confirmedBy" >Confirmed By</Label></Col>
                            <Col sm={8}><AvField disabled type="text" name="confirmedBy" id="confirmedBy" value={props.confirmedBy} onInput={props.handleUpperCase} onChange={props.handleChange}
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' },

                                }} autoComplete="confirmedBy" bsSize="sm" />
                                <AvFeedback><Alert className="alert" color="danger" >Please enter your city</Alert></AvFeedback> </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
            </Row>
        </React.Fragment>
    );
}

function Step6(props) {
    //ref={}
    if (props.currentStep !== 6) {
        return null
    }

    return (
        <React.Fragment>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <img className="img_application" src={Correction} alt={"Correction"} ></img>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </React.Fragment>

    )
}



export default withRouter(ApplicationAdd);
