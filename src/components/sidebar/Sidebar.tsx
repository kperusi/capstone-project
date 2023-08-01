import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebarstyle.css";
import { handleSelected, setForYou } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import Trending from "../Trending/Trending";
import { collection, onSnapshot } from "firebase/firestore";
import Popup from "reactjs-popup";
import { db } from "../firebase/firebase";
import Preview from "../preview/Preview";

export default function Sidebar() {
  const dispatch = useDispatch();
  const selected = useSelector((state: any) => state.data.selected);
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  // const [close, setClose] = useState<any>("");
  // const [showSeeAll, setShowSeeAll] = useState<any>("see-all-hidden");

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  // const handleClose = () => {
  //   if (showSeeAll === "see-all-hidden") {
  //     setShowSeeAll("see-all-show");
  //   } else setShowSeeAll("see-all-hidden");
  // };
  // console.log(showSeeAll);
  useEffect(() => {
    onSnapshot(collection(db, "Blogs"), (snapshot): any => {
      let tag: any = [
        "Programming",
        "Data Science",
        "Technology",
        "Machine Learning",
        "Politics",
      ];
      snapshot.docs.forEach((doc) => {
        tag.push(...doc.get("tags"));
      });
      // console.log(tag)
      const uniqueTags: any = [...new Set(tag)];
      const t = uniqueTags.filter((value: any) => value !== "");
      setTags(t);
    });
  }, []);
  return (
    <main className="sidebar-main">
      <section aria-label="logo-section" className="sidebar-rw-1">
        <h1>CHATTER</h1>
      </section>
      <section className="sidebar-rw-2">
        <h2>Overview</h2>
        <div className="sidebar-feed-div">
          {/* <img src={feedicon} alt="" /> */}
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 2H9C8.4 2 8 2.4 8 3V6C8 6.6 8.4 7 9 7H21C21.6 7 22 6.6 22 6V3C22 2.4 21.6 2 21 2ZM12 17H7V22H12V17ZM7 9.5H2V14.5H7V9.5ZM18 9.6H9.5V14.3H18V9.6Z"
                stroke={selected.feed ? "blue" : "#626262"}
                fill="currenColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <NavLink
            className={`links ${selected.feed}`}
            to="feed"
            onClick={() => {
              dispatch(setForYou());
              dispatch(handleSelected("feed"));
            }}
          >
            Feed
          </NavLink>
        </div>

        <div className="sidebar-feed-div">
          <span>
            <svg
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 6V21.2417L7.19696 18.5404L7 18.456L6.80304 18.5404L0.5 21.2417V6C0.5 5.58379 0.642483 5.23962 0.941554 4.94055C1.24061 4.6415 1.58424 4.4995 1.99939 4.5H2H12C12.4162 4.5 12.7604 4.64248 13.0594 4.94155C13.3585 5.24061 13.5005 5.58424 13.5 5.99939V6ZM2 4H12C12.55 4 13.021 4.196 13.413 4.588C13.805 4.98 14.0007 5.45067 14 6L2 4ZM1.5 18.95V19.7093L2.19751 19.4093L7 17.3443L11.8025 19.4093L12.5 19.7093V18.95V6V5.5H12H2H1.5V6V18.95ZM17.5 2V18.5H16.5V2V1.5H16H3.5V0.5H16C16.4162 0.5 16.7604 0.642483 17.0594 0.941554C17.3585 1.24061 17.5005 1.58424 17.5 1.99939V2Z"
                fill={selected.bookmark ? "blue" : "#626262"}
                stroke={selected.bookmark ? "blue" : "#626262"}
              />
            </svg>
          </span>
          <NavLink
            to=""
            className={`links ${selected.bookmark}`}
            onClick={() => {
              dispatch(handleSelected("bookmark"));
            }}
          >
            Bookmarks
          </NavLink>
        </div>

        <div className="sidebar-feed-div">
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.3172 14.404C16.7305 13.8169 16.0451 13.3377 15.2922 12.9883C16.3539 12.1282 17.0312 10.8157 17.0312 9.34381C17.0312 6.74694 14.8656 4.61647 12.2687 4.65631C9.71171 4.69616 7.65155 6.77975 7.65155 9.34381C7.65155 10.8157 8.33124 12.1282 9.39061 12.9883C8.63758 13.3374 7.95207 13.8166 7.36561 14.404C6.08593 15.686 5.35936 17.3782 5.31249 19.1829C5.31186 19.2079 5.31625 19.2328 5.32539 19.2561C5.33454 19.2794 5.34825 19.3006 5.36572 19.3185C5.3832 19.3364 5.40408 19.3506 5.42714 19.3604C5.4502 19.3701 5.47497 19.3751 5.49999 19.3751H6.81249C6.91327 19.3751 6.99765 19.2954 6.99999 19.1946C7.04452 17.8352 7.5953 16.5626 8.56327 15.5969C9.0586 15.099 9.64777 14.7042 10.2967 14.4355C10.9456 14.1667 11.6414 14.0294 12.3437 14.0313C13.7711 14.0313 15.1141 14.5868 16.1242 15.5969C17.0898 16.5626 17.6406 17.8352 17.6875 19.1946C17.6898 19.2954 17.7742 19.3751 17.875 19.3751H19.1875C19.2125 19.3751 19.2373 19.3701 19.2603 19.3604C19.2834 19.3506 19.3043 19.3364 19.3218 19.3185C19.3392 19.3006 19.3529 19.2794 19.3621 19.2561C19.3712 19.2328 19.3756 19.2079 19.375 19.1829C19.3281 17.3782 18.6016 15.686 17.3172 14.404ZM12.3437 12.3438C11.5422 12.3438 10.7875 12.0321 10.2226 11.4649C9.93918 11.1837 9.71526 10.8482 9.56426 10.4786C9.41325 10.1089 9.33825 9.71262 9.34374 9.31334C9.35077 8.54459 9.6578 7.80162 10.1945 7.25084C10.757 6.67428 11.5094 6.35319 12.3133 6.34381C13.1078 6.33678 13.8789 6.64616 14.4461 7.20162C15.0273 7.77116 15.3461 8.53287 15.3461 9.34381C15.3461 10.1454 15.0344 10.8977 14.4672 11.4649C14.1889 11.7445 13.858 11.9661 13.4935 12.117C13.129 12.2679 12.7382 12.345 12.3437 12.3438ZM6.47265 9.96256C6.45155 9.75866 6.43983 9.55241 6.43983 9.34381C6.43983 8.97116 6.47499 8.60787 6.54061 8.25397C6.55702 8.16959 6.51249 8.08287 6.43515 8.04772C6.1164 7.90475 5.82343 7.70787 5.5703 7.45944C5.27204 7.17024 5.03733 6.82203 4.88116 6.43705C4.72499 6.05207 4.65078 5.63876 4.66327 5.2235C4.68436 4.47116 4.98671 3.75631 5.51405 3.21725C6.09296 2.62428 6.87108 2.30084 7.69843 2.31022C8.44608 2.31725 9.16796 2.60553 9.71405 3.11647C9.89921 3.28991 10.0586 3.48209 10.1922 3.68834C10.2391 3.761 10.3305 3.79147 10.4101 3.76334C10.8226 3.62037 11.2586 3.51959 11.7062 3.47272C11.8375 3.45866 11.9125 3.31803 11.8539 3.20084C11.0922 1.69381 9.53593 0.653187 7.73593 0.625062C5.13671 0.585218 2.97108 2.71569 2.97108 5.31022C2.97108 6.78209 3.64843 8.09459 4.71015 8.95475C3.96483 9.29928 3.27811 9.77506 2.6828 10.3704C1.39843 11.6524 0.671865 13.3446 0.62499 15.1516C0.624364 15.1766 0.628752 15.2015 0.637894 15.2248C0.647037 15.2481 0.660748 15.2693 0.678222 15.2872C0.695696 15.3052 0.716578 15.3194 0.739637 15.3291C0.762697 15.3388 0.787468 15.3438 0.81249 15.3438H2.12733C2.22811 15.3438 2.31249 15.2641 2.31483 15.1633C2.35936 13.804 2.91015 12.5313 3.87811 11.5657C4.56718 10.8766 5.41093 10.3985 6.33202 10.1665C6.42343 10.143 6.48436 10.0563 6.47265 9.96256Z"
                fill={selected.teamblog ? "blue" : "#626262"}
              />
            </svg>
          </span>
          <NavLink
            to=""
            className={`${selected.teamblog} links`}
            onClick={() => {
              dispatch(handleSelected("teamblog"));
            }}
          >
            Team blogs
          </NavLink>
        </div>

        <div className="sidebar-feed-div">
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0L19.05 5.4C19.35 5.58333 19.5833 5.83333 19.75 6.15C19.9167 6.46667 20 6.8 20 7.15V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.5493 20.0007 18 20H2C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V7.15C1.69779e-06 6.8 0.083335 6.46667 0.250002 6.15C0.416668 5.83333 0.650002 5.58333 0.950002 5.4L10 0ZM10 11.65L17.8 7L10 2.35L2.2 7L10 11.65ZM10 14L2 9.2V18H18V9.2L10 14ZM10 18H18H2H10Z"
                fill={selected.draft ? "blue" : "#626262"}
              />
            </svg>
          </span>
          <NavLink
            to={`mystories/drafts`}
            className={`links ${selected.draft}`}
            onClick={() => {
              dispatch(handleSelected("draft"));
            }}
          >
            Drafts
          </NavLink>
        </div>

        <div className="sidebar-feed-div">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
              // fill="gray"
              strokeWidth="1.5"
              stroke={selected.analytics ? "blue" : "#626262"}
            />
            <path
              d="M7 12H9V17H7V12ZM15 7H17V17H15V7ZM11 14H13V17H11V14ZM11 10H13V12H11V10Z"
              fill={selected.analytics ? "blue" : "#626262"}
              stroke={selected.analytics ? "blue" : "#626262"}
            />
          </svg>

          <NavLink
            to=""
            className={`${selected.analytics} links`}
            onClick={() => {
              dispatch(handleSelected("analytics"));
            }}
          >
            Analytics
          </NavLink>
        </div>
      </section>

      <section className="sidebar-rw-3">
        <h2>Trending Tags</h2>
        <Trending />

      
        <button className="see-all" onClick={() => setOpen((o) => !o)}>
          See all
        </button>

      
        <Popup
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
          position={"left center"}
          contentStyle={{
            width: "20%",
            marginLeft: "20%",
            backgroundColor: "white",
          }}
        >
          <div className="tag-wrap">
            {tags.map((tag) => (
              <div
                className={`tag-nav`}
                onClick={() => {
                  closeModal();
                  navigate(`tags/${tag}`);
                }}
                key={tag}
              >
                {tag}
              </div>
            ))}
          </div>
        </Popup>
      </section>

      <section className="sidebar-rw-4">
        <h2>Personal</h2>
        <div className="sidebar-personal-div">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 2C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4C6 4.53043 6.21071 5.03914 6.58579 5.41421C6.96086 5.78929 7.46957 6 8 6C8.53043 6 9.03914 5.78929 9.41421 5.41421C9.78929 5.03914 10 4.53043 10 4C10 3.46957 9.78929 2.96086 9.41421 2.58579C9.03914 2.21071 8.53043 2 8 2ZM8 9C10.67 9 16 10.33 16 13V16H0V13C0 10.33 5.33 9 8 9ZM8 10.9C5.03 10.9 1.9 12.36 1.9 13V14.1H14.1V13C14.1 12.36 10.97 10.9 8 10.9Z"
              fill="#626262"
            />
          </svg>
          <NavLink to="" className="links">
            Account
          </NavLink>
        </div>

        <div className="sidebar-personal-div">
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V1.75H6.443C5.37103 1.74993 4.33933 2.15839 3.55792 2.89224C2.77652 3.62608 2.30416 4.63014 2.237 5.7L2.016 9.234C1.93173 10.5814 1.4793 11.8799 0.708 12.988C0.548633 13.2171 0.451257 13.4835 0.425343 13.7613C0.399428 14.0392 0.445856 14.319 0.560112 14.5736C0.674369 14.8281 0.852564 15.0488 1.07737 15.2142C1.30217 15.3795 1.56593 15.4838 1.843 15.517L5.25 15.925V17C5.25 17.7293 5.53973 18.4288 6.05546 18.9445C6.57118 19.4603 7.27065 19.75 8 19.75C8.72935 19.75 9.42882 19.4603 9.94454 18.9445C10.4603 18.4288 10.75 17.7293 10.75 17V15.925L14.157 15.516C14.4339 15.4827 14.6975 15.3784 14.9222 15.2131C15.1468 15.0478 15.3249 14.8273 15.4391 14.5729C15.5534 14.3184 15.5999 14.0388 15.5741 13.7611C15.5483 13.4834 15.4511 13.2171 15.292 12.988C14.5207 11.88 14.0682 10.5815 13.984 9.234L13.763 5.701C13.6961 4.63096 13.2238 3.62665 12.4424 2.8926C11.661 2.15855 10.6291 1.74995 9.557 1.75H9V1ZM6.443 3.25C5.75257 3.24992 5.08807 3.51297 4.58478 3.98561C4.08149 4.45825 3.77725 5.10493 3.734 5.794L3.514 9.328C3.41234 10.949 2.86792 12.511 1.94 13.844C1.92847 13.8606 1.92142 13.8798 1.91954 13.8999C1.91765 13.92 1.921 13.9403 1.92925 13.9587C1.93751 13.9771 1.95039 13.9931 1.96664 14.005C1.98289 14.017 2.00196 14.0246 2.022 14.027L5.759 14.476C7.248 14.654 8.752 14.654 10.241 14.476L13.978 14.027C13.998 14.0246 14.0171 14.017 14.0334 14.005C14.0496 13.9931 14.0625 13.9771 14.0707 13.9587C14.079 13.9403 14.0823 13.92 14.0805 13.8999C14.0786 13.8798 14.0715 13.8606 14.06 13.844C13.1324 12.5109 12.5884 10.9489 12.487 9.328L12.266 5.794C12.2228 5.10493 11.9185 4.45825 11.4152 3.98561C10.9119 3.51297 10.2474 3.24992 9.557 3.25H6.443ZM8 18.25C7.31 18.25 6.75 17.69 6.75 17V16.25H9.25V17C9.25 17.69 8.69 18.25 8 18.25Z"
              fill="#626262"
            />
          </svg>

          <NavLink to="" className="links">
            Nofification
          </NavLink>
        </div>

        <div className="sidebar-logout-div">
          <NavLink to="">Log Out</NavLink>
        </div>
      </section>
    </main>
  );
}
