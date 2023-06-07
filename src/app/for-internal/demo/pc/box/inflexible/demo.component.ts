import { Component } from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css', './../../assets/demo.common.css']
})
export class BoxInflexibleDemoComponent {
    public showBox1 = true;
    public showBox2 = true;
    public showBox3 = true;

    public growLock1 = false;
    public growLock2 = false;
    public growLock3 = false;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
