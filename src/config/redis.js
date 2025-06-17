/** redis client connection for caching */

const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("error", (err) => {
    console.log(" ❌ error don shele for redis connection", err);
    return;
});

const redisStart = async () => {
    try {
        await redisClient.connect();
        console.log("✅  Redis is connected");
        return;

    } catch (error) {
        return console.log("failed to start Redis connection", error.message);
    }
}

module.exports = { redisStart, redisClient };