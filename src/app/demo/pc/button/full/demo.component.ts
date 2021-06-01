import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class ButtonFullComponent {

    // demo-5
    canClick() {
        alert('hello jigsaw button');
    }

    // demo-6
    disabled: boolean;
    clickCount: number = 0;
    changeClickCount() {
        this.clickCount++;
    }

    // demo-7
    isLoading = false;
    label: string = 'click to load';
    loadingDisabled = false;
    onClick() {
        this.isLoading = !this.isLoading;
        this.label = this.isLoading ? 'loading...' : 'click to load';
        this.loadingDisabled = true;
        setTimeout(() => {
            this.isLoading = !this.isLoading;
            this.label = this.isLoading ? 'loading...' : 'click to load';
            this.loadingDisabled = false;
        }, 3000);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了按钮的多种用法';
    description: string = '';
}
