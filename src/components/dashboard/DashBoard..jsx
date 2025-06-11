import React, { useState, useEffect } from "react";
import "./dashboard.css";
import RepoCardList from "./RepoCardList";
import Navbar from "../Navbar";
import Repo from "./Repo";
import axios from "axios";
// import Navbar from "../Navbar";

const Dashboard = () => {
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [repositories, setRepositories] = useState([]);
 const [userDetails, setUserDetails] = useState({ username: "username",starRepos:[] });
  const [searchResults, setSearchResults] = useState([]);
   const [starredRepo, setstarRepo] = useState([]);
     const [searchStarredRepo, setSearchstarredRepo] = useState([]);
     console.log("hhere");

  useEffect(() => {
    const userId = localStorage.getItem("userId");  

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://devnest-backend-as9y.onrender.com/repo/user/${userId}`
        );
        const data = await response.json();
       
        setRepositories(data);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

     const fetchUserDetails = async () => {
           
      
            if (userId) {
              try {
                const response = await axios.get(
                  `https://devnest-backend-as9y.onrender.com/userProfile/${userId}`
                );
              
                setUserDetails(response.data);
                console.log("fetch");
              } catch (err) {
                console.error("Cannot fetch user details: ", err);
              }
            }
          };
         
    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`https://devnest-backend-as9y.onrender.com/repo/all`);
        const data = await response.json();
       
        setSuggestedRepositories(data);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
    fetchUserDetails();
    // const fetchStarredRepo=()=>{
    //   setstarRepo(userDetails.starRepos);



    //   };
    //   fetchStarredRepo();


  }, []);
  




  return (
    <>
      <Navbar setSearchResults={setSearchResults} repositories={repositories} starredRepo={starredRepo} setSearchstarredRepo={setSearchstarredRepo}></Navbar>
     <section id="dashboard"> 
    <aside className="left">
      <h3>Suggested Repositories</h3>
     <RepoCardList repos={suggestedRepositories} ></RepoCardList>
    </aside>
    <main>
      

      <h2>Your Repositories</h2>
      
      {searchResults.map((repo) => {
        const star = userDetails.starRepos.some(r => r._id === repo._id);
        return (
          
          <Repo key={repo._id} repo={repo} setUserDetails={setUserDetails} isstar={star} ></Repo>
        );
      })}
    </main>
    <aside className="right">
      <h3>Upcoming Events</h3>
      <ul>
        <li>
          <p>Tech Conference - Dec 15</p>
        </li>
        <li>
          <p>Developer Meetup - Dec 25</p>
        </li>
        <li>
          <p>React Summit - Jan 5</p>
        </li>
      </ul>
    </aside>
  </section>
  </>
);
};

export default Dashboard;