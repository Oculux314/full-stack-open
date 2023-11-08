"use strict";

const input = document.querySelector("input[type=text]");

function init() {
  const form = document.getElementsByTagName("form")[0];
  form.addEventListener("submit", onSend);

  fetchAndRender();
  setInterval(fetchAndRender, 10000);
}

function fetchAndRender() {
  fetch("https://studies.cs.helsinki.fi/exampleapp/data.json")
    .then((res) => {
      input.placeholder = "New note:";
      return res.json();
    })
    .then((data) => {
      renderTable(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderTable(data) {
  const table = createTable();

  Object.values(data)
    .reverse()
    .forEach(({ date, content }) => {
      const row = elt("tr", table);
      elt("td", row, formatDate(date));
      elt("td", row, content);
    });
}

function createTable() {
  const div = document.getElementById("table-container");
  div.innerHTML = "";
  const table = elt("table", div);
  const head = elt("tr", table);

  elt("th", head, "Timestamp");
  elt("th", head, "Message");

  return table;
}

function elt(tag, parent, text) {
  const element = document.createElement(tag);
  parent.appendChild(element);
  if (text) {
    element.textContent = text;
  }
  return element;
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today - 86400000);

  const timeString = date.toLocaleTimeString();
  let dateString;

  if (isSameDay(date, today)) {
    dateString = "Today";
  } else if (isSameDay(date, yesterday)) {
    dateString = "Yesterday";
  } else {
    dateString = date.toLocaleDateString();
  }

  return `${dateString}\n${timeString}`;
}

function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function onSend(event) {
  event.preventDefault();
  postMessage();
}

function postMessage() {
  const note = {
    content: input.value,
    date: new Date(),
  };

  const data = {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(note),
  };

  fetch("https://studies.cs.helsinki.fi/exampleapp/new_note_spa", data).then(
    () => {
      fetchAndRender();
      input.placeholder = "Sent!";
    }
  );

  input.value = "";
  input.placeholder = "Sending...";
}

init();
