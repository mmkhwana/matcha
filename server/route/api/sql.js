module.exports = {
    select: 
    {
        user:
        {
            details: `SELECT * FROM Matcha_Users WHERE user_id = ?`,
            login: `SELECT user_id, user_first_name, user_last_name,user_name, user_password FROM Matcha_Users WHERE user_name = ? OR user_email = ?`
        },
        interest :
        {
            all: `SELECT interest_name FROM Matcha_User_Interests WHERE user_id = ?`
        },
        language:
        {
            all: `SELECT lang_name FROM Matcha_User_Languages WHERE user_id = ?`
        },
        preference :
        {
            details: `SELECT * FROM Matcha_User_preferences WHERE user_id = ?`,
        }
    },
    update:
    {
        user:
        {
            fields: `UPDATE Matcha_Users 
            SET user_first_name = ?,
             user_last_name = ?, 
             user_biography = ?, 
             user_relationship_status = ?, 
             user_height = ?, 
             user_age = ?, 
             user_race = ?, 
             user_hair = ?,
             user_street_address = ?,
             user_post_code = ?,
             user_city = ?,
             user_country = ?,
             user_state = ?
            WHERE user_id = ?`
        }
    },
    delete: 
    {
        interest:
        {
            row: `DELETE FROM Matcha_User_Interest WHERE interest_id = ? AND user_id = ?`
        },
        language:
        {
            row: `DELETE FROM Matcha_User_Languages WHERE lang_id = ? AND user_id = ?`
        }
    },
    insert: 
    {
        user:
        {
            fields: `INSERT INTO Matcha_Users (user_name, user_email, user_first_name, user_last_name, user_password, user_gender, user_age) VALUES (?,?,?,?,?,?,?)`
        },
        interest:
        {
            fields: `INSERT INTO Matcha_User_Interests (interest_name, user_id) VALUES ?`
        },
        language:
        {
            fields: `INSERT INTO Matcha_User_Languages (lang_name, user_id) VALUES ?`
        },
        image:
        {
            fields: `INSERT INTO Matcha_Images (image_link, image_role, user_id) VALUES (?, ?, ?)`
        },
        preferences:
        {
            fields: `INSERT INTO Matcha_User_preferences (preferred_gender, pref_age, preferred_location, preferred_user_rating, user_id, pref_lang) VALUES (?,?,?,?,?,?)`
        },
        Pref_interest:
        {
            fields: `INSERT INTO Preferred_interest (pref_interest_name, user_id, preferrence_id) VALUES (?,?, ?)`
        }
    }
}