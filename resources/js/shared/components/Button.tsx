type ButtonProps = {
    children: React.ReactNode;
    extraClassName?: string;
    type?: string;
    use: 'primary' | 'secondary';
} & any;

export default function Button({
    children,
    extraClassName,
    type = 'button',
    use,
    ...props
}: ButtonProps) {
    let className = '';
    switch (use) {
        case 'primary':
            className =
                'bg-green border-transparent text-white tracking-widest hover:bg-green-dark focus:bg-green-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';
            break;
        case 'secondary':
            className =
                'bg-white border-green text-green tracking-widest shadow-sm hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';
            break;
        case 'danger':
            className =
                'bg-red border-transparent text-white tracking-widest hover:bg-red-dark focus:outline-none focus:ring-2 focus:ring-red-dark focus:ring-offset-2';
            break;
    }
    if (props.disabled) {
        className +=
            ' disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200';
    }
    if (extraClassName) {
        className += ` ${extraClassName}`;
    }
    return (
        <button
            className={`mx-1 inline-flex items-center px-4 py-2 border rounded-md font-semibold text-xs uppercase transition ease-in-out duration-150 ${className}`}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}
