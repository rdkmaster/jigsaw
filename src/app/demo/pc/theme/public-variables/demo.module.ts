import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawHeaderModule, JigsawInputModule, JigsawTagModule, JigsawColorSelectModule, JigsawNotificationModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PublicVariablesDemoComponent} from "./demo.component";
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [PublicVariablesDemoComponent],
    exports: [ PublicVariablesDemoComponent ],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule,
        JigsawHeaderModule, JigsawInputModule, JigsawTagModule,
        JigsawColorSelectModule, CommonModule, JigsawNotificationModule]
})
export class PublicVariablesDemoModule{

}
