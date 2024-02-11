import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Layout } from "../components/Layout";

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Outlet />
    </Layout>
  ),
});
