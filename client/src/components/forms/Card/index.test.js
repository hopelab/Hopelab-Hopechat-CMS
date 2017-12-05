import React from 'react';
import {shallow} from 'enzyme';
import 'jest-enzyme';
import Card from './index';

describe('card', () => {
  it('renders without crashing', () => {
    const f = () => null;
    shallow(
      <Card
        item={{
          messageType: 'test',
          type: 'test',
          name: 'testing',
          id: '12345',
        }}
        index={1}
        onUpdate={f}
        onEditEntity={f}
        handleSaveItem={f}
        handleUpdateMessageOptions={f}
        childEntities={[]}
        images={[]}
      />
    );
  });
});
