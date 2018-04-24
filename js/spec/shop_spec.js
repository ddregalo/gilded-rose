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
  });

});
