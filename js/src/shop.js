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

  isNotLegendaryItem (item) {
    if (!item.name.includes('Sulfuras')) {
      return true
    }
  }

  updateQuality () {
    for (var i = 0; i < this.items.length; i++) {
      if (this.isStandardItem(this.items[i])) {
        this.updateStandardItemQuality(this.items[i]);
      } else {
        if (this.items[i].quality < this.maxQuality && this.isNotLegendaryItem(this.items[i])) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < this.maxQuality) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < this.maxQuality) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.isNotLegendaryItem(this.items[i])) {
        this.updateSellIn(this.items[i])
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name !== 'Aged Brie') {
          if (this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.isNotLegendaryItem(this.items[i])) {
                this.updateStandardItemQuality (this.items[i]);
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < this.maxQuality) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items
  }
}
