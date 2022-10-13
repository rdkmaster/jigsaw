import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { SimpleNode, SimpleTreeData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "nav-fold",
    templateUrl: "demo.component.html",
})
export class NavigationFoldDemoComponent extends AsyncDescription {
    public demoPath = "demo/navigation-menu/fold";

    public data: SimpleTreeData = new SimpleTreeData();
    public collapsed: boolean = true;

    public onMenuSelect(node: SimpleNode) {
        console.log(`${node.label} 被点击了!!!`);
    }

    public onCollapsedChanged(event: boolean) {
        console.log(event, this.collapsed);
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        const xmlData = `
            <node>
                <node label="标准图标1" icon="iconfont iconfont-e231" selected="true"></node>
                <node label="标准图标2" icon="iconfont iconfont-e261"></node>
                <node label="标准图标3" icon="iconfont iconfont-e2f6"></node>
                <node label="标准图标4" icon="iconfont iconfont-e2d4"></node>
                <node label="标准图标5" icon="iconfont iconfont-e17c"></node>
                <node label="标准图标6" icon="iconfont iconfont-e0d1"></node>
                <node label="标准图标7" icon="iconfont iconfont-e191"></node>
                <node label="标准图标8" icon="iconfont iconfont-e54a"></node>
                <node label="标准图标9" icon="iconfont iconfont-e212"></node>
                <node label="标准图标10" icon="iconfont iconfont-e367"></node>
            </node>
        `;
        this.data.fromXML(xmlData);
    }
}
