export const APPLICATION_DEADLINE = new Date("2026-03-27T23:59:59-08:00");
export const isApplicationsClosed = () => new Date() >= APPLICATION_DEADLINE;
