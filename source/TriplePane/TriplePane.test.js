import React from 'react';
import { render, cleanup } from '@testing-library/react';

import TriplePane from './TriplePane';

afterEach(cleanup);

describe('inline-select', () => {
  it('shows correct item', () => {
    const panea = <div style={{ backgroundColor: 'lightblue', height: '100%' }}>A</div>;
    const paneb = <div style={{ backgroundColor: 'lightgreen', height: '100%' }}>B</div>;
    const panec = <div style={{ backgroundColor: 'yellow', height: '100%' }}>C</div>;

    const triplePaneProps = {
      panea,
      paneb,
      panec,
      areaa: 'a',
      areab: 'b',
      areac: 'c',
      width: 100,
      height: 100,
      mode: 'm7',
      debouncingFunction: () => {}
    };

    const { queryAllByText } = render(
      <TriplePane {...triplePaneProps} />
    );
    expect(queryAllByText('A').length).toBe(1);
  });
});
