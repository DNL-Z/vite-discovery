import '@/styles/App.css';

import { type ChangeEvent, useState } from 'react';

import { fetchData } from '@/services/fetchData';

// Steps
// Call the GitHub API and display the results
// Highlight the line with the highest star count
// Show updated_at as elapsed time
// Implement pagination behavior
// Assign a distinct color to each language

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event);
    setRepository(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const data = await fetchData(repository);
      console.log('data from handleSubmit =>', data);
      setItems(data.items);
      setError(null);
    } catch (error) {
      console.error('Error while searching:', error);
      setError('Unable to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  console.log('items =>', items);

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
        <button type="button" onClick={handleSubmit}>
          Search
        </button>
        <button type="button" onClick={() => setItems([])}>
          Clear
        </button>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {items.length > 0 && (
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
              <tr key={item.full_name}>
                <td>{item.full_name}</td>
                <td>{item.stargazers_count}</td>
                <td>{item.updated_at}</td>
                <td title={item.description}>{item.description}</td>
                <td>{item.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
