import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './app.css';

const client = axios.create({
  baseUrl: "https://jsonplaceholder.typicode.com/posts"
})
function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);

  let handleSubmit = (e) => {
    e.preventDefault();
    addPost(title, body);
  }
  let addPost = async (title, body) => {
    let res = await client.post("https://jsonplaceholder.typicode.com/posts", { title, body });
    setPosts([res.data, ...posts]);
    setTitle('');
    setBody('');
  }
  let deletePost = async (id) => {
    await client.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setPosts(posts.filter(post => post.id !== id));
  }

  useEffect(() => {
    let fetchPosts = async() => {
      let response = await client.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
      setPosts(response.data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="app">
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="input title"></input>
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="input body"></input>
        <button type="submit">submit</button>
      </form>
      <h2>All Posts 📫</h2>
      { posts.map((post) => {
        return (
          <div className="post-card" key={post.id}>
            <h2 className="post-title">{ post.title }</h2>
            <p className="post-body">{ post.body }</p>
            <button className="btn" onClick={() => deletePost(post.id)}>Delete</button>
            <button className="btn like" onClick={ (e) => {
              e.target.classList.toggle('click');
              }}>Like</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
