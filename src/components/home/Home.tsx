import React, { useContext, useEffect } from "react";
import "./homestyle.css";
import logo from "../../Assets/images/scarbor-siu-87gLIFoj79c-unsplash.jpg";
import Frame from "../frame/Frame";
import analytics from "../../Assets/images/trending_up_FILL0_wght400_GRAD0_opsz48.svg";
import content from "../../Assets/images/library_books_FILL0_wght400_GRAD0_opsz48.svg";
import social from "../../Assets/images/groups_FILL0_wght400_GRAD0_opsz48.svg";
import alex from "../../Assets/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg";
import pic1 from "../../Assets/images/olga-nayda-fHXpgMd_XhE-unsplash.jpg";
import pic3 from "../../Assets/images/sigmund-jzz_3jWMzHA-unsplash.jpg";
import pic2 from "../../Assets/images/alexander-hipp-iEEBWgY_6lA-unsplash.jpg";
import { useSelector } from "react-redux";
import Profile from "../profile/Profile";
import Preview from "../preview/Preview";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext/UserContext";

function Home() {

  // const user = JSON.parse(localStorage.getItem('user'))
  //  console.log(user.displayName)
  const navigate = useNavigate()
  const mobi_menu = useSelector((state: any) => state.data.mobi_menu);
const user = useContext(UserContext)
  console.log(mobi_menu);


  return (
    <main className="home-main">
      

      <section className="bg-wrap">
        <header className="bg-header">
          <div className="cx-wrap">
            <h2 className="home-title">
              Welcome to Chatter: A Haven for Text-Based Content
            </h2>
            <p className="home-p">
              Unleash the Power of Words, Connect with Like-minded Readers{" "}
              <br /> and Writers
            </p>
            <button className="home-btn">Get Started</button>
          </div>
        </header>
      </section>

      <section className="section-two">
        <div className="section-two-content">
          <h1>About Chatter</h1>
          <p>
            Chatter is a multi-functional platform where authors and readers can
            have access to their own content. It aims to be a traditional
            bookworm’s heaven and a blog to get access to more text based
            content. Our vision is to foster an inclusive and vibrant community
            where diversity is celebrated. We encourage open-mindedness and
            respect for all individuals, regardless of their backgrounds or
            beliefs. By promoting dialogue and understanding, we strive
          </p>
        </div>

        <div className="home-img1">
          <img src={logo} alt="87gLIFoj79c-unsplash.jpg" height="240px" />
        </div>
      </section>

      <section className="section-three">
        <div>
          <h1>Why you should join chatter</h1>

          <p>
            Our goal is to make writers and readers see our platform as their
            next heaven for blogging, ensuring ease in interactions, connecting
            with like-minded peers, have access to favorite content based on
            interests and able to communicate your great ideas with people
          </p>
        </div>

        <div className="frame-cx">
          <Frame
            icon={analytics}
            title="Analytics"
            para="Analytics to track the number of views, 
        likes and comment and also 
        analyze the performance of your articles over a period of time"
          />
          <Frame
            icon={social}
            title="Social interactions"
            para="Users on the platform can interact with posts they like, 
         comment and engage in discussions"
          />
          <Frame
            icon={content}
            title="Content creation"
            para="Write nice and appealing with our in-built markdown, 
         a rich text editor"
          />
        </div>
      </section>

      <section className="section-four">
        <img src={alex} alt="" className="home-img2" />
        <div className="section-four-content">
          <p>
            "Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.”
          </p>

          <p>
            <b>Adebobola Muhydeen,</b>Software developer at Apple
          </p>
          <button className="home-btn">Join chatter</button>
        </div>
      </section>
      <section className="section-five">
        <div className="section-five-image-cx">
          <div className="flex-col gap">
            <img src={pic3} alt="pic3" className="section-five-img1" />
            <img src={pic2} alt="avatar" className="section-five-img1" />
          </div>
          <div className="flex-rw just-center">
            <img src={pic1} alt="" className="section-five-img1" />
          </div>
        </div>
        <div className="section-five-content">
          <h1>Write, read and connect with great minds on chatter</h1>
          <p>
            Share people your great ideas, and also read write-ups based on your
            interests. connect with people of same interests and goals
          </p>

          <button className="home-btn">Get started</button>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-logo">
          <h1>CHATTER</h1>
        </div>
        <div className="footer-rw-1">
          <h3>Explore</h3>
          <p>Community</p>
          <p>Trending</p>
          <p>Chatter for teams</p>
        </div>

        <div className="footer-rw-2">
          <h3>Support</h3>
          <p>Support docs</p>
          <p>Join slack</p>
          <p>Contact</p>
        </div>
        <div className="footer-rw-3">
          <h3>Official blog</h3>
          <p>Official blog</p>
          <p>Engineering blog</p>
        </div>
      </footer>
    </main>
  );
}

export default Home;
