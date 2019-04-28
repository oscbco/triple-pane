import React from 'react';

import TriplePane from '../TriplePane/TriplePane';
// import styles from './_App.scss';

export default function App () {
  const panea = <div>A</div>;
  const paneb = <div>B</div>;
  const panec = <div>C</div>;
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
  return (
    <React.Fragment>
      <h1>TriplePane</h1>
      A Triple pane widget
      <h2>Examples</h2>
      <h3>Basic</h3>
      <div style={{ width: '450px', height: '450px' }}>
        <TriplePane {...triplePaneProps} />
      </div>
    </React.Fragment>
  );
}
