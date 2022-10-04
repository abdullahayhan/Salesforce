import { LightningElement } from 'lwc';

export default class ExampleOfJS extends LightningElement {
    text = '';
    handleChange(event) {
        this.text = event.target.value;
    }

    show = true;
    handleClick() {
        this.show = !this.show;
    }
}