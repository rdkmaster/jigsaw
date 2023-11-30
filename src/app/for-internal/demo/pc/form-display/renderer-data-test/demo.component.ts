import {Component, ViewChild} from "@angular/core";
import {FloatPosition, JigsawFormDisplayComponent} from "jigsaw/public_api";

@Component({
    templateUrl: 'demo.component.html'
})
export class FormDisplayRendererDataTestDemoComponent {

    @ViewChild('jigsawFormDisplayComponent')
    jigsawFormDisplayComponent: JigsawFormDisplayComponent

    public formDisplayRows: number = 99;

    public formio = {
        "title": `${(this.formDisplayRows+1)*10}条渲染器数据`,
        "data": this.getRendererAsData(this.formDisplayRows)
    }

    public getRendererAsData(rowCount: number): any[] {
        const rows = [];
        rows.push([
            {"value": `<div style="background: grey; width: fit-content; border-radius: 5px; padding: 0 8px 0 8px;">目标名称</div>`,
                "isHeader": true, "rendererAs": "html"},
            {"value": `<div style="background: grey; width: fit-content; border-radius: 5px; padding: 0 8px 0 8px;">字段细节及业务主题描述</div>`,
                "isHeader": true, "rendererAs": "html"},
            {"value": `<div style="background: grey; width: fit-content; border-radius: 5px; padding: 0 8px 0 8px;">数据长度</div>`,
                "isHeader": true, "rendererAs": "html"},
            {"value": `<div style="background: grey; width: fit-content; border-radius: 5px; padding: 0 8px 0 8px;">字段说明</div>`,
                "isHeader": true, "rendererAs": "html"},
            {"value": `<div style="background: grey; width: fit-content; border-radius: 5px; padding: 0 8px 0 8px;">关联业务主题</div>`,
                "isHeader": true, "rendererAs": "html"},
            {"value": `<div style="background: grey; width: fit-content; border-radius: 5px; padding: 0 8px 0 8px;">表格名称</div>`,
                "isHeader": true, "rendererAs": "html"},
            {"value": `<div style="background: grey; width: fit-content; border-radius: 5px; padding: 0 8px 0 8px;">相关字段描述与业务主题</div>`,
                "isHeader": true, "rendererAs": "html"},
            {"value": `<div style="background: grey; width: fit-content; border-radius: 5px; padding: 0 8px 0 8px;">字段规格</div>`,
                "isHeader": true, "rendererAs": "html"},
            {"value": `<div style="background: grey; width: fit-content; border-radius: 5px; padding: 0 8px 0 8px;">字段解释</div>`,
                "isHeader": true, "rendererAs": "html"},
            {"value": `<div style="background: grey; width: fit-content; border-radius: 5px; padding: 0 8px 0 8px;">主题关联</div>`,
                "isHeader": true, "rendererAs": "html"}
        ])
        const firstRow = [
            {"value": "行1数据1", "rendererAs": "tag"},
            {"value": "行1数据2", "rendererAs": "tag"},
            {"value": "行1数据3", "rendererAs": "tag"},
            {"value": "行1数据4", "rendererAs": "tag"},
            {"value": "行1数据5", "rendererAs": "tag"},
            {"value": "行1数据6", "rendererAs": "tag"},
            {"value": "行1数据7", "rendererAs": "tag"},
            {"value": "行1数据8", "rendererAs": "tag"},
            {"value": "行1数据9", "rendererAs": "tag"},
            {"value": "行1数据10", "rendererAs": "tag"}
        ];
        for (let i = 0; i < rowCount; i++) {
            const newRow = firstRow.map(item => ({"value": `行${i + 1}${item.value.slice(2)}`, "rendererAs": "tag"}));
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

    public changeSource() {
        this.jigsawFormDisplayComponent.data = {
            "title": `${(this.formDisplayRows+1)*10}条渲染器数据`,
            "data": this.getRendererAsData(this.formDisplayRows)
        }
    }

    summary: string = "这个DEMO演示了form-display组件单元格使用渲染器数据。";
    description: string = "";
}
