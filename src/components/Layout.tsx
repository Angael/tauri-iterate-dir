import { Button, Flex, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import css from "./Layout.module.css";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <>
      <nav className={clsx(css.navbar)}>
        <Flex gap="md" h="100%" align="center" p="sm" style={{ zIndex: 1 }}>
          <Flex gap="md" align="center">
            <Title>Tauri App</Title>
            <Button component={Link} to="/">
              Browse
            </Button>
            <Button component={Link} to="/about">
              About
            </Button>
            <Button component={Link} to="/cut" disabled>
              Video cut
            </Button>
            <Button component={Link} to="/download" disabled>
              Download
            </Button>
          </Flex>
        </Flex>
        <img src="logo.jpg" alt="" className={css.bgImg} />
      </nav>
      <div className={css.layout}>{children}</div>
    </>
  );
}
