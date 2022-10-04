import { LightningElement } from 'lwc';

export default class KosulluOrnek extends LightningElement {
    show = true;
    handleClick() {
        this.show = !this.show;
    }
}