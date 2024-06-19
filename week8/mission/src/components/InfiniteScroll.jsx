import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import Spinner from './Spinner/Spinner';

const ListContainer = styled.div`
    width: 80%;
    margin-left: 10%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px; 
`

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 10px; 
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100px;
`

const InfiniteScrollComponent = ({ dataLength, next, hasMore, children }) => {
    return (
        <InfiniteScroll
            dataLength={dataLength}
            next={next}
            hasMore={hasMore}
            loader={ 
                <SpinnerContainer>
                    <Spinner />
                </SpinnerContainer>
            }
            style={{ overflow: 'inherit' }}
        >
            <ListContainer>
                {children}
            </ListContainer>
        </InfiniteScroll>
    );
};

export default InfiniteScrollComponent;
