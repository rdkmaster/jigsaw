import {NgModule} from "@angular/core";
import {ScrollbarBasicDemoComponent} from "./app.component";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [ScrollbarBasicDemoComponent],
    bootstrap: [ScrollbarBasicDemoComponent],
    imports: [PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)]
})
export class ScrollbarBasicDemoModule{

}
