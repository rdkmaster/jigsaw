import { Component } from "@angular/core";
import { ArrayCollection, LocalPageableArray, TransferListSourceRenderer, TransferListTargetRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TransferListDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListTargetRenderer;

    constructor() {
        this.normalData = new ArrayCollection([
            { label: '文本选项1' },
            { label: '文本选项2' },
            { label: '文本选项3' },
            { label: '文本选项4' },
            { label: '文本选项5' },
            { label: '文本选项6' },
            { label: '文本选项7' },
            { label: '文本选项8' },
            { label: '文本选项9' },
            { label: '文本选项10' },
            { label: '文本选项11' },
            { label: '文本选项12' },
            { label: '文本选项13' },
            { label: '文本选项14' },
            { label: '文本选项15' },
            { label: '文本选项16' },
            { label: '文本选项17' },
            { label: '文本选项18' },
            { label: '文本选项19' },
            { label: '文本选项20' }
        ]);

        this.normalSelectedData = new ArrayCollection([
            { label: '文本选项1' },
            { label: '文本选项2' },
            { label: '文本选项3' },
            { label: '文本选项4' },
            { label: '文本选项5' }
        ]);
    }

    normalData: ArrayCollection<any>;
    normalSelectedData: ArrayCollection<any>;
    localPageableData: LocalPageableArray<any>;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
