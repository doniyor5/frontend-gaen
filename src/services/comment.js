import axios from 'axios'

const baseUrl = 'https://api.gaen.uz/api/v1/article/user/art/'

export const getComments = async (slug) => {
    try {
        const response = await axios.get(`${baseUrl}${slug}/comments`);
        return response.data.results;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to fetch comments');
    }
};

export const postComment = async (slug, commentData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(
            `${baseUrl}${slug}/comments/`,
            commentData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to create comment');
    }
};

export const deleteComment = async (slug, commentSlug) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${baseUrl}${slug}/comments/${commentSlug}/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to delete comment');
    }
};
