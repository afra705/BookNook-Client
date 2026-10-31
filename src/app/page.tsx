
import Banner from './home/Banner';
import CategoryPage from './home/Category';
import NewArrivalsPage from './home/NewArrivalsCard';


const HomePage = () => {
  return (
    <div>
      <Banner/>
      <NewArrivalsPage/>
      <CategoryPage/>
    </div>
  );
};

export default HomePage;