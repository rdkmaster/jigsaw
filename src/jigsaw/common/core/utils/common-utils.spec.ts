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
        r = CommonUtils.compareWithKeyProperty(2, 2, ['prop']);
        expect(r).toEqual(true);
        r = CommonUtils.compareWithKeyProperty(2, '2', ['prop']);
        expect(r).toEqual(true);
        r = CommonUtils.compareWithKeyProperty(true, true, ['prop']);
        expect(r).toEqual(true);
        r = CommonUtils.compareWithKeyProperty('true', true, ['prop']);
        expect(r).toEqual(false);
        r = CommonUtils.compareWithKeyProperty('abc', 'efg', ['prop']);
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
    it('compareValue - with trackItemBy', (done) => {
        expect(CommonUtils.compareValue(null, 0)).toEqual(false);
        expect(CommonUtils.compareValue(undefined, 0)).toEqual(false);
        expect(CommonUtils.compareValue(null, 1)).toEqual(false);
        expect(CommonUtils.compareValue(undefined, 1)).toEqual(false);
        expect(CommonUtils.compareValue('', null)).toEqual(false);
        expect(CommonUtils.compareValue('', undefined)).toEqual(false);
        expect(CommonUtils.compareValue('a', null)).toEqual(false);
        expect(CommonUtils.compareValue('a', undefined)).toEqual(false);

        expect(CommonUtils.compareValue('aa', {})).toEqual(false);
        expect(CommonUtils.compareValue(1234, {})).toEqual(false);
        expect(CommonUtils.compareValue(true, {})).toEqual(false);
        expect(CommonUtils.compareValue('', {})).toEqual(false);
        expect(CommonUtils.compareValue(0, {})).toEqual(false);
        expect(CommonUtils.compareValue(false, {})).toEqual(false);
        expect(CommonUtils.compareValue({}, 'aa')).toEqual(false);
        expect(CommonUtils.compareValue({}, 1234)).toEqual(false);
        expect(CommonUtils.compareValue({}, true)).toEqual(false);
        expect(CommonUtils.compareValue({}, '')).toEqual(false);
        expect(CommonUtils.compareValue({}, 0)).toEqual(false);
        expect(CommonUtils.compareValue({}, false)).toEqual(false);
        expect(CommonUtils.compareValue('aa', 'aa')).toEqual(true);
        expect(CommonUtils.compareValue(1234, 1234)).toEqual(true);
        expect(CommonUtils.compareValue(true, true)).toEqual(true);
        // 基本类型不做严格比较
        expect(CommonUtils.compareValue('', 0)).toEqual(true);
        expect(CommonUtils.compareValue('', false)).toEqual(true);
        expect(CommonUtils.compareValue(false, 0)).toEqual(true);

        expect(CommonUtils.compareValue([], 'aa')).toEqual(false);
        expect(CommonUtils.compareValue(123, [1, 2])).toEqual(false);
        expect(CommonUtils.compareValue([123], [1, 2])).toEqual(false);
        expect(CommonUtils.compareValue([], [])).toEqual(true);
        expect(CommonUtils.compareValue([1, 2], ['1', 2])).toEqual(true);
        expect(CommonUtils.compareValue([1, 2], ['1', 3])).toEqual(false);
        expect(CommonUtils.compareValue([[1], [2]], [['1'], [2]])).toEqual(true);

        const a = {a:1, b:2, c:3};
        expect(CommonUtils.compareValue(a, a)).toEqual(true);
        expect(CommonUtils.compareValue(a, a, [])).toEqual(true);
        expect(CommonUtils.compareValue({a:1}, {a:1})).toEqual(false);
        expect(CommonUtils.compareValue({a:1}, {a:1}, [])).toEqual(false);

        expect(CommonUtils.compareValue(a, a, 'a')).toEqual(true);
        expect(CommonUtils.compareValue(a, a, ['a'])).toEqual(true);
        expect(CommonUtils.compareValue(a, a, 'a , b')).toEqual(true);
        expect(CommonUtils.compareValue({a:1, b:2, c:3}, {a:1, b:2, c:{}}, 'a , b'))
            .toEqual(true);
        expect(CommonUtils.compareValue({a:1, b:2, c:3}, {a:1, b:1, c:3}, 'a , b'))
            .toEqual(false);
        expect(CommonUtils.compareValue(a, a, 'aaa , bbb'))
            .toEqual(true);
        expect(CommonUtils.compareValue({a:1, b:2, c:3}, {a:1, b:2, c:{}}, 'aaa , bbb'))
            .toEqual(true);
        expect(CommonUtils.compareValue({a:1, b:2, c:3}, {a:1, b:2, c:{}}, 'c'))
            .toEqual(false);

        // 兼容compareWithKeyProperty用例
        let r = CommonUtils.compareValue({a: 1, b: 2, c: 3}, {a: 1, b: 2, c: {}}, ['a', 'b']);
        expect(r).toEqual(true);
        r = CommonUtils.compareValue({a: 1, b: 2, c: 3}, {a: 1, b: 2, c: {}}, ['c']);
        expect(r).toEqual(false);
        r = CommonUtils.compareValue(null, {a: 1, b: 2, c: {}}, ['a', 'b']);
        expect(r).toEqual(false);
        r = CommonUtils.compareValue({}, null, ['a', 'b']);
        expect(r).toEqual(false);
        r = CommonUtils.compareValue({a: 1}, 1, ['a']);
        expect(r).toEqual(false);
        r = CommonUtils.compareValue(1, {a: 1}, ['a']);
        expect(r).toEqual(false);
        r = CommonUtils.compareValue(2, 2, ['prop']);
        expect(r).toEqual(true);
        r = CommonUtils.compareValue(2, '2', ['prop']);
        expect(r).toEqual(true);
        r = CommonUtils.compareValue(true, true, ['prop']);
        expect(r).toEqual(true);
        r = CommonUtils.compareValue('true', true, ['prop']);
        expect(r).toEqual(false);
        r = CommonUtils.compareValue('abc', 'efg', ['prop']);
        expect(r).toEqual(false);
        r = CommonUtils.compareValue({}, {}, null);
        expect(r).toEqual(false);
        r = CommonUtils.compareValue({}, {}, []);
        expect(r).toEqual(false);
        r = CommonUtils.compareValue("aa", "aa", null);
        expect(r).toEqual(true);
        r = CommonUtils.compareValue("123", 123, null);
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
    it('extendObject2111', (done) => {
        let t = {a:[{b:1,c:2}]};
        let s = CommonUtils.extendObject(t,{a:[{b:3},{d:4}]});
        expect(JSON.stringify(s)).toEqual(JSON.stringify({a:[{b:3,c:2},{d:4}]}));
        done();
    })
    it('color-contrast', (done) => {
        let r = CommonUtils.hexToRGB('#000000');
        expect(r === "rgb(0,0,0)").toEqual(true);
        r =  CommonUtils.hexToRGB('#000');
        expect(r === "rgb(0,0,0)").toEqual(true);
        r =  CommonUtils.hexAToRGBA('#00000000');
        expect(r === "rgba(0,0,0,0)").toEqual(true);
        r =  CommonUtils.hexAToRGBA('#0000');
        expect(r === "rgba(0,0,0,0)").toEqual(true);
        r =  CommonUtils.hslToRGB('hsl(0,0%,0%)');
        expect(r === "rgb(0,0,0)").toEqual(true);
        r =  CommonUtils.hslAToRGBA('hsla(0,0%,0%,0.5)');
        expect(r === "rgba(0,0,0,0.5)").toEqual(true);
        r =  CommonUtils.hslAToRGBA('hsla(0, 0%, 0%, .5)');
        expect(r === "rgba(0,0,0,0.5)").toEqual(true);
        r =  CommonUtils.anyToRGB('#000');
        expect(r === "rgb(0,0,0)").toEqual(true);
        r =  CommonUtils.adjustFontColor('#000');
        expect(r === "dark").toEqual(true);
        r =  CommonUtils.adjustFontColor('#fff');
        expect(r === "light").toEqual(true);
        done();
    });
});

