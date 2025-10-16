import '@/styles/App.css';

import { formatDistanceToNow } from 'date-fns';
import { type ChangeEvent, useState } from 'react';

import { fetchData } from '@/services/fetchData';

// Steps:
// - Call the GitHub API and display the results ✅
// - Highlight the line with the highest star count ✅
// - Show updated_at as elapsed time ✅
// - Implement pagination behavior ✅
// - Assign a distinct color to each language ✅

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Shell: '#89e051',
  Lua: '#000080',
  Perl: '#0298c3',
  Scala: '#c22d40',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  R: '#198CE7',
  Objective: '#438eff',
  Matlab: '#e16737',
};

function getLanguageColor(language: string | null): string {
  if (!language) return '#cccccc';
  return LANGUAGE_COLORS[language] || '#cccccc';
}

export default function App() {
  const [items, setItems] = useState<
    {
      full_name: string;
      stargazers_count: number;
      updated_at: string;
      description: string;
      language: string;
    }[]
  >([]);
  const [repository, setRepository] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event);
    setRepository(event.target.value);
  };

  const handleSubmit = async (page = 1) => {
    setLoading(true);

    try {
      const data = await fetchData(repository, page);
      console.log('data from handleSubmit =>', data);
      setItems(data.items);
      setTotalCount(data.total_count);
      setCurrentPage(page);
      setError(null);
    } catch (error) {
      console.error('Error while searching:', error);
      setError('Unable to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handleSubmit(currentPage - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(totalCount / 10);
    if (currentPage < totalPages) {
      handleSubmit(currentPage + 1);
    }
  };

  console.log('items =>', items);

  const highlightRepository = Math.max(...items.map((item) => item.stargazers_count));

  console.log('highlightRepository =>', highlightRepository);

  return (
    <div className="App">
      <h1>GitHub Repository Search</h1>
      {error && <div className="error">{error}</div>}
      <div>
        <input
          type="text"
          name="repository"
          onChange={handleChange}
          placeholder="Find repository name"
        />
        <button type="button" onClick={() => handleSubmit(1)}>
          Search
        </button>
        <button
          type="button"
          onClick={() => {
            setItems([]);
            setCurrentPage(1);
            setTotalCount(0);
          }}
        >
          Clear
        </button>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {items.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Stars</th>
                <th scope="col">Last Update</th>
                <th scope="col">Description</th>
                <th scope="col">Language</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.full_name}
                  className={item.stargazers_count === highlightRepository ? 'highlight' : ''}
                >
                  <td>{item.full_name}</td>
                  <td>{item.stargazers_count}</td>
                  <td>{formatDistanceToNow(new Date(item.updated_at), { addSuffix: true })}</td>
                  <td title={item.description}>{item.description}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: getLanguageColor(item.language),
                        padding: '4px 8px',
                        borderRadius: '4px',
                        color: '#fff',
                        fontSize: '0.9em',
                      }}
                    >
                      {item.language || 'N/A'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button type="button" onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {Math.ceil(totalCount / 10)}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage >= Math.ceil(totalCount / 10)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
