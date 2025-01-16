export default function Button({ children, use, ...props }) {
    const className =
        use === 'secondary'
            ? 'bg-white text-[#6A8D73] border-2 border-solid border-[#6A8D73]'
            : 'bg-[#6A8D73] text-white';
    return (
        <button className={`mx-1 py-2 px-4 rounded ${className}`} {...props}>
            {children}
        </button>
    );
}
