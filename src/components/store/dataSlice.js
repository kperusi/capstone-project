import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    showComment: "hide",
    number: "CHATTER",
    mobi_menu: "nav-menu-close",
    photo_Url: "",
    forYou: "",
    recent: "",
    featured: "",
    loading: "",
    error: "",
    name: "",
    selected: {
      feed: "",
      bookmark: "",
      teamblog: "",
      draft: "",
      analytics: "",
    },
    selectedPersonalPost: {
      all: "",
      draft: "",
      published: "",
    },
    suggestions: [
      "Programing",
      "Data science",
      "Technology",
      "Machine learning",
      "Politics",
      "Religion",
      "Java",
      "JavaScript",
      "React js",
    ],
    sideShow: "sidebar-hidden",
    arrowDown: "",
    showSearchBar: "",
  },
  reducers: {
    setShowComment: (state, action) => {
      if (state.showComment === "show") {
        state.showComment = "hide";
      } else state.showComment = "show";
    },
    increment: (state) => {
      state.number = "CHATTER";
    },
    setPhoto_Url: (state, action) => {
      state.photo_Url = action.payload;
    },

    setForYou: (state) => {
      if (state.recent !== "" || state.featured !== "") {
        state.recent = "";
        state.featured = "";
      }
      state.forYou = "for-you-indicator";
    },
    setRecent: (state) => {
      if (state.forYou !== "" || state.featured !== "") {
        state.forYou = "";
        state.featured = "";
      }
      state.recent = "recent-indicator";
    },
    setFeatured: (state) => {
      if (state.forYou !== "" || state.recent !== "") {
        state.recent = "";
        state.forYou = "";
      }
      state.featured = "featured-indicator";
    },
    setMobi_Menu: (state) => {
      if (state.mobi_menu === "nav-menu-close") {
        state.mobi_menu = "nav-menu-show";
      } else state.mobi_menu = "nav-menu-close";
    },
    setSideShow: (state) => {
      if (state.sideShow === "sidebar-hidden") {
        state.sideShow = "sidebar-show";
        state.arrowDown = "arrow-down-hidden";
      } else {
        state.sideShow = "sidebar-hidden";
        state.arrowDown = "arrow-down-show";
      }
    },
    setShowSearchBar: (state, action) => {
      state.showSearchBar = action.payload;
    },
    handleSelected: (state, action) => {
      if (action.payload === "feed") {
        state.selected.teamblog = "";
        state.selected.analytics = "";
        state.selected.bookmark = "";
        state.selected.draft = "";
        state.selected.feed = action.payload;
      } else if (action.payload === "draft") {
        state.selected.teamblog = "";
        state.selected.analytics = "";
        state.selected.bookmark = "";
        state.selected.draft = action.payload;
        state.selected.feed = "";
      } else if (action.payload === "bookmark") {
        state.selected.teamblog = "";
        state.selected.analytics = "";
        state.selected.bookmark = action.payload;
        state.selected.draft = "";
        state.selected.feed = "";
      }
      if (action.payload === "teamblog") {
        state.selected.teamblog = action.payload;
        state.selected.analytics = "";
        state.selected.bookmark = "";
        state.selected.draft = "";
        state.selected.feed = "";
      }
      if (action.payload === "analytic") {
        state.selected.teamblog = "";
        state.selected.analytics = action.payload;
        state.selected.bookmark = "";
        state.selected.draft = "";
        state.selected.feed = "";
      }
    },
    handlePersonalPostSelected: (state, action) => {
      if (action.payload === "published-border") {
        state.selectedPersonalPost.all = "";
        state.selectedPersonalPost.draft = "";
        state.selectedPersonalPost.published = action.payload;
      } else if (action.payload === "all-border") {
        state.selectedPersonalPost.all = action.payload;
        state.selectedPersonalPost.draft = "";
        state.selectedPersonalPost.published = "";
      } else if (action.payload === "draft-border") {
        state.selectedPersonalPost.all = "";
        state.selectedPersonalPost.draft = action.payload;
        state.selectedPersonalPost.published = "";
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});
export const {
  setShowComment,
  increment,
  setPhoto_Url,
  setFeatured,
  setRecent,
  setForYou,
  handleSelected,
  setMobi_Menu,
  setSideShow,
  setShowSearchBar,
  handlePersonalPostSelected,
  setLoading,
  setError,
  setName,
} = dataSlice.actions;
export default dataSlice.reducer;
