import { Cache } from "@/cache";

jest.useFakeTimers();

describe("Cache", () => {
  let cache: Cache<string>;

  beforeEach(() => {
    cache = new Cache<string>(3, 1000);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should set and get cache values", () => {
    cache.set("key1", "value1");
    expect(cache.get("key1")).toBe("value1");
  });

  it("should return undefined for expired cache", () => {
    cache.set("key1", "value1");
    jest.advanceTimersByTime(1500);
    expect(cache.get("key1")).toBeUndefined();
  });

  it("should refresh TTL on get", () => {
    cache.set("key1", "value1");
    jest.advanceTimersByTime(700);
    expect(cache.get("key1")).toBe("value1");
    jest.advanceTimersByTime(700);
    expect(cache.get("key1")).toBe("value1");
  });

  it("should remove oldest entry when maxSize exceeded", () => {
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    cache.set("key3", "value3");
    cache.set("key4", "value4");

    expect(cache.get("key1")).toBeUndefined();
    expect(cache.get("key2")).toBe("value2");
    expect(cache.get("key3")).toBe("value3");
    expect(cache.get("key4")).toBe("value4");
  });

  it("should clear all cache", () => {
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    cache.clear();
    expect(cache.get("key1")).toBeUndefined();
    expect(cache.get("key2")).toBeUndefined();
  });

  it("should check existence correctly", () => {
    cache.set("key1", "value1");
    expect(cache.has("key1")).toBe(true);
    expect(cache.has("key2")).toBe(false);
  });

  it("should clean up expired cache entries on operations", () => {
    cache.set("key1", "value1");
    jest.advanceTimersByTime(1500);
    expect(cache.has("key1")).toBe(false);
  });
});
