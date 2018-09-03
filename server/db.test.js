const store = require('./utils/store');
const testModule = require('./db')(store);

describe('database module functions', () => {
  describe('conversations test', () => {
    it('getConversations should return successfully', done => {
      testModule.getConversations().then(res => {
        expect(res).toEqual(expect.anything());
        done();
      });
    });

    it('getConversationById should return successfully if it exists', done => {
      testModule.getConversationById('intro-conversation').then(res => {
        expect(res).toEqual(expect.anything());
        done();
      });
    });

    it('getConversationById should not return if the id does not exist', done => {
      testModule.getConversationById('foo').then(res => {
        expect(res).toBeUndefined();
        done();
      });
    });
  });


  describe('collections', () => {
    it('getCollections should return successfully', done => {
      testModule.getCollections().then(res => {
        expect(res).toEqual(expect.anything());
        done();
      });
    });
    it('getCollectionById should return successfully', done => {
      testModule.getCollectionById("intro-collection").then(res => {
        expect(res).toEqual(expect.anything());
        done();
      });
    });
    it('getCollectionById should not return if the id does not exist', done => {
      testModule.getCollectionById('foo').then(res => {
        expect(res).toBeUndefined();
        done();
      });
    });
  });

  describe('series', () => {
    it('getSeries should return successfully', done => {
      testModule.getSeries().then(res => {
        expect(res).toEqual(expect.anything());
        done();
      });
    });
    it('getSeriesById should return successfully', done => {
      testModule.getSeriesById("intro-series").then(res => {
        expect(res).toEqual(expect.anything());
        done();
      });
    });
    it('getSeriesById should not return if it doesnt exist', done => {
      testModule.getSeriesById("foo").then(res => {
        expect(res).toBeUndefined();
        done();
      });
    });
  });

  describe('messages', () => {
    it('getMessages should return successfully', done => {
      testModule.getMessages().then(res => {
        expect(res).toEqual(expect.anything());
        done();
      });
    });
    it('getMessagesById should return successfully', done => {
      testModule.getMessageById("intro-message").then(res => {
        expect(res).toEqual(expect.anything());
        done();
      });
    });
    it('getMessagesById should not return if it doesnt exist', done => {
      testModule.getMessageById("foo").then(res => {
        expect(res).toBeUndefined();
        done();
      });
    });
  });

  describe('blocks', () => {
    it('getBlocks should return successfully', done => {
      testModule.getBlocks().then(res => {
        expect(res).toEqual(expect.anything());
        done();
      });
    });
    it('getBlocksById should return successfully', done => {
      testModule.getBlockById("intro-block").then(res => {
        expect(res).toEqual(expect.anything());
        done();
      });
    });
    it('getBlocksById should not return if it doesnt exist', done => {
      testModule.getBlockById("foo").then(res => {
        expect(res).toBeUndefined();
        done();
      });
    });
  });

  it('getMedia should return successfully', done => {
    testModule.getMedia().then(res => {
      expect(res).toEqual(expect.anything());
      done();
    });
  });
});
