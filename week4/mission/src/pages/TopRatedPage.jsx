import ListMovie from "../components/ListMovie/ListMovie";
import PageContainer from "../styles/PageStyle";

const TopRatedPage=() => {
    return (
      <PageContainer>
        <ListMovie  Url="https://api.themoviedb.org/3/movie/top_rated"/>

      </PageContainer>
    )

}

export default TopRatedPage;