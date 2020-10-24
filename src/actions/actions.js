const actions ={};
actions.SET_USER=(data)=> {return {type:'SET_USER',payload:data}}
actions.ADD_USER_BUILDING=(data)=> {return {type:'ADD_USER_BUILDING',payload:data}}
actions.RREMOVE_USER_BUILDING=(data)=> {return {type:'RREMOVE_USER_BUILDING',payload:data}}
export default actions;