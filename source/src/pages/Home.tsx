import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { markdown } from 'markdown';

import './Home.css';

interface IPostItem {
  title: string,
  number: number,
  body: string,
  updated_at: string
}

interface IHomeState {
  list: IPostItem[],
  page: number,
  pageSize: number,
  isDone: boolean,
  loading: boolean
}

export default class Home extends React.Component<{}, IHomeState> {
  public static getPreview(content: string) {
    const html = markdown.toHTML(content);
    const node = document.createElement('div');
    node.innerHTML = html;
    let text = node.innerText.substr(0, 200);
    if (text.length === 200) {
      text += '...';
    }
    return text;
  }

  constructor(props: any) {
    super(props);

    this.state = {
      isDone: false,
      list: [],
      page: 1,
      pageSize: 10,
      loading: false
    };
  }

  public componentDidMount() {
    this.getList();
  }

  public async getList() {
    const { isDone, page, pageSize } = this.state;

    if (isDone) {
      return;
    }
    this.setState({ loading: true });
    try {
      const url = `https://api.github.com/repos/lzxhahaha/lzxhahaha.github.io/issues?labels=publish&page=${page}&per_page=${pageSize}&state=all`;
      const res = await fetch(url);
      const list: IPostItem[] = await res.json();

      if (list.length) {
        this.setState({list});
      }
      if (list.length < pageSize) {
        this.setState({isDone: true});
      }
    } catch (err) {
      alert('加载失败');
      console.error(err.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  public renderContent() {
    const { loading, list, isDone } = this.state;

    if (loading && !list.length) {
      return (<div className="u-loading">加载中...</div>);
    }

    return (
      <div className="m-post-list">
        <h2>Posts</h2>
        {
          list.map((el) => (
            <Link key={el.number} to={`/post/${el.number}`}>
              <div className="m-post-item">
                <div>
                  <div className="u-post-title">{el.title}</div>
                  {moment(el.updated_at).format('YYYY-MM-DD')}
                </div>
                <p className="u-post-preview">{Home.getPreview(el.body)}</p>
              </div>
            </Link>
          ))
        }
        { !loading && !isDone && <div className="u-load">继续加载</div> }
      </div>
    );
  }

  public render() {
    return (
      <div className="home">
        {this.renderContent()}
      </div>
    );
  }
}
