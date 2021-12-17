import {AfterViewInit, Component, TemplateRef, ViewChild} from "@angular/core";
import {ChartIconLine, ChartIconPie, ColumnDefine, InternalUtils, TableData,} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ChartIconTableDemoComponent implements AfterViewInit {
    tableData: TableData;

    @ViewChild("pieRenderer")
    pieRenderer: TemplateRef<any>;
    @ViewChild("lineRenderer")
    lineRenderer: TemplateRef<any>;

    ngAfterViewInit() {
        this.tableData.refresh();
    }

    constructor() {
        setInterval(() => {
            this.randomData();
            this.tableData.refresh();
        }, 1000);
        this.tableData = new TableData([
            ['Tony', 'Developer', '17000', 'Prod I', '', ''],
            ['Griffith', 'System Architect', '18000', 'Prod II', '', ''],
            ['Sarah', 'Developer', '16000', 'Prod I', '', ''],
            ['Perry', 'Test Engineer', '17700', 'Prod I', '', ''],
            ['Ellen', 'Developer', '17300', 'Prod I', '', ''],
            ['Martha', 'Test Engineer', '15000', 'Prod I', '', ''],
            ['Hilary', 'Developer', '12000', 'Prod I', '', ''],
        ], ['name', 'position', 'salary', 'dept', 'pie', 'line']
        , ['姓名', '职位', '薪资', '部门', '工作量', '考核']);
        this.randomData();
    }

    randomData() {
        this.tableData.data.forEach(row => {
            const data = [];
            for (let i = 0; i < 10; i++) {
                data.push(InternalUtils.randomNumber(0, 10));
            }
            // chart icon 支持逗号隔开的数字字符串，也支持数字数组
            row[4] = data.join(',');
            row[5] = data;
        });
    }

    options1: ChartIconPie = {
        fill: function (_, i, all) {
            let g = (i / all.length) * 255;
            return "rgb(255, " + g + ", 0)"
        },
        radius: 12,
    };

    options2: ChartIconLine = {
        height: 24,
        width: 80
    };

    columns: ColumnDefine[] = [
        {
            target: 'pie', width: '60px',
            cell: {
                // 通过ViewChild获取的TemplateRef,在AfterViewInit之后才能拿到,这边必须采用异步获取。
                renderer: () => this.pieRenderer
            }
        },
        {
            target: 'line', width: '90px',
            cell: {
                // 通过ViewChild获取的TemplateRef,在AfterViewInit之后才能拿到,这边必须采用异步获取。
                renderer: () => this.lineRenderer
            }
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本Demo演示了chart-icon组件与表格配合使用的方法';
    description: string = '';
}
