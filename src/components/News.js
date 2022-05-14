import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {

    static defaultProps = {
        country: 'in' , 
        pageSize : 8 , 
        category : 'general'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number ,
        category :PropTypes.string
    }
    // states : used when we have to change something dynamically 
    constructor() {
        super();
        // console.log("Hello I am constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            category: 'general'
        }
    }

    // runs at the last 
    async componentDidMount(eee) {
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={API_KEY}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        fetch(url).then((res) => res.json())
            .then((json) => {
                this.setState({
                    articles: json.articles,
                    page: 1,
                    totalResults: json.totalResults,
                    loading: false
                });
            })
        console.log(this.articles);
    }

    //for previous page 
    handlePrevPage = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={API_KEY}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        fetch(url).then((res) => res.json())
            .then((json) => {
                this.setState({
                    articles: json.articles,
                    page: this.state.page - 1,
                    loading: false
                });
            })

    }

    // for next page 
    handleNextPage = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            this.setState({ loading: true });
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={API_KEY}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            fetch(url).then((res) => res.json())
                .then((json) => {
                    this.setState({
                        articles: json.articles,
                        page: this.state.page + 1,
                        loading: false
                    });
                })
        }
    }


    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row my-3">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date = {element.publishedAt} />
                        </div>
                    })
                    }
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-secondary" onClick={this.handlePrevPage}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-secondary" onClick={this.handleNextPage}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
