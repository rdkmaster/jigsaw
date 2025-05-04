import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AutoDisplayData, JigsawAutoDisplay } from "jigsaw/public_api";
import { ConsoleDirective } from "./console.directive";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ['./../../assets/demo.common.css', './demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class JigsawAutoDisplayDirectiveDemoComponent implements OnInit {
    @ViewChild('autoDisplay')
    public autoDisplay: JigsawAutoDisplay

    public data: AutoDisplayData[] = [];

    public directive = ConsoleDirective;
    // public directive = 'test';

    public addBarGraph() {
        this.data.push({
            renderAs: 'origin-echarts',
            initData: {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            }
        })
        this.autoDisplay.update();
    }

    public removeData(index: number) {
        this.data.splice(index, 1);
        this.autoDisplay.update();
    }

    public clearData() {
        this.data = [];
    }

    ngOnInit(): void {
        // this.addTableData();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
