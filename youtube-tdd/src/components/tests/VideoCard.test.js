import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { Route, useLocation } from 'react-router-dom';
import { withRouter } from '../../tests/utils';
import { fakeVideo as video } from '../../tests/videos';
import { formatAgo } from '../../util/date';
import VideoCard from '../VideoCard';

describe('VideoCard', () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  // VideoCard의 prop인 type은 isList로 분기처리되는데 isList가 false인 경우
  it('renders grid type correctly', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<VideoCard video={video} />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  // VideoCard의 prop인 type은 isList로 분기처리되는데 isList가 true인 경우
  it('renders list type correctly', () => {
    const component = renderer.create(
      withRouter(
        <Route path='/' element={<VideoCard video={video} type='list' />} />
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  // "/"경로에서 보이는 요소(image와 text)들의 데이터를 체크
  it('renders video item', () => {
    render(
      withRouter(<Route path='/' element={<VideoCard video={video} />} />)
    );

    const image = screen.getByRole('img');
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  // "/" 경로에서 카드를 클릭하여 "/videos/watch/${video.id}" 경로로 네비게이트된 경우 그 경로에 보이는 text
  it('navigates to detailed video page with video state when clicked', () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      withRouter(
        <>
          <Route path='/' element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );

    const card = screen.getByRole('listitem');
    userEvent.click(card);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
