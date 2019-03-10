import {expect} from "chai";
import {aggregate, distinct, flat, getColumn, getRow, group} from "../src/jigsaw/core/utils/data-collection-utils";

describe('Unit Test for data-collection-utils/getColumn()', () => {
    it('getColumn - normal', (done) => {
        const m = [
            [11, '12', 13, 14],
            [21, 22, 23, 24],
            [31, '32', 33, 34],
        ];
        const col = getColumn(m, 1);
        expect(JSON.stringify(col)).deep.equals(JSON.stringify(['12', 22, '32']));
        done();
    });
    it('getColumn - null matrix', (done) => {
        const col = getColumn(null, 1);
        expect(col).deep.equals(undefined);
        done();
    });
    it('getColumn - matrix.length is 0', (done) => {
        const col = getColumn([], 1);
        expect(col).deep.equals(undefined);
        done();
    });
    it('getColumn - column > matrix.length', (done) => {
        const m = [
            [11, 12, 13, 14],
            [21, 22, 23, 24],
            [31, 32, 33, 34],
        ];
        const col = getColumn(m, 100);
        expect(col).deep.equals(undefined);
        done();
    });
    it('getColumn - column <= 0', (done) => {
        const m = [
            [11, 12, 13, 14],
            [21, 22, 23, 24],
            [31, 32, 33, 34],
        ];
        const col = getColumn(m, -1);
        expect(col).deep.equals(undefined);
        done();
    });
});

describe('Unit Test for data-collection-utils/getRow()', () => {
    it('getRow - normal', (done) => {
        const m = [
            [11, 12, 13, 14],
            [21, '22', 23, '24'],
            [31, 32, 33, 34],
        ];
        const row = getRow(m, 1);
        expect(JSON.stringify(row)).deep.equals(JSON.stringify([21, '22', 23, '24']));
        expect(row === m[1]).deep.equals(false);
        done();
    });
    it('getRow - matrix == null', (done) => {
        const row = getRow(null, 1);
        expect(row).deep.equals(undefined);
        done();
    });
    it('getRow - matrix.length == 0', (done) => {
        const row = getRow([], 1);
        expect(row).deep.equals(undefined);
        done();
    });
    it('getRow - row <= 0', (done) => {
        const row = getRow([[]], -1);
        expect(row).deep.equals(undefined);
        done();
    });
    it('getRow - row > matrix.length', (done) => {
        const m = [
            [11, 12, 13, 14],
            [21, 22, 23, 24],
            [31, 32, 33, 34],
        ];
        const row = getRow(m, 100);
        expect(row).deep.equals(undefined);
        done();
    });
});

describe('Unit Test for data-collection-utils/distinct()', () => {
    it('distinct - normal1', (done) => {
        const list = [11, 12, 13, 14];
        const r = distinct(list);
        expect(JSON.stringify(list)).deep.equals(JSON.stringify([11, 12, 13, 14]));
        expect(list === r).deep.equals(false);
        done();
    });
    it('distinct - normal2', (done) => {
        const list = [11, 11, 13, 13];
        const r = distinct(list);
        expect(JSON.stringify(r)).deep.equals(JSON.stringify([11, 13]));
        expect(list === r).deep.equals(false);
        done();
    });
    it('distinct - list == null', (done) => {
        const r1 = distinct(null);
        expect(r1).deep.equals(null);
        const r2 = distinct(undefined);
        expect(r2).deep.equals(undefined);
        done();
    });
});

