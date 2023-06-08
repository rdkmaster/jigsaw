import { Component } from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css', './../../assets/demo.common.css']
})
export class BoxInflexibleDemoComponent {
    public showBox1 = true;
    public showBox2 = true;
    public showBox3 = true;
    public showBox4 = true;
    public showBox5 = true;
    public showBox6 = true;
    public showBox7 = true;
    public showBox8 = true;
    public showBox9 = true;

    public showParentBox1 = true;
    public showParentBox2 = true;
    public showParentBox3 = true;

    public disableGrow1 = true;
    public disableGrow2 = false;
    public disableGrow3 = false;
    public disableGrow4 = false;
    public disableGrow5 = false;
    public disableGrow6 = false;
    public disableGrow7 = false;
    public disableGrow8 = false;
    public disableGrow9 = false;

    public disableParentGrow1 = false;
    public disableParentGrow2 = false;
    public disableParentGrow3 = false;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
