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
    hair: 'user_hair',
    street: 'user_street_address',
    postcode: 'user_post_code',
    city: 'user_city',
    country: 'user_country',
    state: 'user_state'
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
    name: 'image_name',
    link: 'image_link',
    role: 'image_role',
    userId: 'user_id'
  },
  Preference: {
    id: 'preferrence_id',
    gender: 'preferred_gender',
    rating: 'preferred_user_rating',
    userid: 'user_id',
    age: 'pref_age',
    lang: 'pref_lang',
    location: 'preferred_location'
  },
  PrefInterest: {
    id: 'pref_interest_id',
    interest: 'pref_interest_name',
    prefid: 'preferrence_id',
    userid: 'user_id'
  }
}
