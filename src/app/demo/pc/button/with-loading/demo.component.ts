import {Component} from "@angular/core";

@Component({
    templateUrl: "./demo.component.html"
})
export class ButtonWithLoadingComponent {
    isLoading = false;
    label: string = 'click to load';
    disabled = false;

    onClick() {
        this.isLoading = !this.isLoading;
        this.label = this.isLoading ? 'loading...' : 'click to load';
        this.disabled = true;
        setTimeout(() => {
            this.disabled = false;
            this.isLoading = !this.isLoading;
            this.label = this.isLoading ? 'loading...' : 'click to load';
        }, 3000);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了按钮和Loading组件的无缝配合使用';
    description: string = '';
}
