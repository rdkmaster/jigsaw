/**
 * Created by 10184437 on 2017/5/10.
 */
import {Component} from '@angular/core';

@Component({
    templateUrl: './app.component.html'
})

export class ButtonPresetDemoComponent {
    public size: string = "";
    public aSize: string = "";

    onClick() {
        alert('hello jigsaw button');
    }

    changeSize(type?: string) {
        this.size = type;
    }

    changeASize(type?: string) {
        this.aSize = type;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
