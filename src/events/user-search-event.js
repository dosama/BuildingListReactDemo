import EventEmitter from 'events';

class UserSearchEvent extends EventEmitter {
 
 userSearchCompletedEvent =(selectedUser)=> {
    this.emit('userSearchCompleted', selectedUser);
  }

}
const userSearchEvent = new UserSearchEvent();
export default userSearchEvent;