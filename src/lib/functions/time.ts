export function extractTime(dateTimeString: string) {
    const date = new Date(dateTimeString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format minutes with leading zero if needed
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
}

// Example usage
const timeString = "2024-08-17T17:03:30.000Z";
const time = extractTime(timeString);
console.log(time); // Output: "5:03 PM"