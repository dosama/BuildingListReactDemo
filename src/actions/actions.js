const actions ={};
actions.SET_USER=(data)=> {return {type:'SET_USER',payload:data}};
actions.ADD_BUILDING=(data)=> {return {type:'ADD_BUILDING',payload:data}};
actions.RREMOVE_BUILDING=(data)=> {return {type:'RREMOVE_BUILDING',payload:data}};
actions.EDIT_BUILDING=(data)=>{return {type:'EDIT_BUILDING',payload:data}};
export default actions;