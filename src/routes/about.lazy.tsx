import { Container, Title } from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <Container>
      <Title>About this app</Title>
    </Container>
  );
}
