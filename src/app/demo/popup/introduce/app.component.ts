import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html'
})
export class PopupServiceIntroduceComponent {

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '关于`PopupService`你所需要知道的一切都在这里';
    description: string = require('!!raw-loader!./readme.md');
}
