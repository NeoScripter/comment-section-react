export default function calculateDate(date) {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const now = new Date().getTime();
    const difference = now - date;
    const differenceInDays = Math.floor(difference / day);

    const currentDate = new Date(now);
    const pastDate = new Date(date);
    const differenceInMonths =
        (currentDate.getFullYear() - pastDate.getFullYear()) * 12 + (currentDate.getMonth() - pastDate.getMonth());

    let result;
    if (differenceInMonths > 0) {
        result = `${differenceInMonths} months ago`;
    } else if (differenceInDays > 0) {
        result = `${differenceInDays} days ago`;
    } else {
        const differenceInHours = Math.floor(difference / hour);
        result = `${differenceInHours} hours ago`;
    }
    return result;
}