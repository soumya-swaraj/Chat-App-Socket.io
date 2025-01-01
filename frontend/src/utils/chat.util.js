async function checkPvtChatByMembers(id1, id2) {
  const res = await fetch(
    `http://localhost:4000/api/v1/chat/check?members=${id1},${id2}`,
    { credentials: "include" }
  );
  const data = await res.json();
  return data.data.chat;
}

export { checkPvtChatByMembers };
