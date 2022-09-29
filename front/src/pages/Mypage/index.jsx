import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faThumbTack,
  faPencil,
  faNewspaper,
  faFileWord,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useRef, useCallback } from "react";
import DefaultUserImage from "assets/user_globe.png";
import A1 from "assets/A1.png";
import A2 from "assets/A2.png";
import B1 from "assets/B1.png";
import B2 from "assets/B2.png";
import C1 from "assets/C1.png";
import C2 from "assets/C2.png";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "modules/user/user";
import MyArticle from "./MyArticle";
import MyVoca from "./MyVoca";
import MyBadge from "./MyBadge";
import FilterModal from "components/FilterModal";

export default function Mypage() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector((state) => state.user));

  const [userImage, setUserImage] = useState("");
  const fileInput = useRef(null);
  const [articleLength, setArticleLength] = useState(0);
  const [vocaLength, setVocaLength] = useState(0);
  const [badgeLength, setBadgeLength] = useState(0);
  const [isFilterModal, setIsFilterModal] = useState(false);

  useEffect(() => {
    if (user && !user.src) {
      setUserImage(DefaultUserImage);
    } else {
      setUserImage(user.src);
    }
    const fetchData = async () => {
      const headers = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const testWordsResponse = await axios.get(`/user/avatar`, headers);
      console.log(testWordsResponse);
      setUserImage(
        testWordsResponse.data.slice(10, testWordsResponse.data.length - 10),
      );
    };

    fetchData();
    return () => {};
  }, []);

  const onChange = (e) => {
    const profileImg = e.target.files[0];
    if (profileImg) {
      // setFile(profileImg);
    } else {
      //업로드 취소할 시
      setUserImage(DefaultUserImage);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    const formData = new FormData();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        //이미지 정상적으로 불러오면 변경하기
        setUserImage(reader.result);
        formData.append("file", profileImg);

        for (let key of formData.keys()) {
          console.log(key, ":", formData.get(key));
        }

        // 유저 이미지 변경 api 전송
        await axios
          .post("/user/avatar", formData, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("이미지 변경완?", res);
            dispatch(getUser(user.accessToken)).then((res) =>
              console.log("스토어 업데이트 까지 완", res),
            );
          });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onCloseClick = useCallback(() => {
    setIsFilterModal(false);
  }, []);

  const myRecord = [
    {
      title: "스크랩한 기사",
      count: articleLength,
    },
    {
      title: "내 단어",
      count: vocaLength,
    },
    {
      title: "내 뱃지",
      count: badgeLength,
    },
  ];

  const [activeId, setActiveId] = useState(0);

  const onClickSwitchTab = (id) => {
    setActiveId(id);
  };

  const tabContent = {
    0: <MyArticle setArticleLength={setArticleLength} />,
    1: <MyVoca setVocaLength={setVocaLength} />,
    2: <MyBadge setBadgeLength={setBadgeLength} />,
  };

  return (
    <>
      <div className="mypage">
        <div className="left-box">
          <div className="info-box">
            <div className="profile-img">
              <div className="level-box">{level(user.level)}</div>
              <div className="img-box">
                <img src={userImage} alt="사용자 프로필 지구본"></img>
                <div
                  className="img-hover"
                  onClick={() => {
                    fileInput.current.click();
                  }}
                >
                  이미지 수정{user.src}
                </div>
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/jpg,impge/png,image/jpeg"
                  name="profile_img"
                  onChange={onChange}
                  ref={fileInput}
                />
              </div>
            </div>
            <p className="name">{user.nickname}</p>
            <p className="email">
              <FontAwesomeIcon icon={faEnvelope} />
              {user.email}
            </p>
          </div>
          <div className="current">
            {myRecord.map((item, index) => (
              <div key={index}>
                <FontAwesomeIcon icon={faThumbTack} />
                <p>{item.title}</p>
                <p>{item.count}개</p>
              </div>
            ))}
          </div>
          <div className="interest">
            <div className="title">
              MY&nbsp; <b> INTEREST</b>
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => setIsFilterModal(true)}
              />
            </div>
            <div className="list"></div>
          </div>
        </div>
        <div className="right-box">
          <div className="tab">
            <button
              className={`${activeId === 0 ? "active" : ""}`}
              onClick={() => onClickSwitchTab(0)}
            >
              <FontAwesomeIcon icon={faNewspaper} />
              MY <span>ARTICLE</span>
            </button>
            <button
              className={`${activeId === 1 ? "active" : ""}`}
              onClick={() => onClickSwitchTab(1)}
            >
              <FontAwesomeIcon icon={faFileWord} />
              MY <span>VOCA</span>
            </button>
            <button
              className={`${activeId === 2 ? "active" : ""}`}
              onClick={() => onClickSwitchTab(2)}
            >
              <FontAwesomeIcon icon={faCertificate} />
              MY <span>BADGE</span>
            </button>
          </div>
          <div className="content">{tabContent[activeId]}</div>
        </div>
      </div>
      {isFilterModal && (
        <FilterModal text={"수정하기"} closeHandler={onCloseClick} />
      )}
    </>
  );
}

const level = (level) => {
  switch (level) {
    case 1:
      return <img src={A1} alt="A1"></img>;
    case 2:
      return <img src={A2} alt="A2"></img>;
    case 3:
      return <img src={B1} alt="B1"></img>;
    case 4:
      return <img src={B2} alt="B2"></img>;
    case 5:
      return <img src={C1} alt="C1"></img>;
    case 6:
      return <img src={C2} alt="C2"></img>;
    default:
      break;
  }
};
