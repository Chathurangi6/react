import React, { Component } from 'react';
import { BrowserRouter as Router , Route,Switch } from 'react-router-dom';
import Home from './component/Pages/Home';
import Landing from './component/Common/Landing/Landing';
import Login from './component/Pages/Login';
import SelectCostCenter from './component/Pages/SelectCostCenter';
import GroupList from './component/User/List';
import GroupEdit from './component/User/Edit';
import Add from './component/User/Add';
import WarehouseAdd from './component/Inventory/WarehouseAdd';
import WarehouseFullList from './component/Inventory/WarehouseFullList';
import WarehouseEdit from './component/Inventory/WarehouseEdit';
import Warehouse from './component/Inventory/Warehouse';
import AddAuthorizedAppType from './component/Master/AddAuthorizedAppType';
import ListAuthorizedAppType from './component/Master/ListAuthorizedAppType';
import Bank from './component/Master/Bank';
import BankAdd from './component/Master/BankAdd';
import BankEdit from './component/Master/BankEdit';
import BankBranchList from './component/Master/BankBranchList';
import BankBranchAdd from './component/Master/BankBranchAdd';
import BankBranchEdit from './component/Master/BankBranchEdit';
import EditAuthorizedAppType from './component/Master/EditAuthorizedAppType';
import GldeptinAdd from './component/gldeptin/GldeptinAdd';
import GldeptinEdit from './component/gldeptin/GldeptinEdit';
import GldeptinList from './component/gldeptin/GldeptinList';
import GldeptinView from './component/gldeptin/GldeptinView';
import CscBankList from './component/Master/CscBankList';
import CscBankEdit from './component/Master/CscBankEdit';
import CscBankAdd from './component/Master/CscBankAdd';
import TariffList from './component/Master/TariffList';
import TariffEdit from './component/Master/TariffEdit';
import TariffAdd from './component/Master/TariffAdd';
import TariffCategoryList from './component/Master/TariffCategoryList';
import TariffCategoryEdit from './component/Master/TariffCategoryEdit';
import TariffCategoryAdd from './component/Master/TariffCategoryAdd';
import Spdppolm from './component/spdppolm/Spdppolm';
import SpdppolmAdd from './component/spdppolm/SpdppolmAdd';
import SpdppolmEdit from './component/spdppolm/SpdppolmEdit';
import SpestmtmSearch from './component/Spestmtm/SpestmtmSearch';
import SpestmtmResult from './component/Spestmtm/SpestmtmResult';
import SpestmtmAdd from './component/Spestmtm/SpestmtmAdd';
import SpestmtmEdit from './component/Spestmtm/SpestmtmEdit';
import Splbpole from './component/splbpole/Splbpole';
import SplbpoleAdd from './component/splbpole/SplbpoleAdd';
import SplbpoleEdit from './component/splbpole/SplbpoleEdit';
import Splbpolt from './component/splbpolt/Splbpolt';
import SplbpoltAdd from './component/splbpolt/SplbpoltAdd';
import SplbpoltEdit from './component/splbpolt/SplbpoltEdit';
import Splbsrvc from './component/splbsrvc/Splbsrvc';
import SplbsrvcAdd from './component/splbsrvc/SplbsrvcAdd';
import SplbsrvcEdit from './component/splbsrvc/SplbsrvcEdit';
import Splbstay from './component/splbstay/Splbstay';
import SplbstayAdd from './component/splbstay/SplbstayAdd';
import SplbstayEdit from './component/splbstay/SplbstayEdit';
import Splbstrt from './component/splbstrt/Splbstrt';
import SplbstrtAdd from './component/splbstrt/SplbstrtAdd';
import SplbstrtEdit from './component/splbstrt/SplbstrtEdit';
import SppolemtSearch from './component/sppolemt/SppolemtSearch';
import SppolemtResult from './component/sppolemt/SppolemtResult';
import SppolemtAdd from './component/sppolemt/SppolemtAdd';
import SppolemtEdit from './component/sppolemt/SppolemtEdit';
import Spstaymt from './component/spstaymt/Spstaymt';
import SpstaymtAdd from './component/spstaymt/SpstaymtAdd';
import SpstaymtEdit from './component/spstaymt/SpstaymtEdit';
import Spstrutm from './component/spstrutm/Spstrutm';
import SpstrutmAdd from './component/spstrutm/SpstrutmAdd';
import SpstrutmEdit from './component/spstrutm/SpstrutmEdit';
import SpsvcwrmSearch from './component/spsvcwrm/SpsvcwrmSearch';
import SpsvcwrmResult from './component/spsvcwrm/SpsvcwrmResult';
import SpsvcwrmAdd from './component/spsvcwrm/SpsvcwrmAdd';
import SpsvcwrmEdit from './component/spsvcwrm/SpsvcwrmEdit';
import UserProfileEdit from './component/Master/UserProfileEdit';
import AddBillingCode from './component/Master/AddBillingCode';
import Spestedy from './component/spestedy/Spestedy';
import Spestedy2 from './component/spestedy/Spestedy2';
import SpestedyA from './component/spestedy/SpestedyA';
import SpestedyF from './component/spestedy/SpestedyF';
import EnhancedTable from './component/spestedy/EnhancedTable';
import SpestpemAdd from './component/DNotice/SpestpemAdd';
import SpestpemEdit from './component/DNotice/SpestpemEdit';
import SploopmtSearch from './component/sploopmt/SploopmtSearch';
import SploopmtResult from './component/sploopmt/SploopmtResult';
import SploopmtAdd from './component/sploopmt/SploopmtAdd';
import SploopmtEdit from './component/sploopmt/SploopmtEdit';
import SpugcblmhSearch from './component/spugcblmh/SpugcblmhSearch';
import SpugcblmhResult from './component/spugcblmh/SpugcblmhResult';
import SpugcblmhAdd from './component/spugcblmh/SpugcblmhAdd';
import SpugcblmhEdit from './component/spugcblmh/SpugcblmhEdit';
import Calander from './component/Common/Calander/Calander';
import Footer from './component/Common/Foot/Footer';
import Cale from './Cale';
import Spcndctmh from './component/Spcndctmh/Spcndctmh';
import Spcrconvh from './component/Spcrconvh/Spcrconvh';
import Spcstngmh from './component/Spcstngmh/Spcstngmh';
import Splpsvcmh from './component/Splpsvcmh/Splpsvcmh';
import Spratesmh from './component/Spratesmh/Spratesmh';
import Spsecdeph from './component/Spsecdeph/Spsecdeph';
import Spugcblmh from './component/SpugcblmhView/Spugcblmh';
import Navigation from './component/Common/Nav/Navigation';
import Navbar from './component/Common/Nav/Navbar';

