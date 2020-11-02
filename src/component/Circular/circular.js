import React, { Component } from 'react';
import {Table } from 'reactstrap';
import '../../css/Path.css';
import pdf from './pdfFiles/CircularReconnection.pdf';
import '../../css/download.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Circular Connection'

class Circular extends Component{
render () {
  return(
    <div class="text">
    <Helmet>
    <title>{ TITLE }</title>
  </Helmet>
  <br/><br/><br/>
  <div className="padding">
  <a className="path2" href="/Circular">  Circular Connection </a> 
  </div>
  <br/><br/>
  <div className="Possition1">
  <Table >
            <tr><td>Circular Connection </td><td> <a href={pdf} target="blank">Download</a> </td></tr><br/>
          
  </Table>
            </div>

  </div>
    );
   

}
}
export default Circular;





