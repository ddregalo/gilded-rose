describe("Item", function() {

  beforeEach(function() {
    item = new Item("test item", 10, 5);
  });

  it("has a name property", function() {
    expect(item.name).toEqual("test item");
  });

  it("has a sellIn property", function() {
    expect(item.sellIn).toEqual(10);
  });

  it("has a quality property", function() {
    expect(item.quality).toEqual(5);
  });
});
