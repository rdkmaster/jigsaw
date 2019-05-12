import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class AlertInDomDemoComponent {

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '直观显示各个Alert组件默认配置的效果';
    description: string = '';
    tags: string[] = [
        'JigsawMobileInfoAlert', 'JigsawMobileWarningAlert', 'JigsawMobileErrorAlert', 'JigsawMobileConfirmAlert'
    ];
}

