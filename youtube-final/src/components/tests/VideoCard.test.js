import { render, screen } from "@testing-library/react";
import { Route, useLocation } from "react-router-dom";
import { formatAgo } from "../../util/date";
import VideoCard from "../VideoCard";
import userEvent from "@testing-library/user-event";
import { fakeVideo as video } from "../../tests/videos";
import { withRouter } from "../../tests/utils";
import renderer from "react-test-renderer";

describe("VideoCard", () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  it("renders grid type correctly", () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<VideoCard video={video} />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders list type correctly", () => {
    const component = renderer.create(
      withRouter(
        <Route path="/" element={<VideoCard video={video} type="list" />} />
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders video item", () => {
    render(
      withRouter(<Route path="/" element={<VideoCard video={video} />} />)
    );

    // getByRole은 HTML태그를 말함
    const image = screen.getByRole("img");
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  it("navigates to detailed video page with video state when clicked", () => {
    // 테스트용 함수 컴포넌트
    const LocationStateDisplay = () => {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    };
    render(
      withRouter(
        <>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );

    const card = screen.getByRole("listitem");
    userEvent.click(card);

    // 화면에 렌더링된 LocationStateDisplay의 텍스트 값을 테스트하는 것이다
    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
