# 프론트엔드 개발 컨벤션

## 1. 기술 스택

| 영역 | 기술 | 프로젝트에서의 역할 |
|---|---|---|
| Framework | Next.js 16 · App Router | 라우팅, 페이지 진입점, 공통 레이아웃 |
| Language | TypeScript | 컴포넌트 props, API 응답, 상태 타입 정의 |
| UI | Mantine | 화면을 구성하는 UI 컴포넌트 |
| Design System | Mantine Theme + CSS Variables | 색상, 폰트, 모서리 반경 등 공통 디자인 토큰 |
| Server State | TanStack Query | 서버 데이터 조회·변경·캐시 관리 |
| Client State | Zustand | 화면 간 공유하는 UI 상태 관리 |
| Form | React Hook Form | 폼 입력값, 제출 상태, 필드 오류 관리 |
| Validation | Zod | 폼 스키마와 입력값 검증 |
| HTTP | Axios | Spring API 요청을 위한 공통 HTTP 클라이언트 |

## 2. 폴더 구조

`src` 바로 아래에는 역할을 나타내는 복수 명사를 사용한다. 그 아래는 `home`, `layouts`처럼 페이지나 관심사별로 나눈다.

```text
app/                       # Next.js 라우트와 공통 레이아웃
  layout.tsx
  page.tsx
  globals.css
src/
  components/              # 한 가지 UI 역할을 맡는 작은 컴포넌트
    providers/             # 앱 전체에서 사용하는 Provider
    commons/               # 범용 UI 파일을 바로 배치 (Button.tsx, BottomSheet.tsx, Header.tsx)
    features/              # 기능별 하위 폴더로 구성
      notifications/       # 예: NotificationModal.tsx, index.ts
      ads/                 # 예: GoogleAdsense.tsx, index.ts
  screens/home/            # 홈 화면 구현
  libs/apis/               # 공통 Axios 클라이언트와 API 함수
  stores/layouts/          # 모달·바텀시트 등 공유 UI 상태
  styles/                  # Mantine 테마
  types/                   # 공통 타입
```

- **라우트와 화면** — `app/**/page.tsx`는 라우트 진입점이고, `src/screens`는 해당 페이지 전체를 구성하는 화면 컴포넌트를 담는다. 하위 페이지를 추가할 때는 `app` 아래의 상대 폴더 경로를 `src/screens`에도 그대로 사용한다. 예를 들어 `app/prayers/[id]/page.tsx`에 대응하는 화면은 `src/screens/prayers/[id]/PrayerDetailPage.tsx`에 둔다. 하위 경로가 없는 루트 페이지(`app/page.tsx`)는 현재 `src/screens/home/HomePage.tsx`에 대응한다.
- **컴포넌트 단위** — `src/components`의 UI 컴포넌트는 버튼, 배지, 입력 필드처럼 한 가지 역할을 맡는 작은 단위(atomic)로 작성한다. 페이지별 배치와 컴포넌트 조합은 해당 경로의 화면 컴포넌트에서 담당한다.
- **기능 폴더의 진입점** — 외부에서 사용하는 항목은 해당 폴더의 `index.ts`에서 다시 export한다. 사용하는 쪽은 `@/screens/home`, `@/stores/layouts`처럼 폴더 경로로 import한다.
- **스토어 파일** — 같은 화면에서 쓰더라도 독립적으로 관리하는 상태는 파일을 나눈다. 예를 들어 `stores/layouts/`에는 `modal.ts`, `bottomSheet.ts`, `index.ts`를 둔다.

### 컴포넌트 배치 기준

| 위치 | 배치 기준 | 예시 |
|---|---|---|
| `components/commons/` | 특정 서비스 기능을 몰라도 props와 콜백만으로 동작하는 범용 UI를 둔다. 처음에는 폴더 안에 파일을 바로 둔다. | `Button`, `BottomSheet`, 제목과 뒤로가기 콜백을 받는 `Header` |
| `components/features/<기능>/` | 알림 조회·읽음 처리나 광고 SDK 연동처럼 특정 기능의 동작을 담은 UI를 기능별로 묶고, `index.ts`에서 공개한다. | `notifications/NotificationModal.tsx`, `ads/GoogleAdsense.tsx` |
| `screens/<라우트 경로>/` | 페이지 배치와 조합을 담당한다. 그 페이지에서만 의미가 있는 UI도 화면 옆에 둔다. | `home/HomePage.tsx`, `home/HomePrayerSummary.tsx` |
| `components/providers/` | 앱 전체에 라이브러리 설정과 컨텍스트를 제공한다. | `AppProviders.tsx` |

