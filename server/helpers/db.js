// HELPER METHODS FOR UPDATING RECORDS IN DATABASE

const shortid = require('shortid');

// ADD
const addNewConversationToList = conversation => conversations =>
  conversations.concat(
    Object.assign({}, conversation, {
      id: shortid.generate(),
      name: `Conversation ${conversations.length + 1}`,
      created: Date.now()
    })
  );
const addNewCollectionToList = collection => collections =>
  collections.concat(Object.assign({}, collection, { id: shortid.generate() }));
const addNewSeriesToList = series => allSeries =>
  allSeries.concat(Object.assign({}, series, { id: shortid.generate() }));
const addNewBlockToList = block => blocks =>
  blocks.concat(Object.assign({}, block, { id: shortid.generate() }));
const addNewMessageToList = message => messages =>
  messages.concat(Object.assign({}, message, { id: shortid.generate() }));

// UPDATE
const updateConversationInList = conversation => conversations =>
  conversations.map(c => (c.id === conversation.id ? conversation : c));
const updateCollectionInList = collection => collections =>
  collections.map(c => (c.id === collection.id ? collection : c));
const updateSeriesInList = series => allSeries =>
  allSeries.map(s => (s.id === series.id ? series : s));
const updateBlockInList = block => blocks =>
  blocks.map(b => (b.id === block.id ? block : b));
const updateMessageInList = message => messages =>
  messages.map(m => (m.id === message.id ? message : m));

// FIND
const findConversationById = (id = conversations =>
  conversations.find(c => c.id === id));
const findCollectionById = (id = collections =>
  collections.find(c => c.id === id));
const findSeriesById = (id = series => series.find(s => s.id === id));
const findBlockById = (id = blocks => blocks.find(b => b.id === id));
const findMessageById = (id = messages => messages.find(b => b.id === id));

// DELETE
const deleteConversationFromList = id => conversations =>
  conversations.filter(c => c.id !== id);
const deleteCollectionFromList = id => collections =>
  collections.filter(c => c.id !== id);
const deleteSeriesFromList = id => series => series.filter(s => s.id !== id);
const deleteBlockFromList = id => blocks => blocks.filter(b => b.id !== id);
const deleteMessageFromList = id => messages =>
  messages.filter(m => m.id !== id);

module.exports = {
  addNewConversationToList,
  addNewCollectionToList,
  addNewSeriesToList,
  addNewBlockToList,
  addNewMessageToList,

  updateConversationInList,
  updateCollectionInList,
  updateSeriesInList,
  updateBlockInList,
  updateMessageInList,

  findConversationById,
  findCollectionById,
  findSeriesById,
  findBlockById,
  findMessageById,

  deleteConversationFromList,
  deleteCollectionFromList,
  deleteSeriesFromList,
  deleteBlockFromList,
  deleteMessageFromList
};
