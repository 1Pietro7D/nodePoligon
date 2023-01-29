const functions = require('../src/functions');

/// TEST DATA
var poly1 = require('../data/polygon_1.json');
var poly2 = require('../data/polygon_2.json');
var poly3 = require('../data/polygon_3.json');

describe('functions', () => {
    test('Is Polygon 1 intercepting Polygon 2', (done) => {
      try {
        const result = functions.isIntercepting(poly1.points, poly2.points);
        expect(result).toBe(true);
        done();
      } catch (e) {
        expect(e).toBeDefined();
        done(e);
      }
    });
    test('Is Polygon 2 intercepting Polygon 3', (done) => {
      try {
        const result = functions.isIntercepting(poly2.points, poly3.points);
        expect(result).toBe(false);
        done();
      } catch (e) {
        expect(e).toBeDefined();
        done(e);
      }
    });
    test('Is Polygon 1 intercepting Polygon 3', (done) => {
      try {
        const result = functions.isIntercepting(poly1.points, poly3.points);
        expect(result).toBe(false);
        done();
      } catch (e) {
        expect(e).toBeDefined();
        done(e);
      }
    });
  });