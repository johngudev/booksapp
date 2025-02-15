export const pluralize = (count: number, singular: string, plural?: string) => {
    if (count === 1) {
        return `${count} ${singular}`;
    } else if (plural) {
        return `${count} ${plural}`;
    } else {
        return `${count} ${singular}s`;
    }
};

export const getApiUrl = (attribute: string) => {
    const rootElement = document.getElementById('react-root')
        ? document.getElementById('react-root')
        : document.getElementById('meetings-root')
        ? document.getElementById('meetings-root')
        : document.getElementById('dashboard-root')
        ? document.getElementById('dashboard-root')
        : null;
    return rootElement ? rootElement.getAttribute(attribute) : '';
};
