import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ButtonBasicDemoComponent],
    exports: [ ButtonBasicDemoComponent ],
    imports: [JigsawMobileButtonModule, JigsawDemoDescriptionModule]
})
export class ButtonBasicDemoModule{

}
