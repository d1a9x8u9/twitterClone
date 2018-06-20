import React from 'react'

import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import './Post.css'

const post = (props) => (
        <Card className="my-1 Card">
            {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
            <CardBody className="py-0 px-auto">
            <CardText className="mb-1 CardText">{props.post.message}</CardText>
            <CardSubtitle className="CardSubtitle">{props.post.date}&nbsp;{props.post.time}</CardSubtitle>
            <CardTitle className="CardTitle">{props.post.author}</CardTitle>
            {/* <Button>Button</Button> */}
            </CardBody>
        </Card>
)

export default post