class Shop {
  constructor (items = [], maxQuality = 50) {
    this.items = items
    this.maxQuality = maxQuality
  }

  updateSellIn (item) {
    item.sellIn -= 1
  }

  isStandardItem (item) {
    if (item.name !== 'Aged Brie' && !item.name.includes('Backstage passes') && !item.name.includes('Sulfuras') && item.quality > 0) {
      return true
    }
  }

  updateStandardItemQuality (item) {
    item.quality -= 1
  }

  increaseVintageItemQuality (item) {
    item.quality += 1
  }

  isNotLegendaryItem (item) {
    if (!item.name.includes('Sulfuras')) {
      return true
    }
  }

  calculatePassPremium (item) {
    if (item.name.includes('Backstage passes' && item.sellIn < 0)) {
      item.quality = 0
    } else if (item.name.includes('Backstage passes')) {
      if (item.sellIn < 11) {
        this.increaseVintageItemQuality(item)
      }
      if (item.sellIn < 6) {
        this.increaseVintageItemQuality(item)
      }
    }
  }

  expireItem (item) {
    item.quality = 0
  }

  updateQuality () {
    for (var i = 0; i < this.items.length; i++) {
      if (this.isStandardItem(this.items[i])) {
        this.updateStandardItemQuality(this.items[i])
      } else {
        if (this.isNotLegendaryItem(this.items[i])) {
          this.increaseVintageItemQuality(this.items[i])
        }
        this.calculatePassPremium(this.items[i])
      }
      if (this.isNotLegendaryItem(this.items[i])) {
        this.updateSellIn(this.items[i])
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name !== 'Aged Brie') {
          if (this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.isNotLegendaryItem(this.items[i])) {
                this.updateStandardItemQuality(this.items[i])
              }
            }
          } else {
            this.expireItem(this.items[i])
          }
        }// } else {
        //     this.increaseVintageItemQuality(this.items[i])
        // }
      }
      if (this.items[i].quality > this.maxQuality) {
        this.items[i].quality = this.maxQuality
      }
    }

    return this.items
  }
}
