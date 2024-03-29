import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const App = () => {
      const [posts, setPosts] = useState([
            {
                  id: 1,
                  title: "My First Post",
                  datetime: "July 01, 2021 11:17:37 AM",
                  body: "Lorem iskdfj dorld sit skeg",
            },
      ]);
      const [search, setSearch] = useState("");
      const [searchResults, setSearchResults] = useState([]);
      const [postTitle, setPostTitle] = useState("");
      const [postBody, setPostBody] = useState("");
      const history = useHistory();

      const handleSubmit = (e) => {
            e.preventDefault();
            const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
            const datetime = format(new Date(), "MMMM dd, yyyy PP");
            const newPost = { id, title: postTitle, datetime, body: postBody };
            const allPosts = [...posts, newPost];
            setPosts(allPosts);
            setPostTitle("");
            setPostBody("");
            history.push("/");
      };

      useEffect(() => {
            const filteredesults = posts.filter(
                  (post) =>
                        post.body
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                        post.title.toLowerCase().includes(search.toLowerCase())
            );
            setSearchResults(filteredesults.reverse());
      }, [posts, search]);

      const handleDelete = (id) => {
            const postsList = posts.filter((post) => post.id !== id);
            setPosts(postsList);
            history.push("/");
      };

      return (
            <div className="App">
                  <Header title="React JS Blog" />
                  <Nav search={search} setSearch={setSearch} />
                  <Switch>
                        <Route exact path="/">
                              <Home posts={searchResults} />
                        </Route>
                        <Route exact path="/post">
                              <NewPost
                                    handleSubmit={handleSubmit}
                                    postTitle={postTitle}
                                    setPostTitle={setPostTitle}
                                    postBody={postBody}
                                    setPostBody={setPostBody}
                              />
                        </Route>
                        <Route path="/post/:id">
                              <PostPage
                                    posts={posts}
                                    handleDelete={handleDelete}
                              />
                        </Route>
                        <Route path="/about" component={About} />
                        <Route path="*" component={Missing} />
                  </Switch>
                  <Footer />
            </div>
      );
};

export default App;
