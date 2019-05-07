import {Dimension, Indicator, ModeledRectangularGraphData} from "./modeled-graph-data";
import {EchartOptions} from "./echart-types";
import {Grouped} from "../utils/data-collection-utils";

class ModeledRectangularGraphData1 extends ModeledRectangularGraphData {
    public getRealDimensions(): Dimension[] {
        return super.getRealDimensions();
    }

    public pruneData(xAxisIndex: number, serialIndex: number, dimensions: Dimension[]): Grouped {
        return super.pruneData(xAxisIndex, serialIndex, dimensions);
    }

    public createMultiDimensionOptions(dimensions: Dimension[]): EchartOptions {
        return super.createMultiDimensionOptions(dimensions);
    }

    public createMultiKPIOptions(dim: Dimension): EchartOptions {
        return super.createMultiKPIOptions(dim);
    }

    public createChartOptions(): EchartOptions {
        return super.createChartOptions();
    }
}

describe('Unit Test for ModeledRectangularGraphData', () => {
    it('basic property access', (done) => {
        const data = [[1, 2, 3]];
        const header = ['a', 'b', 'c'];
        const field = ['f1', 'f2', 'f3'];
        const rd = new ModeledRectangularGraphData1();
        rd.data = data;
        rd.header = header;
        rd.field = field;
        expect(rd.data).toEqual(data);
        expect(rd.header).toEqual(header);
        expect(rd.field).toEqual(field);

        expect(rd.getIndex('f2')).toEqual(1);
        expect(rd.getIndex('b')).toEqual(1);
        expect(rd.getIndex('f3')).toEqual(2);
        expect(rd.getIndex('c')).toEqual(2);
        expect(rd.getIndex(null)).toEqual(-1);
        expect(rd.getIndex('invalid')).toEqual(-1);

        done();
    });
    it('getRealDimensions - all', (done) => {
        const rd = new ModeledRectangularGraphData1();
        let realDims = rd.getRealDimensions();
        expect(JSON.stringify(realDims)).toEqual(JSON.stringify([]));

        rd.field = ['f1', 'f2', 'f3', 'f4'];
        rd.data = [
            ['一', '南京', '20', '10'],
            ['一', '上海', '22', '12'],
            ['一', '深圳', '30', '23'],
        ];
        rd.dimensionField = 'f2';
        rd.dimensions = [new Dimension('南京')];
        rd.dimensions[0].yAxisIndex = 1;
        rd.dimensions[0].stack = 'stack';
        rd.dimensions[0].shade = 'area';

        rd.usingAllDimensions = false;
        realDims = rd.getRealDimensions();
        expect(realDims.length).toEqual(1);
        let dim = realDims[0];
        expect(dim.name).toEqual('南京');
        expect(dim.yAxisIndex).toEqual(1);
        expect(dim.stack).toEqual('stack');
        expect(dim.shade).toEqual('area');

        rd.usingAllDimensions = true;
        realDims = rd.getRealDimensions();
        expect(realDims.length).toEqual(3);

        dim = realDims[0];
        expect(dim.name).toEqual('南京');
        expect(dim.yAxisIndex).toEqual(1);
        expect(dim.stack).toEqual('stack');
        expect(dim.shade).toEqual('area');
        dim = realDims[1];
        expect(dim.name).toEqual('上海');
        expect(dim.yAxisIndex).toEqual(0);
        expect(dim.stack).toEqual(undefined);
        expect(dim.shade).toEqual('bar');
        dim = realDims[2];
        expect(dim.name).toEqual('深圳');
        expect(dim.yAxisIndex).toEqual(0);
        expect(dim.stack).toEqual(undefined);
        expect(dim.shade).toEqual('bar');

        done();
    });
    it('pruneData - normal', (done) => {
        const rd = new ModeledRectangularGraphData1();
        rd.field = ['f1', 'f2', 'f3', 'f4'];
        rd.header = ['h1', 'h2', 'h3', 'h4'];
        rd.data = [
            // 这里需要让城市的顺序不一致，以检验数据处理能调整顺序
            ['a', '南京', '20', '10'],
            ['b', '上海', '122', '112'],
            ['a', '深圳', '30', '23'],
            ['a', '上海', '22', '12'],
            ['b', '南京', '120', '110'],
            ['b', '深圳', '130', '123'],
        ];
        rd.dimensionField = 'f2';
        rd.xAxis = {field: 'f1'};
        rd.indicators = [new Indicator('f3'), new Indicator('f4')];

        const r = rd.pruneData(0, 1, rd.getRealDimensions());
        expect(JSON.stringify(r._$groupItems)).toEqual(JSON.stringify(['a', 'b']));
        let g = r.a;
        expect(JSON.stringify(g)).toEqual(JSON.stringify(
            [['a', '南京', '20', '10'],
                ['a', '上海', '22', '12'],
                ['a', '深圳', '30', '23']]));
        g = r.b;
        expect(JSON.stringify(g)).toEqual(JSON.stringify(
            [['b', '南京', '120', '110'],
                ['b', '上海', '122', '112'],
                ['b', '深圳', '130', '123']]));

        done();
    });
    it('pruneData - add item', (done) => {
        const rd = new ModeledRectangularGraphData1();
        rd.field = ['f1', 'f2', 'f3', 'f4'];
        rd.header = ['h1', 'h2', 'h3', 'h4'];
        rd.data = [
            ['a', '南京', '20', '10'],
            ['a', '上海', '22', '12'],
            ['a', '深圳', '30', '23'],
            ['b', '南京', '120', '110'],
            ['b', '深圳', '130', '123'],
        ];
        rd.dimensionField = 'f2';
        rd.xAxis = {field: 'f1'};
        rd.indicators = [new Indicator('f3'), new Indicator('f4')];
        rd.indicators[0].index = 2;
        rd.indicators[0].defaultValue = 1122;
        rd.indicators[1].index = 3;

        const r = rd.pruneData(0, 1, rd.getRealDimensions());
        expect(JSON.stringify(r._$groupItems)).toEqual(JSON.stringify(['a', 'b']));
        expect(JSON.stringify(r.b)).toEqual(JSON.stringify(
            [['b', '南京', '120', '110'],
                ['b', '上海', 1122, 0],
                ['b', '深圳', '130', '123']]));

        done();
    });
    it('pruneData - aggregate item', (done) => {
        const rd = new ModeledRectangularGraphData1();
        rd.field = ['f1', 'f2', 'f3', 'f4'];
        rd.header = ['h1', 'h2', 'h3', 'h4'];
        rd.data = [
            ['a', '南京', '20', '10'],
            ['a', '上海', '22', '12'],
            ['a', '深圳', '30', '23'],
            ['b', '南京', '120', '110'],
            ['b', '南京', '120', '110'],
            ['b', '深圳', '130', '123'],
        ];
        rd.dimensionField = 'f2';
        rd.xAxis = {field: 'f1'};
        rd.indicators = [new Indicator('f3'), new Indicator('f4')];
        rd.indicators[0].index = 2;
        rd.indicators[0].defaultValue = 1122;
        rd.indicators[1].index = 3;

        const r = rd.pruneData(0, 1, rd.getRealDimensions());
        expect(JSON.stringify(r._$groupItems)).toEqual(JSON.stringify(['a', 'b']));
        expect(JSON.stringify(r.b)).toEqual(JSON.stringify(
            [['b', '南京', 240, 220],
                ['b', '上海', 1122, 0],
                ['b', '深圳', '130', '123']]));

        done();
    });
    it('createMultiDimensionOptions - normal', (done) => {
        const rd = new ModeledRectangularGraphData1();
        rd.field = ['f1', 'f2', 'f3', 'f4'];
        rd.header = ['h1', 'h2', 'h3', 'h4'];
        rd.data = [
            ['a', '南京', '20', '10'],
            ['a', '上海', '22', '12'],
            ['a', '深圳', '30', '23'],
            ['b', '南京', '120', '110'],
            ['b', '南京', '120', '110'],
            ['b', '深圳', '130', '123'],
        ];
        rd.dimensionField = 'f2';
        rd.xAxis = {field: 'f1'};
        rd.indicators = [new Indicator('f3')];
        rd.indicators[0].index = 2;
        rd.indicators[0].defaultValue = 1122;

        const options = rd.createMultiDimensionOptions(rd.getRealDimensions());
        expect(JSON.stringify(options.legend.data)).toEqual(JSON.stringify(['南京', '上海', '深圳']));
        expect(JSON.stringify(options.xAxis[0].data)).toEqual(JSON.stringify(['a', 'b']));
        expect(options.series.length).toEqual(3);
        expect(JSON.stringify(options.series[0].data)).toEqual(JSON.stringify(['20', 240]));
        expect(JSON.stringify(options.series[1].data)).toEqual(JSON.stringify(['22', 1122]));
        expect(JSON.stringify(options.series[2].data)).toEqual(JSON.stringify(['30', '130']));

        done();
    });
    it('createMultiDimensionOptions - abnormal', (done) => {
        const rd = new ModeledRectangularGraphData1();
        let options;
        options = rd.createMultiDimensionOptions([]);
        expect(options).toEqual(undefined);
        options = rd.createMultiDimensionOptions([{}]);
        expect(options).toEqual(undefined);

        rd.field = ['f'];
        rd.xAxis = {field: 'f'};
        options = rd.createMultiDimensionOptions([{}]);
        expect(options).toEqual(undefined);
        done();
    });
    it('createMultiKPIOptions - normal', (done) => {
        const rd = new ModeledRectangularGraphData1();
        rd.field = ['f1', 'f2', 'f3', 'f4'];
        rd.header = ['h1', 'h2', '最高气温', '最低气温'];
        rd.data = [
            ['a', '南京', '20', '10'],
            ['a', '上海', '22', '12'],
            ['a', '深圳', '30', '23'],
            ['b', '南京', '120', '110'],
            ['b', '南京', '120', '110'],
            ['b', '深圳', '130', '123'],
        ];
        rd.dimensionField = 'f2';
        rd.xAxis = {field: 'f1'};
        rd.indicators = [new Indicator('f3'), new Indicator('最低气温')];
        rd.indicators.forEach(kpi => kpi.index = rd.getIndex(kpi.field));
        rd.indicators[0].index = 2;
        rd.indicators[0].defaultValue = 1122;

        let options = rd.createMultiKPIOptions(new Dimension('上海'));
        expect(JSON.stringify(options.legend.data)).toEqual(JSON.stringify(['最高气温', '最低气温']));
        expect(JSON.stringify(options.xAxis[0].data)).toEqual(JSON.stringify(['a', 'b']));
        expect(options.series.length).toEqual(2);
        expect(JSON.stringify(options.series[0].data)).toEqual(JSON.stringify(['22', 1122]));
        expect(JSON.stringify(options.series[1].data)).toEqual(JSON.stringify(['12', 0]));

        options = rd.createMultiKPIOptions(new Dimension('南京'));
        expect(JSON.stringify(options.legend.data)).toEqual(JSON.stringify(['最高气温', '最低气温']));
        expect(JSON.stringify(options.xAxis[0].data)).toEqual(JSON.stringify(['a', 'b']));
        expect(options.series.length).toEqual(2);
        expect(JSON.stringify(options.series[0].data)).toEqual(JSON.stringify(['20', 240]));
        expect(JSON.stringify(options.series[1].data)).toEqual(JSON.stringify(['10', 220]));

        done();
    });
    it('createMultiKPIOptions - abnormal', (done) => {
        const rd = new ModeledRectangularGraphData1();
        let options;
        options = rd.createMultiKPIOptions(null);
        expect(options).toEqual(undefined);
        options = rd.createMultiKPIOptions(new Dimension('上海'));
        expect(options).toEqual(undefined);

        rd.field = ['f'];
        rd.xAxis = {field: 'f'};
        options = rd.createMultiKPIOptions(new Dimension('上海'));
        expect(options).toEqual(undefined);
        done();
    });
    it('createChartOptions - normal', (done) => {
        const rd = new ModeledRectangularGraphData1();
        rd.field = ['f1', 'f2', 'f3', 'f4'];
        rd.header = ['h1', 'h2', '最高气温', '最低气温'];
        rd.data = [
            ['a', '南京', '20', '10'],
            ['a', '上海', '22', '12'],
            ['a', '深圳', '30', '23'],
            ['b', '南京', '120', '110'],
            ['b', '南京', '120', '110'],
            ['b', '深圳', '130', '123'],
        ];
        rd.dimensionField = 'f2';
        rd.xAxis = {field: 'f1'};
        rd.indicators = [new Indicator('f3')];
        rd.indicators[0].index = 2;
        rd.indicators[0].defaultValue = 1122;

        let options = rd.createChartOptions();
        expect(JSON.stringify(options.legend.data)).toEqual(JSON.stringify(['南京', '上海', '深圳']));
        expect(JSON.stringify(options.xAxis[0].data)).toEqual(JSON.stringify(['a', 'b']));
        expect(options.series.length).toEqual(3);
        expect(JSON.stringify(options.series[0].data)).toEqual(JSON.stringify(['20', 240]));
        expect(JSON.stringify(options.series[1].data)).toEqual(JSON.stringify(['22', 1122]));
        expect(JSON.stringify(options.series[2].data)).toEqual(JSON.stringify(['30', '130']));

        rd.usingAllDimensions = false;
        rd.indicators.push(new Indicator('f4'));
        rd.indicators[1].index = 3;
        rd.dimensions = [new Dimension('南京')];

        options = rd.createChartOptions();
        expect(JSON.stringify(options.legend.data)).toEqual(JSON.stringify(['最高气温', '最低气温']));
        expect(JSON.stringify(options.xAxis[0].data)).toEqual(JSON.stringify(['a', 'b']));
        expect(options.series.length).toEqual(2);
        expect(JSON.stringify(options.series[0].data)).toEqual(JSON.stringify(['20', 240]));
        expect(JSON.stringify(options.series[1].data)).toEqual(JSON.stringify(['10', 220]));

        const newOptions = rd.options;
        expect(JSON.stringify(newOptions)).toEqual(JSON.stringify(options));
        const newOptions1 = rd.options;
        expect(newOptions === newOptions1).toEqual(true);

        done();
    });
    it('createChartOptions - abnormal', (done) => {
        const rd = new ModeledRectangularGraphData1();
        let options;
        options = rd.createChartOptions();
        expect(options).toEqual(undefined);
        rd.dimensionField = 'ff';
        options = rd.createChartOptions();
        expect(options).toEqual(undefined);
        rd.xAxis = {};
        options = rd.createChartOptions();
        expect(options).toEqual(undefined);
        rd.xAxis.field = 'xxx';
        options = rd.createChartOptions();
        expect(options).toEqual(undefined);
        rd.indicators = [];
        options = rd.createChartOptions();
        expect(options).toEqual(undefined);
        rd.indicators.push(new Indicator('xxx'));
        options = rd.createChartOptions();
        expect(options).toEqual(undefined);
        rd.usingAllDimensions = false;
        options = rd.createChartOptions();
        expect(options).toEqual(undefined);
        rd.dimensions = [];
        options = rd.createChartOptions();
        expect(options).toEqual(undefined);
        done();
    });
});

