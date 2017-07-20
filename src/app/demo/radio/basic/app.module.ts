import {NgModule} from "@angular/core";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {RadioBasicDemoComponent} from "./app.component";
@NgModule({
    declarations: [RadioBasicDemoComponent],
    bootstrap: [RadioBasicDemoComponent],
    imports: [JigsawRadioModule]
})
export class RadioBasicDemoModule{

}
