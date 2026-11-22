"use client"; //Next.js : 해당 파일을 브라우저에서 동작하는 컴포넌트로 취급하라고 알려주는 표시

import { Button, Stack, Text, Title } from "@mantine/core";
import { redirectToKakaoLogin } from "@/libs/apis/auth";
import styles from "./EntryScreen.module.css";

export function EntryScreen() {
  return (
    <main className={styles.page}>
      <section className={styles.frame} aria-labelledby="entry-title">
        <Stack gap={0} className={styles.brand}>
          <div className={styles.mark} aria-hidden="true">
            🙏
          </div>
          <Title id="entry-title" order={1} className={styles.title}>
            유비크
            <br />
            기도 플랫폼
          </Title>
          <Text className={styles.description}>
            유비크 셀과 사역팀이 함께 기도해요
          </Text>
        </Stack>

        <Stack gap="sm" className={styles.actions}>
          <Button
            type="button"
            className={styles.kakaoButton}
            fullWidth
            onClick={redirectToKakaoLogin}
          >
            <span className={styles.kakaoIcon} aria-hidden="true">
              ◉
            </span>
            카카오로 시작하기
          </Button>
        </Stack>
      </section>
    </main>
  );
}

