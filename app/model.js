import redisClient from './config/redis.js'; // Use import instead of require

export const saveCallId = (key, value) => {
  return new Promise((resolve, reject) => {
    redisClient.set(key, JSON.stringify(value), 'EX', 86400, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export const getCallId = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(res));
      }
    });
  });
};
