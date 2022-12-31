import Youtube from "../api/youtube";
import YoutubeClient from "../api/youtubeClient";
import { YoutubeApiContext } from "./YoutubeApiContext";

const client = new YoutubeClient();
const youtube = new Youtube(client);

// 테스트가 아닌 Application에서 사용할 Provider
// 테스트에서는 이 Provider가 아닌 YoutubeApiContext를 이용하게 되므로
// YoutubeClient를 테스트에서 사용하지 않게되어 axios를 사용하지 않는다.
// 테스트에서는 네트워크 통신을 하는 것이 아니라 Mock데이터를 쓸 것이기 때문이다.
export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}
