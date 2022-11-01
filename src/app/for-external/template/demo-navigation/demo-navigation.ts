import { Component, NgModule, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

const demoNavigationInfo = require('../demo-navigation-info.json');

@Component({
    selector: "demo-navigation",
    templateUrl: "./demo-navigation.html",
    styleUrls: ["./demo-navigation.scss"],
})
export class DemoNavigation implements OnInit {
    @Input()
    public navigationData: Element[] = [];

    public _$navData = [];

    public scroll(el) {
        el.scrollIntoView();
        const scrolledY = window.scrollY;
        if (scrolledY) {
            window.scroll(0, scrolledY - 60);
        }
    }

    public excludeTagName = [
        "jigsaw-markdown",
        "doc-footer-template",
        "demo-navigation",
    ];

    ngOnInit(): void {
        const navData = Array.from(this.navigationData).filter((data) => {
            return !this.excludeTagName.includes(data.localName);
        });
        navData.forEach((data) => {
            if (data.localName === "doc-template") {
                this._$navData.push({ label: "API文档", el: data });
                return;
            }
            const label = demoNavigationInfo[data.localName].label;
            this._$navData.push({ label: label, el: data });
        });
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [DemoNavigation],
    exports: [DemoNavigation],
})
export class DemoNavigationModule {}
