import { Component } from "@angular/core";

@Component({
  templateUrl: 'basic.html'
})
export class SwitchBasicDemoComponent {
    public testSwitch(message:any){
        alert("switch message is: "+message);
    }
}

