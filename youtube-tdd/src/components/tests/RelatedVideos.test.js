import { Route } from "react-router-dom";
import { withAllContexts, withRouter } from "../../tests/utils";
import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { fakeVideos } from "../../tests/videos";
import RelatedVideos from "../RelatedVideos";

describe("RelatedVideos", () => {
  const fakeYoutube = {
    relatedVideos: jest.fn(),
  };

  afterEach(() => fakeYoutube.relatedVideos.mockReset());

  // fakeVideos가 전달이 되면 로딩이 없어질 때 까지 기다렸다가 스냅샷 테스트를 진행
  it("renders correctly", async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);
    const { asFragment } = renderRelatedVideos();

    // await 사용 시 getByText보단 queryByText를 사용
    // get보단 query사용 시 에러 발생 시 조금 더 충분한 에러를 받아볼 수 있음
    await waitForElementToBeRemoved(screen.queryByText("Loading..."));
    expect(asFragment()).toMatchSnapshot();
  });

  // fakeVideos가 전달되고 컴포넌트가 보여지면 video의 id가 전달되면서 relatedVideos API가 호출되었는지 확인
  // listitem을 가진 요소들이 총 fakeVideos의 길이와 같은지 확인
  it("renders related videos correctly", async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);
    renderRelatedVideos();

    expect(fakeYoutube.relatedVideos).toHaveBeenCalledWith("id");
    await waitFor(() =>
      expect(screen.getAllByRole("listitem")).toHaveLength(fakeVideos.length)
    );
  });

  it("renders loading", () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);
    renderRelatedVideos();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  // 에러를 던지면 화면에 에러가 나오는지 확인
  it("renders error", async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => {
      throw new Error("error");
    });

    renderRelatedVideos();
    await waitFor(() => {
      expect(screen.getByText("Something is wrong 😖")).toBeInTheDocument();
    });
  });

  function renderRelatedVideos() {
    return render(
      withAllContexts(
        withRouter(<Route path="/" element={<RelatedVideos id="id" />} />),
        fakeYoutube
      )
    );
  }
});
