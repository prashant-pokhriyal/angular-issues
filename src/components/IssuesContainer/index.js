import { useState, useEffect } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import IssuesTable from '../IssuesTable';

export default function IssuesContainer(props) {
    const [repo, setRepo] = useState({});
    const [issues, setIssues] = useState({});
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [perPage, setPerPage] = useState(10);
    const [searchOpenIssues, toggleSearchOpenIssues] = useState(false);
    const [startPageIndex, setStartPageIndex] = useState(1);

    const skipPages = (skip) => setStartPageIndex(startPageIndex + skip);
    const handlePageChange = page => setPage(page);
    const handleSearch = () => toggleSearchOpenIssues(!searchOpenIssues);

    useEffect(() => {
        fetch('https://api.github.com/repos/angular/angular')
            .then(res => res.json())
            .then(res => setRepo(res));
    });

    useEffect(() => {
        setLoading(loading => true);
        fetch(`https://api.github.com/search/issues?q=repo:angular/angular/node+type:issue${searchOpenIssues ? '+state:open' : ''}&per_page=${perPage}&page=${page}`)
            .then(res => res.json())
            .then(res => {
                setIssues(res);
                setLoading(loading => false);
            });
    }, [page, searchOpenIssues, perPage]);

    return (
        <>
            <h3>{repo.owner?.login} / {repo.name}</h3>
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
                                skipPages={skipPages}
                                startPageIndex={startPageIndex}
                                perPage={perPage} />
                    }
                </Tab>
            </Tabs>
        </>
    );
}