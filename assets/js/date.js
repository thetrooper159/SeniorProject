$("#theDate").val(getFormattedDate(today()));

function today() {
    return new Date();
}

// Get formatted date YYYY-MM-DD
function getFormattedDate(date) {
    return date.getFullYear()
        + "-"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "-"
        + ("0" + date.getDate()).slice(-2);
}
