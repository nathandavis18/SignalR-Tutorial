﻿"use strict";

//Disable the send button until connection is established.

document.getElementById("messageInput").disabled = true;

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.start().then(function () {
    document.getElementById("messageInput").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("ReceiveMessage", function (userName, message, id) {

    const out = document.getElementById("messagesList");
    const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;

    var li = document.createElement("div");
    li.id = "userMsg";
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you
    // should be aware of possible script injection concerns.
    li.innerHTML = `<p id="username"><b>${userName}:</b></p> <p id="message"> ${message}</p>`;

    const userId = connection.connectionId;
    if (isScrolledToBottom || userId == id) {
        out.scrollTop = out.scrollHeight - out.clientHeight;
    }
});

connection.on("ReceiveDrawData", function (startX, startY, endX, endY) {
    draw(startX, startY, endX, endY);
});

document.getElementById("messageInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        var message = document.getElementById("messageInput");
        var innerText = message.innerText;
        const userId = connection.connectionId;
        if (innerText.trim().length === 0) return;
        connection.invoke("SendMessage", user, innerText, userId).catch(function (err) {
            return console.error(err.toString());
        });
        message.innerText = "";
    }
});

const canvas = document.getElementById("drawingCanvas");

const boundingRect = canvas.getBoundingClientRect();

const offsetX = boundingRect.left;
const offsetY = boundingRect.top;

console.log(offsetX, offsetY);

canvas.addEventListener("mousedown", mouseOnCanvas);
canvas.addEventListener("mousemove", drawOnMove);
canvas.addEventListener("mouseup", stopDraw);
canvas.width = document.getElementById("drawingBoard").offsetWidth;
canvas.height = document.getElementById("drawingBoard").offsetHeight - 20;

const ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";

var pos = { x: 0, y: 0 };
var isDrawing = false;

function draw(startX, startY, endX, endY) {
    ctx.beginPath();

    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

   
}
function drawOnMove(e) {
    if (!isDrawing) return;

    draw(pos.x, pos.y, e.clientX - offsetX, e.clientY - offsetY);

    const userId = connection.connectionId;
    connection.invoke("SendDrawData", userId, pos.x, pos.y, e.clientX - offsetX, e.clientY - offsetY);

    pos.x = e.clientX - offsetX;
    pos.y = e.clientY - offsetY;

}

function mouseOnCanvas(e) {
    isDrawing = true;
    pos.x = e.clientX - offsetX;
    pos.y = e.clientY - offsetY;

    draw(pos.x, pos.y, e.clientX - offsetX, e.clientY - offsetY);

    const userId = connection.connectionId;
    connection.invoke("SendDrawData", userId, pos.x, pos.y, e.clientX - offsetX, e.clientY - offsetY);
}

function stopDraw(e) {
    isDrawing = false;
}