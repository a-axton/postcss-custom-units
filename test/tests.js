import fs from 'fs';
import postcss from 'postcss';
import { expect } from 'chai';
import customUnits from '../src/index.js';

describe('tests', () => {
  var results;

  before((done) => {
    fs.readFile('./test/fixtures/styles.css', (err, css) => {
      postcss([
        customUnits({ containerWidth: 1140 })
      ])
      .process(css)
      .then((res) => {
        results = res.css;
        done();
      });
    });
  });

  it('should run', () => {
    expect(results).to.not.equal(undefined);
  });
});
