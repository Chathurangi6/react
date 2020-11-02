import React, { Component } from 'react'
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = ' Edit App Types'
class EditAuthorizedAppType extends Component {
    emptyItem = {
        id: {deptId:"",applicationType:""}
      };
constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  async componentDidMount() {
  const details=await(await fetch(`/authorizedType/findByIdDeptIdAndIdApplicationType?deptId=${this.props.match.params.deptId}&applicationType=${this.props.match.params.applicationType}`)).json();
    this.setState({item:details})
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    
    item.id[name] = value;
    this.setState({item});
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
   
  await fetch('/authorizedType/upd', {
    method:'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item),
  });
    this.props.history.push('/authorizedAppType/add');
  }
  render() {
    const {item} = this.state;
    console.log(item)
    return (
        <div>
          <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Admin  </a> |
        <a className="path" href="/authorizedAppType"> Authorized App Type Details </a> |
        <a className="path2" href="/authorizedAppType/add"> Edit Authorized App Type </a> 
     
        </div>
      <br/><br/><br/><br/><br/><br/>  
    <div className="container" align="center" style={{position:"relative"}}>
      <h1>Edit Authorized App Type</h1>
      <div className="form-group row">
            <label className="col-sm-4 col-form-label">Department:</label>
                <div className="col-sm-6">                                                   
                    <input type="text"  name="deptId" className="form-control" value={item.id.deptId} onChange={this.handleChange} required/>  
                </div>                                           
        </div>
        
        <div className="form-group row">
                <label className="col-sm-4 col-form-label">Application Type:</label>
                    <div className="col-sm-6">
                    <select value={item.id.applicationType} name="applicationType" className="form-control" onChange={this.handleChange} required>
                        <option>{item.id.applicationType}</option>
                        <option value="NC">New Connection</option>
                        <option value="TC">Temporary Connection</option>
                        <option value="CR">Cost Recovery</option>
                        <option value="MT">Maintenance</option>
                        <option value="BD">Breakdown</option>
                        <option value="SA">Sys. Augmentation</option>
                        <option value="AM">AMU Jobs</option>
                        <option value="RE">RE Jobs</option>
                        <option value="ABC">ABC Jobs</option>
                        <option value="EM">EMU Jobs</option>
                    </select>
                    </div>
        </div> 
        <button onClick={this.handleSubmit}>Update</button>{' '}
        <button>Cancel</button>        
    </div>
   
        
      </div>
    )
  }
}
export default EditAuthorizedAppType