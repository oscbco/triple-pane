import React from 'react';

import TriplePane from '../TriplePane/TriplePane';
// import styles from './_App.scss';

export default function App () {
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
  const triplePaneProps2 = {
    panea,
    paneb,
    panec,
    areaa: 'a',
    areab: 'b',
    areac: 'c',
    width: 100,
    height: 100,
    mode: 'm7',
    style: {
      gridGap: '5px'
    },
    debouncingFunction: () => {}
  };
  return (
    <React.Fragment>
      <h1>TriplePane</h1>
      This react component places its child components in a three-pane arrangement.
      <h2>Examples</h2>
      <h3>Basic</h3>

      <div style={{ width: '450px', height: '450px', backgroundColor: '#333', border: '1px solid #333' }}>
        <TriplePane {...triplePaneProps} />
      </div>

      <div style={{ width: '200px', height: '200px', backgroundColor: 'transparent' }}>
        <TriplePane {...triplePaneProps2} />
      </div>
    </React.Fragment>
  );
}
