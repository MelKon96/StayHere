import AppRouter from "../../app/router";
import Container from "../container/Container";

const Main = () => {
  return (
    <main>
      <Container>
        <AppRouter />
      </Container>
    </main>
  );
};

export default Main;
