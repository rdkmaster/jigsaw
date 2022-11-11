import {escapeXmlString} from "./tree-data";

describe('Unit Test for SimpleTreeData escapeXmlString', () =>　{
    it('test Normal', () => {
        const xml: string = `
            <node>
                <node label="通用" icon="iconfont iconfont-e4b8" selected="true"></node>
                <node label="转换" icon="iconfont iconfont-e4fb"></node>
            </node>`;
        expect(escapeXmlString(xml)).toBe(`
            <node>
                <node label="通用" icon="iconfont iconfont-e4b8" selected="true"></node>
                <node label="转换" icon="iconfont iconfont-e4fb"></node>
            </node>`);
    });
    it('test Single quotation marks', () => {
        const xml: string = `
            <node>
                <node label="'通用'" icon="iconfont iconfont-e4b8" selected="true"></node>
                <node label="'监控'" icon="iconfont iconfont-e67a"></node>
            </node>`;
        expect(escapeXmlString(xml)).toBe(`
            <node>
                <node label="'通用'" icon="iconfont iconfont-e4b8" selected="true"></node>
                <node label="'监控'" icon="iconfont iconfont-e67a"></node>
            </node>`);
    });
    it('test Double quotation marks', () => {
        const xml: string = `
            <node>
                <node label='"通用"' icon="iconfont iconfont-e4b8" selected="true"></node>
                <node label="'监控'" icon="iconfont iconfont-e67a"></node>
            </node>`;
        expect(escapeXmlString(xml)).toBe(`
            <node>
                <node label='"通用"' icon="iconfont iconfont-e4b8" selected="true"></node>
                <node label="'监控'" icon="iconfont iconfont-e67a"></node>
            </node>`);
    });
    it('test Greater not in quotation marks', () => {
        const xml: string = `
            <node>
                <node ---<&>---></node>
            </node>`;
        expect(escapeXmlString(xml)).toBe(`
            <node>
                <node ---<&>---></node>
            </node>`);
    });
    it('test Quotation marks are not double.', () => {
        const xml: string = `
            <node>
                <node label= """ </node>
            </node>`;
        expect(escapeXmlString(xml)).toBe(`
            <node>
                <node label= """ </node>
            </node>`);
    });
    it('test Ampersand in quotation marks', () => {
        const xml: string = `
            <node>
                 <node label='通用&' icon="iconfont iconfont-e4b8" selected="true"></node>
                 <node label="监控&" icon="iconfont iconfont-e67a"></node>
            </node>`;
        expect(escapeXmlString(xml)).toBe(`
            <node>
                 <node label='通用&amp;' icon="iconfont iconfont-e4b8" selected="true"></node>
                 <node label="监控&amp;" icon="iconfont iconfont-e67a"></node>
            </node>`);
    });
    it('test Greater in quotation marks', () => {
        const xml: string = `
            <node>
                <node label='通用>' icon="iconfont iconfont-e4b8" selected="true"></node>
                <node label="监控>" icon="iconfont iconfont-e67a"></node>
            </node>`;
        expect(escapeXmlString(xml)).toBe(`
            <node>
                <node label='通用&gt;' icon="iconfont iconfont-e4b8" selected="true"></node>
                <node label="监控&gt;" icon="iconfont iconfont-e67a"></node>
            </node>`);
    });
    it('test Less then in quotation marks', () => {
        const xml: string = `
            <node>
                <node label='<通用' icon="iconfont iconfont-e4b8" selected="true"></node>
                <node label="<监控" icon="iconfont iconfont-e67a"></node>
            </node>`;
        expect(escapeXmlString(xml)).toBe(`
            <node>
                <node label='&lt;通用' icon="iconfont iconfont-e4b8" selected="true"></node>
                <node label="&lt;监控" icon="iconfont iconfont-e67a"></node>
            </node>`);
    });
    it('test Double slashes before quotation marks', () => {
        const xml: string = `==='hello&\\'\\", &is me'===`
        expect(escapeXmlString(xml)).toBe(`==='hello&amp;\\'\\", &amp;is me'===`);
    });
    it('test All', () => {
        const xml: string = `---<->&---'1"1汉字&2"\\'11'aa<->&a"b<b&b字'b>b'b\\"bb"<->&'cc'`
        expect(escapeXmlString(xml)).toBe(`---<->&---'1"1汉字&amp;2"\\'11'aa<->&a"b&lt;b&amp;b字'b&gt;b'b\\"bb"<->&'cc'`);
    });
    it('test quote position1', () => {
        const xml: string = `'a>a'b<b"c&c"`
        expect(escapeXmlString(xml)).toBe(`'a&gt;a'b<b"c&amp;c"`);
    });
    it('test quote position1.1', () => {
        const xml: string = `'a>ac&c"'`
        expect(escapeXmlString(xml)).toBe(`'a&gt;ac&amp;c"'`);
    });
    it('test quote position2', () => {
        const xml: string = `111'a>a'b<b"c&c"`
        expect(escapeXmlString(xml)).toBe(`111'a&gt;a'b<b"c&amp;c"`);
    });
    it('test quote position3', () => {
        const xml: string = `'a>a'b<b"c&c"222`
        expect(escapeXmlString(xml)).toBe(`'a&gt;a'b<b"c&amp;c"222`);
    });
    it('test quote position4', () => {
        const xml: string = `111'a>a'b<b"c&c"222`
        expect(escapeXmlString(xml)).toBe(`111'a&gt;a'b<b"c&amp;c"222`);
    });
    it('test quote position5', () => {
        const xml: string = `111< a &>222`
        expect(escapeXmlString(xml)).toBe(`111< a &>222`);
    });
    it('test no escape1', () => {
        const xml: string = `111"aa&amp;&lt;&gt;bbb&dd>ee<ff"222`
        expect(escapeXmlString(xml)).toBe(`111"aa&amp;&lt;&gt;bbb&amp;dd&gt;ee&lt;ff"222`);
    });
})
