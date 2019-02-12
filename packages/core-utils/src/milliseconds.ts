export function secondsToMs(value: number) {
    return Math.round(value * 1e3);
}

export function minutesToMs(value: number) {
    return Math.round(value * 6e4);
}

export function hoursToMs(value: number) {
    return Math.round(value * 36e5);
}

export function daysToMs(value: number) {
    return Math.round(value * 864e5);
}

export function weeksToMs(value: number) {
    return Math.round(value * 6048e5);
}

export function monthsToMs(value: number) {
    return Math.round(value * 26298e5);
}

export function yearsToMs(value: number) {
    return Math.round(value * 315576e5);
}
