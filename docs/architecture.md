# Frontend Architecture

## 기술 스택

- Next.js 16 App Router / TypeScript
- Mantine: 컴포넌트, 테마, CSS 변수
- TanStack Query: 서버 상태와 API 캐시
- Zustand: 모달, 필터, 바텀시트, 네비게이션 등 클라이언트 UI 상태
- React Hook Form + Zod: 입력 상태와 스키마 검증
- Axios: Spring API 통신

## 폴더 경계

```txt
app/                  # Next.js App Router 기술 디렉터리(루트 배치)
src/
  components/         # 기능·화면별 UI, providers
  libs/
    apis/              # Axios client and domain API modules
  screens/             # 페이지 단위 화면 구현
  stores/
    layouts/           # modal.ts, bottomSheet.ts 등 레이아웃 UI 상태
  styles/              # Mantine theme and CSS tokens
  types/               # shared domain/API types
```

`src` 하위의 프로젝트 디렉터리는 복수 명사를 사용한다. Next.js App Router가 요구하는
`app`은 예외로 루트에 둔다. `pages`는 Next.js의 Pages Router 예약 디렉터리이므로, 화면
구현 디렉터리는 충돌을 피한 `screens`로 사용한다. 기능별 하위 디렉터리는 해당 관심사의
파일과 `index.ts`를 함께 두며, 상위 코드에서는 배럴 export를 통해 가져온다.

## 상태 관리 원칙

- 기도제목, 사용자, 셀, 댓글처럼 서버에서 온 데이터는 TanStack Query로 조회·변경·캐시한다.
- 모달, 필터, 바텀시트, 네비게이션처럼 브라우저 UI에만 필요한 데이터는 `stores/<feature>`의 Zustand store에 둔다.
- 기도제목 작성, 회원정보, 관리자 입력은 각 화면의 React Hook Form으로 관리하고 Zod resolver로 검증한다.
- 서로 다른 범주의 상태를 Zustand에 복제하지 않는다.
