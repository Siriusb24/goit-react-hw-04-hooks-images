import axios from 'axios';

const api = '16865907-bf97a2667d97724c7c41d2d46';
const url = 'https://pixabay.com/api/?';

const fetchImages = async (searchQuery, page) => {


  const { data } = await axios.get(`${url}q=${searchQuery}&page=${page}&key=${api}&image_type=photo&orientation=horizontal&per_page=12`).catch(error => console.error('Smth went wrong'));
  return data;
};

export default fetchImages;
