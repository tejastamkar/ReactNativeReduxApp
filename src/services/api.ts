const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Generic API request function
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// User-related API calls
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const fetchUsers = (): Promise<User[]> => {
  return apiRequest<User[]>('/users');
};

export const fetchUserById = (userId: string): Promise<User> => {
  return apiRequest<User>(`/users/${userId}`);
};

// Post-related API calls
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const fetchPosts = (): Promise<Post[]> => {
  return apiRequest<Post[]>('/posts');
};

export const fetchPostById = (postId: string): Promise<Post> => {
  return apiRequest<Post>(`/posts/${postId}`);
};

export const fetchPostsByUserId = (userId: string): Promise<Post[]> => {
  return apiRequest<Post[]>(`/posts?userId=${userId}`);
};

// Comment-related API calls
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const fetchComments = (): Promise<Comment[]> => {
  return apiRequest<Comment[]>('/comments');
};

export const fetchCommentsByPostId = (postId: string): Promise<Comment[]> => {
  return apiRequest<Comment[]>(`/posts/${postId}/comments`);
};

// Album-related API calls
export interface Album {
  userId: number;
  id: number;
  title: string;
}

export const fetchAlbums = (): Promise<Album[]> => {
  return apiRequest<Album[]>('/albums');
};

export const fetchAlbumById = (albumId: string): Promise<Album> => {
  return apiRequest<Album>(`/albums/${albumId}`);
};

// Photo-related API calls
export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const fetchPhotos = (): Promise<Photo[]> => {
  return apiRequest<Photo[]>('/photos');
};

export const fetchPhotosByAlbumId = (albumId: string): Promise<Photo[]> => {
  return apiRequest<Photo[]>(`/albums/${albumId}/photos`);
};

// Todo-related API calls
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = (): Promise<Todo[]> => {
  return apiRequest<Todo[]>('/todos');
};

export const fetchTodoById = (todoId: string): Promise<Todo> => {
  return apiRequest<Todo>(`/todos/${todoId}`);
};

export const fetchTodosByUserId = (userId: string): Promise<Todo[]> => {
  return apiRequest<Todo[]>(`/todos?userId=${userId}`);
};

// Create new resources
export const createPost = (post: Omit<Post, 'id'>): Promise<Post> => {
  return apiRequest<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(post),
  });
};

export const createComment = (comment: Omit<Comment, 'id'>): Promise<Comment> => {
  return apiRequest<Comment>('/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
  });
};

export const createTodo = (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  return apiRequest<Todo>('/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
  });
};

// Update resources
export const updatePost = (postId: string, post: Partial<Post>): Promise<Post> => {
  return apiRequest<Post>(`/posts/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify(post),
  });
};

export const updateTodo = (todoId: string, todo: Partial<Todo>): Promise<Todo> => {
  return apiRequest<Todo>(`/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify(todo),
  });
};

// Delete resources
export const deletePost = (postId: string): Promise<void> => {
  return apiRequest<void>(`/posts/${postId}`, {
    method: 'DELETE',
  });
};

export const deleteTodo = (todoId: string): Promise<void> => {
  return apiRequest<void>(`/todos/${todoId}`, {
    method: 'DELETE',
  });
};
