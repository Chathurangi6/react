import React, { Component } from 'react'
import Footer from '../Common/Foot/Footer'
import "./css/Login.css";
import { Helmet } from 'react-helmet'
const TITLE = 'LOGIN'
class Login extends Component {
    constructor(){
        super();
        this.state={
            username:"",
            password:"",
            region:"",
            userLevel:"",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpperCase=this.handleUpperCase.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    async handleLogin() {
        await fetch(`/sauserm/getUserLevel?userId=${this.state.username}`)
        .then(response =>  response.text())
          .then(data => this.setState({userLevel: data}))
        console.log(this.state.userLevel)
        sessionStorage.setItem('userName', this.state.username);
        sessionStorage.setItem('region',this.state.region);
        sessionStorage.setItem('userLevel',this.state.userLevel)
        if(this.state.username!=="" && this.state.password!==""){
            this.props.history.push('/selectCostCenter')
        }
        else{
            alert("Please fill the form")
        }
    }
    handleUpperCase(event) {
        event.target.value = event.target.value.toUpperCase();
      }

  render() {
    return (
       
         <div>
         <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

          <div
        className="content1">
          </div>
          <Footer/>
              <div>
      <div style={{marginTop: '-80vh'}} align="center">
          <div class="card border-warning mb-3" style={{width: '20rem',height:'24.5rem'}}>
              
            <div class="card-header"class="card text-white  mb-3" style={{height:'4rem',backgroundColor:"#850a0a"}}><div style={{marginRight:"40vh",marginTop:"2vh"}}>
        <img src={require('../../assets/logo1.png')}
            height='45'
            width='55'
            
        />
        </div>
        <div style={{marginTop:"1vh"}}>
        <h3 style={{marginTop:"-7vh"}} class="text-white">Login</h3></div>
            <div class="card-body text-primary">
                    <div>
                    <label className="col-sm-6 col-form-label">Division</label>
                        <select type="text"  name="region" className="form-control" onInput={this.handleUpperCase} value={this.state.region} onChange={this.handleChange} > 
                            <option>Select Division</option>
                            <option value="DD0">DD0</option>
                            <option value="DD1">DD1</option>
                            <option value="DD2">DD2</option>
                            <option value="DD3">DD3</option>
                            <option value="DD4">DD4</option>
                        </select> 
                        </div>
                        
                        <div > 
                        <label className="col-sm-6 col-form-label">Username</label>                                                
                        <input type="text"  name="username" className="form-control"  placeholder="Username"  onInput={this.handleUpperCase} value={this.state.username} onChange={this.handleChange} />  
                        </div>
                        
                        <div>
                        <label className="col-sm-6 col-form-label">Password</label>
                        <input type="password"  name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChange} /> 
                        
                        </div>
                        <br></br><br></br>
                        <div>
                                <button type="button" className="book_button4 btn-block" onClick={this.handleLogin} >Login</button>
                                </div>
       
      
      </div>       
      </div>
      </div>
      </div>
      </div>
      </div>
    )
  }
}

export default Login;