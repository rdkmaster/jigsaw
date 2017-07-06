import { Component } from "@angular/core";

@Component({
  templateUrl: 'basic.html'
})
export class SwitchBasicDemoComponent {
    public testSwitch(message:any){
        console.log("switch message is: "+message);
    }
}

