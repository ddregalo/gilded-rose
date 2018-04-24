describe("Shop", function() {

  it("should return the item name that was updated", function() {
    let gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

});
