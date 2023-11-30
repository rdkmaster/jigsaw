import {Component} from "@angular/core";
import {FloatPosition} from "jigsaw/public_api";

@Component({
    templateUrl: 'demo.component.html'
})
export class FormDisplayPerformanceTestDemoComponent {

    public formio = {
        "title": "3000条无渲染器数据",
        "data": this.getCommonData(299)
    }

    public getCommonData(rowCount: number): any[] {
        const rows = [];
        rows.push([
            {"value": "目标名称", "isHeader": true, "isRequired": true},
            {"value": "字段细节及业务主题描述", "isHeader": true, "isRequired": true},
            {"value": "数据长度", "isHeader": true, "isRequired": true},
            {"value": "字段说明", "isHeader": true, "isRequired": true},
            {"value": "关联业务主题", "isHeader": true, "isRequired": true},
            {"value": "表格名称", "isHeader": true, "isRequired": true},
            {"value": "相关字段描述与业务主题", "isHeader": true, "isRequired": true},
            {"value": "字段规格", "isHeader": true, "isRequired": true},
            {"value": "字段解释", "isHeader": true, "isRequired": true},
            {"value": "主题关联", "isHeader": true, "isRequired": true}
        ])
        const firstRow = [
            {"value": "行1数据1"},
            {"value": "行1数据2"},
            {"value": "行1数据3"},
            {"value": "行1数据4"},
            {"value": "行1数据5"},
            {"value": "行1数据6"},
            {"value": "行1数据7"},
            {"value": "行1数据8"},
            {"value": "行1数据9"},
            {"value": "行1数据10"}
        ];
        for (let i = 0; i < rowCount; i++) {
            const newRow = firstRow.map(item => ({"value": `行${i + 1}${item.value.slice(2)}`}));
            rows.push(newRow);
        }
        return rows;
    }

    public formStyleOption = {
        trStyle: {'border-width': '1px'},
        tdStyle: {'text-align': 'left', 'border-width': '1px', 'padding-left': '9px'},
        tooltipConfig: {
            enableTooltip: true,
            overflowOnly: true,
            position: <FloatPosition>'top'
        }
    }


    summary: string = "这个DEMO演示了form-display组件单元格使用渲染器。";
    description: string = "";
}
