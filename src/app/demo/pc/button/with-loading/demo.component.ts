import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class ButtonWithLoadingComponent {
    isLoading = false;
    label: string = 'click to load';

    onClick() {
        this.isLoading = !this.isLoading;
        this.label = this.isLoading ? 'loading...' : 'click to load';
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了按钮和Loading组件的无缝配合使用';
    description: string = '';
    tags: string[] = [
        'JigsawButton', 'JigsawBallLoading', 'JigsawBubbleLoading',
        'JigsawFontLoading', 'JigsawLoading'
    ];
}

