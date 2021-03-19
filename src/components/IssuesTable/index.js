import { useState } from 'react';
import { Table, Badge } from 'react-bootstrap';
import IssueModal from '../IssueModal';
import Labels from '../Labels';
import Pagination from '../Pagination';

export default function IssuesTable(props) {
    const [selectedIssue, setSelectedIssue] = useState({});
    const [showIssueModal, setShowIssueModal] = useState(false);
    
    const handleModalClose = () => setShowIssueModal(false);

    const handleIssueClick = (issue) => {
        setSelectedIssue(issue);
        setShowIssueModal(true);
    };

    return (
        <>
            {
                props.issues?.items &&

                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Ttile</th>
                                <th>State</th>
                                <th>Labels</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.issues.items.map((issue, key) => (
                                    <tr key={key} onClick={(e) => handleIssueClick(issue)}>
                                        <td>{issue.title}</td>
                                        <td>
                                            <Badge variant={issue.state === 'open' ? 'success' : 'secondary'}>{issue.state}</Badge>
                                        </td>
                                        <td>
                                            <Labels labels={issue.labels} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <Pagination
                        currentPage={props.currentPage}
                        perPage={props.perPage}
                        onChange={props.onPageChange}
                        skipPages={props.skipPages}
                        startPageIndex={props.startPageIndex}
                        totalPages={props.issues.total_count} />
                    <IssueModal
                        show={showIssueModal}
                        onClose={handleModalClose}
                        {...selectedIssue}
                    />
                </>
            }
        </>
    );
}