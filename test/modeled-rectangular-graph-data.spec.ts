import {expect}  from "chai";
import {ModeledRectangularGraphData} from "../src/jigsaw/core/data/modeled-graph-data";

describe('Unit Test for modeled rectangular graph data', () => {
    it('基本数据赋值', (done) => {
        const data = [[1,2,3]];
        const header = ['a','b','c'];
        const field = ['f1', 'f2', 'f3'];
        const rd = new ModeledRectangularGraphData(data, header, field);
        expect(rd.data).deep.equals(data);
        expect(rd.header).deep.equals(header);
        expect(rd.field).deep.equals(field);
        done();
    });
});

