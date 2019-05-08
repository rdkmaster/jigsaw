import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {DropDownTrigger} from "jigsaw/directive/float";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
})
export class ComboSelectFullComponent {
    cities = [
        {label: '北京', type: '', closable: false},
        {label: '上海', type: '', closable: false},
        {label: '南京', type: ''},
        {label: '深圳', type: ''},
        {label: '长沙', type: ''},
        {label: '西安', type: ''},
        {label: '盐城', type: ''},
        {label: '徐州', type: ''},
        {label: '连云港', type: ''},
        {label: '南通', type: ''},
        {label: '天津', type: ''},
        {label: '哈尔滨', type: ''},
    ];

    selectedCities = new ArrayCollection();

    // DropDownTrigger是下拉触发方式的枚举
    openTrigger = DropDownTrigger.mouseenter;
    closeTrigger = DropDownTrigger.mouseleave;

    multiple: boolean = true;
    autoClose: boolean = false;
    open: boolean = false;
    disabled: boolean = false;
    autoWidth: boolean = false;

    selected: string = '';
    removed: string = '';

    onTagSelect(data) {
        this.selected = data.label;
    }

    onTagRemove(data) {
        this.removed = data.label;
    }

    valueChange(value) {
        console.log(value);
    }

    changeTrigger() {
        if (this.openTrigger === DropDownTrigger.click) {
            this.openTrigger = DropDownTrigger.mouseenter;
            this.closeTrigger = DropDownTrigger.mouseleave;
        } else {
            this.openTrigger = DropDownTrigger.click;
            this.closeTrigger = DropDownTrigger.click;
        }
    }

    toggleMultipleAndAutoClose() {
        this.multiple = !this.multiple;
        // 此demo设置当多选时，不自动关闭下拉；当单选时，自动关闭下拉
        this.autoClose = !this.multiple;
        // 重置selectedCities
        this.selectedCities = new ArrayCollection();
    }

    toggle(attr: string) {
        this[attr] = !this[attr];
    }


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawComboSelect'
    ];
}
