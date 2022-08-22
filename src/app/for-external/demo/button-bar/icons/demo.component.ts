import { Component } from "@angular/core";
import { ButtonBarTextService } from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "button-bar-icons",
    templateUrl: "./demo.component.html",
})

export class ButtonBarIconsComponent {
    public multiple: boolean = false;

    public types = new ArrayCollection([
        { label: "成功", id: 1, icon: 'iconfont iconfont-e142' },
        { label: "错误", id: 2, icon: 'iconfont iconfont-e132' },
        { label: "警告", id: 3, icon: 'iconfont iconfont-e1a5' },
        { label: "信息", id: 4, icon: 'iconfont iconfont-e22c' }
    ]);
    public unlabeledTypes = this.types.map(t => ({ id: t.id, icon: t.icon, label: '' }));
    public selectedTypes = [{ id: 4 }];

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "大", size: "default" }
    ]);
    public selectedSize = { label: "大", size: "default" };
    constructor(public doc: ButtonBarTextService) { }
}