import LabourList from './component/Labour/LabourList';
import LabourAdd from './component/Labour/LabourAdd';
import LabourEdit from './component/Labour/LabourEdit';
import LabourGroup from './component/Labour/LabourGroup';
import ConductorRateList from './component/ConductorRate/ConductorRateList';
import ConversionRateList from './component/ConversionRate/ConversionRateList';
import StandardConstructionRateList from './component/StandardConstructionRate/StandardConstructionRateList';
import LabourNormList from './component/LabourNorm/LabourNormList';
import SpecialRateList from './component/SpecialRate/SpecialRateList';
import ContractorAdd from './component/Contractor/ContractorAdd';
import ContractorList from './component/Contractor/ContractorList';
import ContractorEdit from './component/Contractor/ContractorEdit';
import ContractorGroup from './component/Contractor/ContractorGroup';
import LoopServiceWireList from './component/LoopServiceWire/LoopServiceWireList';
import ApplicationAdd from './component/application/ApplicationAdd';
import ApplicationEdit from './component/application/ApplicationEdit';
import ApplicationView from './component/application/ApplicationView';
import ApplicationSearch from './component/application/ApplicationSearch';
import ApplicationResult from './component/application/ApplicationResult';
import ApplicantAdd from './component/application/ApplicantAdd';
import ApplicantSearch from './component/application/ApplicantSearch';
import ApplicantResult from './component/application/ApplicantResult';
import ApplicantEdit from './component/application/ApplicantEdit';
import ApplicantView from './component/application/ApplicantView';
import ServiceEstimateAdd from './component/ServiceEstimate/ServiceEstimateAdd';
import ServiceEstimateEdit from './component/ServiceEstimate/ServiceEstimateEdit';
import ServiceEstimateView from './component/ServiceEstimate/ServiceEstimateView';

