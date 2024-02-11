import { AppShell, Burger, Button, Flex, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import css from "./Layout.module.css";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
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
        <Button>Iterate over dir</Button>
        <Button>TODO 1</Button>
        <Button>TODO 2</Button>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
