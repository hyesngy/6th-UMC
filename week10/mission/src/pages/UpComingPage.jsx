import ListMovie from "../components/ListMovie/ListMovie";
import PageContainer from "../styles/PageStyle";

const UpComingPage=() => {
    return (
      <PageContainer>
        <ListMovie  Url="https://api.themoviedb.org/3/movie/upcoming"/>

      </PageContainer>
    )

}

export default UpComingPage;