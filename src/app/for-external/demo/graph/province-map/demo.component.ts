import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AbstractGraphData, EchartOptions, JigsawGraph} from "jigsaw/public_api";
import {GraphTextService} from "../demo.service";

@Component({
    selector: 'graph-province-map',
    templateUrl: './demo.component.html'
})
export class GraphProvinceMapDemoComponent implements AfterViewInit{
    data: AbstractGraphData;

    constructor(public http: HttpClient, public doc: GraphTextService) {

    }

    @ViewChild('gisGraph') gisGraph: JigsawGraph;

    ngAfterViewInit() {
        this.http.get('mock-data/map/shanghai').subscribe(data => {
            console.log(data);
            this.gisGraph.registerMap('shanghai', data);
            this.data = new GraphDataDemo();
        })
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
