// add whatever parameters you deem necessary
function constructNote(message, letters) {
    let messageArr = message.split("");
    let messageMap = {};

    let lettersArr = letters.split("");
    let lettersMap = {};
    for (let i=0; i < messageArr.length; i++) {
        messageMap[messageArr[i]] = (messageMap[messageArr[i]] += 1) || 1;
    }

    for (let i=0; i < lettersArr.length; i++) {
        lettersMap[lettersArr[i]] = (lettersMap[lettersArr[i]] += 1) || 1;
    }
    for (let key of Object.keys(messageMap)) {
        if (!(key in lettersMap) || lettersMap[key] < messageMap[key]) {
            return false;
        }
    }
    return true;
}

module.exports = constructNote;
