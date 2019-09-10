import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
})
export class StepsLiteComponent {
    steps = [
        {
            title: 'done',
            status: "done"
        },
        {
            title: 'error',
            status: "error"
        },
        {
            title: 'processing',
            status: "processing"
        },
        {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        }, {
            title: 'warning',
            status: "warning"
        }, {
            title: 'warning',
            status: "warning"
        }
    ];

    public numInLine = 1;

    public presize = 'default';

    public _$handleAdd() {
        this.numInLine++;
    }

    public _$handleSub() {
        if (this.numInLine > 1) {
            this.numInLine--;
        }
    }

    public _$handleLarge() {
        this.presize = 'large';
    }

    public _$handleSmall() {
        this.presize = 'small';
    }


    public _$handleDefault() {
        this.presize = 'default';
    }


    public _$selectChange($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-steps-lite组件最简单的用法';
    description: string = '';
}
