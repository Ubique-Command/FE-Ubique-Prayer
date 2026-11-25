# FE-Ubique-Prayer

## 모바일 웹앱 개발

`npm run dev`로 화면을 개발한다. 모바일은 가용 너비를 채우고 태블릿과 데스크톱에서는 중앙 앱 셸이 최대 1024px까지 확장된다. 셸에서 좌우 여백과 기기 안전 영역을 처리하므로 화면마다 같은 여백을 더하지 않는다.

### PWA 확인

1. `npm run build` 후 `npm start`로 실행한다. 서비스 워커는 프로덕션 빌드에서 등록한다.
2. localhost 또는 HTTPS 배포 주소에서 홈을 연다. 브라우저 개발자 도구의 Application에서 매니페스트와 루트 범위의 `/sw.js`를 확인한다.
3. 페이지를 다시 열어 서비스 워커가 제어하는 상태에서 오프라인으로 전환한 뒤 새로고침한다. 네트워크 연결 안내가 표시된다. 기도제목과 API 응답은 서비스 워커에 저장하지 않는다.
4. 실기기에서는 HTTPS 배포 주소를 열어 홈 화면에 추가한 뒤 독립 창 실행과 가로·세로 안전 영역을 확인한다.

### Firebase 알림 연동 시

알림 설정 화면에서 사용자가 수신을 선택하면 권한을 요청한다. FCM 연동 시 `getToken`에 공개 VAPID 키와 기존 루트 서비스 워커 등록 객체(`serviceWorkerRegistration`)를 전달하고, 같은 워커에 백그라운드 수신 처리를 추가한다. 발급된 토큰을 등록할 Spring API와 Firebase 프로젝트 설정은 알림 기능 개발 단계에서 연결한다. [Firebase 웹 메시지 수신 문서](https://firebase.google.com/docs/cloud-messaging/web/receive-messages)
