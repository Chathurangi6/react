import React from 'react';
import { withRouter } from 'react-router-dom';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField } from 'availity-reactstrap-validation';
import { Button, FormGroup, Label, Col, Row, CustomInput, Alert, Jumbotron } from 'reactstrap';
import './css/ApplicationAdd.css'
import * as FontAwesome from 'react-icons/lib/fa'
import Swal from 'sweetalert2';
import { animateScroll as scroll } from 'react-scroll'
import Correction from './css/correct-symbol.png'
import { Helmet } from 'react-helmet'
const TITLE = 'Edit Application'

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
        applicationSubType: '',
        applicationType: 'NC',
        confirmedBy: '',
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
        preparedBy: '',
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
        customerCategory: '',
        customerType: '',
        existingAccNo: '',
        isGovernmentPlace: 'N',
        metalCrusher: '',
        motorTotal: '',
        neighboursAccNo: '',
        noOfBulbs: '',
        noOfDmgMeters: '',
        noOfFans: '',
        noOfPlugs15a: '',
        noOfPlugs5a: '',
        occupyOwnerCertified: 'Y',
        ownership: 'Occupy',
        phase: '1',
        sawMills: '',
        serviceCity: '',
        serviceDistrict: '',
        servicePostalCode: '',
        serviceStreetAddress: '',
        serviceSuburb: '',
        tariffCatCode: '',
        tariffCode: '',
        weldingPlant: '',
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
        this.state = {
            isLoading: true,
            currentStep: 1,
            isActive: [],
            isCompleted: [],
            buttonDisabled: true,
            validate: false,
            editStep: false,
            connectionType60: 'hidden',
            updApplication: this.initialApplication,
            updWiringLandDetails: this.initialWiringLandDetails,
            updApplicant: this.initialApplicant,
            updSpapplon: this.initialSpapplon,
            initialFetchUpdWiringLandDetail: [],
            title: ["Personal Details", "Application Details", "Contact Personal Details", "Service Location Details", "Details of wiring", "Finish"],
            csc: {},
            tariffCategoryList: [],
            tariffList: [],
            returnOfAddApplication: this.initialApplication


        }
        this.handleChangeApplication = this.handleChangeApplication.bind(this)
        this.handleChangeWiringLandDetails = this.handleChangeWiringLandDetails.bind(this)
        this.handleChangeApplicant = this.handleChangeApplicant.bind(this)
        //this.handleChange = this.handleChange.bind(this)
        //this.handleWiringLandDetailsAddress = this.handleWiringLandDetailsAddress.bind(this)
        this.handletChangeTariffCatCode = this.handletChangeTariffCatCode.bind(this)
        //this.handleApplicationIdAnaDeptId = this.handleApplicationIdAnaDeptId.bind(this)
        this._next = this._next.bind(this)
        this._next_finish = this._next_finish.bind(this)
        this.handleChangeApplicationSubType = this.handleChangeApplicationSubType.bind(this)
        this.getInitialvalue = this.getInitialvalue.bind(this)
    }

    async componentDidMount() {

        const decodedApplicationId = decodeURIComponent(this.props.match.params.applicationId);
        const application = await (await fetch(`/application/findByIdApplicationId?applicationId=${decodedApplicationId}`)).json();
        this.setState({ updApplication: application }, () => this.afterApplicationSubTypeSetStateFinished());

        console.log(application)


        const wiringLandDetail = await (await fetch(`/wiringLandDetail/findByIdApplicationId?applicationId=${decodedApplicationId}`)).json();
        this.setState({ updWiringLandDetails: wiringLandDetail }, () => this.getInitialvalue());
        console.log(wiringLandDetail)

        // await (await fetch(`/gldeptin/getCostCenterName?deptId=514.20`)
        //     .then(response => response.json())
        //     .then(data => this.setState({ csc: data }))
        // )

        await (await fetch(`/gldeptin/getCostCenterName?deptId=${sessionStorage.getItem('costCenterNo')}`)
            .then(response => response.json())
            .then(data => this.setState({ csc: data }))
        )


        // await (await fetch(`/applicant/findByIdNo?idNo=433454345v`)
        //     .then(response => response.json())
        //     .then(data => this.setState({ updApplicant: data }))
        // )

        await (await fetch(`/applicant/findByIdNo?idNo=${this.state.updApplication.idNo}`)
        .then(response => response.json())
        .then(data => this.setState({ updApplicant: data }))
    )

        

        await (await fetch(`/gldeptin/getCostCenterName?deptId=${sessionStorage.getItem('costCenterNo')}`)
            .then(response => response.json())
            .then(data => this.setState({ csc: data }))
        )

        await (await fetch(`/tariffCategory/findTariffCatCodeOrderByTariffCatName`)
            .then(response => response.json())
            .then(data => this.setState({ tariffCategoryList: data }))
        )

        await (await fetch(`/tariff/findTariffCode?tariffCatCode=${this.state.updWiringLandDetails.tariffCatCode}`)
            .then(response => response.json())
            .then(data => this.setState({ tariffList: data }))
        )

        let isCompleted = this.state.isCompleted;
        for (let i = 0; i < 5; i++) {
            isCompleted[i] = 'completed'
        }


        let isActive = this.state.isActive;
        isActive = [];
        isActive[0] = 'active'//Active first circle in multisteps progress bar
        this.setState({ isActive, isLoading: false });


    }



    // handleApplicationIdAnaDeptId() {

    //     const applicationId = 'applicationId';
    //     const deptId = 'deptId';
    //     const applicationNo = 'applicationNo';

    //     let application = this.state.application;
    //     console.log(this.state.autoApplicationId.applicationId)
    //     application.id[applicationId] = this.state.autoApplicationId.applicationId;
    //     application.id[deptId] = this.state.autoApplicationId.deptId;
    //     this.setState({ application });
    //     let wiringLandDetails = this.state.wiringLandDetails;
    //     wiringLandDetails.id[applicationId] = this.state.autoApplicationId.applicationId  ;
    //     wiringLandDetails.id[deptId] = this.state.autoApplicationId.deptId;
    //     this.setState({ wiringLandDetails });
    //     let spapplon = this.state.spapplon;
    //     spapplon.id[applicationNo] = this.state.autoApplicationId.applicationId;
    //     spapplon.id[deptId] = this.state.autoApplicationId.deptId;
    //     this.setState({ spapplon });

    // }

    getInitialvalue() {
        let initialFetchUpdWiringLandDetail = this.state.initialFetchUpdWiringLandDetail
        let customerType = 'customerType'
        let tariffCatCode = 'tariffCatCode'
        let tariffCode = 'tariffCode'
        initialFetchUpdWiringLandDetail[customerType] = this.state.updWiringLandDetails.customerType
        initialFetchUpdWiringLandDetail[tariffCatCode] = this.state.updWiringLandDetails.tariffCatCode
        initialFetchUpdWiringLandDetail[tariffCode] = this.state.updWiringLandDetails.tariffCode

        console.log(initialFetchUpdWiringLandDetail)
    }



    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //const applicationNo = 'applicationNo';
        let updApplication = { ...this.state.updApplication };
        updApplication.id[name] = value;
        this.setState({ updApplication });
        let updWiringLandDetails = { ...this.state.updWiringLandDetails };
        updWiringLandDetails.id[name] = value;
        this.setState({ updWiringLandDetails });
        let spapplon = { ...this.state.spapplon };
        // spapplon.id[applicationNo] = value;
        spapplon.id[name] = value;
        this.setState({ spapplon });
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        for (let i = currentStep - 1; i < 5; i++) {
            isCompleted[i] = ''
        }

    }

    handleChangeWiringLandDetails = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let updWiringLandDetails = { ...this.state.updWiringLandDetails };
        updWiringLandDetails[name] = value;
        //updWiringLandDetails.id[name] = value;
        this.setState({ updWiringLandDetails });
        for (let i = currentStep - 1; i < 5; i++) {
            isCompleted[i] = ''
        }
    }

    handletChangeTariffCatCode(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let updWiringLandDetails = { ...this.state.updWiringLandDetails };
        updWiringLandDetails[name] = value;
        this.setState({ updWiringLandDetails }, () => this.afterTariffCatCodeSetStateFinished())
        for (let i = currentStep - 1; i < 5; i++) {
            isCompleted[i] = ''
        }

    }
    afterTariffCatCodeSetStateFinished() {
        console.log(this.state.updWiringLandDetails.tariffCatCode)
        fetch(`/tariff/findTariffCode?tariffCatCode=${this.state.updWiringLandDetails.tariffCatCode}`)
            .then(response => response.json())
            .then(data => this.setState({ tariffList: data }))
    }

    handleChangeApplicationSubType = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        ///let editStep = this.state.editStep;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let updApplication = { ...this.state.updApplication }
        updApplication[name] = value
        this.setState({ updApplication }, () => this.afterApplicationSubTypeSetStateFinished());
        for (let i = currentStep - 1; i < 5; i++) {
            isCompleted[i] = ''
        }
        //isCompleted[currentStep -1] = ''
    }
    async afterApplicationSubTypeSetStateFinished() {
        let updWiringLandDetails = this.state.updWiringLandDetails;
        let buttonDisabled
        let validate
        let customerType = 'customerType'
        let tariffCatCode = 'tariffCatCode'
        let tariffCode = 'tariffCode'
        let customerCategory = 'customerCategory'
        switch (this.state.updApplication.applicationSubType) {
            case 'C1':
                buttonDisabled = false;
                validate = true;
                updWiringLandDetails[customerType] = this.state.initialFetchUpdWiringLandDetail[customerType]
                updWiringLandDetails[tariffCatCode] = this.state.initialFetchUpdWiringLandDetail[tariffCatCode]
                updWiringLandDetails[tariffCode] = this.state.initialFetchUpdWiringLandDetail[tariffCode]
                updWiringLandDetails[customerCategory] = this.state.initialFetchUpdWiringLandDetail[customerCategory]
                break;
            case 'C2':
                buttonDisabled = false;
                validate = true;
                updWiringLandDetails[customerType] = this.state.initialFetchUpdWiringLandDetail[customerType]
                updWiringLandDetails[tariffCatCode] = this.state.initialFetchUpdWiringLandDetail[tariffCatCode]
                updWiringLandDetails[tariffCode] = this.state.initialFetchUpdWiringLandDetail[tariffCode]
                updWiringLandDetails[customerCategory] = this.state.initialFetchUpdWiringLandDetail[customerCategory]

                break;
            case 'C3':
                buttonDisabled = false;
                validate = true;
                updWiringLandDetails[customerType] = this.state.initialFetchUpdWiringLandDetail[customerType]
                updWiringLandDetails[tariffCatCode] = this.state.initialFetchUpdWiringLandDetail[tariffCatCode]
                updWiringLandDetails[tariffCode] = this.state.initialFetchUpdWiringLandDetail[tariffCode]
                updWiringLandDetails[customerCategory] = this.state.initialFetchUpdWiringLandDetail[customerCategory]
                break;
            case 'TA':
                buttonDisabled = true;
                validate = false;
                updWiringLandDetails.customerType = 'AGRI';
                updWiringLandDetails[tariffCatCode] = 'AG'
                updWiringLandDetails[tariffCode] = '7.1'
                updWiringLandDetails[customerCategory] = 'PRIV'
                break;
            case 'TU':
                buttonDisabled = true;
                validate = false;
                updWiringLandDetails.customerType = 'DOME';
                updWiringLandDetails[tariffCatCode] = 'DP'
                updWiringLandDetails[tariffCode] = '13'
                updWiringLandDetails[customerCategory] = 'PRIV'
                break;
            default:
                console.log(updWiringLandDetails.customerType)
                buttonDisabled = true;
                validate = false;
                updWiringLandDetails[customerType] = this.state.initialFetchUpdWiringLandDetail[customerType]
                updWiringLandDetails[tariffCatCode] = this.state.initialFetchUpdWiringLandDetail[tariffCatCode]
                updWiringLandDetails[tariffCode] = this.state.initialFetchUpdWiringLandDetail[tariffCode]
                updWiringLandDetails[customerCategory] = this.state.initialFetchUpdWiringLandDetail[customerCategory]

        }
        console.log(updWiringLandDetails)
        this.setState({ buttonDisabled: buttonDisabled, updWiringLandDetails: updWiringLandDetails, validate: validate }, () => this.afterSetState())
        console.log(this.state.initialFetchUpdWiringLandDetail[customerType])
    }
    async afterSetState() {

        await (await fetch(`/tariff/findTariffCode?tariffCatCode=${this.state.updWiringLandDetails.tariffCatCode}`)
            .then(response => response.json())
            .then(data => this.setState({ tariffList: data })))
        console.log(this.state.tariffList)
    }

    handleChangeCustomerType = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let preStep = this.state.preStep
        let updWiringLandDetails = { ...this.state.updWiringLandDetails }
        updWiringLandDetails[name] = value;
        //console.log(isCompleted)
        if (preStep === true) {
            for (let i = currentStep - 1; i < 5; i++) {
                isCompleted[i] = ' '
            }
        }
        //console.log(isCompleted)
        this.setState({ updWiringLandDetails }, () => this.afterCustomerTypeSetStateFinished());
    }
    async afterCustomerTypeSetStateFinished() {

        let updWiringLandDetails = this.state.updWiringLandDetails;
        let tariffCatCode = 'tariffCatCode'
        let tariffCode = 'tariffCode'
        console.log(this.state.updWiringLandDetails.customerType)
        switch (this.state.updWiringLandDetails.customerType) {
            case 'DOME':
                updWiringLandDetails[tariffCatCode] = 'DP'
                updWiringLandDetails[tariffCode] = '11'
                break;
            case 'CONS':
                updWiringLandDetails[tariffCatCode] = 'GP'
                updWiringLandDetails[tariffCode] = '31'
                break;
            case 'SHOP':
                updWiringLandDetails[tariffCatCode] = 'GP'
                updWiringLandDetails[tariffCode] = '31'
                break;
            case 'SCHL':
                updWiringLandDetails[tariffCatCode] = 'GP'
                updWiringLandDetails[tariffCode] = '31'
                break;
            case 'INDT':
                updWiringLandDetails[tariffCatCode] = 'IP'
                updWiringLandDetails[tariffCode] = '21'
                break;
            case 'HOTE':
                updWiringLandDetails[tariffCatCode] = 'GP'
                updWiringLandDetails[tariffCode] = '31'
                break;
            case 'GARM':
                updWiringLandDetails[tariffCatCode] = 'IP'
                updWiringLandDetails[tariffCode] = '21'
                break;
            case 'FORC':
                updWiringLandDetails[tariffCatCode] = 'GP'
                updWiringLandDetails[tariffCode] = '31'
                break;
            case 'TEMP':
                updWiringLandDetails[tariffCatCode] = 'RP'
                updWiringLandDetails[tariffCode] = '51'
                break;
            case 'CHUR':
                updWiringLandDetails[tariffCatCode] = 'RP'
                updWiringLandDetails[tariffCode] = '51'
                break;
            case 'MOSQ':
                updWiringLandDetails[tariffCatCode] = 'RP'
                updWiringLandDetails[tariffCode] = '51'
                break;
            case 'AGRI':
                updWiringLandDetails[tariffCatCode] = 'AG'
                updWiringLandDetails[tariffCode] = '71'
                break;
            default:
                updWiringLandDetails[tariffCatCode] = ''
                updWiringLandDetails[tariffCode] = ''
        }
        console.log(updWiringLandDetails)
        this.setState({ updWiringLandDetails: updWiringLandDetails }, () => this.afterSetState2())
    }
    async afterSetState2() {

        await (await fetch(`/tariff/findTariffCode?tariffCatCode=${this.state.updWiringLandDetails.tariffCatCode}`)
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
        let updWiringLandDetails = { ...this.state.updWiringLandDetails }
        updWiringLandDetails[name] = value;
        //console.log(isCompleted)
        if (preStep === true) {
            for (let i = currentStep - 1; i < 5; i++) {
                isCompleted[i] = ' '
            }
        }
        //console.log(isCompleted)
        this.setState({ updWiringLandDetails }, () => this.afterPhaseSetStateFinished());


    }
    async afterPhaseSetStateFinished() {

        console.log(this.state.updWiringLandDetails.phase)
        let connectionType60 = this.state.connectionType60
        switch (this.state.updWiringLandDetails.phase) {
            case '3':
                connectionType60 = 'radio'
                break;
            default:
                connectionType60 = 'hidden'
        }
        console.log(connectionType60)
        this.setState({ connectionType60: connectionType60 })
    }


    handleChangeApplication = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let updApplication = { ...this.state.updApplication };
        updApplication[name] = value;
        //updApplication.id[name] = value;
        this.setState({ updApplication });
        for (let i = currentStep - 1; i < 5; i++) {
            isCompleted[i] = ''
        }
    }

    handleChangeApplicant = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let isCompleted = this.state.isCompleted
        let currentStep = this.state.currentStep
        let updApplicant = { ...this.state.updApplicant };
        updApplicant[name] = value;
        this.setState({ updApplicant });
        for (let i = currentStep - 1; i < 5; i++) {
            isCompleted[i] = ''
        }
    }

    handleSubmit = async (event) => {

        let currentStep = this.state.currentStep
        if (currentStep === 5) {
            const { updApplication, updWiringLandDetails, updSpapplon } = this.state;
            //     alert(`Your registration detail: \n  
            // ${application.id.applicationId}\n
            // ${application.id.deptId}\n
            // ${application.linkedWith}\n
            // ${wiringLandDetails.serviceStreetAddress}\n
            // ${wiringLandDetails.serviceSuburb}\n
            //  `)
            //transactionalApplication
            updApplication.updUser = sessionStorage.getItem('userName')
            updApplication.confirmedBy = sessionStorage.getItem('userName')
            updWiringLandDetails.updUser = sessionStorage.getItem('userName')
            let updapplicationAddService = await fetch(`/transactionalApplication/upd`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    application: updApplication,
                    wiringLandDetail: updWiringLandDetails,
                    spapplon: updSpapplon
                }),
            });
            console.log(JSON.stringify({
                application: updApplication,
                wiringLandDetail: updWiringLandDetails,
                spapplon: updSpapplon
            }))
            if (updapplicationAddService.status === 200) {
                await Swal.fire({
                    type: 'success',
                    title: 'Your work has been updated',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 3000
                })

                let currentStep = this.state.currentStep
                let isCompleted = this.state.isCompleted;
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
                        
            }

            // let updatedApplication = await fetch(`/application/upd/${updApplication.id.deptId}/${updApplication.id.applicationId}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(updApplication),

            // });

            // if (updatedApplication.status === 200) {
            //     //let jsonUpdatedApplication = await updatedApplication.json();
            //     let updatedWiringLandDetails = await fetch(`/wiringLandDetail/upd/${updWiringLandDetails.id.deptId}/${updApplication.id.applicationId}`, {
            //         method: 'PUT',
            //         headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(updWiringLandDetails),

            //     });
            //     console.log(updatedWiringLandDetails.status)
            //     if (updatedWiringLandDetails.status === 200) {
            //         //let jsonUpdatedWiringLandDetails = await updatedWiringLandDetails.json();
            //         await Swal.fire({
            //             type: 'success',
            //             title: 'Your work has been updated',
            //             position: 'top',
            //             showConfirmButton: false,
            //             heightAuto: false,
            //             width: 400,
            //             timer: 3000
            //         })


            //         let currentStep = this.state.currentStep
            //         let isCompleted = this.state.isCompleted;
            //         isCompleted[currentStep] = 'completed';//Complete the last circle in multistep progress bar
            //         this.setState({ isCompleted }, () => this._next_finish());
            //         setTimeout(() => {
            //             this.props.history.push('/');
            //         }, 4000);


            //     } else {
            //         await fetch(`/application/upd/${updApplication.id.deptId}/${updApplication.id.applicationId}`, {
            //             method: 'PUT',
            //             headers: {
            //                 'Accept': 'application/json',
            //                 'Content-Type': 'application/json'
            //             },
            //             body: JSON.stringify(this.application),

            //         });
            //         Swal.fire({
            //             type: 'error',
            //             title: 'Oops...Oops..',
            //             text: 'Something went wrong! Try Again'
            //         })
            //         this.props.history.push('/');

            //     }
            // } else {
            //     Swal.fire({
            //         type: 'error',
            //         title: 'Oops...',
            //         text: 'Something went wrong! Try Again'
            //     })
            //     this.props.history.push('/');
            // }




        } else {
            let isCompleted = this.state.isCompleted;
            this.setState({ isCompleted }, () => this._next());
        }



    }

    _next = () => {
        let currentStep = this.state.currentStep
        let isCompleted = this.state.isCompleted
        if (currentStep === 5) {
        } else {
            currentStep = currentStep >= 5 ? 5 : currentStep + 1
            this.setState({ currentStep: currentStep }, () => this.setActive())
            for (let i = 0; i < 5; i++) {
                isCompleted[i] = 'completed'
            }
        }
        scroll.scrollToTop();

    }

    _next_finish = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 6 ? 6 : currentStep + 1
        this.setState({ currentStep: currentStep }, () => this.setActiveFinish())
        scroll.scrollToTop()
    }


    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
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
        let isCompleted = this.state.isCompleted;
        if (num === 1) {
            currentStep = num;
            this.setState({ currentStep: currentStep }, () => this.setActive());

        } else if (isCompleted[num - 2] === 'completed') {
            currentStep = num;
            this.setState({ currentStep: currentStep, editStep: true }, () => this.setActive());
        }

    }


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

        const { updApplication, updWiringLandDetails, updApplicant, title, currentStep, csc, isLoading } = this.state;

        // if (updApplication.status !== 'E') {

        //     let isCompleted = this.state.isCompleted;
        //     for(let i=0;i<5;i++){
        //          isCompleted[i] = 'completed'
        //     }
        // } else {
        //     Swal.fire({
        //         type: 'warning',
        //         text: `you are not permited to update ${updApplication.id.applicationId}`,
        //         position: 'top',
        //         heightAuto: false,
        //         width: 400,
        //     })
        //     this.props.history.push('/application/list');

        // }

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (

            <React.Fragment>
                <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
                <Jumbotron className="jum_application" >

                    <h5 style={{ textAlign: "center" }} >APPLICATION FORM CEYLON ELECTRICITY BOARD</h5>
                    <br />
                    <ul className="progressbar_ApplicationAddEdit">
                        <li className={this.state.isCompleted[0] + ' ' + this.state.isActive[0]} onClick={() => this.goToStep(1)}>Personal Details</li>
                        <li className={this.state.isCompleted[1] + ' ' + this.state.isActive[1]} onClick={() => this.goToStep(2)}>Application Details</li>
                        <li className={this.state.isCompleted[2] + ' ' + this.state.isActive[2]} onClick={() => this.goToStep(3)}>Contact Personal Details</li>
                        <li className={this.state.isCompleted[3] + ' ' + this.state.isActive[3]} onClick={() => this.goToStep(4)}>Service Location Details</li>
                        <li className={this.state.isCompleted[4] + ' ' + this.state.isActive[4]} onClick={() => this.goToStep(5)}>Details of wiring</li>
                        <li className={this.state.isCompleted[5] + ' ' + this.state.isActive[5]} >Finish</li>
                    </ul>

                    <Jumbotron className="jum_application_form" >
                        <h6 style={{ textAlign: "center" }} >Step {this.state.currentStep} - {title[currentStep - 1]}</h6>
                        <AvForm onValidSubmit={this.handleSubmit} >


                            <Step1
                                currentStep={this.state.currentStep}
                                handleChangeApplicant={this.handleChangeApplicant}
                                idType={updApplicant.idType}
                                idNo={updApplicant.idNo}
                                firstName={updApplicant.firstName}
                                lastName={updApplicant.lastName}
                                streetAddress={updApplicant.streetAddress}
                                telephoneNo={updApplicant.telephoneNo}
                                suburb={updApplicant.suburb}
                                mobileNo={updApplicant.mobileNo}
                                city={updApplicant.city}
                                email={updApplicant.email}
                                postalCode={updApplicant.postalCode}
                                preferredLanguage={updApplicant.preferredLanguage}
                                cebEmployee={updApplicant.cebEmployee}

                            />
                            <Step2
                                currentStep={this.state.currentStep}
                                handleChangeApplication={this.handleChangeApplication}
                                handleChange={this.handleChange}
                                handleChangeApplicationSubType={this.handleChangeApplicationSubType}
                                applicationId={updApplication.id.applicationId}
                                buttonDisabled={this.state.buttonDisabled}
                                addDate={updApplication.addDate}
                                deptId={updApplication.id.deptId}
                                applicationType={updApplication.applicationType}
                                existingAccNo={updWiringLandDetails.existingAccNo}
                                applicationSubType={updApplication.applicationSubType}
                                linkedWith={updApplication.linkedWith}
                                duration={updApplication.duration}
                                durationType={updApplication.durationType}
                                allocatedTo={updApplication.allocatedTo}
                                fromDate={updApplication.fromDate}
                                toDate={updApplication.toDate}
                                applicationNo={updApplication.applicationNo}
                                status={updApplication.status}
                                isPiv1Needed={updApplication.isPiv1Needed}
                                description={updApplication.description}
                                isLoanApp={updApplication.isLoanApp}
                                samurdhiMember={updApplication.samurdhiMember}
                                //submitDate={updApplication.submitDate}
                                csc={csc.deptFullName}
                                date={this.date}
                                validate={this.state.validate}
                            />
                            <Step3
                                currentStep={this.state.currentStep}
                                handleChangeApplication={this.handleChangeApplication}
                                contactIdNo={updApplication.contactIdNo}
                                contactName={updApplication.contactName}
                                contactAddress={updApplication.contactAddress}
                                contactTelephone={updApplication.contactTelephone}
                                contactMobile={updApplication.contactMobile}
                                contactEmail={updApplication.contactEmail}
                            />

                            <Step4
                                currentStep={this.state.currentStep}
                                handleChangeWiringLandDetails={this.handleChangeWiringLandDetails}
                                handleWiringLandDetailsAddress={this.handleWiringLandDetailsAddress}
                                serviceStreetAddress={updWiringLandDetails.serviceStreetAddress}
                                serviceSuburb={updWiringLandDetails.serviceSuburb}
                                serviceCity={updWiringLandDetails.serviceCity}
                                servicePostalCode={updWiringLandDetails.servicePostalCode}
                                zoneId={updWiringLandDetails.zoneId}
                                assessmentNo={updWiringLandDetails.assessmentNo}
                                neighboursAccNo={updWiringLandDetails.neighboursAccNo}
                                ownership={updWiringLandDetails.ownership}
                                isGovernmentPlace={updWiringLandDetails.isGovernmentPlace}
                                occupyOwnerCertified={updWiringLandDetails.occupyOwnerCertified}
                            />

                            <Step5
                                currentStep={this.state.currentStep}
                                handleChangeWiringLandDetails={this.handleChangeWiringLandDetails}
                                handleChange={this.handleChangeApplication}
                                tariffCategoryList={this.state.tariffCategoryList}
                                tariffList={this.state.tariffList}
                                handleChangeCustomerType={this.handleChangeCustomerType}
                                handletChangeTariffCatCode={this.handletChangeTariffCatCode}
                                handleChangePhase={this.handleChangePhase}
                                connectionType60={this.state.connectionType60}
                                noOfBulbs={updWiringLandDetails.noOfBulbs}
                                noOfFans={updWiringLandDetails.noOfFans}
                                noOfPlugs5a={updWiringLandDetails.noOfPlugs5a}
                                noOfPlugs15a={updWiringLandDetails.noOfPlugs15a}
                                motorTotal={updWiringLandDetails.motorTotal}
                                weldingPlant={updWiringLandDetails.weldingPlant}
                                metalCrusher={updWiringLandDetails.metalCrusher}
                                sawMills={updWiringLandDetails.sawMills}
                                phase={updWiringLandDetails.phase}
                                connectionType={updWiringLandDetails.connectionType}
                                customerCategory={updWiringLandDetails.customerCategory}
                                customerType={updWiringLandDetails.customerType}
                                tariffCatCode={updWiringLandDetails.tariffCatCode}
                                tariffCode={updWiringLandDetails.tariffCode}
                                confirmedBy={updApplication.confirmedBy}
                                preparedBy={updApplication.preparedBy}
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
                </Jumbotron>


            </React.Fragment>
        );
    }
    //scrollToMyRef = () => window.scrollTo(0, 1000)

}

