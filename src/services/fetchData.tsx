export const fetchData = async (search: string, page = 1) => {
  const MAX_ITEM = 10;
  const gitHubApi = `https://api.github.com/search/repositories?q=${search}&page=${page}&per_page=${MAX_ITEM}`;

  const response = await fetch(gitHubApi);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();
  console.log('result from fetchData =>', result);
  return result;
};
