import { Link } from "react-router-dom";
import mainStyle from "../styles/Home.module.scss";
import navigation from "../json/navigation.json";

const HomePage = () => {
  return (
    <div className={mainStyle.container}>
      <div className={mainStyle.content}>
        <div className={mainStyle.headline}>HomePage</div>
        <div className={mainStyle.itemList}>
          {navigation.map((nav, index) => (
            <Link
              key={index}
              className={mainStyle.itemDetail}
              to={nav.slug}
              target="_blank"
            >
              {nav.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
