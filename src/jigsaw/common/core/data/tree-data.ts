import {GeneralCollection} from "./general-collection";
import {CommonUtils} from "../utils/common-utils";

const iconUrlCache: string[] = [];

export const rxIconUrl = /.+\.(svg|png|jpe?g|gif)\s*$/i;

export function toClassName(urlOrFontIcon: string): string {
    if (!rxIconUrl.test(urlOrFontIcon)) {
        return urlOrFontIcon;
    }
    // 看起来是一个图片url
    let idx = iconUrlCache.indexOf(urlOrFontIcon);
    if (idx == -1) {
        idx = iconUrlCache.length;
        iconUrlCache.push(urlOrFontIcon);
    }
    return `c${idx}`;
}

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

export class SimpleNode {
    [prop: string]: any;

    label: string;
    nodes?: SimpleNode[];
    iconUnicode?: string;
}

// 直接在SimpleNode类定义中添加iconSkin属性的getter/setter，无法将它定义成可选的，这导致许多编译错误
// 把这个属性单独拎出来在这里定义，避免这个问题，同时也避免当做public暴露给应用
Object.defineProperty(SimpleNode.prototype, 'iconSkin', {
    get: function () {
        return toClassName(this.iconUnicode);
    },
    set: function (value: string) {
        this.iconUnicode = value;
    },
    enumerable: true,
    configurable: true
});

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

        this.nodes = this.nodes.map(n => _toSimpleNode(n));
        this.refresh();
        this.invokeChangeCallback();
        return this;
    }

    public fromXML(xml: string | XMLDocument): SimpleTreeData {
        const xmlDoc = typeof xml == 'string' ? SimpleTreeData.parseXML(this.checkEscape(xml)) : xml;
        if (xmlDoc && xmlDoc.childElementCount > 0) {
            this.nodes = [];
            this._parseXmlNode(xmlDoc.children[0], this);
        }

        this.refresh();
        return this;
    }

    protected checkEscape(xml: string): string {
        const regex = new RegExp(/(?<!\\)['"]/g);
        let matches = [];
        xml.replace(regex, function () {
            const match = Array.prototype.slice.call(arguments, 0, -2);
            match.index = arguments[arguments.length - 2];
            matches.push(match);
            return "";
        });

        const positions: { start: number, end: number }[] = [];
        let quote: string;
        let pos: { start: number, end: number };
        for (let match of matches) {
            if (!quote) {
                quote = match[0];
                pos = {start: match.index, end: -1};
                continue;
            }
            if (quote == match[0]) {
                pos.end = match.index;
                positions.push(pos);
                quote = undefined;
            }
        }
        if (!!quote) {
            // 有未成对的引号，此时格式肯定有问题，要丢弃
            console.error('bad xml format!');
            return;
        }

        let newXml: string = '';
        positions.forEach((position, idx) => {
            const lastIndex = positions[idx - 1] ? positions[idx - 1].end : 0;
            newXml += xml.slice(lastIndex, position.start);
            newXml += xml.slice(position.start, position.end).replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        });
        const lastPos = positions[positions.length - 1];
        newXml += xml.slice(lastPos.end);
        return newXml;
    }

    protected invokeChangeCallback(): void {
        this.componentDataHelper.invokeChangeCallback();
    }

    protected ajaxSuccessHandler(data: string | XMLDocument | any): void {
        if (data instanceof XMLDocument || Object.prototype.toString.call(data) == "[object String]") {
            this.fromXML(data)
        } else {
            this.fromObject(data);
        }
        this._busy = false;
        this.invokeChangeCallback();
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    private _parseXmlNode(xmlElement: Element, target?: SimpleTreeData): SimpleNode {
        const node = target || new SimpleNode();
        if (!(node instanceof SimpleTreeData)) {
            node.label = xmlElement.textContent;
            node.nodes = [];
        }
        const names: string[] = xmlElement.getAttributeNames();
        names.forEach(name => {
            node[name] = name == 'open' || name == 'isParent' || name == 'isActive' || name == 'selected' ?
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
            node.nodes.push(this._parseXmlNode(children[i]));
        }
        return <any>node;
    }
}

function _toSimpleNode(obj: Object): SimpleNode {
    const node = new SimpleNode();
    Object.assign(node, obj);
    if (node.nodes) {
        node.nodes = node.nodes.map(n => _toSimpleNode(n));
    }
    return node;
}

function _isTruthy(value: any): boolean {
    return value == undefined ? false : value !== 'false';
}

