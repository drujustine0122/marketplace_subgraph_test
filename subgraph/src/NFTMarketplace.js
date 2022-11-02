export function handleItemListed(event) {
    let item = ListedItem.load(event.params.tokenId.toString());
    if (!item) {
        item = new ListedItem(event.params.tokenId.toString());
        item.nftaddress = event.params.NFTAddress;
    }
    item.seller = event.params.seller;
    item.price = event.params.price;
    item.sold = false;
    item.cancelled = false;
    item.save();
}

export function handleItemBought(event) {
    const transactionId = event.params.seller.toString()+
        '-'+
        event.params.buyer.toString()+
        '-'+
        event.params.tokenId.toString()+
        '-'+
        event.block.timestamp.toString();
    let buyHistory = new BuyHistory(transactionId);
    buyHistory.tokenId = event.params.tokenId;
    buyHistory.seller = event.params.seller;
    buyHistory.buyer = event.params.buyer;
    buyHistory.price = event.params.price;
    buyHistory.timestamp = event.block.timestamp;
    buyHistory.save();
}

export function handleItemCancelled(event) {
    let item = ListedItem.load(event.params.tokenId.toString());
    item.cancelled = true;
    item.save();
}
