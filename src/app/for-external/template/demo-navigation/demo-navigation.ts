import { Component, NgModule, Input } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component({
    selector: "demo-navigation",
    templateUrl: "./demo-navigation.html",
    styleUrls: ["./demo-navigation.scss"]
})
export class DemoNavigation {
    @Input()
    public navigationData = [];

    public scroll(el){
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [DemoNavigation],
    exports: [DemoNavigation],
})
export class DemoNavigationModule {

}
