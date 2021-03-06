import axios from "axios";
import React from "react";
import { axiosConfig } from "../../../constants/axiosConfig";
import { BACKEND_URL } from "../../../constants/backendURL";
import { defaultVideo } from "../../../constants/types/videoTypes";
import { UserContext } from "../../../contexts/UserContext";
import { Hover } from "../../Hover/Hover";
import "./PubForm.css";

export const PubForm: React.FC = () => {
  const { setUser, videos } = React.useContext(UserContext);
  const username = React.useContext(UserContext).userName;
  const [userName, setUserName] = React.useState<string>(username);
  const [time, setTime] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let newVideos = [...videos, { ...defaultVideo, pub_date: time }];
    e.preventDefault();
    if (userName.length < 1 || userName === "null") {
      setError(
        "Data point will be shown in 'Experimental Metrics', but not saved."
      );
      return setUser({
        videos: newVideos,
      });
    }
    await axios
      .get(`${BACKEND_URL}/${userName}`)
      .then((res) => {
        newVideos = [...res.data.videos, { ...defaultVideo, pub_date: time }];
      })
      .catch(() => {
        console.log("couldn't retrieve user");
      });
    axios
      .put(
        `${BACKEND_URL}/${userName}`,
        newVideos.length > 1 && {
          username: userName,
          videos: newVideos,
        }
      )
      .then(() => {
        setError(`Save successful for ${userName}.`);
      })
      .catch(() => {
        axios
          .post(
            `${BACKEND_URL}/`,
            {
              username: userName,
              videos: newVideos,
            },
            axiosConfig
          )
          .then(() => {
            setError("Registered as a new user. Save successful.");
            setUser({
              userName,
            });
          })
          .catch((err) => {
            setError(
              err +
                ". This data point will be shown in 'Experimental Metrics', but will not be saved."
            );
          });
      });
    setUser({
      userName,
      videos: newVideos,
    });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (userName.length < 1 || userName === "null") {
      setError(
        "Data point will be shown in 'Experimental Metrics', but not saved."
      );
      return setUser({ videos: [] });
    }
    axios
      .delete(`${BACKEND_URL}/${userName}`)
      .then(() => {
        setError(`Delete successful for ${userName}`);
        setUser({ videos: [] });
      })
      .catch((err) => {
        setError(err + `. Could not delete under ${userName}.`);
      });
  };

  const handleDeleteOne = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    let newVideos = videos;
    newVideos.splice(index, 1);
    axios
      .put(`${BACKEND_URL}/${userName}`, {
        username: userName,
        videos: newVideos,
      })
      .then((res) => {
        setError(`Delete successful for ${userName}.`);
        setUser({ userName: userName, videos: newVideos });
      })
      .catch((err) => {
        setError(
          err +
            `. Could not delete under ${userName}. Results will only be changed locally.`
        );
      });
    setUser({ userName: userName, videos: newVideos });
  };

  return (
    <>
      <form className="formContain" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <label>publish time</label>
          <input
            type="datetime-local"
            id="pubtime"
            name="pubtime"
            required
            onChange={(e) =>
              setTime(
                e.target.value
                  .replace(/T.+:.+/, "")
                  .replace(/([0-9]+)-([0-9]+)-([0-9]+)/, "$2/$3/$1")
              )
            }
          ></input>
        </div>
        <br />
        <br />
        <div className="row">
          <label>username</label>
          <input
            type="text"
            placeholder={userName}
            onChange={(e) =>
              setUserName(e.target.value !== null ? e.target.value : "")
            }
          ></input>
          <Hover text="Optional. Used to save and retrieve results outside of this session." />
        </div>
        <br />
        <br />
        <div className="row">
          <button className="submit" type="submit">
            Save
          </button>
        </div>
        {userName.length > 0 && (
          <>
            <br />
            <br />
            <div className="row">
              <button className="submit" onClick={(e) => handleDelete(e)}>
                Delete
              </button>
            </div>
          </>
        )}
        <br />
        <br />
        {error && <p className="error">{error}</p>}
      </form>
      {videos.length > 0 && (
        <div className="resultContainer">
          {videos.map((video, index) => (
            <>
              <div className="resultItem" key={index}>
                <p>{video.pub_date}</p>
                <button onClick={(e) => handleDeleteOne(e, index)}>x</button>
              </div>
              <hr style={{ width: "30%" }} />
            </>
          ))}
        </div>
      )}
    </>
  );
};
