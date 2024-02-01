import { Component, OnInit } from "@angular/core";
import { ArrayCollection, AutoDisplay, AutoDisplayGraphRenderer, AutoDisplayTableRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawAutoDisplayBasicDemoComponent implements OnInit {
    public data: ArrayCollection<AutoDisplay> = new ArrayCollection([
       
    ]);

    public addTableData() {
        this.data.push({
            renderAs: 'table',
            initData: {
                data: [
                    ["Tiger Nixon1", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                    ["Garrett Winters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                    ["Tiger Nixon2", "System Architect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                    ["Garrett Winslters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                    ["Tiger Nixon2", "System Architect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                    ["Garrett Winters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                    ["Tiger Nixon2", "System Architect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                    ["Garrett Winters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                    ["Tiger Nixon2", "System Architect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                    ["Garrett Wintsers2", "Accountant", "$170,50", "2011/07/25", "Tokyo", "8422"],
                    ["Tiger Nixon3", "System Architect", "$320,800", "2011/04/25", "Edinburgh", "5421"],
                    ["Tiger Nixon3", "System Architect", "$3,800", "2011/04/25", "Edinburgh", "5421"],
                    ["Tiger Nixon3", "System Architect", "$320,800", "2011/04/25", "Edinburgh", "5421"],
                    ["Tiger Nixon1", "System Architect", "$320,80", "2011/04/25", "Edinburgh", "542111"],
                    ["Garrett Winters1", "Accountant", "$170,750", "2011/07/25", "Tokyo", "84212"],
                    ["Tiger Nixon2", "System Architect", "$320,800", "2011/04/25", "Edinburgh", "5421"],
                    ["Tigesr Nixon1", "System Architect", "$320,800", "2011/04/25", "Edinburgh", "5421"],
                    ["Garrett Winters1", "Accountant", "$170,750", "2011/07/25", "Tokyo", "8422"],
                    ["Tigers Nixon2", "System Architect", "$320,800", "2011/04/25", "Edinburgh", "5421"]
                ],
                field: ["name", "position", "salary", "enroll-date", "office", "extn"],
                header: ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]
            }
        })
        this.data.refresh();
    }

    public addBarGraph() {
        this.data.push({
            renderAs: 'graph',
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
        this.data.refresh();
    }

    public addStackGraph() {

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
