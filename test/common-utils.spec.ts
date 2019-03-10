import {expect} from "chai";
import {CommonUtils} from "../src/jigsaw/core/utils/common-utils";

describe('Unit Test for common-utils', () => {
    it('deepCopy - with object', (done) => {
        const src: any = {aa: {a: 22, b: 22}, bb: {}};
        const out: any = CommonUtils.deepCopy(src);
        expect(JSON.stringify(src)).deep.equals(JSON.stringify(out));

        expect(src === out).deep.equals(false);
        expect(src.aa === out.aa).deep.equals(false);
        expect(src.bb === out.bb).deep.equals(false);

        done();
    });
    it('deepCopy - with array', (done) => {
        const src: any[] = [{}, {}, {}];
        const out: any = CommonUtils.deepCopy(src);
        expect(out instanceof Array).deep.equals(true);
        expect(JSON.stringify(src)).deep.equals(JSON.stringify(out));

        expect(src === out).deep.equals(false);
        expect(src[0] === out[0]).deep.equals(false);
        expect(src[1] === out[1]).deep.equals(false);
        expect(src[2] === out[2]).deep.equals(false);

        done();
    });
    it('shallowCopy - with object', (done) => {
        const src: any = {aa: {a: 22, b: 22}, bb: 2323};
        const out: any = CommonUtils.shallowCopy(src);
        expect(JSON.stringify(src)).deep.equals(JSON.stringify(out));
        expect(src === out).deep.equals(false);
        expect(src.aa === out.aa).deep.equals(true);
        expect(src.bb === out.bb).deep.equals(true);

        done();
    });
    it('compareWithKeyProperty - with trackItemBy', (done) => {
        let r = CommonUtils.compareWithKeyProperty({a: 1, b: 2, c: 3}, {a: 1, b: 2, c: {}}, ['a', 'b']);
        expect(r).deep.equals(true);
        r = CommonUtils.compareWithKeyProperty({a: 1, b: 2, c: 3}, {a: 1, b: 2, c: {}}, ['c']);
        expect(r).deep.equals(false);
        r = CommonUtils.compareWithKeyProperty(null, {a: 1, b: 2, c: {}}, ['a', 'b']);
        expect(r).deep.equals(false);
        r = CommonUtils.compareWithKeyProperty({}, null, ['a', 'b']);
        expect(r).deep.equals(false);
        r = CommonUtils.compareWithKeyProperty({a: 1}, 1, ['a']);
        expect(r).deep.equals(true);
        r = CommonUtils.compareWithKeyProperty({a: 2}, 1, ['a']);
        expect(r).deep.equals(false);
        r = CommonUtils.compareWithKeyProperty(1, {a: 1}, ['a']);
        expect(r).deep.equals(true);
        r = CommonUtils.compareWithKeyProperty(2, {a: 1}, ['a']);
        expect(r).deep.equals(false);

        done();
    });
    it('compareWithKeyProperty - without trackItemBy', (done) => {
        let r = CommonUtils.compareWithKeyProperty({}, {}, null);
        expect(r).deep.equals(false);
        r = CommonUtils.compareWithKeyProperty({}, {}, []);
        expect(r).deep.equals(false);
        r = CommonUtils.compareWithKeyProperty("aa", "aa", null);
        expect(r).deep.equals(true);
        r = CommonUtils.compareWithKeyProperty("123", 123, null);
        expect(r).deep.equals(true);
        done();
    });
    it('isEmptyObject', (done) => {
        let r = CommonUtils.isEmptyObject({});
        expect(r).deep.equals(true);
        r = CommonUtils.isEmptyObject({a: 1});
        expect(r).deep.equals(false);
        r = CommonUtils.isEmptyObject(null);
        expect(r).deep.equals(true);
        r = CommonUtils.isEmptyObject(undefined);
        expect(r).deep.equals(true);
        done();
    });
    it('extendObject', (done) => {
        let t = {};
        let s = CommonUtils.extendObject(t, 1);
        expect(s === t).deep.equals(true);
        s = CommonUtils.extendObject("aaa", {});
        expect(s).deep.equals("aaa");
        s = CommonUtils.extendObject({}, {a:1, b:2});
        expect(JSON.stringify(s)).deep.equals(JSON.stringify({a:1, b:2}));
        done();
    });
    it('extendObjects', (done) => {
        let t = {a:1};
        let s = CommonUtils.extendObjects(t);
        expect(s === t).deep.equals(true);
        expect(JSON.stringify(s)).deep.equals(JSON.stringify({a:1}));
        s = CommonUtils.extendObjects(t, {b:1}, {c:1});
        expect(JSON.stringify(s)).deep.equals(JSON.stringify({a:1,b:1,c:1}));
        done();
    });
});

