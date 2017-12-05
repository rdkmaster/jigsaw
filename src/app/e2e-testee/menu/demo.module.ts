import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {JigsawMenuModule} from "../../../jigsaw/component/menu/menu";
import {PopupService} from "jigsaw/service/popup.service";
import {MenuDemo} from "./app.component";
import {JigsawButtonModule} from "../../../jigsaw/component/button/button";

const notificationDemoRoutes = [
    {path: 'menu', component: MenuDemo}
];

@NgModule({
    declarations: [MenuDemo],
    bootstrap: [MenuDemo],
    imports: [RouterModule.forChild(notificationDemoRoutes),JigsawMenuModule,JigsawButtonModule],
    providers: [PopupService]
})
export class MenuDemoModule{}
