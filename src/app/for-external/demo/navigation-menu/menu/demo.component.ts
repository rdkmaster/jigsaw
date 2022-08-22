import {Component,  QueryList, ViewChildren} from "@angular/core";
import {NavigationMenuTextService} from "../doc.service";
import {SimpleNode, SimpleTreeData} from "jigsaw/public_api";
import {JigsawNavigationMenu} from "jigsaw/public_api";

@Component({
    selector: "nav-menu",
    templateUrl: "demo.component.html",
})
export class NavigationMenuDemoComponent {
    public data2: SimpleTreeData = new SimpleTreeData();
    constructor(public doc: NavigationMenuTextService) {
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
        this.data2.fromXML(xmlData)
    }
    @ViewChildren(JigsawNavigationMenu)
    menus: QueryList<JigsawNavigationMenu>;
    selectedMenuLabel = '';

    selectMenu(): void {
        this.menus.forEach(menu => {
            menu.selectMenu('label', this.selectedMenuLabel);
        });
    }
    onMenuSelect(node: SimpleNode) {
        console.log(`${node.label} 被点击了!!!`);
    }
}
