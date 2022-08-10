import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ButtonBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonBasicDemoComponent],
    exports: [ ButtonBasicDemoComponent ],
    imports: [JigsawMobileButtonModule, JigsawDemoDescriptionModule]
})
export class ButtonBasicDemoModule{

}
