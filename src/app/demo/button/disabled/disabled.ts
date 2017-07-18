import {Component} from "@angular/core";

@Component({
    templateUrl: 'disabled.html'
})
export class ButtonDisableDemoComponent {
    disabled: boolean;
    clickCount: number = 0;
    click() {
        //alert('nothing happened!')
        this.clickCount++;
    }
}

