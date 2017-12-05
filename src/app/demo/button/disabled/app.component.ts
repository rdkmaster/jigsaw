import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html'
})
export class ButtonDisableDemoComponent {
    disabled: boolean;
    clickCount: number = 0;
    click() {
        //alert('nothing happened!')
        this.clickCount++;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

