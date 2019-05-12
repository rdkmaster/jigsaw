import {CommonUtils} from "./common-utils";

describe('Unit Test for common-utils', () => {
    it('deepCopy - with object', (done) => {
        const src: any = {aa: {a: 22, b: 22}, bb: {}};
        const out: any = CommonUtils.deepCopy(src);
        expect(JSON.stringify(src)).toEqual(JSON.stringify(out));

        expect(src === out).toEqual(false);
        expect(src.aa === out.aa).toEqual(false);
        expect(src.bb === out.bb).toEqual(false);
        done();
    });
    it('deepCopy - with array', (done) => {
        const src: any[] = [{}, {}, {}];
        const out: any = CommonUtils.deepCopy(src);
        expect(out instanceof Array).toEqual(true);
        expect(JSON.stringify(src)).toEqual(JSON.stringify(out));

        expect(src === out).toEqual(false);
        expect(src[0] === out[0]).toEqual(false);
        expect(src[1] === out[1]).toEqual(false);
        expect(src[2] === out[2]).toEqual(false);

        done();
    });
    it('shallowCopy - with object', (done) => {
        const src: any = {aa: {a: 22, b: 22}, bb: 2323};
        const out: any = CommonUtils.shallowCopy(src);
        expect(JSON.stringify(src)).toEqual(JSON.stringify(out));
        expect(src === out).toEqual(false);
        expect(src.aa === out.aa).toEqual(true);
        expect(src.bb === out.bb).toEqual(true);

        done();
    });
    it('compareWithKeyProperty - with trackItemBy', (done) => {
        let r = CommonUtils.compareWithKeyProperty({a: 1, b: 2, c: 3}, {a: 1, b: 2, c: {}}, ['a', 'b']);
        expect(r).toEqual(true);
        r = CommonUtils.compareWithKeyProperty({a: 1, b: 2, c: 3}, {a: 1, b: 2, c: {}}, ['c']);
        expect(r).toEqual(false);
        r = CommonUtils.compareWithKeyProperty(null, {a: 1, b: 2, c: {}}, ['a', 'b']);
        expect(r).toEqual(false);
        r = CommonUtils.compareWithKeyProperty({}, null, ['a', 'b']);
        expect(r).toEqual(false);
        r = CommonUtils.compareWithKeyProperty({a: 1}, 1, ['a']);
        expect(r).toEqual(true);
        r = CommonUtils.compareWithKeyProperty({a: 2}, 1, ['a']);
        expect(r).toEqual(false);
        r = CommonUtils.compareWithKeyProperty(1, {a: 1}, ['a']);
        expect(r).toEqual(true);
        r = CommonUtils.compareWithKeyProperty(2, {a: 1}, ['a']);
        expect(r).toEqual(false);

        done();
    });
    it('compareWithKeyProperty - without trackItemBy', (done) => {
        let r = CommonUtils.compareWithKeyProperty({}, {}, null);
        expect(r).toEqual(false);
        r = CommonUtils.compareWithKeyProperty({}, {}, []);
        expect(r).toEqual(false);
        r = CommonUtils.compareWithKeyProperty("aa", "aa", null);
        expect(r).toEqual(true);
        r = CommonUtils.compareWithKeyProperty("123", 123, null);
        expect(r).toEqual(true);
        done();
    });
    it('isEmptyObject', (done) => {
        let r = CommonUtils.isEmptyObject({});
        expect(r).toEqual(true);
        r = CommonUtils.isEmptyObject({a: 1});
        expect(r).toEqual(false);
        r = CommonUtils.isEmptyObject(null);
        expect(r).toEqual(true);
        r = CommonUtils.isEmptyObject(undefined);
        expect(r).toEqual(true);
        done();
    });
    it('extendObject', (done) => {
        let t = {};
        let s = CommonUtils.extendObject(t, 1);
        expect(s === t).toEqual(true);
        s = CommonUtils.extendObject("aaa", {});
        expect(s).toEqual("aaa");
        s = CommonUtils.extendObject({}, {a:1, b:2});
        expect(JSON.stringify(s)).toEqual(JSON.stringify({a:1, b:2}));
        done();
    });
    it('extendObjects', (done) => {
        let t = {a:1};
        let s = CommonUtils.extendObjects(t);
        expect(s === t).toEqual(true);
        expect(JSON.stringify(s)).toEqual(JSON.stringify({a:1}));
        s = CommonUtils.extendObjects(t, {b:1}, {c:1});
        expect(JSON.stringify(s)).toEqual(JSON.stringify({a:1,b:1,c:1}));
        done();
    });
});

