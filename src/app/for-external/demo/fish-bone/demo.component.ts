import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class FishBoneAllComponent extends DemoSetBase {
    public demoPath = "demo/fish-bone";
    public docPath = ['component/JigsawFishBone'];
}