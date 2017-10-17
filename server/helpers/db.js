const shortid = require('shortid');

const createNewEntity = (type, entity) => entities =>
  entities.concat(
    Object.assign({}, entity, {
      id: shortid.generate(),
      name: `${type} ${entities.length + 1}`,
      created: Date.now()
    })
  );
const updateEntityInList = entity => entities =>
  entities.map(e => (e.id === entity.id ? entity : e));
const findEntityById = id => entities => entities.find(e => e.id === id);
const deleteEntityFromList = id => entities =>
  entities.filter(e => e.id !== id);

module.exports = {
  createNewEntity,
  updateEntityInList,
  findEntityById,
  deleteEntityFromList
};
