describe("Shop", function() {

  it("should have an items property that is empty array", function() {
    let gildedRose = new Shop();
    expect(gildedRose.items).toEqual([]);
  });

  describe("#updateSellIn", function() {
    it("should decrease item sellIn value by one", function () {
      let item = new Item("item", 10, 10);
      let gildedRose = new Shop();
      gildedRose.updateSellIn(item);
      expect(item.sellIn).toEqual(9);
    });
  });

  describe("#updateStandardProductQuality", function() {
    it("should decrease quality by 1",function () {
      let item = new Item("item", 10, 10);
      let gildedRose = new Shop();
      gildedRose.updateStandardProductQuality(item);
      expect(item.quality).toEqual(9);
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

    it("Backstage pass quality (+5) with <= 5 days until show)", function() {
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
