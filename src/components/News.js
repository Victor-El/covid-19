import React, {Component} from 'react';
import withRouter from "react-router-dom/es/withRouter";
import getAllNews from "../service/NewsService";
import {Col, Container, Row} from "react-bootstrap";
import NewsItem from "./NewsItem";
import CustomSpinner from "./CustomSpinner";

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {articles: []}
    }

    componentDidMount() {
        getAllNews().then((data) => {
            console.log(data);

            this.setState((state, props) => ({
                articles: data.articles
                // source: data.articles[0].source,
                // author: data.articles[0].author,
                // title: data.articles[0].title,
                // description: data.articles[0].description,
                // url: data.articles[0].url,
                // urlToImage: data.articles[0].urlToImage
            }));
        });
    }

    render() {
        return (
            <>
                <h1 style={{
                    color: process.env.REACT_APP_ACCENT_COLOR, margin: '10px', fontFamily: 'san-serif',
                    fontWeight: 'bolder', border: '2px solid gray', borderRadius: '2px'
                }}>Covid-19 News</h1>
                {this.state.articles < 1 ? <CustomSpinner/> :
                    <Container style={{paddingBottom: '100px', minHeight: '100vh', margin: "0 auto"}} fluid>
                        <Row style={{margin: "0 auto"}} xl={4} lg={4} md={2} sm={1} xs={1}>
                            {this.state.articles.map((obj) => <Col>
                                <NewsItem source={obj.source} title={obj.title} author={obj.author}
                                          description={obj.description} url={obj.url}
                                          urlToImage={obj.urlToImage}/>
                            </Col>)}

                        </Row>
                    </Container>}
            </>
        );
    }
}

export default withRouter(News);
