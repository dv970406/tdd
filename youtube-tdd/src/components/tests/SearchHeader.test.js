import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { Route } from 'react-router-dom';
import SearchHeader from '../SearchHeader';
import { withRouter } from '../../tests/utils';

describe('SearchHeader', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<SearchHeader />} />)
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  // "/:keyword" 경로에 keyword로 bts를 준 경우 
  it('renders with keyword correctly', async () => {
    render(
      withRouter(<Route path='/:keyword' element={<SearchHeader />} />, '/bts')
    );
    expect(screen.getByDisplayValue('bts')).toBeInTheDocument();
  });

  // "/home" 경로에서 검색창에 "/videos/${searchKeyword}"를 검색하고 button을 클릭한 경우
  // "Search result for ${searchKeyword}" 라는 text를 얻을 수 있는가
  it('navigates to results page on search button click', () => {
    const searchKeyword = 'fake-keyword';

    render(
      withRouter(
        <>
          <Route path='/home' element={<SearchHeader />} />
          <Route
            path={`/videos/${searchKeyword}`}
            element={<p>{`Search result for ${searchKeyword}`}</p>}
          />
        </>,
        '/home'
      )
    );

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');

    userEvent.type(searchInput, searchKeyword);
    userEvent.click(searchButton);

    expect(
      screen.getByText(`Search result for ${searchKeyword}`)
    ).toBeInTheDocument();
  });
});
