import { Component } from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ListTrackItemByDemoComponent {
    public list = [
        [
            { label: "文本选项1", groupName: "分组标题1" },
            { label: "文本选项2", groupName: "分组标题1" },
            { label: "文本选项3", groupName: "分组标题1" }
        ],
        [
            { label: "文本选项1", groupName: "分组标题2" },
            { label: "文本选项2", groupName: "分组标题2" },
            { label: "文本选项3", groupName: "分组标题2" }
        ],
        [
            { label: "文本选项1", groupName: "分组标题3" },
            { label: "文本选项2", groupName: "分组标题3" },
            { label: "文本选项3", groupName: "分组标题3" }
        ]
    ];

    public selectedItems = [{ label: "文本选项3", groupName: "分组标题1" }, { label: "文本选项3", groupName: "分组标题2" }];

    public trackItemBy = ['label', 'groupName'];

    public _$handleGroupSelectChange($event) {
        console.log($event);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
