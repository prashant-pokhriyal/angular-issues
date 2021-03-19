import { Badge } from 'react-bootstrap';

export default function Labels(props) {
    return (
        <>
        {props.labels.map((label, labelKey) => (
            <>
                <Badge style={{ backgroundColor: `#${label.color}` }} >{label.name}</Badge>{' '}
            </>
        ))}
        </>
    )
}