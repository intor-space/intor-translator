import { Cache } from "./cache";

export const MESSAGE_KEY_CACHE_MAX_SIZE = 100;
export const MESSAGE_KEY_CACHE_EXPIRES_TIME = 1000 * 60 * 5;

let messageKeyCache: Cache | undefined;

// Check if the cache exists and initialize it when necessary
export const getMessageKeyCache = () => {
  if (typeof window !== "undefined" && !messageKeyCache) {
    messageKeyCache = new Cache(
      MESSAGE_KEY_CACHE_MAX_SIZE,
      MESSAGE_KEY_CACHE_EXPIRES_TIME,
    );
  }
  return messageKeyCache;
};

// Clear cache and reset the cache instance
export const clearMessageKeyCache = () => {
  if (messageKeyCache) {
    messageKeyCache.clear();
    messageKeyCache = undefined;
  }
};
