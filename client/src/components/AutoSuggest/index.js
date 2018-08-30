import React from 'react';
import PropTypes from 'prop-types';

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
        const className = part.highlight
          ? 'react-autosuggest__suggestion-match'
          : null;

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
  const handleOnChange = (e, { method }) => {
    if (method === 'enter') {
      e.preventDefault();
    } else {
      props.onChange(e);
    }
  };

  const tags = props.tags || [];

  const inputValue = (props.value && props.value.trim().toLowerCase()) || '';
  const inputLength = inputValue.length;

  const suggestions = tags.filter(tag => tag.name.toLowerCase().slice(0, inputLength) === inputValue);

  return (
    <Autosuggest
      ref={props.ref}
      suggestions={suggestions}
      getSuggestionValue={suggestion => suggestion.name}
      renderSuggestion={renderSuggestion}
      inputProps={{ ...props, onChange: handleOnChange, tags: props.tags }}
      onSuggestionSelected={(e, { suggestion }) => {
        addTag(suggestion.name);
      }}
      onSuggestionsClearRequested={() => {}}
      onSuggestionsFetchRequested={() => {}}
    />
  );
}

autocompleteRenderInput.propTypes = {
  addTag: PropTypes.func,
  newValue: PropTypes.string,
  onChange: PropTypes.func,
  tags: PropTypes.array,
  value: PropTypes.string,
  ref: PropTypes.node,
};

export default autocompleteRenderInput;
