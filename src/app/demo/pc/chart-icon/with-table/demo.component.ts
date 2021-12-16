import {AfterViewInit, Component, TemplateRef, ViewChild} from "@angular/core";
import {ChartIconLine, ChartIconPie, ColumnDefine, InternalUtils, TableData,} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ChartIconTableDemoComponent implements AfterViewInit {
    tableData: TableData;
    data = [5, 3, 9, 6, 5, 9, 7, 3, 5, 2];

    @ViewChild("pieRenderer")
    pieRenderer: TemplateRef<any>;
    @ViewChild("lineRenderer")
    lineRenderer: TemplateRef<any>;

    ngAfterViewInit() {
        this.tableData.refresh();
    }

    constructor() {
        setInterval(() => {
            this.tableData.data.forEach(row => {
                row[4] = this.data.map(x => InternalUtils.randomNumber(0, 10));
                row[5] = this.data.map(x => InternalUtils.randomNumber(0, 10));
            });
            this.tableData.refresh();
        }, 1000);
        this.tableData = new TableData([
            ['Tony', 'Developer', '17000', 'Prod I', this.data, this.data],
            ['Griffith', 'System Architect', '18000', 'Prod II', this.data, this.data],
            ['Sarah', 'Developer', '16000', 'Prod I', this.data, this.data],
            ['Perry', 'Test Engineer', '17700', 'Prod I', this.data, this.data],
            ['Ellen', 'Developer', '17300', 'Prod I', this.data, this.data],
            ['Martha', 'Test Engineer', '15000', 'Prod I', this.data, this.data],
            ['Hilary', 'Developer', '12000', 'Prod I', this.data, this.data],
        ], ['name', 'position', 'salary', 'dept', 'pie', 'line']
        , ['姓名', '职位', '薪资', '部门', '工作量', '考核']);
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
