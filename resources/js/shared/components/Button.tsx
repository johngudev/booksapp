type ButtonProps = {
    children: React.ReactNode;
    extraClassName?: string;
    use: 'primary' | 'secondary';
} & any;

export default function Button({
    children,
    extraClassName,
    use,
    ...props
}: ButtonProps) {
    let className =
        use === 'secondary'
            ? 'bg-white text-green border-2 border-solid border-green hover:bg-stone-100'
            : 'bg-green text-white border-2 border-solid border-green hover:bg-green-dark';
    if (props.disabled) {
        className +=
            ' disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200';
    }
    if (extraClassName) {
        className += ` ${extraClassName}`;
    }
    return (
        <button
            className={`mx-1 py-2 px-4 rounded font-medium text-sm ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
