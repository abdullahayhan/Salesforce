import { LightningElement } from 'lwc';

export default class GetSetExample extends LightningElement {
    upperCaseItem;
    get itemName() {
        return this.upperCaseItem;
    }
    set itemName(value) {
        this.upperCaseItem = value.toUpperCase();
    }
}