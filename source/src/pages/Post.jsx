import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import marked from 'marked';
import highlight from 'highlight.js';

import './Post.css';
import './hljs.darcula.css';

marked.setOptions({
  highlight: code => highlight.highlightAuto(code).value,
});

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detail: null
    };
  }

  async componentDidMount() {
    const res = await fetch(`https://api.github.com/repos/lzxhahaha/lzxhahaha.github.io/issues/${this.props.match.params.number}`);
    const detail = await res.json();
    this.setState({ detail });
  }

  renderContent() {
    const { detail } = this.state;

    if (!detail) {
      return <div className="u-loading">加载中...</div>
    }
    const { title, updated_at, body = '' } = detail;

    return (
      <div>
        <div className="u-title">
          <h1>{title}</h1>
          {moment(updated_at).format('YYYY-MM-DD HH:mm:ss')}
        </div>
        <div dangerouslySetInnerHTML={{ __html: marked(body) }} />
      </div>
    );
  }

  render() {
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
