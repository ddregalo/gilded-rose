describe("Shop", function() {

  it("should have an items property that is empty array", function() {
    let gildedRose = new Shop();
    expect(gildedRose.items).toEqual([]);
  });

  describe("#updateQuality", function() {

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

    it("Aged Brie should increase in quality (+1) by day", function() {
      let cheese = new Item("Aged Brie", 40, 20);
      let gildedRose = new Shop([cheese]);
      gildedRose.updateQuality();
      expect(cheese.quality).toEqual(21);
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
  });

});
