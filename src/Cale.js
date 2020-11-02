import React, { Component } from 'react'
import Calendar from 'react-calendar';
class Cale extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: new Date(),
        }
        
    }
    
     
      onChange = (e) => {
          var date = new Date(e.target.value)
          this.setState({ date },()=>console.log(this.state.date))
    }
     
      render() {
        return (
          <div>
            <input 
              type="date"
              
              onChange = {(e)=>this.onChange(e)}
            />
          </div>
        );
      }
}
export default Cale;