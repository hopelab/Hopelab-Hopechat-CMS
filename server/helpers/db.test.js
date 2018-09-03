const testModule = require('./db');
const conversations = require('../stubs/conversation.json');
describe('db helpers', () => {
  let entities;
  beforeEach(() => {
    entities = [{id: 1, foo: 'baz'}, {id: 2}];
  });

  it('createNewEntity should create a conversation', () => {
    const newEntity = testModule.createNewEntity(
      testModule.entityTypes.conversation,{})(conversations);
    expect(newEntity[1].name).toEqual("Conversation 2");
    const now = new Date();
    expect(newEntity[1].created/1000).toBeCloseTo(now.getTime()/1000, 2);
  });

  it('updateEntityInList should do that', () => {
    const newEntity = {id: 1, foo: 'bar'};
    const newEntities = testModule.updateEntityInList(newEntity)(entities);
    expect(newEntities[0]).toMatchObject(newEntity);
  });

  it('findEntityById should do that', () => {
    const entity = testModule.findEntityById(1)(entities);
    expect(entity).toMatchObject(entities[0]);
  });

  it('findEntityById should do that', () => {
    const newEntities = testModule.deleteEntityFromList(1)(entities);
    expect(newEntities).toMatchObject([entities[1]]);
  });

  it('findEntityById should do that', () => {
    const newEntities = testModule.deleteEntityFromList(1)(entities);
    expect(newEntities).toMatchObject([entities[1]]);
  });
});
