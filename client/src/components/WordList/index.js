import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Table, Button } from 'reactstrap';
import EditableText from '../forms/EditableText';
import Loader from '../common/Loader';

import * as config from '../../utils/config';
import { CRISIS_SEARCH_TERM_LIST, IS_STOP_MESSAGE_DETECTION, STOP_SEARCH_TERM_LIST, STOP_SEARCH_WORD_LIST,
  CRISIS_SEARCH_WORD_LIST, IS_CRISIS_RESPONSE_DETECTION } from '../../utils/constants';
import './style.css';

const TERMS_TYPE = 'terms';
const WORDS_TYPE = 'words';

const determineList = (type, special) => {
  const isCrisisResponse = R.equals(special, IS_CRISIS_RESPONSE_DETECTION);
  if (isCrisisResponse) {
    return R.equals(type, TERMS_TYPE) ? CRISIS_SEARCH_TERM_LIST : CRISIS_SEARCH_WORD_LIST;
  }
  return R.equals(type, TERMS_TYPE) ? STOP_SEARCH_TERM_LIST : STOP_SEARCH_WORD_LIST;
};

export class WordList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [TERMS_TYPE]: [],
      [WORDS_TYPE]: [],
    };
  }

  componentDidMount() {
    this.setLists(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!R.equals(nextProps.special, this.props.special)) this.setLists(nextProps);
  }

  setLists(props) {
    const { special } = props;
    let urls = [];
    this.setAsBlank();
    switch (special) {
      case IS_CRISIS_RESPONSE_DETECTION:
        urls = [
          `/general/list/${CRISIS_SEARCH_TERM_LIST}`,
          `/general/list/${CRISIS_SEARCH_WORD_LIST}`,
        ];
        break;
      case IS_STOP_MESSAGE_DETECTION:
        urls = [
          `/general/list/${STOP_SEARCH_TERM_LIST}`,
          `/general/list/${STOP_SEARCH_WORD_LIST}`,
        ];
        break;
      default: break;
    }
    const fetches = urls.map(url => fetch(url),
      config.http.makeUploadFetchOptions({
        method: 'GET',
      }));
    if (fetches.length) {
      Promise.all(fetches).then(res => Promise.all(R.map(r => r.json())(res)))
        .then(([terms, words]) => this.setState({ [TERMS_TYPE]: terms, [WORDS_TYPE]: words, loading: false }));
    } else {
      this.setState({ loading: false });
      this.setAsBlank();
    }
  }

  setAsBlank() {
    this.setState({ [TERMS_TYPE]: [], [WORDS_TYPE]: [], loading: true });
  }

  modifyValue(value, index, type) {
    const { special } = this.props;
    const listToModify = determineList(type, special);
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
    const { special } = this.props;
    const listToModify = determineList(type, special);
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
      <div key={index + list} className="mb-5">
        <p>{phrase}</p>
        <Table striped className="mb-0">
          <tbody>
            {list.map((term, i) =>
              (
                <tr className="d-flex justify-content-between align-items-center" key={i}>
                  <td>
                    <EditableText
                      text={term}
                      onEditWillFinish={newTerm => this.modifyValue(newTerm, i, type)}
                      placeholder="Enter new term here"
                    />
                  </td>
                  <td>
                    <button
                      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      onClick={() => this.deleteValue(term, type)}
                      aria-hidden="true"

                    >X
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Button block className="text-center message" onClick={() => this.modifyValue(' ', null, type)}>
          <i className="fa fa-plus" />
          Add Word/Phrase
        </Button>
      </div>
    );
  }

  render() {
    const { special } = this.props;
    const { terms, words, loading } = this.state;
    if (loading) return <Loader />;
    let items = [];
    let listTitle = 'stop detection';
    switch (special) {
      case IS_CRISIS_RESPONSE_DETECTION:
        items = [
          {
            phrase: 'Detection of these EXACT words/phrases will trigger the bot to send the Crisis Message',
            list: words,
            type: WORDS_TYPE,
          },
          {
            phrase: 'Detection of these words/phrases ANYWHERE ' +
            'IN A MESSAGE will trigger the bot to send the Crisis Message',
            list: terms,
            type: TERMS_TYPE,
          },
        ];
        listTitle = 'crisis detection';
        break;
      case IS_STOP_MESSAGE_DETECTION:
        items = [
          {
            phrase: 'Detection of these EXACT words/phrases will trigger the bot to send the Stop Message',
            list: words,
            type: WORDS_TYPE,
            title: 'stop detection',
          },
          {
            phrase: 'Detection of these words/phrases ANYWHERE ' +
            'IN A MESSAGE will trigger the bot to send the Stop Message',
            list: terms,
            type: TERMS_TYPE,
          },
        ];
        break;
      default: break;
    }
    if (!items.length) return null;
    return (
      <div className="col-8 WordListView pb-4">
        <h4>{listTitle}</h4>
        {items.map((item, i) => this.wordList(item, i))}
      </div>
    );
  }
}

WordList.propTypes = {
  special: PropTypes.string.isRequired,
};

export default WordList;