describe('Unit Test for data-collection-utils/group()', () => {
    it('group - normal', (done) => {
        const m = [
            ['一', '南京', '20', '10'],
            ['一', '上海', '22', '12'],
            ['一', '深圳', '30', '23'],
            ['二', '南京', '21', '9'],
            ['二', '上海', '20', '10'],
            ['二', '深圳', '28', '20'],
            ['三', '南京', '23', '11'],
            ['三', '上海', '23', '14'],
            ['三', '深圳', '32', '25'],
            ['四', '南京', '26', '15'],
            ['四', '上海', '25', '17'],
            ['四', '深圳', '32', '23'],
            ['五', '南京', '20', '10'],
            ['五', '上海', '28', '12'],
            ['五', '深圳', '21', '25'],
            ['六', '南京', '20', '15'],
            ['六', '上海', '28', '17'],
            ['六', '深圳', '23', '23'],
            ['日', '南京', '23', '12'],
            ['日', '上海', '32', '25'],
            ['日', '深圳', '32', '15'],
        ];
        const g = group(m, 0);
        expect(JSON.stringify(g._$groupItems)).deep.equals(JSON.stringify(["一", "二", "三", "四", "五", "六", "日"]));
        let sub = g['一'];
        let test = [['一', '南京', '20', '10'], ['一', '上海', '22', '12'], ['一', '深圳', '30', '23']];
        expect(JSON.stringify(sub)).deep.equals(JSON.stringify(test));
        sub = g['二'];
        test = [['二', '南京', '21', '9'], ['二', '上海', '20', '10'], ['二', '深圳', '28', '20']];
        expect(JSON.stringify(sub)).deep.equals(JSON.stringify(test));
        sub = g['三'];
        test = [['三', '南京', '23', '11'], ['三', '上海', '23', '14'], ['三', '深圳', '32', '25']];
        expect(JSON.stringify(sub)).deep.equals(JSON.stringify(test));
        sub = g['四'];
        test = [['四', '南京', '26', '15'], ['四', '上海', '25', '17'], ['四', '深圳', '32', '23']];
        expect(JSON.stringify(sub)).deep.equals(JSON.stringify(test));
        sub = g['五'];
        test = [['五', '南京', '20', '10'], ['五', '上海', '28', '12'], ['五', '深圳', '21', '25']];
        expect(JSON.stringify(sub)).deep.equals(JSON.stringify(test));
        sub = g['六'];
        test = [['六', '南京', '20', '15'], ['六', '上海', '28', '17'], ['六', '深圳', '23', '23']];
        expect(JSON.stringify(sub)).deep.equals(JSON.stringify(test));
        sub = g['日'];
        test = [['日', '南京', '23', '12'], ['日', '上海', '32', '25'], ['日', '深圳', '32', '15']];
        expect(JSON.stringify(sub)).deep.equals(JSON.stringify(test));
        done();
    });

    it('group - invalid group field', (done) => {
        const m = [
            ['一', '南京', '20', '10'],
            ['一', '上海', '22', '12'],
            ['一', '深圳', '30', '23'],
            ['二', '南京', '21', '9'],
            ['二', '上海', '20', '10'],
            ['二', '深圳', '28', '20']
        ];
        expect(group(m, 10)).deep.equals(undefined);
        expect(group(m, -10)).deep.equals(undefined);
        done();
    });
});

describe('Unit Test for data-collection-utils/flat()', () => {
    it('flat - normal', (done) => {
        const m = [
            ['aa', '南京', '21', '9'],
            ['bb', '上海', '20', '10'],
            ['aa', '深圳', '28', '20'],
            ['aa', '深圳', '30', '23'],
            ['bb', '南京', '20', '10'],
            ['bb', '上海', '22', '12'],
        ];
        const g = group(m, 1);
        const f = flat(g);
        const test = [
            ['aa', '南京', '21', '9'],
            ['bb', '南京', '20', '10'],
            ['bb', '上海', '20', '10'],
            ['bb', '上海', '22', '12'],
            ['aa', '深圳', '28', '20'],
            ['aa', '深圳', '30', '23'],
        ];
        expect(JSON.stringify(f)).deep.equals(JSON.stringify(test));
        done();
    });
});

describe('Unit Test for data-collection-utils/aggregate()', () => {
    it('aggregate - normal', (done) => {
        const m: any[][] = [
            ['aa', '南京', '21', '9'],
            ['bb', '上海', 20, '10'],
            ['aa', '深圳', '28', '20'],
            ['aa', '深圳', '30', 23],
            ['bb', '南京', 20, '10'],
            ['bb', '上海', '22', 12],
        ];
        let r = aggregate(m, [{algorithm: 'sum', index: 2}, {algorithm: 'average', index: 3}]);
        expect(JSON.stringify(r)).deep.equals(JSON.stringify(['aa', '南京', 141, 14]));

        r = aggregate(m, [{algorithm: 'max', index: 2}, {algorithm: 'min', index: 3}]);
        expect(JSON.stringify(r)).deep.equals(JSON.stringify(['aa', '南京', 30, 9]));

        r = aggregate(m, [{algorithm: 'head', index: 2}, {algorithm: 'tail', index: 3}]);
        expect(JSON.stringify(r)).deep.equals(JSON.stringify(['aa', '南京', '21', 12]));

        r = aggregate(m, [
            {algorithm: (pre, cur) => pre + parseInt(cur + '') / 10, index: 2},
            {algorithm: 'tail', index: 3}
        ]);
        r[2] = parseFloat(r[2]).toFixed(2);
        expect(JSON.stringify(r)).deep.equals(JSON.stringify(['aa', '南京', '14.10', 12]));

        expect(() => r = aggregate(m, [{algorithm: null, index: 2}]))
            .throw('unsupported aggregate algorithm: null');
        done();
    });
    it('aggregate - invalid matrix', (done) => {
        let r = aggregate(null, [{algorithm: 'sum', index: 2}, {algorithm: 'average', index: 3}]);
        expect(JSON.stringify(r)).deep.equals(JSON.stringify([]));
        done();
    });
    it('aggregate - invalid matrix', (done) => {
        let r = aggregate([], [{algorithm: 'sum', index: 2}, {algorithm: 'average', index: 3}]);
        expect(JSON.stringify(r)).deep.equals(JSON.stringify([]));
        done();
    });
    it('aggregate - invalid matrix', (done) => {
        let r = aggregate([['aa', '南京', '21', '9']], null);
        expect(JSON.stringify(r)).deep.equals(JSON.stringify([]));
        done();
    });
});
