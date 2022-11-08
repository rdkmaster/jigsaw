import { Component } from "@angular/core";
import { IDynamicInstantiatable } from "jigsaw/public_api";

@Component({
    templateUrl: 'tabContent.html',
    styleUrls: ['./tabContent.css']
})
export class TabContentComponent {
    initData: any;
}

@Component({
    templateUrl: 'tabContent.html',
    styleUrls: ['./tabContent.css']
})
export class TabContentDefine implements IDynamicInstantiatable {
    public initData = { username: "zte" }
}
