import {NgModule} from "@angular/core";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {RadioBasicDemoComponent} from "./app.component";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [RadioBasicDemoComponent],
    bootstrap: [RadioBasicDemoComponent],
    imports: [JigsawRadioModule,CommonModule]
})
export class RadioBasicDemoModule{

}
