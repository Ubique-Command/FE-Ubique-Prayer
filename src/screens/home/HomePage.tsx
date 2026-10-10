import { Container, Stack, Text, Title } from "@mantine/core";

export function HomePage() {
  return (
    <Container size="xs" py="xl">
      <Stack gap="xs">
        <Title order={1}>Ubique Prayer</Title>
        <Text c="dimmed">프론트엔드 기본 설정이 완료되었습니다.</Text>
      </Stack>
    </Container>
  );
}

