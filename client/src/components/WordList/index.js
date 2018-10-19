import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import EditableText from '../forms/EditableText';
import * as config from '../../utils/config';
import { CRISIS_SEARCH_TERM_LIST, CRISIS_SEARCH_WORD_LIST, IS_CRISIS_RESPONSE_DETECTION } from '../../utils/constants';
import './style.css';

export class WordList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [],
      words: [],
    };
  }

  componentDidMount() {
    const { special } = this.props;
    const urls = R.equals(special, IS_CRISIS_RESPONSE_DETECTION) ? [
      `/general/list/${CRISIS_SEARCH_TERM_LIST}`,
      `/general/list/${CRISIS_SEARCH_WORD_LIST}`,
    ] :
      [];
    const fetches = urls.map(url => fetch(url),
      config.http.makeUploadFetchOptions({
        method: 'GET',
      }));
    if (fetches.length) {
      Promise.all(fetches).then(res => Promise.all(R.map(r => r.json())(res)))
        .then(([terms, words]) => this.setState({ terms, words }));
    } else {
      this.setState({ terms: [], words: [] });
    }
  }

  modifyValue(value, index, type) {
    const listToModify = type === 'term' ? CRISIS_SEARCH_TERM_LIST : CRISIS_SEARCH_WORD_LIST;
    fetch(
      `/general/list/${listToModify}/${value}/${index}`,
      config.http.makeUploadFetchOptions({
        method: 'PUT',
      }),
    )
      .then(r => r.json())
      .then(res => this.setState({ [type]: res }));
  }

  deleteValue(term, type) {
    const listToModify = type === 'term' ? CRISIS_SEARCH_TERM_LIST : CRISIS_SEARCH_WORD_LIST;
    const hasLength = term.trim().length ? term : null;
    fetch(
      `/general/list/${listToModify}/${hasLength}`,
      config.http.makeUploadFetchOptions({
        method: 'DELETE',
      }),
    )
      .then(r => r.json())
      .then(res => this.setState({ [type]: res }));
  }

  wordList({ phrase, list, type }, index) {
    return (
      <div key={index + list}>
        <p>{phrase}</p>
        {list.map((term, i) =>
          (
            <ul className="d-flex justify-content-between align-items-center" key={i}>
              <EditableText
                text={term}
                onEditWillFinish={newTerm => this.modifyValue(newTerm, i, type)}
                placeholder="Enter new term here"
              />
              <i className="fa fa-times" aria-hidden="true" onClick={() => this.deleteValue(term, type)} />
            </ul>
          ))}
        <button className="text-center btn" onClick={() => this.modifyValue(' ', null, type)}>
          Add Word/Phrase
        </button>
      </div>
    );
  }

  render() {
    const { special } = this.props;
    const { terms, words } = this.state;
    const items = R.equals(special, IS_CRISIS_RESPONSE_DETECTION) ? [
      {
        phrase: 'Detection of these EXACT words/phrases will trigger the bot to send the Crisis Message',
        list: words,
        type: 'words',
      },
      {
        phrase: 'Detection of these words/phrases ANYWHERE' +
        'IN A MESSAGE will trigger the bot to send the Crisis Message',
        list: terms,
        type: 'terms',
      },
    ] : [];
    if (!items.length) return null;
    return (
      <div className="col-8 WordListView">
        {items.map(item => this.wordList(item))}
      </div>
    );
  }
}

WordList.propTypes = {
  special: PropTypes.string.isRequired,
};

export default WordList;
