import { Checkboxes } from './component/Checkboxes/Checkboxes';
import { Search } from "./component/Search/search";
import { Header } from "./component/Header/Header";
import styles from "./App.module.css";

export const App = () => {

  
    return (
      <>
        <Header />
        <div className={styles.flexCont}>
        <Checkboxes />
        <Search />
        </div>
        </>
    );
  };