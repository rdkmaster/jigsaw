import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AbstractGraphData, EchartOptions, JigsawGraph } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'graph-province-map',
    templateUrl: './demo.component.html'
})
export class GraphProvinceMapDemoComponent extends AsyncDescription implements AfterViewInit {
    public demoPath = "demo/graph/province-map";

    @ViewChild('gisGraph')
    gisGraph: JigsawGraph;
    data: AbstractGraphData;

    ngAfterViewInit() {
        this.http.get('mock-data/map/shanghai').subscribe(data => {
            console.log(data);
            this.gisGraph.registerMap('shanghai', data);
            this.data = new GraphDataDemo();
        })
    }

    constructor(public http: HttpClient, el: ElementRef) {
        super(http, el);
    }
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
