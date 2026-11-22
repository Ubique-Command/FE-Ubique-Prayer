const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function redirectToKakaoLogin() {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");
  }

  const loginUrl = new URL("/api/auth/kakao", API_BASE_URL);
  window.location.assign(loginUrl.toString());
}