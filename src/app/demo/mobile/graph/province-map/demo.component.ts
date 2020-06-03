import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AbstractGraphData, EchartOptions, JigsawMobileGraph} from "jigsaw/mobile_public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ProvinceMapGraphComponent implements AfterViewInit{
    data: AbstractGraphData;

    constructor(public http: HttpClient) {

    }

    @ViewChild('gisGraph', {static: false}) gisGraph: JigsawMobileGraph;

    ngAfterViewInit() {
        this.http.get('mock-data/map/shanghai').subscribe(data => {
            console.log(data);
            this.gisGraph.registerMap('shanghai', data);
            this.data = new GraphDataDemo();
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

export class GraphDataDemo extends AbstractGraphData {

    protected createChartOptions(): EchartOptions {
        return {
            backgroundColor: '#404a59',
            title: {
                text: '上海',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            series: [
                {
                    type: 'map',
                    mapType: 'shanghai',
                    label: {
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#389BB7',
                            areaColor: '#fff',
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    },
                    animation: false
                    // animationDurationUpdate: 1000,
                    // animationEasingUpdate: 'quinticInOut'
                }
            ]
        };
    }
}
