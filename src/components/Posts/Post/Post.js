import React from 'react'

import { Card, CardText, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap'
import './Post.css'

const post = (props) => (
    <Card className="my-2 Card">
        <CardText className="px-2 CardText">{props.post.message}</CardText>
        {props.post.imgDownloadURL ? <CardImg top width="100%" src={props.post.imgDownloadURL} alt='img.jpg' /> : null}
        <div className="px-2 text-right">
            <i className="far fa-thumbs-up"></i>
            <i className="far fa-heart pl-2"></i>
        </div>
        <CardBody className="pt-2 pb-1 px-1 text-right">
            <CardSubtitle className="CardSubtitle">{props.post.date}&nbsp;{props.post.time}</CardSubtitle>
            <CardTitle className="mb-1 CardTitle">{props.post.author}</CardTitle>
        </CardBody>
    </Card>
)

export default post