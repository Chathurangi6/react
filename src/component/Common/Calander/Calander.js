import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './css/cal.css';
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Calander extends Component {
    constructor() {
        super()
        
        this.state = {
            curDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            curDate: date
        });
    }

    render() {
        return (
            <div>
            <DatePicker
            className="form-control col-md-8 col-sm-3 "
            
                selected={this.state.curDate}
                onChange={this.handleChange}
                
            />
            </div>
        )
        
        
        // <i_1 class="arrow right"></i_1>
    }
}
export default Calander ;