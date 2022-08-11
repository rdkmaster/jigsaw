import {Component} from "@angular/core";
import {StepItem} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class JigsawStepGotoDemoComponent {
    data = [
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

    steps1: StepItem[] = [];
    steps2: StepItem[] = [];
    step1 = 2;
    step2 = 0;

    constructor() {
        this.steps1 = JSON.parse(JSON.stringify(this.data));
        this.steps2 = JSON.parse(JSON.stringify(this.data)).map((item, index) => {
            if (index == 0) {
                return item;
            }
            // 默认情况下，除第一个以外，其余节点都禁用
            item.disabled = true;
            return item;
        });
    }

    public currentChange1(event: number) {
        console.log(`${event} is selected: `, this.steps1[event]);
    }

    public currentChange2(event: number) {
        console.log(`${event} is selected: `, this.steps2[event]);
    }

    public pre() {
        this.step2 -= 1;
    }

    public next() {
        this.step2 += 1;
        const stepObject = this.steps2[this.step2];
        // 访问过的节点，去除disabled
        delete stepObject.disabled;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
