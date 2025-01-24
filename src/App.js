import React from "react";
import './App.css'
import Header from "./components/header/header";
import Bunner from "./components/Banner/banner";
import List from "./components/list/list";
import MostPopularPizza from "./components/mostPopular/mostPopular";
import NewPizza from "./components/New/NewPizza";
import Footer from "./components/footer/Footer";

function App() {
  return <div className="App">
  <Header />
  <Bunner />
  <List />
  <MostPopularPizza />
  <NewPizza />
  <Footer />
  </div>;
}

export default App;
