import React from 'react'

export default function NewsItem(props) {

    let { title, description, imageUrl, newsUrl, author, date } = props;
    return (
        <div>
            <div className="card-my-3">
                <img src={imageUrl ? imageUrl : "https://akm-img-a-in.tosshub.com/indiatoday/images/breaking_news/202111/News_flash_1200x768.jpeg?lrcn0K66477AImlmACRjoelJlDjUlyLr&size=770:433"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">- by {author ? author : "LiveNews"} on {new Date(date).toUTCString()}</small></p>
                    <a href={newsUrl} className="btn btn-sm btn-primary">Read More..</a>
                </div>
            </div>
        </div>
    )
}
