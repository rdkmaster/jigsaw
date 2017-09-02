import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {ButtonDisableDemoComponent} from "./app.component";

@NgModule({
    declarations: [ButtonDisableDemoComponent],
    bootstrap: [ ButtonDisableDemoComponent ],
    imports: [JigsawButtonModule,JigsawCheckBoxModule]
})
export class ButtonDisableDemoModule{

}
