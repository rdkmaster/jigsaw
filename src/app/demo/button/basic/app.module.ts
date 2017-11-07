import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonBasicDemoComponent} from "./app.component";

@NgModule({
    declarations: [ButtonBasicDemoComponent],
    bootstrap: [ ButtonBasicDemoComponent ],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class ButtonBasicDemoModule{

}
