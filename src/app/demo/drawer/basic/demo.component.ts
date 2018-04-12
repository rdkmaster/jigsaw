import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerBasicDemoComponent {
    positions = [
        {label: 'left'},
        {label: 'top'},
        {label: 'right'},
        {label: 'bottom'},
    ];
    draweropen:boolean=false;

    selectedPosition = this.positions[0];

    toggleClick(){
      this.draweropen=!this.draweropen;
      console.log("open status from outter drawer is:"+ this.draweropen);
    }
    public openChangelog(message:boolean){
        console.log("open status from inner drawer is:"+ message);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawDrawer'
    ];

}
