
const format_datetime = datetime => {
    const date_obj = new Date(datetime)
    const
        year = date_obj.getFullYear(),
        month = ('0' + (1 + date_obj.getMonth())).slice(-2),
        date = ('0' + date_obj.getDate()).slice(-2),
        hour = ('0' + date_obj.getHours()).slice(-2),
        minute = ('0' + date_obj.getMinutes()).slice(-2)

    return `${year}-${month}-${date} ${hour}:${minute}`
}

export default format_datetime