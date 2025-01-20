export default function FilterBar({
    end,
    start,
}: {
    end?: React.ReactNode;
    start?: React.ReactNode;
}) {
    return (
        <div id="filterBar" className="flex flex-row justify-between">
            <div className="flex flex-row gap-4 justify-start">{start}</div>
            <div className="flex flex-row gap-4 justify-end">{end}</div>
        </div>
    );
}
