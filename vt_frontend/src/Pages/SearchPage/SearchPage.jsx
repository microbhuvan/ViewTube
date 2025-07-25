import "./searchpage.css";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

const SearchPage = () => {
  const [searchVideos, setSearchVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q");

  const fetchVideos = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${BASE_URL}/api/videos/search?q=${query}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setSearchVideos(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [query]);

  console.log(searchVideos);

  return (
    <div className="SearchPage">
      <h3 className="searchPageHeader">results for "{query}"</h3>
      <div className="searchPageVideoListContainer">
        {searchVideos?.map((searchVideo) => {
          return (
            <Link
              to={`/watch/${searchVideo?._id}`}
              className="searchPageVideo"
              key={searchVideo?._id}
            >
              <div className="searchPageVideoThumbnail">
                <img
                  src={searchVideo?.thumbnail}
                  alt="thumbnail"
                  className="searchPageVideoThumbnailImage"
                ></img>
                <div className="searchPageVideoThumbnailTime">
                  {searchVideo?.videoLength}
                </div>
              </div>
              <div className="searchPageVideoInfo">
                <div className="searchPageVideoInfoTitle">
                  {searchVideo?.title}
                </div>
                <div className="searchPageVideoInfoProfile">
                  {searchVideo?.user?.userName}
                </div>
                <div className="searchPageVideoInfoViews">
                  {searchVideo?.views} views
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