import UserManual from './component/UserManuDownloads/UserManual';
import StandardRates from './component/standardRates/standardRates';
import Circular from './component/Circular/circular';
import SendToBilling from './component/Billing/SendToBilling';
import AccountInfo from './component/Billing/AccountInfo';
import EstimateAdd from './component/Estimate/EstimateAdd';
import EstimateEdit from './component/Estimate/EstimateEdit';
import EstimateView from './component/Estimate/EstimateView';
import JobRevise from './component/Job/JobRevise';
import JobView from './component/Job/JobView';
import Estimatedashboard  from './component/Dash/Estimatedashboard ';
import ApprovalLimits from './component/Master/ApprovalLimits';
import peggingestView from './component/PeggingEstimate/peggingestView';
import JobCreate from './component/Job/JobCreate';
import ReportGenerate from './component/admin/ReportGenerate'
class App extends Component {
  
  render() {
    const LoginContainer = () => (
      <div >
        <Navbar/>
        <Route path="/" exact component={Landing}/>
        <Route path="/login" component={Login} />
        <Route path='/selectCostCenter' component={SelectCostCenter}/>
          <Route path='/UserManual' exact={true} component={UserManual}/>
           <Route path='/StandardRates' exact={true} component={StandardRates}/>
           <Route path='/circular' exact={true} component={Circular}/>
        <br/>
        <br/>
        <br/>   
        <Footer/>
      </div>
    )
  const DefaultContainer = () => (
    <div >
      <Navigation/>
            <div className="cover-container d-flex h-100  mx-auto flex-column">
            <Route path="/home" exact component={Home}/> 
            <Route path="/login" exact component={Login}/>
            <Route path="/selectCostCenter" exact component={SelectCostCenter}/>
            <Route path='/groups/add' exact={true} component={Add}/>
            <Route path='/groups/edit/:id' exact={true} component={GroupEdit}/>
            <Route path='/groups' exact={true} component={GroupList}/>
            <Route path='/warehouse/edit/:deptId/:wrhDept'  exact={true} component={WarehouseEdit}/>
            <Route path='/warehouse/add'  exact={true} component={WarehouseAdd}/> 
            <Route path='/warehouseFullList'  exact={true} component={WarehouseFullList}/>
            <Route path='/warehouse'  exact={true} component={Warehouse}/>
            <Route path='/authorizedAppType/add/:deptId' exact={true} component={AddAuthorizedAppType}/>
            <Route path='/authorizedAppType/edit/:deptId/:applicationType' exact={true} component={EditAuthorizedAppType}/>
            <Route path='/authorizedAppType' exact={true} component={ListAuthorizedAppType}/>
            <Route path='/gldeptin/add' exact={true} component={GldeptinAdd} />
            <Route path='/gldeptin/edit/:deptId' exact={true} component={GldeptinEdit} />
            <Route path='/gldeptinSearch' exact={true} component={GldeptinList} />
            <Route path='/gldeptin/view' exact={true} component={GldeptinView} />
            <Route path='/bank' exact={true} component={Bank} />
            <Route path='/bank/add' exact={true} component={BankAdd} />
            <Route path='/bank/edit/:bankCode' component={BankEdit}/>

            <Route path='/branch' exact={true} component={BankBranchList} />
            <Route path='/branch/add' exact={true} component={BankBranchAdd} />
            <Route path='/branch/edit/:bankCode/:branchCode' exact={true} component={BankBranchEdit} />
            <Route path='/cscBank' exact={true} component={CscBankList}/>
           <Route path='/cscBank/edit/:deptId/:bankCode/:branchCode' component={CscBankEdit}/>
            <Route path='/cscBank/add' component={CscBankAdd}/>
            <Route path='/tariff' exact={true} component={TariffList}/>
            <Route path='/tariff/edit/:tariffCode' component={TariffEdit}/>
            <Route path='/tariff/add' component={TariffAdd}/>
            <Route path='/tariffCategory' exact={true} component={TariffCategoryList}/>
            <Route path='/tariffCategory/edit/:tariffCatCode' component={TariffCategoryEdit}/>
            <Route path='/tariffCategory/add' component={TariffCategoryAdd}/>
            <Route path='/spestpemAdd' component={SpestpemAdd}/>
            <Route path='/spestpemEdit' component={SpestpemEdit}/>
            <Route path="/spdppolm" component={Spdppolm}/>
            <Route path="/addspdppolm" component={SpdppolmAdd}/>
            <Route path="/spdppolmedit/:deptId/:matCd" component={SpdppolmEdit}/>
            <Route path='/spestmtm' component={SpestmtmSearch}/>
            <Route path='/spestmtmresult/:deptId/:phase/:connectionType/:wiringType'  component={SpestmtmResult}/>
            <Route path='/spestmtmadd/:deptId/:phase/:connectionType/:wiringType'  component={SpestmtmAdd}/>
            <Route path='/spestmtmedit/:deptId/:matCd/:phase/:connectionType/:wiringType'  component={SpestmtmEdit}/>
            <Route path="/splbpole" component={Splbpole}/>
            <Route path="/addsplbpole" component={SplbpoleAdd}/>
            <Route path="/splbpoleedit/:deptId/:matCd/:labourCode" component={SplbpoleEdit}/>
            <Route path="/splbpolt" component={Splbpolt}/>
            <Route path="/addsplbpolt" component={SplbpoltAdd}/>
            <Route path="/splbpoltedit/:deptId/:matCd/:labourCode" component={SplbpoltEdit}/>
            <Route path="/splbsrvc" component={Splbsrvc}/>
            <Route path="/addsplbsrvc" component={SplbsrvcAdd}/>
            <Route path="/splbsrvcedit/:deptId/:labourCode" component={SplbsrvcEdit}/>
            <Route path="/splbstay" component={Splbstay}/>
            <Route path="/addsplbstay" component={SplbstayAdd}/>
            <Route path="/splbstayedit/:deptId/:labourCode" component={SplbstayEdit}/>
            <Route path="/splbstrt" component={Splbstrt}/>
            <Route path="/addsplbstrt" component={SplbstrtAdd}/>
            <Route path="/splbstrtedit/:deptId/:labourCode" component={SplbstrtEdit}/>
            <Route path='/sppolemt' component={SppolemtSearch}/>
            <Route path='/sppolemtresult/:deptId/:phase/:poleType/:fromConductor/:toConductor'  component={SppolemtResult}/>
            <Route path='/sppolemtadd/:deptId/:phase/:poleType/:fromConductor/:toConductor'  component={SppolemtAdd}/>
            <Route path='/sppolemtedit/:deptId/:matCd/:phase/:poleType/:fromConductor/:toConductor'  component={SppolemtEdit}/>
            <Route path="/spstaymt" component={Spstaymt}/>
            <Route path="/addspstaymt" component={SpstaymtAdd}/>
            <Route path="/spstaymtedit/:deptId/:matCd" component={SpstaymtEdit}/>
            <Route path="/spstrutm" component={Spstrutm}/>
            <Route path="/addspstrutm" component={SpstrutmAdd}/>
            <Route path="/spstrutmedit/:deptId/:matCd" component={SpstrutmEdit}/>
            <Route path='/spsvcwrm' component={SpsvcwrmSearch}/>
            <Route path='/spsvcwrmresult/:deptId/:phase/:connectionType/:wiringType'  component={SpsvcwrmResult}/>
            <Route path='/spsvcwrmadd/:deptId/:phase/:connectionType/:wiringType'  component={SpsvcwrmAdd}/>
            <Route path='/spsvcwrmedit/:deptId/:matCd/:phase/:connectionType/:wiringType'  component={SpsvcwrmEdit}/>
            <Route path='/billing' exact={true} component={AddBillingCode}/>
            <Route path='/sauserm' exact={true} component={UserProfileEdit}/>
           
            <Route path="/spestedy" component={Spestedy}/>
            <Route path="/spestedys" component={Spestedy2}/>
            <Route path="/spestedya" component={SpestedyA}/>
            <Route path="/spestedyf" component={SpestedyF}/>
            <Route path="/enhance" component={EnhancedTable}/>
            <Route path='/Cale' exact={true} component={Cale}/>
            <Route path="/calander" exact component={Calander}/>
            <Route path='/sploopmt' component={SploopmtSearch}/>
          <Route path='/sploopmtresult/:deptId/:phase/:connectionType/:wiringType'  component={SploopmtResult}/>
          <Route path='/sploopmtadd/:deptId/:phase/:connectionType/:wiringType'  component={SploopmtAdd}/>
          <Route path='/sploopmtedit/:deptId/:matCd/:phase/:connectionType/:wiringType'  component={SploopmtEdit}/>
          <Route path='/spugcblmh' component={SpugcblmhSearch}/>
          <Route path='/spugcblmhresult/:deptId/:phase/:connectionType/:cableType'  component={SpugcblmhResult}/>
          <Route path='/spugcblmhadd/:deptId/:phase/:connectionType/:cableType'  component={SpugcblmhAdd}/>
          <Route path='/spugcblmhedit/:deptId/:year/:phase/:connectionType/:cableType'  component={SpugcblmhEdit}/>
          <Route path='/spcndctmh' component={Spcndctmh}/>
          <Route path='/spcrconvh' component={Spcrconvh}/>
          <Route path='/spcstngmh' component={Spcstngmh}/>
          <Route path='/splpsvcmh' component={Splpsvcmh}/>
          <Route path='/spratesmh' component={Spratesmh}/>
          <Route path='/spsecdeph' component={Spsecdeph}/>
          <Route path='/viewSpugcblmh' component={Spugcblmh}/>
          <Route path='/contractor/add' component={ContractorAdd}/>
        <Route path='/contractor/findByDeptId' component={ContractorList}/>
        <Route path='/contractor/edit/:contractorId/:deptId/:currentPage' component={ContractorEdit}/>
        <Route path='/contractor/groupAdd' component={ContractorGroup}/>
        <Route path='/labour/findByDeptId' component={LabourList}/>
        <Route path='/labour/add' component={LabourAdd}/>
        <Route path='/labour/edit/:labourCode/:deptId/:year/:currentPage' component={LabourEdit}/>
        <Route path='/labour/groupAdd' component={LabourGroup}/>
        <Route path='/conductorRate/all' exact={true} component={ConductorRateList}/>
        <Route path='/conversionRate/all' exact={true} component={ConversionRateList}/>
        <Route path='/standardConstructionRate/findByDeptId' exact={true} component={StandardConstructionRateList}/>
        <Route path='/labourNorm/all' exact={true} component={LabourNormList}/>
        <Route path='/specialRate/findByDeptId' exact={true} component={SpecialRateList}/>
        <Route path='/loopServiceWire/findByDeptId' exact={true} component={LoopServiceWireList}/>  
        <Route path='/application/add/:idNo' component={ApplicationAdd} />
          <Route path='/application/search' component={ApplicationSearch}/>
          <Route path='/application/result/:applicationId' component={ApplicationResult}/>
          {/* <Route path='/application/list' component={ApplicationList} /> */}
          <Route path='/application/edit/:applicationId' component={ApplicationEdit} />
          <Route path='/application/view/:applicationId' component={ApplicationView} />
         <Route path='/applicant/add/:idNo' component={ApplicantAdd}/>
          <Route path='/applicant/search' component={ApplicantSearch}/>
          <Route path='/applicant/result/:idNo' component={ApplicantResult}/>
          <Route path='/applicant/view/:idNo' component={ApplicantView}/>
          <Route path='/applicant/edit/:idNo' component={ApplicantEdit}/>  
          <Route path='/serviceEstimate/add' exact={true} component={ServiceEstimateAdd}/>  
          <Route path='/serviceEstimate/edit' exact={true} component={ServiceEstimateEdit}/>
          <Route path='/serviceEstimate/view' exact={true} component={ServiceEstimateView}/>
          <Route path='/sendToBilling' exact={true} component={SendToBilling}/>
          <Route path='/accountInfo' exact={true} component={AccountInfo}/>
          <Route path='/estimate/add' exact={true} component={EstimateAdd}/>
		    <Route path='/estimate/edit' exact={true} component={EstimateEdit}/>
        <Route path='/estimate/view' exact={true} render={(props)=><EstimateView {...props} status={'view'}/>}  />
        <Route path='/estimate/delete' exact={true} render={(props)=><EstimateView {...props} status={'delete'}/>}/>
        <Route path='/estimate/undoRejects' exact={true} render={(props)=><EstimateView {...props} status={'undoRejects'}/>}/>
        <Route path='/estimate/approveOrReject' exact={true} render={(props)=><EstimateView {...props} status={'approveOrReject'}/>}/>  
        <Route path='/estimate/cancel' exact={true} render={(props)=><EstimateView {...props} status={'cancel'}/>}/>  
        <Route path='/estimate/approveLowerLevel' exact={true} render={(props)=><EstimateView {...props} status={'approveLowerLevel'}/>}/> 
        <Route path='/job/create' exact={true} component={JobCreate}/>
        <Route path='/job/revise' exact={true} component={JobRevise}/>
        <Route path='/job/view' exact={true} render={(props)=><JobView {...props} status={'view'}/>}  />
        <Route path='/job/undoRejects' exact={true} render={(props)=><JobView {...props} status={'undoRejects'}/>}/>
        <Route path='/job/approveOrReject' exact={true} render={(props)=><JobView {...props} status={'approveOrReject'}/>}/>  
        <Route path='/job/cancel' exact={true} render={(props)=><JobView {...props} status={'cancel'}/>}/>  
        <Route path='/job/deactivate' exact={true} render={(props)=><JobView {...props} status={'deactivate'}/>}/>
        <Route path='/job/approveLowerLevel' exact={true} render={(props)=><JobView {...props} status={'approveLowerLevel'}/>}/>
        <Route path='/job/activate' exact={true} render={(props)=><JobView {...props} status={'activate'}/>}/>
        <Route path='/estimatedashboard' component={Estimatedashboard}/>
        <Route path='/appestlim' exact={true} component={ApprovalLimits}/>
        <Route path='/peggingestView' exact={true} component={peggingestView}/>
        <Route path='/report' exact={true} component={ReportGenerate}/>
          <br/>
        <br/>
        <br/>   
        <Footer/>
      </div>
      </div>
     
   )

    return ( 
      <Router>
        <div>
         <Switch>
                      
            <Route exact path="/" component={LoginContainer}/>
            <Route exact path="/login" component={LoginContainer}/>
            <Route exact path="/selectCostCenter" component={LoginContainer}/>
          
            <Route path='/UserManual' exact={true} component={LoginContainer}/>
           <Route path='/StandardRates' exact={true} component={LoginContainer}/>
           <Route path='/circular' exact={true} component={LoginContainer}/>
           <Route component={DefaultContainer}/>
          </Switch>
        </div>
      </Router>    
    )
  }
}
export default App;
