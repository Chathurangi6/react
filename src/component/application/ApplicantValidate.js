import React from 'react';

// export const validateNumber=(e)=>{
//     const re = /^[0-9\b]+$/;
//     if (e.target.value === '' || re.test(e.target.value) ) {
//        this.setState({value: e.target.value})
//        const target = e.target;
//      const value = target.value;
//      const name = target.name;
//      let applicant = {...this.state.applicant};
//      applicant[name] = value;
//      this.setState({applicant});
//      //console.log("fgfhgh");
//     }
// }

export const validateNumber=(e)=>{
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value) ) {
        return e;
    }//else{
    //     return null;
    // }
}

export const validateId=(e)=>{
    const re=RegExp(/^([0-9]{9}[x|v]|[0-9]{12})$/);
    if (e.target.value === '' || re.test(e.target.value) ) {
      return e;
    }//else{
//       return null; 
    
//    }
  }