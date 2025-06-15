/**
 * endpoint logics to handle all http responses
 */

const fs = require("fs"); // to read system file
const path = require("path"); // to access a file path

const filePath = path.join(__dirname, "../db/users.json");

/** fetch all users from the db */
const getAllusers = (req, res) => {
    if (!fs.existsSync(filePath)) {
        console.log("Db file cannot be found")
        res.status(500).json({ error: "DB file path not found", success: false });
        return;
    }

    /** if file exits fetch the file using read */
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error occurred fetching all users" });
        }
        // parsed the data back to js json object
        try {
            const parsedData = JSON.parse(data);
            res.status(200).json(parsedData)
        } catch (parseError) {
            res.status(500).json({ error: "Error! file not valid json format for parsing", message: parseError });
            return
        }

    })

}

/** fetch a specific user from the db */
const getUser = (req, res) => {
    const { id } = req.params;

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "DB file path not found", success: false });
    }
    /** search for the user via id and display all */
    fs.readFile(filePath, "utf8", (err, data) => {
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