export const API_URL = "http://localhost:8080";

export const CLIENT_ID = "130eae35d006b1078f210f1bf3637328" //restapi key
const REDIRECT_URI = "http://localhost:3000/KAKAOLOGIN"
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
