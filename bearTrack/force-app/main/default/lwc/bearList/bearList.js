import { LightningElement, wire } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.searchBears(searchTerm) Apex method */
import searchBears from '@salesforce/apex/BearController.searchBears';
import { publish, MessageContext } from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';
export default class BearList extends LightningElement {
    searchTerm = '';
    @wire(searchBears, { searchTerm: '$searchTerm' })
    bears;
    appResources = {
        bearSilhouette: `${ursusResources}/standing-bear-silhouette.png`,
    };
    handleSearchTermChange(event) {
        // Debouncing this method: do not update the reactive property as
        // long as this function is being called within a delay of 300 ms.
        // This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchTerm = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchTerm = searchTerm;
        }, 300);
    }
    get hasResults() {
        return (this.bears.data.length > 0);
    }
    @wire(searchBears, { searchTerm: '$searchTerm' })
    bears;
    @wire(MessageContext) messageContext;
    @wire(searchBears, { searchTerm: '$searchTerm' })
    loadBears(result) {
        this.bears = result;
        if (result.data) {
            const message = {
                bears: result.data
            };
            publish(this.messageContext, BEAR_LIST_UPDATE_MESSAGE, message);
        }
    }
}