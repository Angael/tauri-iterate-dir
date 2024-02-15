import { AppShell, Burger, Button, Flex, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import css from "./Layout.module.css";
import { Link } from "@tanstack/react-router";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened }
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex gap="md" h="100%" align="center" p="sm">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <img src="logo.jpg" alt="" className={css.logo} />
          <Title>Tauri App</Title>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ gap: "var(--mantine-spacing-sm" }}>
        {/* TODO: add active styles */}
        <Button component={Link} to="/" onClick={close}>
          Home
        </Button>
        <Button component={Link} to="/about" onClick={close}>
          About
        </Button>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
