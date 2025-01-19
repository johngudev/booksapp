import Button from './Button';
import { SearchIcon } from './Icons';

export default function SearchBar({
    onChange,
    onSearch,
    placeholder,
    value,
}: {
    onChange: ({ target: { value } }) => void;
    onSearch: (evt: React.FormEvent) => void;
    placeholder: string;
    value: string;
}) {
    return (
        <div className="md:w-[300px] w-full">
            <form onSubmit={onSearch}>
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <SearchIcon />
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green focus:border-green"
                        onChange={onChange}
                        placeholder={placeholder}
                        value={value}
                    />
                    {/* <Button
                        extraClassName="absolute end-2.5 bottom-2"
                        type="submit"
                        // use="primary"
                    >
                        Search
                    </Button>
                    {/* <button
                        type="submit"
                    ></button> */}
                </div>
            </form>
        </div>
    );
}
