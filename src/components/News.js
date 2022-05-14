import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props) {

    // states : used when we have to change something dynamically 
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, settotalResults] = useState(0);

    // runs at the last , equals to component didmount
    useEffect(() => {
        updateNews();
    },[]);


    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        fetch(url).then((res) => res.json())
            .then((json) => {
                props.setProgress(50);
                setArticles(json.articles);
                settotalResults(json.totalResults);
                setLoading(false);
            })
        props.setProgress(100);
    }

    // fetches more data 
    const fetchMoreData = async () => {
        setPage(page+ 1) ; 
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        fetch(url).then((res) => res.json())
            .then((json) => {
                setArticles(articles.concat(json.articles))
                settotalResults(json.totalResults)
                setLoading(false);
            })
    };


    return (
        <div className='container my-3'>
            <h1 className='text-center' style={{margin: "35px 0px" ,marginTop: "80px"}}>Top Headlines</h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<h3><Spinner /></h3>}
            >
                <div className="row my-3 container">
                    {articles.map((element, index) => {
                        return <div className="col-md-4" key={index}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                        </div>
                    })
                    }
                </div>
            </InfiniteScroll>

        </div>
    )

}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}