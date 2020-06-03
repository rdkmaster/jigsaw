import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})
export class CollapseBasicDemoComponent {

    public _$isActiveChange(isActive: boolean) {
        console.log(isActive);
    }

    public isActive = true;

    public _$click() {
        this.isActive = !this.isActive;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了`JigsawCollapse`多个属性的基本用法';
    description: string = '';
}
