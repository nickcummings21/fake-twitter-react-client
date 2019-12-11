import React from "react";
import { UserLink } from "../../Components";
import "./Status.css";

const Status = props => {
  const imgSrc = props.user.profilePic;

  const processText = text => {
    const hasMention = text.indexOf("@") >= 0;
    if (hasMention) {
      const mentionData = extractMention(text, text.indexOf("@"));

      const processedText = (
        <span>
          {text.slice(0, mentionData.start)}
          <UserLink
            user={mentionData.mention.slice(1)}
            switchTargetUser={props.switchTargetUser}
          >
            {mentionData.mention}
          </UserLink>
          {text.slice(mentionData.end)}
        </span>
      );
      return processedText;
    }
    return text;
  };

  const extractMention = (text, mentionStart) => {
    const validSymbols = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ];
    let mentionData = {
      mention: "@",
      start: mentionStart,
      end: -1
    };
    for (let i = mentionStart + 1; i < text.length; i++) {
      const isValid = validSymbols.indexOf(text[i]) >= 0;
      if (isValid) {
        mentionData.mention += text[i];
      } else {
        mentionData.end = i;
        return mentionData;
      }
    }
    mentionData.end = text.length - 1;
    return mentionData;
  };

  const renderAttachment = attachment => {
    const isVideo = attachment.indexOf("youtube") >= 0;
    if (isVideo) {
      return (
        <iframe
        style={{ display: "block"}}
          title="attached video"
          alt="attachment"
          src={attachment.replace("watch?v=", "embed/")}
          width="200"
          height="100"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      );
    }
    else {
      return <div className="attachment"><img src={attachment} alt="attachment"/></div>
    }
  };

  const formatDate = timestamp => {
    return new Date(parseInt(timestamp)).toLocaleString();
  };

  return (
    <div className="status">
      <div className="status-prof-pic-col">
        <div className="status-prof-pic-container">
          <img src={imgSrc} alt="profile-pic" />
        </div>
      </div>
      <div className="name">
        <div style={{ display: "flex", flex: 1 }}>
          <div className="realname">{props.user.name}</div>
          <div className="username">
            <UserLink
              switchTargetUser={props.switchTargetUser}
              user={props.user.username}
            >
              {"@" + props.user.username}
            </UserLink>
          </div>
        </div>
        <div className="view-btn" onClick={props.open}>
          View
        </div>
      </div>
      <div className="text">
        {processText(props.status.text)}
        {props.status.attachment !== "none"
          ? renderAttachment(props.status.attachment)
          : null}
        <div className="timestamp">{formatDate(props.status.timestamp)}</div>
      </div>
    </div>
  );
};

export default Status;
