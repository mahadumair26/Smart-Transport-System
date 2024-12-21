import { Navbar, Main, Product, Footer } from "../components";

function Home({ isAuthenticated }) {
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Main />
      <Product />
      <Footer />
    </>
  );
}

export default Home;
