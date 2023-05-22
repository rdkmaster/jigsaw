import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, ListOption, TransferListDestRenderer, TransferListSourceRenderer} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TransferCheckedChangeDemoComponent {
    constructor(private _http: HttpClient) {
        // this.data = [{ zhName: "北京" }, { zhName: "上海" }, { zhName: "南京" }, { zhName: "深圳" }, { zhName: "长沙" }, { zhName: "西安" }];
        this.data = [{ zhName: "北京" }];
        this.selectedItems = new ArrayCollection(this.data.filter(item => item.selected));
    }

    public data: ListOption[];
    public selectedItems: ArrayCollection<ListOption>

    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'zhName';
    public sourceCheckedItems: string;
    public destCheckedItems: string;

    public sourceChecked($event: ArrayCollection<ListOption>): void {
        console.log("source checked change: ", $event);
        this.sourceCheckedItems = $event.join(", ");
        // this.selectedItems.refresh();

        const selectedItems = this.selectedItems.concat(...$event);
        if (selectedItems.length == this.data.length) {
            // 点击全选的CheckBox
            const groups = this.groupPlugins(
                this.data
                    .filter(item => this.selectedItems.every(selected => selected[this.trackItemBy] != item[this.trackItemBy]))
            );
            
            // 只保留同一组中首个插件，其它的禁掉
            Object.keys(groups).forEach(groupName => groups[groupName].forEach((item, index) => item.disabled = (index != 0)));
            while (this.selectedItems.some(item => item.disabled)) {
                const index = this.selectedItems.findIndex(item => item.disabled);
                this.selectedItems.splice(index, 1);
            }
            this.selectedItems.refresh();
            return;
        }

        const unselectedItems = this.data
            .filter(item => selectedItems.every(selected => selected[this.trackItemBy] != item[this.trackItemBy]));
        unselectedItems.forEach(item => item.disabled = false);
        unselectedItems
            .filter(unselected => !!unselected.group)
            .filter(unselected => selectedItems.some(selected => unselected.group.name == selected.group?.name))
            .forEach(item => item.disabled = true);
    }

    public groupPlugins(plugins, required?: boolean) {
        plugins = plugins.filter(item => !!item.group).filter(item => required ? item.group.require : true);
        const groups = {};
        plugins.forEach(item => {
            const groupName = item.group.name;
            if (groups[groupName]) {
                groups[groupName].push(item);
            } else {
                groups[groupName] = [item];
            }
        });
        return groups;
    }

    public destinationChecked($event: ArrayCollection<ListOption>): void {
        console.log("dest checked change: ", $event);
        this.destCheckedItems = $event.join(", ");
    }

    public selectedItemsChange(): void {
        this.sourceCheckedItems = "";
        this.destCheckedItems = "";
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
