import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})

export class BadgeBasicDemoComponent {
    select($event){
        console.log($event);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-badge`指令的简单用法';
    description: string = '';
}
