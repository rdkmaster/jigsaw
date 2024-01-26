import {AbstractNormalGraphData} from "./graph-data";

/**
 * 漏斗图
 */
export class FunnelPlotGraphData extends AbstractNormalGraphData {
    protected optionsTemplate = {
        title: {
            text: '',
            left: 'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            left: 'center',
            data: []
        },
        calculable: true,
        series: [
            {
                name: '漏斗图',
                type: 'funnel',
                left: '10%',
                top: 60,
                //x2: 80,
                bottom: 60,
                width: '80%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                },
                data: []
            }
        ]
    };

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) {
            return;
        }
        const opt = {...this.optionsTemplate};
        this._extendOption(opt);
        opt.legend.data = this.rowDescriptor.reverse();
        opt.series[0].data = this.data.map((row, i) => ({value: row[0], name: this.rowDescriptor[i]}));
        return opt;
    }
}
