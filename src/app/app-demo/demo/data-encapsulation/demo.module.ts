import {NgModule} from "@angular/core";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {DataEncapsulationDemoComponent} from "./demo.component";

@NgModule({
    declarations: [DataEncapsulationDemoComponent],
    imports:[DemoTemplateModule]
})
export class DataEncapsulationDemoModule {
}
