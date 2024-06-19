import React from 'react';
import ListMovie from "../components/ListMovie/ListMovie";
import PageContainer from "../styles/PageStyle";

const PopularPage=() => {
    return (
      <PageContainer>
        <ListMovie  Url="https://api.themoviedb.org/3/movie/popular" mode="pagination"/>
      </PageContainer>
    )
}

export default PopularPage;