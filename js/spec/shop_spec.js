describe("Shop", function() {

  it("should have an items property that is empty array", function() {
    let gildedRose = new Shop();
    expect(gildedRose.items).toEqual([]);
  });

  it("should have a maxQuality property of 50", function() {
    let gildedRose = new Shop();
    expect(gildedRose.maxQuality).toEqual(50);
  });

  it("should have a passPremium property of 11", function() {
    let gildedRose = new Shop();
    expect(gildedRose.passPremium).toEqual(11);
  });

  it("should have a passPremiumDouble property of 6", function() {
    let gildedRose = new Shop();
    expect(gildedRose.passPremiumDouble).toEqual(6);
  });

  // Vintage items are items that increase in quality over time
  // ie. Aged Brie, Backstage Passes
  describe("#isStandardItem", function() {
    it("should return true if not vintage or legendary item", function() {
      let item = new Item("item", 10, 10);
      let gildedRose = new Shop([item]);
      expect(gildedRose.isStandardItem(item)).toEqual(true);
    });
  });

  describe("#isNotLegendaryItem", function() {
    it("should return true if not a legendary item", function() {
      let item =  new Item("item", 10, 10);
      let gildedRose = new Shop([item]);
      expect(gildedRose.isNotLegendaryItem(item)).toEqual(true);
    });
  });

  describe("#isBackstagePass", function() {
    it("should return true is the item is a backstage pass", function() {
      let item = new Item("Backstage passes to Sudo Master", 20, 40);
      let gildedRose = new Shop([item]);
      expect(gildedRose.isBackstagePass(item)).toEqual(true);
    });
  });

  describe("#updateSellIn", function() {
    it("should decrease item sellIn value by one", function () {
      let item = new Item("item", 10, 10);
      let gildedRose = new Shop();
      gildedRose.updateSellIn(item);
      expect(item.sellIn).toEqual(9);
    });
  });

  describe("#updateStandardItemQuality", function() {
    it("should decrease quality by 1",function () {
      let item = new Item("item", 10, 10);
      let gildedRose = new Shop();
      gildedRose.updateStandardItemQuality(item);
      expect(item.quality).toEqual(9);
    });
  });

  describe("#increaseVintageItemQuality", function() {
    it("should increase the quality of a vintage item by 1", function() {
      let item = new Item("item", 10, 10);
      let gildedRose = new Shop([item]);
      gildedRose.increaseVintageItemQuality(item);
      expect(item.quality).toEqual(11);
    });
  });

  describe("#calculatePassPremium", function() {
    it("should + 1 to item quality if event <11 days away", function() {
      let item = new Item("Backstage passes to Sudo Master", 10, 40);
      let gildedRose = new Shop ([item]);
      gildedRose.calculatePassPremium(item);
      expect(item.quality).toEqual(41);
    });

    it("should + 2 to item quality if event <6 days away", function() {
      let item = new Item("Backstage passes to Sudo Master", 5, 40);
      let gildedRose = new Shop ([item]);
      gildedRose.calculatePassPremium(item);
      expect(item.quality).toEqual(42);
    });
  });

  describe("#expireItem", function() {
    it("should set item quality to 0", function() {
      let item = new Item("item", -1, 3);
      let gildedRose = new Shop([item]);
      gildedRose.expireItem(item);
      expect(item.quality).toEqual(0);
    });
  });

  describe("#updateQuality", function() {

    // Testing for update functionality - standard products
    it("should return the item name that was updated", function() {
      let gildedRose = new Shop([ new Item("foo", 0, 0) ]);
      let items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("foo");
    });

    it("should decrease sellIn(!=0) value by 1 for normal item", function() {
      let bread = new Item("bread", 2, 1.8);
      let gildedRose = new Shop([bread]);
      gildedRose.updateQuality();
      expect(bread.sellIn).toEqual(1);
    });

    it("should decrease quality(!=0) value by 1 for normal item", function() {
      let bread = new Item("bread", 2, 1.8);
      let gildedRose = new Shop([bread]);
      gildedRose.updateQuality();
      expect(bread.quality).toEqual(0.8);
    });

    it("should not allow quality of an item below 0", function() {
      let milk = new Item("milk", 0, 0);
      let gildedRose = new Shop([milk]);
      gildedRose.updateQuality();
      expect(milk.quality).toEqual(0);
    });

    it("should not allow quality of an item above 50", function() {
      let cheese = new Item("Aged Brie", 40, 50);
      let gildedRose = new Shop([cheese]);
      gildedRose.updateQuality();
      expect(cheese.quality).toEqual(50);
    });

    it("should decrease quality of item by 2 if sellIn negative", function() {
      let bread = new Item("bread", 0, 2.5);
      let gildedRose = new Shop([bread]);
      gildedRose.updateQuality();
      expect(bread.quality).toEqual(0.5);
    });

    // Aged Brie item testing
    it("Aged Brie should increase in quality (+1)", function() {
      let cheese = new Item("Aged Brie", 40, 20);
      let gildedRose = new Shop([cheese]);
      gildedRose.updateQuality();
      expect(cheese.quality).toEqual(21);
    });

    // Sulfuras Legendary item testing
    it("Should not change the sellIn value for legendary items", function() {
      let legendary_item = new Item("Sulfuras, Hand of Ragnaros", null, 35);
      let gildedRose = new Shop ([legendary_item]);
      gildedRose.updateQuality();
      expect(legendary_item.sellIn).toEqual(null);
    });

    it("Should not change the quality value for legendary items", function() {
      let legendary_item = new Item("Sulfuras, Hand of Ragnaros", null, 35);
      let gildedRose = new Shop ([legendary_item]);
      gildedRose.updateQuality();
      expect(legendary_item.quality).toEqual(35);
    });

    // Backstage pass item testing
    it("Backstage pass quality (+1) with > 10 days until show)", function() {
      let tix = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);
      let gildedRose = new Shop([tix]);
      gildedRose.updateQuality();
      expect(tix.quality).toEqual(21);
    });

    it("Backstage pass quality (+2) with <= 10 days until show)", function() {
      let tix = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20);
      let gildedRose = new Shop([tix]);
      gildedRose.updateQuality();
      expect(tix.quality).toEqual(22);
    });

    it("Backstage pass quality (+3) with <= 5 days until show)", function() {
      let tix = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
      let gildedRose = new Shop([tix]);
      gildedRose.updateQuality();
      expect(tix.quality).toEqual(23);
    });

    it("Backstage pass quality=0 after the show", function() {
      let tix = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20);
      let gildedRose = new Shop([tix]);
      gildedRose.updateQuality();
      expect(tix.quality).toEqual(0);
    });

  });

});
