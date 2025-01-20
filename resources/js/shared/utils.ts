export const pluralize = (count: number, singular: string, plural?: string) => {
    if (count === 1) {
        return `${count} ${singular}`;
    } else if (plural) {
        return `${count} ${plural}`;
    } else {
        return `${count} ${singular}s`;
    }
};
