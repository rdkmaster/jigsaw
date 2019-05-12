import {
    AbstractModeledGraphData,
    Dimension,
    Indicator,
    ModeledPieGraphData,
    ModeledRectangularTemplate
} from "./modeled-graph-data";
import {EchartOptions} from "./echart-types";


class TestGraphData extends AbstractModeledGraphData {
    constructor() {
        // do not remove this empty constructor
        super();
    }

    public getRealDimensions(dimField: string, dimensions: Dimension[], usingAllDimensions: boolean): Dimension[] {
        return super.getRealDimensions(dimField, dimensions, usingAllDimensions);
    }

    protected createChartOptions(): EchartOptions {
        return null;
    }
}

describe('Unit Test for ModeledPieGraphData', () => {
    it('should give default data defined in constructor of AbstractModeledGraphData', () => {
        const tgd = new TestGraphData();
        expect(tgd.data).toEqual([]);
        expect(tgd.header).toEqual([]);
        expect(tgd.field).toEqual([]);
    });

    it('should return no dims if the data is invalid', function () {
        const tgd = new TestGraphData();
        tgd.field = ['f'];
        const dims = tgd.getRealDimensions('f', [], true);
        expect(dims).toEqual([]);
    });

    it('should return undefined if series is invalid', function () {
        const pd = new ModeledPieGraphData();
        const opt = pd.options;
        expect(opt).toBeUndefined();
    });

    it('should return a valid echarts options', function () {
        const pd = new ModeledPieGraphData();
        pd.field = ['f1', 'f2', 'f3', 'f4'];
        pd.header = ['h1', 'h2', 'h3', 'h4'];
        pd.data = [
            ['a', '南京', '20', '10'],
            ['a', '上海', '22', '12'],
            ['a', '深圳', '30', '23'],
            ['b', '南京', '120', '110'],
            ['b', '南京', '120', '110'],
            ['b', '深圳', '130', '123'],
        ];
        pd.series = [
            {
                dimensionField: 'f2', dimensions: [], usingAllDimensions: true,
                radius: [15, 75], center: [50, 50], indicators: [new Indicator('f3')]
            }
        ];
        const opt = pd.options;
        expect(opt.legend.data).toEqual(['南京', '上海', '深圳']);
        expect(opt.series.length).toEqual(1);
        expect(opt.series[0].data).toEqual([
            {name: "南京", value: 260},
            {name: "上海", value: "22"},
            {name: "深圳", value: 160}
        ]);
    });

    it('should return a options with specified dims', function () {
        const pd = new ModeledPieGraphData();
        pd.field = ['f1', 'f2', 'f3', 'f4'];
        pd.header = ['h1', 'h2', 'h3', 'h4'];
        pd.data = [
            ['a', '南京', '20', '10'],
            ['a', '上海', '22', '12'],
            ['a', '深圳', '30', '23'],
            ['b', '南京', '120', '110'],
            ['b', '南京', '120', '110'],
            ['b', '深圳', '130', '123'],
        ];
        const indicator = new Indicator('f4');
        indicator.aggregateBy = 'min';
        pd.series = [
            {
                dimensionField: 'f2', dimensions: [new Dimension('南京'), new Dimension('上海')],
                usingAllDimensions: false, radius: [15, 75], center: [50, 50],
                indicators: [indicator]
            }
        ];
        const opt = pd.options;
        expect(opt.legend.data).toEqual(['南京', '上海']);
        expect(opt.series.length).toEqual(1);
        expect(opt.series[0].data).toEqual([
            {name: "南京", value: 10},
            {name: "上海", value: "12"}
        ]);
    });

    it('should return a multi kpi options', function () {
        const pd = new ModeledPieGraphData();
        pd.field = ['f1', 'f2', 'f3', 'f4'];
        pd.header = ['h1', 'h2', 'h3', 'h4'];
        pd.data = [
            ['a', '南京', '20', '10'],
            ['a', '上海', '22', '12'],
            ['a', '深圳', '30', '23'],
            ['b', '南京', '120', '110'],
            ['b', '南京', '120', '110'],
            ['b', '深圳', '130', '123'],
        ];
        const indicator1 = new Indicator('f4');
        indicator1.aggregateBy = 'max';
        indicator1.name = 'xxSuccessRate';
        const indicator2 = new Indicator('f3');
        indicator2.aggregateBy = 'min';
        indicator2.name = 'xxSuccessCount';
        pd.series = [
            {
                dimensionField: 'f2', dimensions: [new Dimension('南京')],
                usingAllDimensions: false, radius: [15, 75], center: [50, 50],
                indicators: [indicator1, indicator2]
            },
            {
                // 测试 dimensionField 为空的情形
                dimensionField: null, dimensions: null, usingAllDimensions: true,
                radius: [0, 0], center: [0, 0], indicators: null
            },
            {
                // 测试 indicators 为空的情形
                dimensionField: 'f2', dimensions: null, usingAllDimensions: true,
                radius: [0, 0], center: [0, 0], indicators: null
            },
            {
                // 测试 indicators 为空的情形
                dimensionField: 'f2', dimensions: null, usingAllDimensions: true,
                radius: [0, 0], center: [0, 0], indicators: []
            }
        ];
        const opt = pd.options;
        expect(opt.legend.data).toEqual(['xxSuccessRate', 'xxSuccessCount']);
        expect(opt.series.length).toEqual(1);
        expect(opt.series[0].data).toEqual([
            {name: "xxSuccessRate", value: 110},
            {name: "xxSuccessCount", value: 20},
        ]);
    });

    it('should return a options without legend', function () {

        class BasicModeledPieTemplateSpec extends ModeledRectangularTemplate {
            getInstance(): EchartOptions {
                return {
                    title: {},
                    tooltip: {}
                };
            }
        }

        const pd = new ModeledPieGraphData();
        pd.template = new BasicModeledPieTemplateSpec();
        pd.field = ['f1', 'f2', 'f3', 'f4'];
        pd.header = ['h1', 'h2', 'h3', 'h4'];
        pd.data = [
            ['a', '南京', '20', '10'],
        ];
        const indicator = new Indicator('f4');
        indicator.aggregateBy = 'min';
        pd.series = [
            {
                dimensionField: 'f2', dimensions: [new Dimension('南京'), new Dimension('上海')],
                usingAllDimensions: false, radius: [15, 75], center: [50, 50],
                indicators: [indicator]
            }
        ];
        const opt = pd.options;
        expect(opt.legend).toBeUndefined();
        expect(opt.series.length).toEqual(1);
        expect(opt.series[0].data).toEqual([
            {name: "南京", value: '10'},
            {name: "上海", value: 0}
        ]);

        const opt1 = pd.options;
        expect(opt).toBe(opt1);
    });
});
