import { useState, useEffect } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import IssuesTable from '../IssuesTable';

export default function IssuesContainer(props) {
    const [issues, setIssues] = useState({});
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [perPage, setPerPage] = useState(10);
    const [searchOpenIssues, toggleSearchOpenIssues] = useState(false);
    const handlePageChange = page => setPage(page);
    const handleSearch = () => toggleSearchOpenIssues(!searchOpenIssues);

    useEffect(() => {
        setLoading(loading => true);
        fetch(`https://api.github.com/search/issues?q=repo:angular/angular/node+type:issue${searchOpenIssues ? '+state:open' : ''}&p%20er_page=${perPage}&page=${page}`)
            .then(res => res.json())
            .then(res => {
                setIssues(res);
                setLoading(loading => false);
            });
    }, [page, searchOpenIssues, perPage]);

    return (
        <Tabs defaultActiveKey="issues" id="uncontrolled-tab-example">
            <Tab eventKey="issues" title="Issues">
                <Button variant="primary" onClick={handleSearch}>Search: Open Issues</Button>{' '}
                {
                    loading
                        ?
                        'Loading...'
                        :
                        <IssuesTable
                            issues={issues}
                            currentPage={page}
                            onPageChange={handlePageChange}
                            perPage={perPage} />
                }
            </Tab>
        </Tabs>
    );
}