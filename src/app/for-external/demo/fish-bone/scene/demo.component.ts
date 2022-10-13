import {AfterViewInit, Component, ViewEncapsulation, NgZone, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {take} from 'rxjs/operators';
import {ChartIconFactory, ChartType, SimpleTreeData} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'fish-bone-scene',
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FishBoneSceneComponent extends AsyncDescription implements AfterViewInit {
    public demoPath = "demo/fish-bone/scene";


    constructor(public http: HttpClient, public _zone: NgZone, el: ElementRef) {
        super(http, el);
        // 在ChartIcon注册Custom Pie
        ChartIconFactory.registerCustomPie();

        this.data3 = new SimpleTreeData();
        this.data3.http = http;
        this.data3.fromAjax('mock-data/fish-bone-1');
        this.data3.onAjaxComplete(() => {
            this.data3.label = `<span class="orange">VoLTE呼损分析</span>`;
            this.data3.nodes.forEach((node, index) => {
                node.label = `<span class="orange">${node.name}</span>`;
                let pieData = this.getPieData(node).join(",");
                let nodesItem = new SimpleTreeData();
                nodesItem.label = `<span class="pie-call-loss-${index}">${pieData}</span>`;
                nodesItem.desc = `<p class="call-loss-data"> count: ${node.count} <br> ratio: ${node.ratio} <br> delay: ${node.delay}</p>`;
                node.nodes = [nodesItem];
            });
            // 等待TreeData里的html字符串在鱼骨图中渲染，此处的异步必须使用zone.onStable
            this._zone.onStable.asObservable().pipe(take(1)).subscribe(() => {
                this._zone.run(() => {
                    this.data3.nodes.forEach((node, index) => {
                        const legendData = this.getLegendData(node);
                        const pieData = this.getPieData(node);
                        this.drawPie(index, legendData, this.getPieTitle(pieData, legendData), node);
                    });
                })
            });
        })
    }
    data3: SimpleTreeData;

    hello(toWhom) {
        alert('hello ' + toWhom);
    }

    getPieData(node) {
        let pieData = [];
        if (node && node.pie) {
            if (node.pie.data instanceof Array) {
                pieData = node.pie.data.reduce((arr, item) => {
                    arr.push(item[item.length - 1]);
                    return arr;
                }, []);
            }
            if (node.pie.other) {
                pieData.push(node.pie.other.value);
            }
        }
        return pieData;
    }

    getPieTitle(pieData, legendData) {
        pieData = pieData.map(item => parseInt(item));
        const pieDataTotal = pieData.reduce((total, item) => {
            return total + item;
        }, 0);
        return legendData.reduce((pieLabel, item, index) => {
            pieLabel.push(`${item}: ${pieData[index]}(${(pieData[index] / pieDataTotal * 100).toFixed(2)}%)`);
            return pieLabel;
        }, []);
    }

    getLegendData(node) {
        let legendData = [];
        if (node && node.pie) {
            if (node.pie.data instanceof Array) {
                legendData = node.pie.data.reduce((arr, item) => {
                    arr.push(item[0] + item[1]);
                    return arr;
                }, []);
            }
            if (node.pie.other) {
                legendData.push(node.pie.other.name);
            }
        }
        return legendData;
    }

    drawPie(index, legendData, pieTitle, node) {
        ChartIconFactory.create(".pie-call-loss-" + index, ChartType.customPie, {
            fill: function (_, i, all) {
                let g = Math.round((i / all.length) * 255);
                return "rgb(100, " + g + ", 222)"
            },
            radius: 60,
            legend: {
                orient: 'right', // 如果是'top'，图例的高度是自动算出来的，所以height属性不需要配置
                width: 125,
                data: legendData,
                marginLeft: 5
            },
            series: node,
            link: this.handleLink,
            title: pieTitle,
            context: this,
            after: () => {
                console.log('a pie has been draw')
            },
        });
    }

    ngAfterViewInit() {
        ChartIconFactory.create(".bar-colours-1", ChartType.bar, {
            fill: ["red", "green", "blue"],
            height: 50,
            width: 100
        });

        ChartIconFactory.create(".pie-colours-2", ChartType.pie, {
            fill: function (_, i, all) {
                let g = (i / all.length) * 255;
                return "rgb(255, " + g + ", 0)"
            },
            radius: 48,
        });

        ChartIconFactory.create(".line", ChartType.line, {
            height: 80,
            width: 100
        });
    }

    handleLink(data, index) {
        console.log(this);
        console.log(index, data);
    }

}
