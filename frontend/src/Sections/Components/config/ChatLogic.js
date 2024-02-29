const getsender = (userlogged, users) => {
    // console.log(users, userlogged);
    // console.log(userlogged._id===users[0]._id?users[1]:users[0]);
    return userlogged && userlogged._id === users[0]._id ? users[1] : users[0];
}

const groupConsecutive = (allMessage) => {
    if (allMessage.length === 0) return [];

    let result = [];
    let currentGroup = [allMessage[0]];

    for (let i = 1; i < allMessage.length; i++) {
        if (allMessage[i].sender._id === allMessage[i - 1].sender._id) {
            currentGroup.push(allMessage[i]);
        } else {
            result.push(currentGroup);
            currentGroup = [allMessage[i]];
        }
    }
    // Push the last group to the result
    result.push(currentGroup);
    return result;
}

const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure two-digit format for minutes

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    return `${hours}:${minutes} ${ampm}`;
}

export { getsender, groupConsecutive, convertTimestampToTime };