class Shop {
  constructor (
    items = [],
    maxQuality = 50,
    passPremium = 11,
    passPremiumDouble = 6
  ) {
    this.items = items
    this.maxQuality = maxQuality
    this.passPremium = passPremium
    this.passPremiumDouble = passPremiumDouble
  }

  isStandardItem (item) {
    if (item.name !== 'Aged Brie' && !this.isBackstagePass(item) && !item.name.includes('Sulfuras') && item.quality > 0) {
      return true
    }
  }

  isVintageItem (item) {
    if (!this.isStandardItem(item) && this.isNotLegendaryItem(item)) {
      return true
    }
  }

  isNotLegendaryItem (item) {
    if (!item.name.includes('Sulfuras')) {
      return true
    }
  }

  isBackstagePass (item) {
    if (item.name.includes('Backstage passes')) {
      return true
    }
  }

  isConjuredItem (item) {
    if (item.name.includes('Conjured')) {
      return true
    }
  }

  updateSellIn (item) {
    item.sellIn -= 1
  }

  updateStandardItemQuality (item) {
    item.quality -= 1
  }

  increaseVintageItemQuality (item) {
    item.quality += 1
  }

  calculatePassPremium (item) {
    if (this.isBackstagePass(item) && item.sellIn < 0) {
      item.quality = 0
    } else if (item.name.includes('Backstage passes')) {
      if (item.sellIn < this.passPremium) {
        this.increaseVintageItemQuality(item)
      }
      if (item.sellIn < this.passPremiumDouble) {
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
      }

      if (this.isVintageItem(this.items[i])) {
        this.increaseVintageItemQuality(this.items[i])
      }

      this.calculatePassPremium(this.items[i])

      if (this.isNotLegendaryItem(this.items[i])) {
        this.updateSellIn(this.items[i])
      }

      if (this.items[i].sellIn < 0) {
        if (this.isStandardItem(this.items[i])) {
          this.updateStandardItemQuality(this.items[i])
        } else if (this.isBackstagePass(this.items[i])) {
          this.expireItem(this.items[i])
        }
      }

      if (this.items[i].quality > this.maxQuality) {
        this.items[i].quality = this.maxQuality
      }
    }
    return this.items
  }
}
