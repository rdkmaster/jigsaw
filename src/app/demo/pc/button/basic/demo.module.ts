import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonBasicDemoComponent],
    exports: [ ButtonBasicDemoComponent ],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class ButtonBasicDemoModule{

}
