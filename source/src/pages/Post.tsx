import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { markdown } from 'markdown';

import './Post.css';

interface IPostProps {
  match: {
    params: {
      number: string
    }
  }
}

interface IPostState {
  detail: null | {
    title: string,
    updated_at: string,
    body: string
  }
}

export default class Post extends React.Component<IPostProps, IPostState> {
  constructor(props: any) {
    super(props);

    this.state = {
      detail: null
    };
  }

  public async componentDidMount() {
    const res = await fetch(`https://api.github.com/repos/lzxhahaha/lzxhahaha.github.io/issues/${this.props.match.params.number}`);
    const detail = await res.json();
    this.setState({ detail });
  }

  public getContent(): string {
    const { detail } = this.state;
    if (!detail) {
      return '';
    }
    return markdown.toHTML(detail.body);
  }

  public renderContent() {
    const { detail } = this.state;

    if (!detail) {
      return <div className="u-loading">加载中...</div>
    }
    return (
      <div>
        <div className="u-title">{detail.title}</div>
        {moment(detail.updated_at).format('YYYY-MM-DD HH:mm:ss')}
        <section dangerouslySetInnerHTML={{ __html: this.getContent() }} />
      </div>
    );
  }

  public render() {
    return (
      <div className="post">
        {this.renderContent()}
        <Link to="/">
          <div className="u-return-btn">◀&emsp;返回列表</div>
        </Link>
      </div>
    );
  }
}
