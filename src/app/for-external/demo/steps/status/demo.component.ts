import { Component } from "@angular/core";
import { StepsTextService } from "../doc.service";

@Component({
    selector: 'steps-status',
    templateUrl: "./demo.component.html"
})
export class JigsawStepstatusDemoComponent {
    public data = [
        {
            title: '这是error',
            status: 'error',
            subTitle: '描述信息'
        },
        {
            title: '这是warning',
            status: 'warning',
            subTitle: '描述信息'
        },
        {
            title: '这是error',
            status: 'error',
            subTitle: '描述信息'
        },
        {
            title: '这是error',
            status: 'error',
            subTitle: '描述信息'
        },
        {
            title: '这是normal',
            status: 'normal',
            subTitle: '描述信息'
        },
    ]
    public current = 0;

    public currentChange(event: number) {
        console.log(`${event} is selected: `, this.data[event]);
    }

    constructor(public doc: StepsTextService) {
    }
}
