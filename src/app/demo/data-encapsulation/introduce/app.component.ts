import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html'
})
export class DataIntroduceComponent {

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = 'Jigsaw提供了很多数据封装对象用于处理各种场景下的数据，熟悉和善于利用这些数据封装对象会减少很多重复性的工作。';
    description: string = require('!!raw-loader!./readme.md');
}
