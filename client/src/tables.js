export default {
  User: {
    userId: 'user_id',
    userName: 'user_name',
    userEmail: 'user_email',
    firstName: 'user_first_name',
    lastName: 'user_last_name',
    biography: 'user_biography',
    status: 'user_relationship_status',
    height: 'user_height',
    age: 'user_age',
    race: 'user_race',
    hair: 'user_hair'
  },
  Interests: {
    id: 'interest_id',
    name: 'interest_name',
    userId: 'user_id'
  },
  Languages: {
    id: 'lang_id',
    name: 'lang_name',
    userId: 'user_id'
  },
  Images: {
    id: 'image_id',
    link: 'image_link',
    role: 'image_role',
    userId: 'user_id'
  },
  Prefence: {
    id: 'preferrence_id',
    age: 'pref_age',
    Gender: 'preferred_gender',
    location : 'preferred_location',
    profileRating : 'preferred_user_rating',
    userId: 'user_id',
    pref_lang : 'pref_lang',
  },
  Pref_interest: {
    id: 'pref_interest_id',
    name: 'pref_interest_name',
    userId: 'user_id',
    prefence_id : 'preferrence_id',
  }
}
