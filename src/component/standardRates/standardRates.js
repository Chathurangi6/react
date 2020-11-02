import React, { Component } from 'react';
import {Table } from 'reactstrap';
import '../../css/Path.css';
import pdf from './pdfFiles/StandardEstimateDetails.pdf';
import pdf1 from './pdfFiles/standarad_rates_2011.pdf';
import pdf2 from './pdfFiles/StandardEstimateDetails2013.pdf';
import '../../css/download.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Standard Estimate Rates'

class StandardRates extends Component{
render () {
  return(
    <div class="text">
    <Helmet>
    <title>{ TITLE }</title>
  </Helmet>
  <br/><br/><br/>
  <div className="padding">
  <a className="path2" href="/StandardRates">  Standard Estimate Rates  </a> 
  </div>
  <br/><br/>
  <div className="Possition1">
  <Table >
           
            
            <tr><td>Standard Estimate Details - 2014 </td><td> <a href={pdf} target="blank">Download</a> </td></tr><br/>
            <tr><td>Standard Estimate Details - 2013</td><td><a href={pdf2} target="blank">Download</a></td></tr ><br/>
            <tr><td>Standard Estimate Details - 2011 </td><td> <a href={pdf1} target="blank">Download</a></td> </tr><br/>
          
           
  </Table>
            </div>

    
  </div>
    );
   

}
}
export default StandardRates;










