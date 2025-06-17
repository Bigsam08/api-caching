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

    try {

        const cache = await redisClient.get(redisKey);
        if (cache) {
            console.log("Data found in cache ✅")
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

                //save the data to redis and set expry to 1 min
                // 3 args they key exp time and the file to save in json

                await redisClient.setEx(redisKey, 60, JSON.stringify(parsedData));
                console.log("📦 data has been saved to cache ..")

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
const getUser = (req, res) => {
    const { id } = req.params;

    if (!fs.existsSync(dbFile)) {
        return res.status(404).json({ error: "DB file path not found", success: false });
    }
    /** search for the user via id and display all */
    fs.readFile(dbFile, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error occurred fetching all users" });

        }
        try {
            // prase the data into json
            const parsedData = JSON.parse(data);

            // find any matching id with the params id
            const findUser = parsedData.find(user => String(user.id) === String(id));

            // throw a 404 if id doesn't match any user in the db
            if (!findUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            return res.status(200).json(findUser);

        } catch (parseError) {
            console.log("Invalid Json File")
            res.status(500).json({ error: "Error! file not valid json format for parsing", message: parseError });
            return
        }
    })


}

module.exports = { getAllusers, getUser };