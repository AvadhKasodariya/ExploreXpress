import { Button, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Pagination({ data }) {


    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [items, setItems] = useState(data)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const next = () => {
        setCurrentPage(currentPage + 1)
    }

    const prev = () => {
        setCurrentPage(currentPage - 1)
    }

    useEffect(() => {
        const itemsPerPage = 2
        const totalPages = Math.ceil(items.length / itemsPerPage)
        const offset = (currentPage - 1) * itemsPerPage
        const range = 3
        const pages = []
        const min = Math.max(1, currentPage - range)
        const max = Math.min(totalPages, currentPage + range)
        for (let i = min; i <= max; i++) {
            pages.push(i)
        }
        setPages(pages)
        setTotalPages(totalPages)
        console.log(items);

        
        
    },[items, currentPage])
    
    useState(()=>{
        setItems(data)
    },[data])

    return (
        <HStack>
            {pages.length > 0 && (
                <>
                    {currentPage !== 1 && <Button onClick={prev}>Previous</Button>}
                    {pages.map((page, index) => (
                        <Button key={index} bg={currentPage === page && 'primary'} onClick={() => paginate(page)}>
                            {page}
                        </Button>
                    ))}
                    {currentPage !== totalPages && <Button onClick={next}>Next</Button>}
                </>
            )}
        </HStack>
    )
}
