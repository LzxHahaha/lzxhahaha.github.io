import * as React from 'react';

import './Post.css';

interface IPostProps {
  match: {
    params: {
      number: string
    }
  }
}

interface IPostState {
  detail?: any
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

  public render() {
    const { detail } = this.state;

    if (!detail) {
      return <div className="u-loading">加载中...</div>
    }
    return (
      <h1>Post</h1>
    );
  }
}
