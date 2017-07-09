import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawTooltipModule} from "jigsaw/component/tooltip/tooltip";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {TooltipInDomDemoComponent} from "./in-dom/demo";
import {TooltipDialogDemoComponent} from "./dialog/demo";
import {UserTooltipDialogComponent} from "./dialog/user-defined-tooltip-dialog";
import {SimpleTooltipDemoComponent} from "./simple-tooltip/demo";


const popupDemoRoutes = [
    {
        path: 'in-dom', component: TooltipInDomDemoComponent
    },
    {
        path: 'dialog', component: TooltipDialogDemoComponent
    },
    {
        path: 'inline', component: SimpleTooltipDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: TooltipInDomDemoComponent
    }
];

@NgModule({
    declarations: [
        TooltipInDomDemoComponent, TooltipDialogDemoComponent, UserTooltipDialogComponent,
        SimpleTooltipDemoComponent
    ],
    imports: [
        RouterModule.forChild(popupDemoRoutes),
        JigsawTooltipModule, JigsawButtonModule, JigsawInputModule
    ],
    providers: [PopupService],
    entryComponents: [
        UserTooltipDialogComponent
    ]
})
export class TooltipDemoModule {
}
