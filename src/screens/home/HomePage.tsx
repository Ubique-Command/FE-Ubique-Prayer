import { Stack, Text, Title } from "@mantine/core";

export function HomePage() {
  return (
    <main>
      <Stack gap="xs" py="xl">
        <Title order={1}>Ubique Prayer</Title>
        <Text c="dimmed">프론트엔드 기본 설정이 완료되었습니다.</Text>
      </Stack>
    </main>
  );
}

