// MessageInput.js
"use client";
import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import * as sanitizeHtml from "sanitize-html";

interface Member {
  id: Number;
  name: string;
  isFound?: number;
}

export default function ChatComponent() {
  const [html, setHtml] = useState(``);
  const [editable, setEditable] = useState(true);
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [startPoint, setStartPoint] = useState(0);
  const [mentions, setMentions] = useState<Member[]>([]);
  const [endIndex, setEndIndex] = useState<number>();
  const [startIndex, setStartIndex] = useState<number>();
  const [isChangeInput, setIsChangeInput] = useState(false);
  const [showMemberList, setShowMemberList] = useState(false);
  const [temp_mes, setTempMes] = useState("");

  const textRef = useRef();
  let members = [
    { id: 1, name: "Aung Aung" },
    { id: 2, name: "Mg Mg" },
  ];

  const escapeRegExp = (string: any) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const highlightMentions = (text: any) => {
    let highlightedText = text;

    mentions.forEach((mention) => {
      const regex = new RegExp(escapeRegExp(mention.name), "g");
      highlightedText = highlightedText.replace(
        regex,
        `<span class="mention" style="color: blue;" contentEditable="false">${mention.name}</span>`
      );
    });

    return highlightedText;
  };

  const handleChange = (evt: any) => {
    const text = evt.target.value;
    setHtml(text);

    // Get current cursor position
  };

  const handleKeyDown = (e: any) => {
    const selection = window.getSelection();
    if (selection?.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      console.log(range.startOffset);
      setStartPoint(range.startOffset);
    }
    // handleSelect();
  };

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1", "span"],
    allowedAttributes: { a: ["href"] },
  };

  const sanitize = () => {
    setHtml(sanitizeHtml(html, sanitizeConf));
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const searchMember = (name: string, lists: Member[]) => {
    return lists?.filter((value) =>
      value?.name?.toLowerCase().includes(name?.trim().toLowerCase())
    );
  };

  const handleSelect = () => {
    // const { selectionStart: start, selectionEnd: end } = event.target;
    console.log(startPoint, "start point");

    if (true) {
      const cut_str = html.substring(0, startPoint);
      const findIndex = cut_str.lastIndexOf("@");
      const text = cut_str.slice(findIndex, startPoint);
      // console.log("text-show", message);
      setEndIndex(startPoint);
      setStartIndex(findIndex + 1);

      if (startPoint === html.length) {
        setIsChangeInput(true);
      } else {
        setIsChangeInput(false);
      }

      let is_close_modal = false;

      let lastIndexOf = text.lastIndexOf(" ");
      if (lastIndexOf !== -1 && lastIndexOf === text.length - 1) {
        is_close_modal = true;
      } else {
        is_close_modal = false;
      }

      if (html === "") {
        setShowMemberList(false);
      } else if (text === "@") {
        setShowMemberList(true);
        setTempMes("");
        setMemberList(members);
      } else if (text.includes("@") && is_close_modal === false) {
        setShowMemberList(true);
        const regex = /@([^@]+)/g;
        const matches = text.match(regex);
        if (matches && matches.length > 0) {
          const name = matches[matches.length - 1].substring(1).trim();
          setTempMes(name);
          setMemberList(searchMember(name, members));
        }
      } else {
        setTempMes("");
        setShowMemberList(false);
      }
    } else {
      setShowMemberList(false);
    }
  };

  const handleMentionClick = (member: Member) => {
    setMentions([
      ...mentions,
      {
        name: `@${member?.name}`,
        id: member?.id,
        isFound: 0,
      },
    ]);

    if (isChangeInput === true) {
      const mes = html.concat(member.name);

      const substr = mes.replace(temp_mes, "");

      console.log("substr1", substr);

      setHtml(substr + " ");
    } else {
      const mes = html.concat("");

      const substr =
        mes.slice(0, startIndex) + member.name + mes.slice(endIndex + 1);

      console.log("substr2", substr);

      setHtml(substr + " ");
    }

    setTempMes("");

    setShowMemberList(false);
  };

  useEffect(() => {
    // Note: This example assumes a single range is selected. You may need to handle multiple ranges if your use case requires it.
    handleSelect();
  }, [html]); // Run this effect whenever the HTML content changes

  return (
    <div>
      <h3>editable contents</h3>
      <ContentEditable
        className="editable"
        tagName="pre"
        html={highlightMentions(html)}
        disabled={!editable}
        onChange={handleChange}
        // onBlur={sanitize}
        onKeyDown={handleKeyDown}
        innerRef={textRef}
      />
      <h3>source</h3>
      <textarea
        className="editable w-full"
        value={html}
        onChange={handleChange}
        onBlur={sanitize}
      />
      <h3>actions</h3>
      <EditButton cmd="italic" />
      <EditButton cmd="bold" />
      <EditButton cmd="formatBlock" arg="h1" name="heading" />
      <EditButton
        cmd="createLink"
        arg="https://github.com/lovasoa/react-contenteditable"
        name="hyperlink"
      />
      <button onClick={toggleEditable}>
        Make {editable ? "readonly" : "editable"}
      </button>
      {showMemberList && (
        <ul>
          {memberList.map((member) => (
            <li key={member.id} onClick={() => handleMentionClick(member)}>
              {member.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EditButton(props) {
  return (
    <button
      key={props.cmd}
      onMouseDown={(evt) => {
        evt.preventDefault();
        document.execCommand(props.cmd, false, props.arg);
      }}
    >
      {props.name || props.cmd}
    </button>
  );
}
