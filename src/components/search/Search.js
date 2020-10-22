import React ,{useState, useEffect}from 'react';
import Autosuggest from 'react-autosuggest';
import './Search.css';
import userSearchEvent from '../../events/user-search-event';
import data from '../../data/users.json';

function Search() {
    const [suggestions, setSuggestions] = useState([]);
    const [users, setusers] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        
      setusers(data);
      
    }, [users]);

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : users.filter(user =>
            user.name.toLowerCase().slice(0, inputLength) === inputValue
        );
      };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);
const onChange = (event, { newValue }) => {
    setValue(newValue);
    //console.log(newValue);
    const selectedUser = users.find((i)=> i.name == newValue);
  //  console.log(selectedUser);
    userSearchEvent.userSearchCompletedEvent(selectedUser?selectedUser.id:'');
  };

const inputProps = {
    placeholder: 'Search for user',
    value,
    onChange: onChange
  };
 
  return (
  <div  className="Search w-100">
     
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
 

 </div>

 );
}

export default Search;
