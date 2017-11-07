/**
 * Created by 10184437 on 2017/5/10.
 */
import {Component} from '@angular/core';
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html'
})

export class ButtonPresetDemoComponent extends DemoBase {
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
}
