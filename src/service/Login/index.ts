import axios from '../Axios';
export const githubCallback = (code: string) => {
    return axios.post('/auth/github/code', { code });
};
export const githubTest = async () => {
    const response = await axios.get('/auth/github/test');
    return response.data;
};
