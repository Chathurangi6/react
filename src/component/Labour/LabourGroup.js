import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../css/LabourGroup.css';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { get } from 'http';
import { Helmet } from 'react-helmet';
const TITLE = 'Labour Group';

class LabourGroup extends Component {

    emptyIdGroup={
        depotYear:'',
        deptId:'',
        provinceYear:''
        //checked:false
    };
    
    costCenter=sessionStorage.getItem('costCenterNo');
    provinceCostCenter='501.00'

    constructor(props) {
        super(props);
        this.state = {
          labours: [], 
          isLoading: true, 
          idGroup:this.emptyIdGroup,
          years:[],
          depotYears:[],
          deptIds:[],
          depotLabours:[],
          isLabours:false, 
          isDepotLabours:false,
          userName:sessionStorage.getItem('userName'),
          costCenterNo:this.provinceCostCenter,
          copyList:[],
          lastYear:''
          //checked:false
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.copyLabour=this.copyLabour.bind(this);
        this.copyAllLabours=this.copyAllLabours.bind(this);
  
        // this.copyContractor=this.copyContractor.bind(this);
      }

      async componentDidMount() {
        this.setState({isLoading: true});
        var year= new Date().getFullYear();
        const yearsList=[year-5,year-4,year-3,year-2,year-1,year];
    
        this.setState({depotYears:yearsList});
    
        // await fetch(`/labour/findByIdDeptId?deptId=${this.state.costCenterNo}`)
        //   .then(response => response.json())
        //   .then(data => this.setState({labours: data, isLoading: false}));
        //   console.log(this.state.labours);
    
        await fetch(`/sausrdpm/getAuthorizedCostCenters?userId=${this.state.userName}`)
          .then(response =>  response.json())
          .then(data => this.setState({deptIds: data}))
        
        await fetch(`/labour/findYearByDeptId?deptId=${this.state.costCenterNo}`)
          .then(response => response.json())
          .then(data => this.setState({years: data,lastYear:Math.max(...data)}));

          if(!this.state.idGroup.depotYear){
            this.state.idGroup.depotYear=this.state.lastYear;
          }
          if(!this.state.idGroup.provinceYear){
            this.state.idGroup.provinceYear=this.state.lastYear;
          }
          await fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${this.state.costCenterNo}&year=${this.state.idGroup.provinceYear}`)
            .then(response => response.json())
            .then(data => this.setState({labours: data, isLoading: false, isLabours:true}));

            console.log(this.state.labours);
      }

      handleChange(event){
        this.setState({isDepotLabours:false});
          //console.log(this.state.deptId);
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let idGroup = {...this.state.idGroup};
        idGroup[name] = value;
        this.setState({idGroup});
        
        console.log(idGroup.deptId);
        // if(idGroup.deptId){
        //   fetch(`/labour/findByIdDeptId?deptId=${idGroup.deptId}`)
        //   .then(response => response.json())
        //   .then(data => this.setState({depotLabours: data, isDepotLabours: true}));
        // }
        if(idGroup.deptId && idGroup.depotYear){
          fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${idGroup.deptId}&year=${idGroup.depotYear}`)
          .then(response => response.json())
          .then(data => this.setState({depotLabours: data, isDepotLabours: true}));
        }
      }

      handleYearChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let idGroup = {...this.state.idGroup};
        idGroup[name] = value;
        this.setState({idGroup});
        //console.log(this.state.currentPage)
        console.log(idGroup.provinceYear);
        
        if(idGroup.provinceYear){
          this.state.idGroup.depotYear=idGroup.provinceYear;
          this.setState({idGroup});
          this.handleChange(event);

          fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${this.state.costCenterNo}&year=${idGroup.provinceYear}`)
          .then(response => response.json())
          .then(data => this.setState({labours: data,isLabours:true}));
        }else{
    
          this.setState({labours:[],isLabours:false});
          // fetch(`/labour/findByIdDeptId?deptId=${this.state.costCenterNo}`)
          //   .then(response => response.json())
          //   .then(data => this.setState({labours: data, isLoading: false}));
          }
      }

      handleCheck(indexOfLabour) {
        //this.setState({checked: !this.state.checked});
        const idxlist=this.state.copyList;
        console.log(indexOfLabour);
        if(idxlist.includes(indexOfLabour)){
          for( var i = 0; i < idxlist.length; i++){ 
            if ( idxlist[i] === indexOfLabour) {
              idxlist.splice(i, 1); 
              break;
            }
         }
        }else{
          idxlist.push(indexOfLabour);
        }
        
        this.setState({copyList:idxlist});
        console.log(this.state.copyList);
        
      }

      async copyLabour(){
        const message= await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, copy them!'
        })

        if(message.value){
          if(this.state.copyList.length==0){
            await Swal.fire(
              'Error!',
              'Please select activity rates to copy',
              'error'
            )
          }else{
            if(this.state.idGroup.deptId==''){
              //alert("fill out the cost center");
              await Swal.fire(
                'Error!',
                'Please select the cost center',
                'error'
              )
            }else{
              if(this.state.idGroup.depotYear==''){
                //alert("fill out the cost center");
                await Swal.fire(
                  'Error!',
                  'Please select the year',
                  'error'
                )
              }else{
              const {labours,copyList,idGroup}=this.state;
              console.log(labours);
              console.log(copyList);
              
              const finalizedList=[];
              for(var i=0;i<copyList.length;i++){
          
                const labour=labours[copyList[i]]
                console.log(labour);
                labour.id.deptId=this.state.idGroup.deptId;
                labour.id.year=this.state.idGroup.depotYear;
                console.log(labour);
                finalizedList.push(labour);
                
              
              }
              const response=await fetch('/labour/addAll', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalizedList),
              });
        
              // await fetch(`/labour/findByIdDeptId?deptId=${idGroup.deptId}`)
              //   .then(response => response.json())
              //   .then(data => this.setState({depotLabours: data, isDepotLabours: true}));
              // this.state.idGroup.depotYear=idGroup.provinceYear;
              // this.setState({idGroup});

              await fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${idGroup.deptId}&year=${idGroup.depotYear}`)
                .then(response => response.json())
                .then(data => this.setState({depotLabours: data, isDepotLabours: true}));

              await fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${this.state.costCenterNo}&year=${this.state.idGroup.provinceYear}`)
                .then(response => response.json())
                .then(data => this.setState({labours: data, isLoading: false, isLabours:true}));

               this.setState({copyList:[]});

              if(response.status==200){
                await Swal.fire(
                  'Copied!',
                  'Labours have been copied.',
                  'success'
                )
              }else{
                await Swal.fire(
                  'Error!',
                  'Labours have not been copied.',
                  'error'
                )
              }
              }
            }
          }
        }
        
      }

      async copyAllLabours(){
        const message= await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, copy them!'
        })

        if(message.value){
          
            if(this.state.idGroup.deptId==''){
              //alert("fill out the cost center");
              await Swal.fire(
                'Error!',
                'Please select the cost center',
                'error'
              )
            }else{
              if(this.state.idGroup.depotYear==''){
                //alert("fill out the cost center");
                await Swal.fire(
                  'Error!',
                  'Please select the year',
                  'error'
                )
              }else{
              const {labours,idGroup}= this.state;
              console.log(labours);
              
              const finalizedList=[];
              for(var i=0;i<labours.length;i++){
          
                const labour=labours[i]
                console.log(labour);
                labour.id.deptId=idGroup.deptId;
                labour.id.year=idGroup.depotYear;
                console.log(labour);

                finalizedList.push(labour);
              
              }
              const response=await fetch('/labour/addAll', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalizedList),
              });
        
              // await fetch(`/labour/findByIdDeptId?deptId=${idGroup.deptId}`)
              //   .then(response => response.json())
              //   .then(data => this.setState({depotLabours: data, isDepotLabours: true}));
              // this.state.idGroup.depotYear=idGroup.provinceYear;
              // this.setState({idGroup});
              
              await fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${idGroup.deptId}&year=${idGroup.depotYear}`)
                .then(response => response.json())
                .then(data => this.setState({depotLabours: data, isDepotLabours: true}));

              await fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${this.state.costCenterNo}&year=${this.state.idGroup.provinceYear}`)
                .then(response => response.json())
                .then(data => this.setState({labours: data, isLoading: false, isLabours:true}));
              
              if(response.status==200){
                await Swal.fire(
                  'Copied!',
                  'Labours have been copied.',
                  'success'
                )
              }else{
                await Swal.fire(
                  'Error!',
                  'Labours have not been copied.',
                  'error'
                )
              }
            }
          }
        }
        
      }

      render() {
        const {labours, isLoading, deptIds, depotLabours, isDepotLabours, isLabours, years, depotYears} = this.state;
        if (isLoading) {
          return <p>Loading...</p>;
        }
    
        const labourList = labours.map(labour => {
    
            return <tr key={[labour.id.labourCode,labour.id.deptId,labour.id.year]}>
            <td><input type="checkbox" class="form-check-input" onChange={()=>this.handleCheck(labours.indexOf(labour))}/></td>
            <td>{labour.id.labourCode}</td>
            <td>{labour.id.year}</td>
            <td>{labour.labourName.substring(0,33)}</td>
            {/* <td>{labour.applicationType}</td>
            <td>{labour.description}</td> */}
            <td>{labour.unitPrice}</td>
            <td>{labour.labourHours}</td>
            
           
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
        <a className="path" href="/home">   Labour </a> |
        <a className="path2" href="/labour/groupAdd">   Labours  Group</a> 
        </div>


              <Container fluid>
                
                <h3 align="center">LABOURS</h3>
              <br/>
              <div className="row block-row ">
                  {/* <div className="col-sm-1"></div> */}
                  <div className="col-sm-5 labour-column-border" >
                    <br></br>
                      <h4 class="text-center">Province Labour Activity Rates ({this.state.costCenterNo})</h4>
                      <br></br>
                      <div className="form-group row bg-light">
                        <label for="provinceYear" className="col-sm-1 col-form-label">Year</label>
                        <div className="col-sm-4">
                            <select className="form-control" name="provinceYear" id="provinceYear" value={this.state.idGroup.provinceYear}
                                onChange={this.handleYearChange} >
                                  <option value="">Please Select</option>
                     
                                {
                                    (years && years.length>0) && years.map((year)=>{
                                        return(<option value={year}>{year}</option>);
                                    })
                                }

                            </select>
                        </div>
                        </div>
                    
                {(()=>{
                  if(isLabours){
                    return(
                      <div className="table-wrapper-scroll-y custom-scrollbar">
                      <Table className="mt-4 ">
                        <thead>
                        <tr>
                          <th width="5%"></th>
                          <th width="10%">Labour Code</th>
                          <th width="10%">Year</th>
                          <th width="55%">Labour Name</th>
                          <th width="10%">Unit Price</th>
                          <th width="10%">Labour Hours</th>
                        </tr>
                        </thead>
                        <tbody>
                        {labourList}
                        </tbody>
                      </Table>
                      </div>
                      )
                    }    
        
                    })()}
                  </div>
                  <div className="col-sm-2">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    {/* <div className="btn-group-vertical button-group"> */}
                    <Button  type="button" color="primary" className="btn-block" onClick={this.copyLabour}>Copy Selected Rates</Button>
                    <br></br>
                    <br></br>
                    <Button  type="button" color="primary" className="btn-block" onClick={this.copyAllLabours}>Copy All Rates</Button>
                    {/* </div> */}
                  </div>
                  <div className="col-sm-5 labour-column-border">
                  <br></br>
                  <h4 class="text-center">Depot Labour Rates</h4>
                  <br></br>
                  <div className="form-group row bg-light">
                    <label for="deptId" className="col-sm-3 col-form-label">Cost Center </label>
                    <div className="col-sm-4">
                        <select className="form-control" name="deptId" id="deptId" value={this.state.idGroup.deptId}
                            onChange={this.handleChange} >
                            <option value="">Please Select</option>
                      
                                {
                                    (deptIds && deptIds.length>0) && deptIds.map((departId)=>{
                                        return(<option value={departId}>{departId}</option>);
                                    })
                                }
                    
                        </select>
                    </div>
                    <label for="depotYear" className="col-sm-1 col-form-label">Year</label>
                        <div className="col-sm-4">
                            <select className="form-control" name="depotYear" id="depotYear" value={this.state.idGroup.depotYear}
                                onChange={this.handleChange} >
                                  <option value="">Please Select</option>
                     
                                {
                                    (depotYears && depotYears.length>0) && depotYears.map((year)=>{
                                        return(<option value={year}>{year}</option>);
                                    })
                                }

                            </select>
                        </div>
                    </div>
                    <br></br>
            {(()=>{
            if(isDepotLabours){
              return(
                <div className="table-wrapper-scroll-y custom-scrollbar">
                <Table className="mt-4">
                  <thead>
                  <tr>
                    <th width="10%">Labour Code</th>
                    <th width="10%">Year</th>
                    <th width="50%">Labour Name</th>
                    {/* <th>Application Type</th>
                    <th>Description</th> */}
                    <th width="15%">Unit Price</th>
                    <th width="15%">Labour Hours</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
        
                    this.state.depotContractorList = depotLabours.map(labour => {
    
                        return <tr key={[labour.id.labourCode,labour.id.deptId,labour.id.year]}>
                        <td>{labour.id.labourCode}</td>
                        <td>{labour.id.year}</td>
                        <td>{labour.labourName.substring(0,33)}</td>
                        {/* <td>{labour.applicationType}</td>
                        <td>{labour.description}</td> */}
                        <td>{labour.unitPrice}</td>
                        <td>{labour.labourHours}</td>
                        
                       
                      </tr>
                    })
                  }
                  </tbody>
                </Table>
                </div>
              )
            }    

            })()}

                </div>

            
                  </div>
                  </Container>
                
      </div>
        );
      }
}
export default LabourGroup;