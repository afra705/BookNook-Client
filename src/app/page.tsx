
import Banner from './home/Banner';
import CategoryPage from './home/Category';
import Cta from './home/Cta';
import NewArrivalsPage from './home/NewArrivalsCard';


const HomePage = () => {
  return (
    <div>
      <Banner/>
      <NewArrivalsPage/>
      <CategoryPage/>
      <Cta/>
    </div>
  );
};

export default HomePage;