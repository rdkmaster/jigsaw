import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonWithChartIconDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {ChartIconButtonDemoModule} from "../../chart-icon/with-button/demo.module";

@NgModule({
    declarations: [ButtonWithChartIconDemoComponent],
    exports: [ ButtonWithChartIconDemoComponent ],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule, DemoTemplateModule, ChartIconButtonDemoModule]
})
export class ButtonWithChartIconDemoModule {

}
