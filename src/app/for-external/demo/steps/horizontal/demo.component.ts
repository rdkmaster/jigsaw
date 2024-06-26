import { Component } from "@angular/core";
import { StepItem } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'steps-horizontal',
    templateUrl: "./demo.component.html"
})
export class JigsawStepHorizontalDemoComponent extends AsyncDescription {
    public demoPath = "demo/steps/horizontal";

    public data = [
        {
            title: "类型",
            status: "normal"
        },
        {
            title: "源端配置",
            status: "normal"
        },
        {
            title: "目的端配置(1/3)",
            status: "normal"
        },
        {
            title: "目的端配置(2/3)",
            status: "normal"
        },
        {
            title: "目的端配置(3/3)",
            status: "normal"
        },
        {
            title: "任务配置",
            status: "normal"
        },
        {
            title: "预览保存",
            status: "normal"
        }
    ];

    public steps: StepItem[] = [];
    public step = 2;

    public currentChange(event: number) {
        console.log(`${event} is selected: `, this.steps[event]);
    }
}
