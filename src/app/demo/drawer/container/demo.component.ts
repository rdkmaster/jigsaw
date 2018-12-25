import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerContainerDemoComponent {
    isOpen: boolean = false;
    selectedPosition = 'left';
    touched = false;

    toggle() {
        this.isOpen = !this.isOpen;
        this.touched = true;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
