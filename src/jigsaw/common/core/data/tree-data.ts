import {GeneralCollection} from "./general-collection";
import {CommonUtils} from "../utils/common-utils";

/**
 * 用于处理树状关系的数据，目前只实现了最基础的功能，后续会增加子级数据懒加载等功能。
 *
 * 层次关系数据是Jigsaw数据体系中的一个分支，关于Jigsaw数据体系详细介绍，请参考`IComponentData`的说明
 *
 * 这个数据只适用于复杂组件树结构的组件，性能上会有些折扣，`JigsawTreeExt`这样的包装组件请使用`SimpleTreeData`
 */
export class TreeData extends GeneralCollection<any> {
    [index: string]: any;

    /**
     * 此属性的值一般用于显示在界面上
     */
    label: string;
    /**
     * 子级节点，`TreeData`是一个递归的结构。
     */
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

export type SimpleNode = {
    label: string;
    nodes?: SimpleNode[];
    [prop: string]: any;
}

declare const DOMParser;
let domParser: any;

/**
 * 对树形结构的json进行一个简单的包装，比如把ztree的数据包装成jigsaw认识的数据
 */
export class SimpleTreeData extends GeneralCollection<any> {
    [prop: string]: any;

    /**
     * 此属性的值一般用于显示在界面上
     */
    label: string;
    /**
     * 子级节点，`SimpleZTreeData` 不是一个递归的结构，所以子节点是用户原生提供的
     */
    nodes?: SimpleNode[];

    public static parseXML(xml: string): XMLDocument {
        if (CommonUtils.isUndefined(DOMParser)) {
            throw new Error('DOMParser is not supported in current environment');
        }
        if (CommonUtils.isUndefined(domParser)) {
            domParser = new DOMParser();
        }
        return xml ? domParser.parseFromString(xml, 'text/xml') : null;
    }

    public fromObject(data: any): SimpleTreeData {
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

            this[key] = data[key];
            this.propList.push(key);
        }

        this.refresh();
        return this;
    }

    public fromXML(xml: string | XMLDocument): SimpleTreeData {
        const xmlDoc = typeof xml == 'string' ? SimpleTreeData.parseXML(xml) : xml;
        if (xmlDoc && xmlDoc.childElementCount > 0) {
            this.nodes = [];
            this._toSimpleNode(xmlDoc.children[0], this);
        }

        this.refresh();
        return this;
    }

    protected ajaxSuccessHandler(data: string | XMLDocument | any): void {
        if (data instanceof XMLDocument || Object.prototype.toString.call(data) == "[object String]") {
            this.fromXML(data)
        } else {
            this.fromObject(data);
        }
        this._busy = false;
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    private _toSimpleNode(xmlElement: Element, target?: SimpleTreeData): SimpleNode {
        const node = target || {
            // 如果属性里提供了label属性，可以会覆盖这个textContent，这是没有问题的
            label: xmlElement.textContent,
            nodes: []
        };
        const names: string[] = xmlElement.getAttributeNames();
        names.forEach(name => {
            node[name] = name == 'open' || name == 'isParent' ?
                _isTruthy(xmlElement.getAttribute(name))
                : xmlElement.getAttribute(name);
        });
        const children = xmlElement.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (/^parsererror$/.test(child.nodeName)) {
                console.error('XML node parse error, detail:', (child.children[1] || child).textContent);
                continue;
            }
            node.nodes.push(this._toSimpleNode(children[i]));
        }
        return node;
    }
}

function _isTruthy(value: any): boolean {
    return value == undefined ? false : value !== 'false';
}

