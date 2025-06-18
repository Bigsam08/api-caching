/**
 * endpoint logics to handle all http responses
 */

const fs = require("fs"); // to read system file
const path = require("path"); // to access a file path
const { redisClient } = require("../config/redis");  // import redis for caching


const dbFile = path.join(__dirname, "../db/users.json");

/** fetch all users from the db */
const getAllusers = async (req, res) => {
    const redisKey = "users";
    const cacheExp = 120; // expiration time in seconds equal 2 mins

    try {

        const cache = await redisClient.get(redisKey);
        if (cache) {
            console.log("Data found in cache ✅")
            res.set("Cache-Control", `public, max-age=${cacheExp}`);
            return res.status(200).json(JSON.parse(cache));
        }
        // couldn't fetch in cache search db file
        // checks if the db file exist

        if (!fs.existsSync(dbFile)) {
            return res.status(404).json({ error: "DB file not found - 404" });
        }
        // file exist fetch data
        fs.readFile(dbFile, "utf8", async (error, data) => {
            if (error) {
                return res.status(500).json({ error: "unable to read db file" })
            }

            try {

                const parsedData = JSON.parse(data);

                //save the data to redis and set expry to 2 min
                // 3 args they key exp time and the file to save in json

                await redisClient.setEx(redisKey, cacheExp, JSON.stringify(parsedData));
                console.log("📦 data has been saved to cache ..")
                res.set("Cache-Control", `public, max-age=${cacheExp}`);
                return res.status(200).json(parsedData);

            } catch (error) {
                return res.status(500).json({ error: "db file corrupted" });
            }

        })

    } catch (error) {
        console.error("❌ Redis error:", err.message);
        res.status(500).json({ error: "Internal error with caching" });
    }

}

/** fetch a specific user from the db */
const getUser = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `${id}`;
    const cacheExp = 120 // set in seconds to 2 mins

    try {
        // check cache for user
        // set exp if found and set header
        const cacheUser = await redisClient.get(cacheKey);

        if (cacheUser) {
            console.log("User found in cache ✅");
            res.set("Cache-Control", `public, max-age=${cacheExp}`);
            return res.status(200).json(JSON.parse(cacheUser));
        }

        // check db file if not exist in cache
        if (!fs.existsSync(dbFile)) {
            return res.status(404).json({ error: "DB File does not exist" });
        }

        // read db file
        fs.readFile(dbFile, "utf8", async (err, data) => {
            if (err) {
                res.status(500).json({ error: "Error unable to read file" });
            }
            try {
                const parsedUser = JSON.parse(data);

                const user = parsedUser.find((u) => String(u.id) === String(id));

                if (!user) return res.status(404).json({ error: "User does not exist" });

                // save user to cache
                await redisClient.setEx(cacheKey, cacheExp, JSON.stringify(user));
                console.log('📦  user saved to cache');
                return res.status(200).json(user)

            } catch (err) {
                res.status(500).json({ error: err.message, message: "File corrupted" })
            }
        })

    } catch (error) {
         res.status(500).json({ error: err.message, message: "❌  Error connecting to redis" })
    }

}

module.exports = { getAllusers, getUser };