예를 들어 홈에서 알림을 열 때, 공통 `BottomSheet`는 `opened`, `onClose`, `children`을 받아 패널을 표시한다. `NotificationModal`은 그 패널에 알림 목록과 읽음 동작을 연결한다. 홈 화면은 `@/components/features/notifications`에서 모달을 가져와 알림 버튼과 함께 배치한다.

## 3. 상태 관리

| 상태의 성격 | 담당 | 적용 대상 |
|---|---|---|
| 서버가 관리하는 데이터 | TanStack Query | 기도제목, 사용자, 셀, 댓글 |
| 화면 간 공유하는 UI 상태 | Zustand | 모달, 필터, 바텀시트, 내비게이션 |
| 사용자가 편집 중인 입력값 | React Hook Form + Zod | 기도제목 작성, 회원정보 수정, 관리자 폼 |

예를 들어 기도제목 작성 바텀시트의 **열림 상태**는 Zustand가, **작성 중인 내용과 검증 오류**는 React Hook Form과 Zod가 담당한다. **저장 요청과 저장 후 목록 갱신**은 TanStack Query가 담당한다.

현재 구현 범위는 Query Provider와 모달·바텀시트 스토어까지다. 도메인별 쿼리와 폼은 해당 기능을 개발할 때 위 기준을 적용한다.

## 4. 파일명과 코드 작성

| 대상 | 작성 방식 | 저장소 예시 |
|---|---|---|
| React 컴포넌트 파일·이름 | PascalCase | `HomePage.tsx`, `AppProviders.tsx` |
| 일반 TypeScript 파일 | camelCase | `bottomSheet.ts`, `client.ts`, `theme.ts` |
| 라우트·폴더 진입 파일 | 정해진 이름 사용 | `page.tsx`, `layout.tsx`, `index.ts` |
| 타입 | PascalCase | `ModalState`, `ApiResponse<T>` |
| 변수·상태·액션 | camelCase. 액션은 동작을 드러내는 이름 사용 | `queryClient`, `activeModal`, `setActiveModal` |
| Zustand 스토어 훅 | `use` + 관심사 + `Store` | `useModalStore`, `useBottomSheetStore` |

- **Import**는 파일 상단에 모은다. 클라이언트 컴포넌트는 첫 줄에 `"use client"`를 두고 그 아래에 import를 작성한다.
- **Export**는 컴포넌트·타입·스토어 선언 위치에서 named export한다. Next.js 페이지와 레이아웃은 default export하고, 기능 폴더의 `index.ts`에서 공개 항목을 모은다.
- **함수와 구조 분해**는 컴포넌트에서 `function HomePage()`와 `function AppProviders({ children })` 형태를 사용한다. 스토어 액션과 콜백에는 화살표 함수를 사용한다.
- **JSX**는 직접 만든 컴포넌트와 Mantine 컴포넌트를 `<HomePage />`, `<Container>`처럼 PascalCase로, HTML 기본 요소를 `<html>`, `<body>`처럼 소문자로 작성한다.

## 5. 스타일과 API 통신

공통 디자인 값은 `src/styles/theme.ts`에서 정의하고 `MantineProvider`로 적용한다. 화면에서는 Mantine 컴포넌트와 스타일 props를 사용하고, 전역 CSS 변수와 기본 스타일은 `app/globals.css`에서 관리한다.

Spring API 요청은 `@/libs/apis`에서 가져온 `apiClient`를 사용한다. 기본 주소는 `NEXT_PUBLIC_API_BASE_URL`로 설정하며 현재 타임아웃은 10초다. GET 요청에서 조회 조건은 `params`, 요청별 헤더는 `headers`로 두 번째 인자에 전달한다.

```ts
import { apiClient } from "@/libs/apis";

// GET 요청 형태
apiClient.get(path, { params, headers });
```

현재 ESLint는 Next.js의 `core-web-vitals` 설정을 사용한다. JSX 속성 순서, `id`·`className`의 케밥 케이스, JS·CSS 주석 형식, CSS Modules 사용, 파일명과 export 위치에 대한 별도 검사 규칙은 없다.
