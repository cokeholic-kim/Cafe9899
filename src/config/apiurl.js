//서버주소
export const API_URL = "http://localhost:8080";
//카카오 로그인
export const CLIENT_ID = "130eae35d006b1078f210f1bf3637328" //restapi key
export const REDIRECT_URI = "http://localhost:3000/KAKAOLOGIN"
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
//네이버 로그인
export const NAVER_REDIRECT = "http://localhost:3000/NAVERLOGIN"
export const NAVER_CLIENT_ID = "UrCIIGJMmkf56vjXVJas"
