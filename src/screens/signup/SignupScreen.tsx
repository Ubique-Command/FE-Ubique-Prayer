"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Stack, Text, Title } from "@mantine/core";
// GET /api/community-units/cells 요청 구현은 src/libs/apis/communityUnits.ts의 getActiveCells에 있습니다.
import { getActiveCells } from "@/libs/apis";
import styles from "./SignupScreen.module.css";

const TEAMS = ["예배팀", "미디어팀"];

export function SignupScreen() {
  const [cellId, setCellId] = useState<number | null>(null);
  const [teams, setTeams] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notice, setNotice] = useState("");

  // 화면이 열리면 React Query가 getActiveCells()를 실행해 활성 셀 목록을 가져옵니다.
  // HTTP 메서드와 URL 경로를 바꾸려면 src/libs/apis/communityUnits.ts를 수정하세요.
  const {
    data: cells = [],
    isLoading: isCellsLoading,
    isError: isCellsError,
  } = useQuery({
    queryKey: ["communityUnits", "cells"],
    queryFn: getActiveCells,
  });

  const validPhone = /^01\d-?\d{3,4}-?\d{4}$/.test(phone.trim());
  const canStart =
    cellId !== null &&
    cells.some((item) => item.unitId === cellId) &&
    Boolean(name.trim()) &&
    validPhone;

  function toggleTeam(team: string) {
    setTeams((current) =>
      current.includes(team)
        ? current.filter((item) => item !== team)
        : [...current, team],
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.frame} aria-labelledby="signup-title">
        <header className={styles.nav}>
          <a className={styles.backButton} href="/" aria-label="뒤로 가기">‹</a>
          <Title id="signup-title" order={1} className={styles.navTitle}>
            소속 · 정보 입력
          </Title>
          <span className={styles.navSpacer} aria-hidden="true" />
        </header>

        <div className={styles.content}>
          <Stack gap={0} className={styles.intro}>
            <Text className={styles.eyebrow}>SIGN UP · 03</Text>
            <Title order={2} className={styles.title}>
              함께 기도할 공동체를
              <br />
              선택해주세요
            </Title>
            <Text className={styles.description}>
              소속 셀을 선택하고 회원 정보를 확인해주세요.
            </Text>
          </Stack>

          <section className={styles.group} aria-labelledby="cell-label">
            <div className={styles.labelRow}>
              <h2 id="cell-label" className={styles.label}>소속 셀</h2>
              <span className={styles.required}>필수</span>
            </div>
            <div className={styles.pickGrid} role="group" aria-label="소속 셀 선택">
              {isCellsLoading ? (
                <Text className={styles.help}>셀 목록을 불러오는 중이에요.</Text>
              ) : isCellsError ? (
                <Text role="alert" className={styles.help}>
                  셀 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
                </Text>
              ) : cells.length === 0 ? (
                <Text className={styles.help}>가입할 수 있는 활성 셀이 없어요.</Text>
              ) : (
                cells.map((item) => (
                  <button
                    key={item.unitId}
                    type="button"
                    className={`${styles.pick} ${cellId === item.unitId ? styles.selected : ""}`}
                    aria-pressed={cellId === item.unitId}
                    onClick={() => { setCellId(item.unitId); setNotice(""); }}
                  >
                    {item.name}
                  </button>
                ))
              )}
            </div>
          </section>

          <section className={styles.group} aria-labelledby="team-label">
            <div className={styles.labelRow}>
              <h2 id="team-label" className={styles.label}>소속 팀 · 그룹</h2>
              <span className={styles.optional}>선택</span>
            </div>
            <div className={styles.pickGrid} role="group" aria-label="소속 팀 및 그룹 선택">
              {TEAMS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`${styles.pick} ${teams.includes(item) ? styles.selected : ""}`}
                  aria-pressed={teams.includes(item)}
                  onClick={() => toggleTeam(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.group} aria-label="회원 정보">
            <label className={styles.field}>
              <span className={styles.labelRow}>
                <span className={styles.label}>이름</span>
                <span className={styles.kakaoTag}>카카오 정보 확인</span>
              </span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => { setName(event.target.value); setNotice(""); }}
                placeholder="이름을 입력해주세요"
                required
              />
            </label>
            <label className={styles.field}>
              <span className={styles.labelRow}>
                <span className={styles.label}>휴대폰 번호</span>
                <span className={styles.kakaoTag}>카카오 정보 확인</span>
              </span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={phone}
                onChange={(event) => { setPhone(event.target.value); setNotice(""); }}
                placeholder="010-0000-0000"
                aria-describedby="phone-help"
                required
              />
              <span id="phone-help" className={styles.help}>
                휴대폰 번호는 010-0000-0000 형식으로 입력해주세요.
              </span>
            </label>
          </section>

          {notice && <Text role="status" className={styles.notice}>{notice}</Text>}

          <div className={styles.footer}>
            <Button
              type="button"
              className={styles.submitButton}
              fullWidth
              disabled={!canStart || isCellsLoading || isCellsError}
              onClick={() => setNotice("회원정보 저장 API가 연결되면 가입을 완료할 수 있어요.")}
            >
              시작하기
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}


