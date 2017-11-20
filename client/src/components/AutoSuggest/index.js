import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import './style.css';

function renderSuggestion(suggestion, { query }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <span>
      {parts.map((part, index) => {
        const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        );
      })}
    </span>
  );
}

export function autocompleteRenderInput({ addTag, ...props }) {
  const handleOnChange = (e, { newValue, method }) => {
    if (method === 'enter') {
      e.preventDefault();
    } else {
      props.onChange(e);
    }
  };

  const inputValue = (props.value && props.value.trim().toLowerCase()) || '';
  const inputLength = inputValue.length;

  let suggestions = props.tags.filter(tag => {
    return tag.name.toLowerCase().slice(0, inputLength) === inputValue;
  });

  return (
    <Autosuggest
      ref={props.ref}
      suggestions={suggestions}
      getSuggestionValue={suggestion => suggestion.name}
      renderSuggestion={renderSuggestion}
      inputProps={{ ...props, onChange: handleOnChange, tags: props.tags }}
      onSuggestionSelected={(e, { suggestion }) => {
        addTag(suggestion.name);
        props.handleAddTag({ name: suggestion.name })
      }}
      onSuggestionsClearRequested={() => {}}
      onSuggestionsFetchRequested={() => {}}
    />
  );
}

export default autocompleteRenderInput;
