import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Footer from '../Common/Foot/Footer';
import '../../css/GldeptinAdd.css';
import '../../css/Path.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const TITLE = 'Cost Center Details';

class GldeptinList extends Component {

  constructor(props) {
    super(props);
    this.state = {GldeptinList: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('gldeptin/all')
      .then(response => response.json())
      .then(data => this.setState({GldeptinList: data, isLoading: false}));
  }

  async remove(deptId) {
    await fetch(`/gldeptin/${deptId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGldeptinList = [...this.state.GldeptinList].filter(i => i.deptId !== deptId);
      this.setState({GldeptinList: updatedGldeptinList});
    });
  }

  render() {
    const {GldeptinList, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const gldeptinList = GldeptinList.map(gldeptin => {
      
      return <tr key={gldeptin.deptId}>
        <td style={{whiteSpace: 'nowrap'}}>{gldeptin.deptId}</td>
        <td style={{whiteSpace: 'nowrap'}}>{gldeptin.deptArea}</td>
        <td style={{whiteSpace: 'nowrap'}}>{gldeptin.bulkSupplierName}</td>
        
        
        
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/gldeptin/edit/" + gldeptin.deptId}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(gldeptin.deptId)}>Delete</Button>
          </ButtonGroup>
        </td>
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
        <a className="path" href="/home">   Cost Center Details  </a> |
        <a className="path2" href="/gldeptin/List">  CostCenter Details</a> 
        </div>

        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/gldeptin/add">Add Cost Center</Button>
          </div>
          <h3>Cost Centers List</h3>
          <Table className="mt-4">
            <thead>
            <tr>
            <th width="20%">Cost Center No</th>
              <th width="20%">Cost Center Area</th>
              <th width="20%">Supplier Name</th>
              
             
              <th wdeptIdth="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {gldeptinList}
            </tbody>
          </Table>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default GldeptinList;