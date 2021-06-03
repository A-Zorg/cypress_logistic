
export function lastUpdate(text) {
    let answer = 0
    if (text.includes('minute ')) {
        answer = 60
    } else if (text.includes('minutes')) {
        const regex = / ([0-9]*) /
        const result = regex.exec(text)
        answer = result[1] * 60
    } else if (text.includes('hour ')) {
        answer = 3600
    } else if (text.includes('hours ')) {
        const regex = / ([0-9]*) /
        const result = regex.exec(text)
        answer = result[1] * 3600
    } else {
        const regex = / ([0-9]{2}) ([A-Za-z]*) ([0-9]{4})/
        const result = regex.exec(text)
        const parsedDate = new Date(`${result[2]} ${result[1]}, ${result[3]}`)
        const now = new Date()
        answer = now - parsedDate
    }
    return answer
}

