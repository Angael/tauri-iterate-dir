import { Container, Title } from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";
import css from "./about.module.css";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <Container>
      <Title>About this app</Title>
      <div className={css.content}>
        <h1>Content</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus quis
          varius quam quisque id. Et ligula ullamcorper malesuada proin libero
          nunc consequat interdum varius. Elit ullamcorper dignissim cras
          tincidunt lobortis feugiat vivamus at augue.
        </p>

        <div className={`${css.subject} ${css.animation}`}></div>

        <p>
          Dolor sed viverra ipsum nunc aliquet. Sed sed risus pretium quam
          vulputate dignissim. Tortor aliquam nulla facilisi cras. A erat nam at
          lectus urna duis convallis convallis. Nibh ipsum consequat nisl vel
          pretium lectus. Sagittis aliquam malesuada bibendum arcu vitae
          elementum. Malesuada bibendum arcu vitae elementum curabitur vitae
          nunc sed velit.
        </p>

        <div className={`${css.subject} ${css.animation}`}></div>

        <p>
          Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac.
          Arcu cursus vitae congue mauris rhoncus aenean vel. Sit amet cursus
          sit amet dictum. Augue neque gravida in fermentum et. Gravida rutrum
          quisque non tellus orci ac auctor augue mauris. Risus quis varius quam
          quisque id diam vel quam elementum. Nibh praesent tristique magna sit
          amet purus gravida quis. Duis ultricies lacus sed turpis tincidunt id
          aliquet. In egestas erat imperdiet sed euismod nisi. Eget egestas
          purus viverra accumsan in nisl nisi scelerisque. Netus et malesuada
          fames ac.
        </p>
      </div>
    </Container>
  );
}
