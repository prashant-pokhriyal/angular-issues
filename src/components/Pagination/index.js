import { Pagination as Page } from 'react-bootstrap';

export default function Pagination(props) {
    let totalPages = props.totalPages;
    let currentPage = props.currentPage;
    let pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
        pageItems.push(<Page.Item key={i} active={currentPage === i} onClick={(e) => props.onChange(i)}>{i}</Page.Item>);
    }
    return (
        <Page>
            <Page.First />
            <Page.Prev />
            {pageItems}
            <Page.Next />
            <Page.Last />
        </Page>
    );
}