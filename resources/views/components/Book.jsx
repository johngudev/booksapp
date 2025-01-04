import { useEffect } from "react";

export default function Book() {
    const getBooks = async () => {
        console.log('get books')
        const response = await fetch("http://booksapp.test/api/books");
        const json = await response.json();
        console.log(json)   
    }

    useEffect(() => {
      getBooks()
    },[])
    return <div>book</div>
}