import EventEmitter from 'events';

class UserSearchEvent extends EventEmitter {
 
 userSearchCompletedEvent =(selectedUser)=> {
   console.log('search result raised', selectedUser);
    this.emit('userSearchCompleted', selectedUser);
  }

}
const userSearchEvent = new UserSearchEvent();
export default userSearchEvent;