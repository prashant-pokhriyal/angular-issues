import { useState, useEffect } from 'react';
import { Pagination as Page } from 'react-bootstrap';

export default function Pagination(props) {
    const [pageItems, setPageItems] = useState([]);
    const totalPages = props.totalPages;
    const maxPageCount = totalPages > 5 ? 5 : totalPages;
    let currentPage = props.currentPage;

    useEffect(() => {
        let pageItems = [];

        for (let i = props.startPageIndex; i <= (maxPageCount + props.startPageIndex); i++) {
            pageItems.push(<Page.Item key={i} active={currentPage === i} onClick={(e) => props.onChange(i)}>{i}</Page.Item>);
        }
        setPageItems(pageItems);
    }, [props.startPageIndex]);
    return (
        <Page>
            <Page.First disabled={props.startPageIndex === 1} onClick={() => props.skipPages(-maxPageCount)} />
            <Page.Prev onClick={() => props.onChange(currentPage - 1)} />
            {pageItems}
            <Page.Next onClick={() => props.onChange(currentPage + 1)} />
            <Page.Last disabled={(props.startPageIndex + maxPageCount) === totalPages} onClick={() => props.skipPages(maxPageCount)} />
        </Page>
    );
}