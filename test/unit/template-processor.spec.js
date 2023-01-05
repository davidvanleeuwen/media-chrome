import { assert } from '@open-wc/testing';
import { evaluateCondition, getParamValue } from '../../src/js/utils/template-processor.js';

describe('evaluateCondition', () => {
  it('can evaluate a simple boolean condition', () => {
    assert(evaluateCondition('true'));
    assert(evaluateCondition('true == myVar', { myVar: true }));
    assert(evaluateCondition('myVar != false', { myVar: true }));
  });

  it('can evaluate a simple number condition', async () => {
    assert(!evaluateCondition('0'));
    assert(evaluateCondition('1'));
    assert(evaluateCondition('5 > 3'));
    assert(evaluateCondition('5 >= 3'));
    assert(evaluateCondition('5 >= 5'));
    assert(evaluateCondition('2 < 3'));
    assert(evaluateCondition('2 <= 3'));
    assert(evaluateCondition('3 <= 3'));
    assert(evaluateCondition('myVar == 22', { myVar: 22 }));
    assert(evaluateCondition('myVar != 22', { myVar: 23 }));
  });

  it('can evaluate a simple string condition', async () => {
    assert(!evaluateCondition('""'));
    assert(evaluateCondition('"thruthy"'));
    assert(evaluateCondition('myVar == "a string"', { myVar: 'a string' }));
    assert(evaluateCondition('myVar != "a string"', { myVar: 'lalala' }));
  });
});

describe('getParamValue', () => {
  it('gets the correct value from string', () => {
    assert.equal(getParamValue('true'), true);
    assert.equal(getParamValue('false'), false);
    assert.equal(getParamValue('"hello world"'), 'hello world');
    assert.equal(getParamValue("'hello world'"), 'hello world');
    assert.equal(getParamValue('360'), 360);
    assert.equal(getParamValue('myVar', { myVar: 'val' }), 'val');
  });
});
