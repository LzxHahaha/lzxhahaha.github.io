import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

interface IHomeState {
  list: IPostItem[],
  page: number,
  pageSize: number,
  isDone: boolean
};

interface IPostItem {
  title: string,
  number: number,
  body: string,
  updated_at: string
}

export default class Home extends React.Component<{}, IHomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isDone: false,
      list: [],
      page: 1,
      pageSize: 10,
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
    const res = await fetch(`https://api.github.com/repos/lzxhahaha/lzxhahaha.github.io/issues?labels=publish&page=${page}&per_page=${pageSize}`);
    const list: IPostItem[] = await res.json();

    if (list.length) {
      this.setState({ list });
    } else {
      this.setState({ isDone: true });
    }
  }

  public render() {
    return (
      <div>
        <ul>
          {
            this.state.list.map((el) => (
              <li key={el.number}>
                <Link to={`/post?id=${el.number}`}>{el.title} - {moment(el.updated_at).format('YYYY-MM-DD')}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
