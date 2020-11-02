import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class SpecialRateList extends Component {

  constructor(props) {
    super(props);
    this.state = {deptId:sessionStorage.getItem('costCenterNo'),specialRates: [],resultArray:[], isLoading: true, };
    this.result=this.result.bind(this);
    
  }

  async componentDidMount() {
    this.setState({isLoading: true});

    await fetch(`/specialRate/findByIdDeptId?deptId=${this.state.deptId}`)
      .then(response => response.json())
      .then(data => this.setState({specialRates: data, isLoading: false},()=>this.result()));

  }
  result(){
    let sRate=this.state.specialRates;
    const arr=[];
    // console.log(sRate[0].id.applicationType);
    const noOfCols=Object.keys(sRate[0]).length
    const noOfRows=sRate.length

    // console.log(noOfCols);
    // console.log(noOfRows);

    for(var i=0;i<noOfCols;i++){
      arr[i]=[];
    }
    // console.log(arr);

    
    for(var j=0;j<noOfRows;j++){
      arr[0][j]=sRate[j].id.applicationType;
      arr[1][j]=sRate[j].boardCharge.toLocaleString();
      arr[2][j]=sRate[j].contingency.toLocaleString();
      arr[3][j]=sRate[j].conversionRate.toLocaleString();
      arr[4][j]=sRate[j].conversionRate2p.toLocaleString();
      arr[5][j]=sRate[j].fixedTransportAmt.toLocaleString();
      arr[6][j]=sRate[j].fixedTransportDistance;
      arr[7][j]=sRate[j].labourRate.toLocaleString();
      arr[8][j]=sRate[j].nbt;
      arr[9][j]=sRate[j].overheadRate.toLocaleString();
      arr[10][j]=sRate[j].secondCircuit.toLocaleString();
      arr[11][j]=sRate[j].transportRate.toLocaleString();
      arr[12][j]=sRate[j].vat;
    }
    
    this.setState({resultArray:arr});
   


}
  

  render() {
    const {isLoading,resultArray} = this.state;
    
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const rowNames=["Application Type","Board Charge","Contingency","Conversion Rate","Conversion Rate2p","Fixed Transport Amount","Fixed Transport Distance","Labour Rate","nbt","Overhead Rate","Second Circuit","Transport Rate","vat"]
    
    const specialRateList = resultArray.map((nested,i) =>{

      return <tr>
        <th width="10%" style={{background:'lightGrey',color:'black'}}>{rowNames[i]}</th>
        {
          nested.map(element=> {
      
            return <td width="10%" className="text-right">{element}</td>
          })
        }
      </tr>
    });

    return (
      <div>
        <Container fluid>
         
          <h3>SPECIAL RATES - {this.state.deptId}</h3>

          <Table className="mt-4">
            <tbody>
              {specialRateList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default SpecialRateList;