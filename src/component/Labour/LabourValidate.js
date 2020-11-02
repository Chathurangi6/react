export const validateDecimal=(e)=>{
    //const re = /^[0-9\b]+$/;
    //const re = /^\d+(\.\d+)?$/;
    const re = /^[0-9\b\.\d+]+$/;
    //const re = /^\d+\.\d{0,2}$/;
    if (e.target.value === '' || re.test(e.target.value) ) {
        return e;
    }
}