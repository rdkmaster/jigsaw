import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {H5DragDemoModule} from "./h5-drag/app.module";
import {H5DragDemoComponent} from "./h5-drag/app.component";

const draggableDemoRoutes = [
    {
        path: '', redirectTo: 'h5-drag', pathMatch: 'full'
    },
    {
        path: 'h5-drag', component: H5DragDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: H5DragDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(draggableDemoRoutes),
        H5DragDemoModule
    ]
})
export class DraggableDemoModule {
}
