const fetchData = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchData;
