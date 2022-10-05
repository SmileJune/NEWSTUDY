import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBookmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { category } from "constants/category";
import { Link } from "react-router-dom";

import "./style.scss";
import { intToLevel } from "constants";

export default function NewsCard({ news, stretch, query }) {
  return (
    <div className={`newscard-container ${stretch ? "stretch" : ""}`}>
      <div className="newscard-img-container">
        <Link to={`/news/${news.n_id}`}>
          <img src={news.thumbnail} alt="" className="newscard-img" />
          <i
            className={`newscard-level ${
              news.level <= 2 ? "Alv" : news.level <= 4 ? "Blv" : "Clv"
            }`}
          >
            {intToLevel[news.level]}
          </i>
        </Link>
      </div>
      <div className="newscard-contents-container">
        {query ? (
          <h1 className="newscard-title">
            <Link to={`/news/${news.n_id}`}>
              {news.title.includes(query) ? (
                <>
                  {news.title.split(query)[0]}
                  <b>{query}</b>
                  {news.title.split(query)[1]}
                </>
              ) : (
                news.title
              )}
            </Link>
          </h1>
        ) : (
          <h1 className="newscard-title">
            <Link to={`/news/${news.n_id}`}>{news.title}</Link>
          </h1>
        )}
        {query ? (
          <h3 className="newscard-body">
            {news.content.includes(query) ? (
              <>
                {news.content.split(query)[0]}
                <lb>{query}</lb>
                {news.content.split(query)[1]}
              </>
            ) : (
              news.content
            )}
          </h3>
        ) : (
          <h3 className="newscard-body">{news.content}</h3>
        )}

        <div className="newscard-footer">
          <div className="newscard-categories">
            <div className="newscard-category">
              <FontAwesomeIcon icon={faCircle} />
              {category[news.c_id].main}
            </div>
            <div className="newscard-category-sub">
              <FontAwesomeIcon icon={faCircle} />
              {category[news.c_id].sub}
            </div>
          </div>
          <div className="newscard-footer-right">
            <i>{news.date.substring(0, 10)}</i>{" "}
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </div>
      </div>
    </div>
  );
}