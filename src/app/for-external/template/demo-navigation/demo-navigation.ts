import { Component, NgModule, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "demo-navigation",
    templateUrl: "./demo-navigation.html",
    styleUrls: ["./demo-navigation.scss"],
})
export class DemoNavigation {
    @Input()
    public navigationData = [];

    public scroll(el) {
        el.scrollIntoView();
        // now account for fixed header
        var scrolledY = window.scrollY;

        if (scrolledY) {
            window.scroll(0, scrolledY - 60);
        }
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [DemoNavigation],
    exports: [DemoNavigation],
})
export class DemoNavigationModule {}
