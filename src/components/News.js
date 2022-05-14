import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    // states : used when we have to change something dynamically 
    constructor() {
        super();
        // console.log("Hello I am constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            category: 'general',
            totalResults: 0
        }
    }

    // runs at the last 
    async componentDidMount(eee) {
        console.log("cdm");
        this.updateNews();
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc85e742959d47138fc775410fde6e1f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        fetch(url).then((res) => res.json())
            .then((json) => {
                this.setState({
                    articles: json.articles,
                    loading: false,
                    totalResults: json.totalResults
                });
            })
    }
    //for previous page 
    handlePrevPage = async () => {
        console.log("Previous");
        this.setState({ page: this.state.page - 1 });
        this.updateNews()
    }

    // for next page 
    handleNextPage = async () => {
        console.log("Next");
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    // fetches more data 
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1}) ; 
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        fetch(url).then((res) => res.json())
            .then((json) => {
                this.setState({
                    articles: this.state.articles.concat(json.articles),
                    loading: false,
                    totalResults: json.totalResults
                });
            })
    };

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>Top Headlines</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<h3><Spinner /></h3>}
                >
                    
                    <div className="row my-3 container">
                        {this.state.articles.map((element ,index) => {
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
}
