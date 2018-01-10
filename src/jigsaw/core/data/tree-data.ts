import {GeneralCollection} from "./general-collection";
import {CommonUtils} from "../utils/common-utils";

export class TreeData extends GeneralCollection<any> {
    [index: string]: any;
    label: string;
    nodes?: TreeData[];

    public fromObject(data: any): TreeData {
        if (!data) {
            return this;
        }
        if (data instanceof Array) {
            data = {nodes: data, label: this.label};
        }

        for (let key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }

            if (data[key] && key == 'nodes') {
                this.nodes = TreeData.fromArray(data[key]);
            } else {
                this[key] = data[key];
            }
            this.propList.push(key);
        }

        this.refresh();
        return this;
    }

    public static fromArray(nodes: any[]): TreeData[] {
        const result: TreeData[] = [];
        if (!nodes) {
            return result;
        }
        nodes.forEach(node => {
            const td: TreeData = new TreeData();
            td.fromObject(node);
            result.push(td);
        });
        return result;
    }
}

export class LayoutData extends GeneralCollection<any> {
    [index: string]: any;
    direction?: string;
    justify?: string;
    align?: string;
    order?: number;
    grow?: number;
    shrink?: number;
    nodes?: LayoutData[];

    public toString(): string {
        return this._parseNodeToString(this, '');
    }

    private _parseNodesToString(nodes: LayoutData[], domStr: string): string {
        if (nodes instanceof Array) {
            nodes.forEach(node => {
                domStr = this._parseNodeToString(node, domStr);
            })
        }
        return domStr;
    }

    private _parseNodeToString(node: LayoutData, domStr: string): string {
        domStr += `<j-box${CommonUtils.isDefined(node.direction) ? ` direction="${node.direction}"` : ''}${CommonUtils.isDefined(node.grow) ? ` grow="${node.grow}"` : ''}> \n`;
        domStr = this._parseNodesToString(node.nodes, domStr) + `</j-box> \n`;
        return domStr;
    }

    public fromObject(data: any): LayoutData {
        if (!data) {
            return this;
        }
        if (data instanceof Array) {
            data = {
                nodes: data,
                direction: this.direction,
                justify: this.justify,
                align: this.align,
                order: this.order,
                grow: this.grow,
                shrink: this.shrink
            };
        }

        for (let key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }

            if (data[key] && key == 'nodes') {
                this.nodes = LayoutData.fromArray(data[key]);
            } else {
                this[key] = data[key];
            }
            this.propList.push(key);
        }

        this.refresh();
        return this;
    }

    public static fromArray(nodes: any[]): LayoutData[] {
        const result: LayoutData[] = [];
        if (!nodes) {
            return result;
        }
        nodes.forEach(node => {
            const td: LayoutData = new LayoutData();
            td.fromObject(node);
            result.push(td);
        });
        return result;
    }
}