function Step1(props) {

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
                                <div >
                                    <CustomInput type="radio" id="idType1" name="idType" label="NIC" value="NIC" checked={props.idType === 'NIC'} onChange={props.handleChangeApplicant} autoComplete="idType" inline />
                                    <CustomInput type="radio" id="idType2" name="idType" label="PASSPORT" value="PASSPORT" checked={props.idType === 'PASSPORT'} onChange={props.handleChangeApplicant} autoComplete="idType" inline />
                                    <CustomInput type="radio" id="idType3" name="idType" label="BUS REG NO" value="BUS REG NO" checked={props.idType === 'BUS REG NO'} onChange={props.handleChangeApplicant} autoComplete="idType" inline />
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
                            <Col sm={8} ><AvInput type="text" name="idNo" id="idNo" value={props.idNo} onChange={props.handleChangeApplicant}
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' },
                                    pattern: { value: '^([0-9]{9}(V|v)|[0-9]{11}(X|x))$', errorMessage: 'please enter valid Id number' }
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
                            <Col sm={8}><AvInput type="number" name="postalCode" id="postalCode" value={props.postalCode} onChange={props.handleChangeApplicant}
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
                            <Col sm={8}> <AvInput type="text" name="firstName" id="firstName" value={props.firstName} onInput={props.handleUpperCase} onChange={props.handleChangeApplicant} autoComplete="firstName"
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
                            <Col sm={8} > <AvInput type="number" name="telephoneNo" id="telephoneNo" value={props.telephoneNo} onChange={props.handleChangeApplicant}
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
                            <Col sm={8}><AvInput type="text" name="lastName" id="lastName" value={props.lastName} onInput={props.handleUpperCase} onChange={props.handleChangeApplicant} autoComplete="lastName"
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
                            <Col sm={8}><AvInput type="number" name="mobileNo" id="mobileNo" value={props.mobileNo} onChange={props.handleChangeApplicant}
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
                            <Col sm={8}><AvInput type="text" name="streetAddress" id="streetAddress" value={props.streetAddress} onInput={props.handleUpperCase} onChange={props.handleChangeApplicant}
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
                            <Col sm={8}><AvInput type="text" name="email" id="email" value={props.email} onChange={props.handleChangeApplicant} autoComplete="email"
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
                            <Col sm={8}><AvInput type="text" name="suburb" id="suburb" value={props.suburb} onInput={props.handleUpperCase} onChange={props.handleChangeApplicant}
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
                                    <CustomInput type="radio" id="preferredLanguage1" name="preferredLanguage" label="English" value="English" checked={props.preferredLanguage === 'English'} onChange={props.handleChangeApplicant} autoComplete="preferredLanguage" inline />
                                    <CustomInput type="radio" id="preferredLanguage2" name="preferredLanguage" label="Sinhala" value="Sinhala" checked={props.preferredLanguage === 'Sinhala'} onChange={props.handleChangeApplicant} autoComplete="preferredLanguage" inline />
                                    <CustomInput type="radio" id="preferredLanguage3" name="preferredLanguage" label="Tamil" value="Tamil" checked={props.preferredLanguage === 'Tamil'} onChange={props.handleChangeApplicant} autoComplete="preferredLanguage" inline />
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
                            <Col sm={8}><AvInput type="text" name="city" id="city" placeholder="City" value={props.city} onInput={props.handleUpperCase} onChange={props.handleChangeApplicant}
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
                                    <CustomInput type="radio" id="cebEmployee1" name="cebEmployee" label="Yes" value="Y" checked={props.cebEmployee === 'Y'} onChange={props.handleChangeApplicant} autoComplete="cebEmployee" inline />
                                    <CustomInput type="radio" id="cebEmployee2" name="cebEmployee" label="No" value="N" checked={props.cebEmployee === 'N'} onChange={props.handleChangeApplicant} autoComplete="cebEmployee" inline />
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
                            <Col sm={8}><AvInput type="text" name="existingAccNo" id="existingAccNo" value={props.existingAccNo} onChange={props.handleChangeApplication} onInput={props.handleUpperCase}
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
                                    required: { value: props.validate, errorMessage: 'This field is required' },
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
                            <Col sm={8}><AvInput disabled={props.buttonDisabled} type="date" name="fromDate" id="fromDate" value={props.fromDate} onChange={props.handleChangeApplication}
                                validate={{
                                    required: { value: props.validate, errorMessage: 'This field is required' },
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
                            <Col sm={8}><AvInput disabled={props.buttonDisabled} type="date" name="toDate" id="toDate" value={props.toDate} onChange={props.handleChangeApplication}
                                validate={{
                                    required: { value: props.validate, errorMessage: 'This field is required' },
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
                                    <option value="R1">NO</option>
                                    <option value="R2">b</option>

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
                            <Col sm={2}><Label for="serviceStreetAddress" >Street Address (line 1)</Label></Col>
                            <Col sm={8}><AvField type="text" name="serviceStreetAddress" id="serviceStreetAddress" value={props.serviceStreetAddress} onInput={props.handleUpperCase} onChange={props.handleChangeWiringLandDetails}
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
                            <Col sm={8}><AvField type="text" name="serviceCity" id="serviceCity" placeholder="City" value={props.serviceCity} onInput={props.handleUpperCase} onChange={props.handleChangeWiringLandDetails}
                                validate={{
                                    required: { value: true, errorMessage: 'This field is required' },
                                    maxLength: { value: 20, errorMessage: 'please add a city which length is below 20 characters' }


                                }} autoComplete="serviceCity" bsSize="sm" />
                                {/* <AvFeedback><Alert className="alert" color="danger" >Please enter your city</Alert></AvFeedback>  */}
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
                            <Col sm={8}><AvField type="number" name="zoneId" id="zoneId" value={props.zoneId} onChange={props.handleChangeWiringLandDetails}
                                validate={{
                                    minLength: { value: 2, errorMessage: 'Invalid postal code [format(xx)] ' },
                                    maxLength: { value: 2, errorMessage: 'Invalid postal code [format(xx)] ' }

                                }} autoComplete="zoneId" bsSize="sm" />
                            </Col>
                        </FormGroup>
                    </AvGroup>
                </Col>
                <Col sm={3} >

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
    // console.log(props.tariffCode)
    // console.log(props.phase)
    // console.log(typeof(props.phase))
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


                                }} autoComplete="noOfPlugs5a"  bsSize="sm" />
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


                                }} autoComplete="noOfPlugs15a"  bsSize="sm" />
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
                                    <CustomInput type="radio" id="motorTotal1" name="motorTotal" label="Yes" value="1" checked={props.motorTotal === '1' || props.motorTotal === 1} onChange={props.handleChangeWiringLandDetails} autoComplete="motorTotal" inline />
                                    <CustomInput type="radio" id="motorTotal2" name="motorTotal" label="No" value="0" checked={props.motorTotal === '0' || props.motorTotal === 0} onChange={props.handleChangeWiringLandDetails} autoComplete="motorTotal" inline />
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
                                    <CustomInput type="radio" id="weldingPlant1" name="weldingPlant" label="Yes" value="1" checked={props.weldingPlant === '1' || props.weldingPlant === 1} onChange={props.handleChangeWiringLandDetails} autoComplete="weldingPlant" inline />
                                    <CustomInput type="radio" id="weldingPlant2" name="weldingPlant" label="No" value="0" checked={props.weldingPlant === '0' || props.weldingPlant === 0} onChange={props.handleChangeWiringLandDetails} autoComplete="weldingPlant" inline />
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
                                    <CustomInput type="radio" id="metalCrusher1" name="metalCrusher" label="Yes" value="1" checked={props.metalCrusher === '1' || props.metalCrusher === 1} onChange={props.handleChangeWiringLandDetails} autoComplete="metalCrusher" inline />
                                    <CustomInput type="radio" id="metalCrusher2" name="metalCrusher" label="No" value="0" checked={props.metalCrusher === '0' || props.metalCrusher === 0} onChange={props.handleChangeWiringLandDetails} autoComplete="metalCrusher" inline />
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
                                    <CustomInput type="radio" id="sawMills1" name="sawMills" label="Yes" value="1" checked={props.sawMills === '1' || props.sawMills === 1} onChange={props.handleChangeWiringLandDetails} autoComplete="sawMills" inline />
                                    <CustomInput type="radio" id="sawMills2" name="sawMills" label="No" value="0" checked={props.sawMills === '0' || props.sawMills === 0} onChange={props.handleChangeWiringLandDetails} autoComplete="sawMills" inline />
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
                                    <CustomInput type="radio" id="phase1" name="phase" label="1 ph" value="1" checked={props.phase === '1' || props.phase === 1} onChange={props.handleChangePhase} autoComplete="phase" inline />
                                    <CustomInput type="radio" id="phase2" name="phase" label="3 ph" value="3" checked={props.phase === '3' || props.phase === 3} onChange={props.handleChangePhase} autoComplete="phase" inline />
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
                                    <CustomInput type="radio" id="connectionType1" name="connectionType" label="15" value="15" checked={props.connectionType === '15' || props.connectionType === 15} onChange={props.handleChangeWiringLandDetails} autoComplete="connectionType" inline />
                                    <CustomInput type="radio" id="connectionType2" name="connectionType" label="30" value="30" checked={props.connectionType === '30' || props.connectionType === 30} onChange={props.handleChangeWiringLandDetails} autoComplete="connectionType" inline />
                                    <CustomInput type={props.connectionType60} id="connectionType3" name="connectionType" label="60" value="60" checked={props.connectionType === '60' || props.connectionType === 60} onChange={props.handleChangeWiringLandDetails} autoComplete="connectionType" inline />
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
                                <AvField type="select" name="customerCategory" id="customerCategor" value={props.customerCategory} onChange={props.handleChangeWiringLandDetails}
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
                                        <option value={tariffCategory.tariffCatCode} key={key} >{tariffCategory.tariffCatCode}</option>)}
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
                                        <option value={tariff.tariffCode} key={key}>{tariff.tariffCode}</option>)}
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
                                    required: { value: true, errorMessage: 'This field is required' }
                                }} autoComplete="preparedBy" bsSize="sm" >
                            </AvField>
                            </Col>
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
                                }} autoComplete="confirmedBy" bsSize="sm" >
                            </AvField>
                            </Col>
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