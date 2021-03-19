import { Modal, Button, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import Labels from '../Labels';

export default function IssueModal(props) {
    return (
        <Modal show={props.show} size="xl" onHide={props.onClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>{props.title} #{props.number}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col sm={10} style={{ maxHeight: '500px', overflow: 'auto' }}>
                        <ReactMarkdown allowDangerousHtml="true">{props.body}</ReactMarkdown>
                    </Col>
                    <Col sm={2}>
                        <Labels labels={props.labels} />
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}