module.exports = {
    select: {
        user: {
            details: `SELECT * FROM Matcha_Users WHERE user_id = ?`,
            login: `SELECT user_id, user_first_name, user_last_name,user_name, user_password, verify FROM Matcha_Users WHERE user_name = ? OR user_email = ?`,
            likes: `SELECT user_raters, user_ratings_sum, user_rating_avg FROM Matcha_Users WHERE user_id = ?`,
            searchWithAgeRating: `SELECT user_id, user_name, user_first_name, user_last_name, user_age FROM Matcha_Users WHERE user_age <= ? AND user_rating_avg <= ? `,
            searchWithAgeDist: `SELECT user_id, user_name, user_first_name, user_last_name, user_age, user_latitude, user_longitude FROM Matcha_Users WHERE user_age <= ? `,
            searchWithRatingDist: `SELECT user_id, user_name, user_first_name, user_age, user_last_name, user_latitude, user_longitude FROM Matcha_Users WHERE user_rating_avg <= ? `,
            searchWithDist: `SELECT user_id, user_name, user_first_name, user_last_name, user_age, user_latitude, user_longitude FROM Matcha_Users`,
            searchWithAll: `SELECT user_id, user_name, user_first_name, user_last_name, user_age, user_latitude, user_longitude FROM Matcha_Users WHERE user_age <= ? AND user_rating_avg <= ? AND user_rating_avg > 0.0 AND user_gender = ?`,
            searchWithAllGender: `SELECT user_id, user_name, user_first_name, user_last_name, user_age, user_latitude, user_longitude FROM Matcha_Users WHERE user_age = ? AND user_rating_avg =?`,
            searchWith: `SELECT user_id, user_name, user_first_name, user_last_name, user_age FROM Matcha_Users WHERE `
        },
        interest: {
            all: `SELECT interest_name FROM Matcha_User_Interests WHERE user_id = ?`,
            check: `SELECT interest_name FROM Matcha_User_Interests WHERE (interest_name = ? AND user_id = ?)`
        },
        language: {
            all: `SELECT lang_name FROM Matcha_User_Languages WHERE user_id = ?`,
            check: `SELECT lang_name FROM Matcha_User_Languages WHERE (lang_name = ? AND user_id = ?)`
        },
        image: {
            all: `SELECT * FROM Matcha_Images WHERE user_id = ? ORDER BY image_role DESC`,
            profile: `SELECT * FROM Matcha_Images WHERE image_role = ? AND user_id = ?`,
            all_profile: `SELECT * FROM Matcha_Images WHERE image_role = ?`
        },
        preferences: {
            all: `SELECT * FROM Matcha_User_preferences WHERE user_id = ?`
        },
        Pref_interest: {
            all: `SELECT * FROM Preferred_interest WHERE user_id = ?`,
            check: `SELECT * FROM Preferred_interest WHERE pref_interest_name = ? AND user_id = ?`
        },
        likes: {
            all: `SELECT * FROM Matcha_Likes WHERE user_liked_id = ? AND user_liker_id = ?`
        },
        matches: {
            all: `SELECT * FROM Matcha_Users WHERE 1`
        },
        history: {
            all: `SELECT user_checked_id FROM Matcha_User_History WHERE user_checker_id = ?`,
            user: `SELECT user_id, user_first_name, user_last_name, user_name, user_age FROM Matcha_Users WHERE user_id = ?`,
            check: `SELECT * FROM Matcha_User_History WHERE user_checked_id = ? AND user_checker_id = ?`
        }
    },
    update: {
        user: {
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
             user_state = ?,
             user_latitude = ?,
             user_longitude = ?
            WHERE user_id = ?`,
            likes: `UPDATE Matcha_Users SET user_raters = ?, user_ratings_sum = ?, user_rating_avg = ? WHERE user_id = ?`,
            coordinates: `UPDATE Matcha_Users SET user_latitude = ?, user_longitude = ? WHERE user_id = ?`
        },
        image: {
            fields: `UPDATE Matcha_Images SET image_role = ? WHERE image_id = ?; UPDATE Matcha_Images set image_role = ? WHERE image_id = ?`,
            field: `UPDATE Matcha_Images SET image_role = ? WHERE image_id = ?`
        },
        preferences: {
            fields: `UPDATE Matcha_User_preferences 
            SET pref_age = ?,
            preferred_gender = ?,
            preferred_user_rating = ?,
            preferred_location = ?
            WHERE user_id = ?`
        }
    },
    delete: {
        interest: {
            row: `DELETE FROM Matcha_User_Interests WHERE interest_name = ? AND user_id = ?`
        },
        language: {
            row: `DELETE FROM Matcha_User_Languages WHERE lang_name = ? AND user_id = ?`
        },
        image: {
            row: `DELETE FROM Matcha_Images WHERE image_link = ? AND user_id = ?`
        },
        Pref_interest: {
            row: `DELETE FROM Preferred_interest WHERE pref_interest_name = ? AND user_id = ?`
        }
    },
    insert: {
        user: {
            fields: `INSERT INTO Matcha_Users (user_token, user_name, user_email, user_first_name, user_last_name, user_password, user_gender, user_race, user_age) VALUES (?,?,?,?,?,?,?,?,?)`
        },
        interest: {
            fields: `INSERT INTO Matcha_User_Interests (interest_name, user_id) VALUES (?,?)`
        },
        language: {
            fields: `INSERT INTO Matcha_User_Languages (lang_name, user_id) VALUES (?,?)`
        },
        image: {
            fields: `INSERT INTO Matcha_Images (image_link, image_name, image_role, user_id) VALUES (?, ?, ?, ?)`
        },
        preferences:
        {
            fields: `INSERT INTO Matcha_User_preferences (preferred_gender, pref_age, preferred_location, preferred_user_rating, user_id) VALUES (?,?,?,?,?)`
        },
        Pref_interest: {
            fields: `INSERT INTO Preferred_interest (pref_interest_name, user_id, preferrence_id) VALUES (?,?, ?)`
        },
        Likes: {
            fields: `INSERT INTO Matcha_Likes (user_liked_id, user_liker_id, user_rating) VALUES (?, ?, ?)`
        },
        History: {
            fields: `INSERT INTO Matcha_User_History (user_checked_id, user_checker_id) VALUES (?, ?)`
        }
    }
}