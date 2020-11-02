import React, { Component } from 'react';
import {Table } from 'reactstrap';
import '../Master/masters.css';

import pdf from './pdfs/SMCTrainingManual.pdf';
import pdf1 from './pdfs/New Connection user guide.pdf';
import pdf2 from './pdfs/Cost Recovery User Guide.pdf';
import pdf3 from './pdfs/Temporary Connection User Guide.pdf';
import pdf4 from './pdfs/Breakdown jobs.pdf';
import pdf5 from './pdfs/Breakdown jobs (OMS).pdf';
import pdf6 from './pdfs/Maintainance User Guide.pdf';
import pdf7 from './pdfs/EMU jobs User Guide.pdf';
import pdf8 from './pdfs/How to add Masters User Guide.pdf';
import pdf9 from './pdfs/Admin Changes.pdf';
import pdf10 from './pdfs/Net Metering.pdf';
import pdf11 from './pdfs/Net Accounting.pdf';
import pdf12 from './pdfs/Net Plus.pdf';
import pdf13 from './pdfs/Time Of Use.pdf';
import pdf14 from './pdfs/Agriculture TOU.pdf';
import pdf15 from './pdfs/Meter Shifting.pdf';
import pdf16 from './pdfs/Pole Shifting.pdf';
import pdf17 from './pdfs/Line Shifting.pdf';
import pdf18 from './pdfs/Substation Shifting.pdf';
import pdf19 from './pdfs/Tou To Normal.pdf';
import pdf20 from './pdfs/MozillaFirefoxClearBrowsingHistory.pdf';
import pdf21 from './pdfs/RHC Guide.pdf';
import pdf22 from './pdfs/Guides to Operate the system - NC.pdf';
import pdf23 from './pdfs/Guides to operate the system - CR.pdf';
import pdf24 from './pdfs/Guides to operate the system - TC.pdf';
import pdf25 from './pdfs/Guides to operate the system - BD.pdf';
import pdf26 from './pdfs/Guides to operate the system - MT.pdf';


import './download.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Downloads'

class Download extends Component{
render () {
  return(
    <div class="text">
    <Helmet>
    <title>{ TITLE }</title>
  </Helmet>
  <br/><br/> <br/><br/> <br/><br/>
  <div className="padd-left">
  <a className="path" href="/#"> Help  </a> |
  <a className="path2" href="/Download">  Downloads  </a> 
  </div>
  <br/><br/>
  <div className="Possition1">
  <Table>
           
            
            <tr><td>User Manual </td><td> <a href={pdf} target="blank">Download</a> </td></tr><br/>
            <tr><td>User Manual - NC </td><td> <a href={pdf1} target="blank">Download</a></td> <td> Only Steps </td><td> <a href={pdf22} target="blank" >Download</a>  </td></tr><br/>
            <tr><td>User Manual - CR </td><td><a href={pdf2} target="blank">Download</a></td> <td> Only Steps </td><td> <a href={pdf23} target="blank">Download</a></td></tr ><br/>
            <tr><td>User Manual - TC </td><td><a href={pdf3} target="blank">Download</a></td> <td> Only Steps </td><td> <a href={pdf24} target="blank">Download</a> </td></tr><br/>
            <tr><td>User Manual - BD </td><td><a href={pdf4} target="blank">Download</a></td> <td> Only Steps </td><td> <a href={pdf25} target="blank">Download</a> </td></tr><br/>
            <tr><td>User Manual - BD(OMS) </td><td><a href={pdf5} target="blank"  >Download</a> </td></tr> <br/>
            <tr><td>User Manual - MT </td><td> <a href={pdf6} target="blank" >Download</a>  </td> <td> Only Steps </td><td> <a href={pdf26} target="blank">Download</a></td></tr><br/>
            <tr><td>User Manual - EM</td><td><a href={pdf7} target="blank" >Download</a> </td>  </tr><br/>
            <tr><td>User Manual - Masters  </td><td> <a href={pdf8} target="blank" >Download</a>  </td></tr><br/>
            <tr><td>User Manual - Admin Changes </td><td> <a href={pdf9} target="blank">Download</a>  </td></tr><br/>
            <tr><td>User Manual - Net Metering</td><td><a href={pdf10} target="blank" >Download</a>  </td></tr><br/>
            <tr><td>User Manual - Net Accounting</td><td><a href={pdf11} target="blank" >Download</a> </td></tr> <br/>
            <tr><td>User Manual - Net Plus</td><td> <a href={pdf12} target="blank" >Download</a>  </td></tr><br/>
            <tr><td>User Manual - Time Of Use(TOU)</td><td> <a href={pdf13} target="blank" >Download</a>  </td></tr><br/>
            <tr><td>User Manual - Agriculture(TOU)  </td><td><a href={pdf14} target="blank" >Download</a>  </td></tr><br/>
            <tr><td>User Manual - Meter Shifting</td><td><a href={pdf15} target="blank" >Download</a>  </td></tr><br/>
            <tr><td>User Manual - Pole Shifting </td><td> <a href={pdf16} target="blank" >Download</a> </td></tr> <br/>
            <tr><td>User Manual - Line Shifting </td><td><a href={pdf17} target="blank" >Download</a>  </td></tr><br/>
            <tr><td>User Manual - Substation Shifting  </td><td><a href={pdf18} target="blank" >Download</a> </td></tr> <br/>
            <tr><td>User Manual - Tou To Normal  </td><td><a href={pdf19} target="blank" >Download</a>  </td></tr><br/>
            <tr><td>Clear Recent History  </td><td><a href={pdf20} target="blank" >Download</a> </td></tr> <br/>
            <tr><td>RHC Guide </td><td> <a href={pdf21} target="blank">Download</a> </td></tr> <br/>
  </Table>
 </div>
 </div>
    );
   

}
}
export default Download;







