async function checkPvtChatByMembers(id1, id2) {
  const res = await fetch(
    `${
      import.meta.env.VITE_API_BASE_API_URL_V1
    }chat/check?members=${id1},${id2}`,
    { credentials: "include" }
  );
  const data = await res.json();
  return data.data.chat;
}

async function createNewPvtChat(members) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_API_URL_V1}chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ members, isGroupChat: false }),
    credentials: "include",
  });
  const data = await res.json();
  return data.data.chat;
}

function convertToIST(isoTimestamp) {
  // Parse the ISO timestamp into a Date object
  const date = new Date(isoTimestamp);

  // Convert the UTC time to IST
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istDate = new Date(date.getTime() + istOffset);

  // Format the time in 12-hour format with AM/PM
  let hours = istDate.getUTCHours();
  const minutes = istDate.getUTCMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes}${period}`;
}

async function postMessage(chatID, text, image) {
  if ((!image && !text) || !chatID) return;
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_API_URL_V1}message`,
    {
      method: "POST",
      body: JSON.stringify({
        chatID,
        ...(image && { image }),
        ...(text && { text }),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await res.json();
  return data.data.message;
}

export { checkPvtChatByMembers, createNewPvtChat, convertToIST, postMessage };
