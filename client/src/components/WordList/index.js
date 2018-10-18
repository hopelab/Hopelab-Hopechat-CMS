import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../common/Loader';
import EditableText from '../forms/EditableText';
import * as config from '../../utils/config';
import { CRISIS_SEARCH_TERM_LIST } from '../../utils/constants';
import './style.css';

export class WordList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: [],
    };
  }

  componentDidMount() {
    const type = CRISIS_SEARCH_TERM_LIST;
    fetch(
      `/general/list/${type}`,
      config.http.makeUploadFetchOptions({
        method: 'GET',
      }),
    )
      .then(r => r.json())
      .then(searchTerms => this.setState({ searchTerms }));
  }

  modifyValue(value, index, type) {
    const listToModify = CRISIS_SEARCH_TERM_LIST;
    fetch(
      `/general/list/${listToModify}/${value}/${index}`,
      config.http.makeUploadFetchOptions({
        method: 'PUT',
      }),
    )
      .then(r => r.json())
      .then(searchTerms => this.setState({ searchTerms }));
  }

  deleteValue(term, type) {
    const listToModify = CRISIS_SEARCH_TERM_LIST;
    const hasLength = term.trim().length ? term : null;
    fetch(
      `/general/list/${listToModify}/${hasLength}`,
      config.http.makeUploadFetchOptions({
        method: 'DELETE',
      }),
    )
      .then(r => r.json())
      .then(searchTerms => this.setState({ searchTerms }));
  }

  render() {
    const { searchTerms } = this.state;
    if (!searchTerms.length) return <Loader />;
    return (
      <div className="col-8 WordListView">
        <div>
          <p>Detection of these words/phrases ANYWHERE IN A MESSAGE will trigger the bot to send the Crisis Message</p>
          {searchTerms.map((term, i) =>
            (
              <ul className="d-flex justify-content-between" key={i}>
                <EditableText
                  text={term}
                  onEditWillFinish={newTerm => this.modifyValue(newTerm, i, 'term')}
                  placeholder="Enter new term here"
                />
                <i className="fa fa-times" aria-hidden="true" onClick={() => this.deleteValue(term, 'term')} />
              </ul>
            ))}
          <button className="text-center" onClick={() => this.modifyValue(' ', null, 'term')}>
            Add Word/Phrase
          </button>
        </div>
      </div>
    );
  }
}

WordList.propTypes = {
  view: PropTypes.string.isRequired,
};

export default WordList;
