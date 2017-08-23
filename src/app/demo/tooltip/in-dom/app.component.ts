import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    template: `
        <jigsaw-tooltip-dialog>
            <div class="tooltip-content">
                <h3><span class="fa fa-thumbs-up"></span>This is a message!</h3>
                <p>
                    This is some extra messages!<br>
                    This is some extra messages!<br>
                    This is some extra messages!<br>
                </p>
            </div>
        </jigsaw-tooltip-dialog>
    `,
    styles: [`.tooltip-content{line-height: 1;font-size: 12px}
    .tooltip-content h3{margin-bottom: 8px;font-size: 14px;}
    .tooltip-content h3 span{margin-right: 5px}
    .tooltip-content p{line-height: 1.4;}`]
})
export class TooltipInDomDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}

