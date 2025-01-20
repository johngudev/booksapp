import { SearchIcon } from './Icons';

type SearchBarProps = {
    onChange: ({ target: { value } }) => void;
    placeholder: string;
};

export default function SearchBar({ onChange, placeholder }: SearchBarProps) {
    return (
        <div className="md:w-[300px] w-full">
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
                />
            </div>
        </div>
    );
}
