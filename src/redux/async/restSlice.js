import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Async actions
// Users
export const getUsers = createAsyncThunk(
  "users/fetch",
  async ({ search = "", page = 1, limit = 10 }, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;

    const response = await axios.get(
      `${API_URL}/users?search=${search}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const updateUsers = createAsyncThunk(
  "users/update",
  async ({ id, ...userData }, { getState }) => {
    // Menerima objek dengan id dan data pengguna
    const state = getState();
    const token = state.auth.login.token;

    const response = await axios.put(`${API_URL}/users/${id}`, userData, {
      // Mengirim userData sebagai body
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

// Portfolio
export const getPortfolios = createAsyncThunk(
  "portofolios/fetch",
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;

    const response = await axios.get(`${API_URL}/portfolio?&page=1&limit=5`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  }
);

export const postPortfolios = createAsyncThunk(
  "portofolios/post",
  async (portfolio, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;

    const response = await axios.post(`${API_URL}/portfolio`, portfolio, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deletePortfolios = createAsyncThunk(
  "portofolios/delete",
  async (id, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;
    await axios.delete(`${API_URL}/portfolio/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export const updatePortfolio = createAsyncThunk(
  "portofolios/update",
  async ({ id, ...portfolioData }, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;

    const response = await axios.put(
      `${API_URL}/portfolio/${id}`,
      portfolioData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

// Blog
export const getBlogs = createAsyncThunk(
  "blogs/fetch",
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;

    const response = await axios.get(`${API_URL}/blogs?&page=1&limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  }
);

export const postBlogs = createAsyncThunk(
  "blogs/post",
  async (blog, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;

    const response = await axios.post(`${API_URL}/blogs`, blog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteBlogs = createAsyncThunk(
  "blogs/delete",
  async (id, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;
    await axios.delete(`${API_URL}/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export const publishBlog = createAsyncThunk(
  "blogs/publish",
  async (id, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;

    const response = await axios.patch(
      `${API_URL}/blogs/${id}/publish`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Pastikan ini sesuai dengan struktur data yang dikembalikan
  }
);

// Testimoni
export const getTestimonis = createAsyncThunk(
  "testimonial/fetch",
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;

    const response = await axios.get(`${API_URL}/testimonial?&page=1&limit=5`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  }
);

export const postTestimonis = createAsyncThunk(
  "testimonial/post",
  async (testimoni, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;

    const response = await axios.post(`${API_URL}/testimonial`, testimoni, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteTestimonis = createAsyncThunk(
  "testimonial/delete",
  async (id, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;
    await axios.delete(`${API_URL}/testimonial/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

//Contact
export const getContacts = createAsyncThunk(
  "contact/fetch",
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;

    const response = await axios.get(`${API_URL}/contact?&page=1&limit=5`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  }
);

// Initial state
const initialState = {
  loading: false,
  error: null,
  // Users
  users: [],
  user: {},
  totalUsers: 0,
  // Portfolio
  portfolios: [],
  portfolio: {},
  // Blog
  blogs: [],
  blog: {},
  // Testimonis
  testimonis: [],
  testimoni: {},
  // Contact
  contacts: [],
};

// Slice
const restSlice = createSlice({
  name: "rest",
  initialState,
  extraReducers: (builder) => {
    builder
      // Get Users
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalUsers = action.payload.pagination.totalUsers;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update User
      .addCase(updateUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.data;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //PORTFOLIO
      // Get Portfolios
      .addCase(getPortfolios.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPortfolios.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = action.payload;
      })
      .addCase(getPortfolios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Post Portofolio
      .addCase(postPortfolios.pending, (state) => {
        state.loading = true;
      })
      .addCase(postPortfolios.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios.push(action.payload.data);
      })
      .addCase(postPortfolios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Portofolio
      .addCase(deletePortfolios.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePortfolios.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = state.portfolios.filter(
          (portfolio) => portfolio.id !== action.payload
        );
      })
      .addCase(deletePortfolios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Portfolio
      .addCase(updatePortfolio.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPortfolio = action.payload.data; // Pastikan ini sesuai dengan struktur data yang dikembalikan
        const index = state.portfolios.findIndex(
          (portfolio) => portfolio.id === updatedPortfolio.id
        );
        if (index !== -1) {
          state.portfolios[index] = updatedPortfolio; // Update the portfolio in the array
        }
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // BLOG
      // Get Blog
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Blog
      .addCase(postBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(postBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload.data);
      })
      .addCase(postBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Blog
      .addCase(deleteBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      // Publish Blog
      .addCase(publishBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(publishBlog.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBlog = action.payload.data; // Pastikan ini sesuai dengan struktur data yang dikembalikan
        const index = state.blogs.findIndex(
          (blog) => blog.id === updatedBlog.id
        );
        if (index !== -1) {
          state.blogs[index] = updatedBlog; // Update the blog in the array
        }
      })
      .addCase(publishBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //TESTIMONI
      // Get Testimoni
      .addCase(getTestimonis.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTestimonis.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonis = action.payload;
      })
      .addCase(getTestimonis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Post Testimoni
      .addCase(postTestimonis.pending, (state) => {
        state.loading = true;
      })
      .addCase(postTestimonis.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonis.push(action.payload);
      })
      .addCase(postTestimonis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Testimoni
      .addCase(deleteTestimonis.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTestimonis.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonis = state.testimonis.filter(
          (testimoni) => testimoni.id !== action.payload
        );
      })
      .addCase(deleteTestimonis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // CONTACT
      // Get Contact
      .addCase(getContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default restSlice.reducer;
