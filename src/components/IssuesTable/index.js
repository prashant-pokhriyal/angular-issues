import { Table, Badge } from 'react-bootstrap';
import Pagination from '../Pagination';

export default function IssuesTable(props) {
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
                                    <tr key={key}>
                                        <td>{issue.title}</td>
                                        <td>{issue.state}</td>
                                        <td>{issue.labels.map((label, labelKey) => (
                                            <>
                                                <Badge style={{ backgroundColor: `#${label.color}` }} >{label.name}</Badge>{' '}
                                            </>
                                        ))}
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
                        totalPages={props.issues.total_count} />
                </>
            }
        </>
    );
}