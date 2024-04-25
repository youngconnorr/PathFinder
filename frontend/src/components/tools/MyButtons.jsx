import Button from '@mui/material/Button';

export default function MyButton(prop) {
    const { label, type } = prop;
    return (
        <Button type={type} variant="contained" className="button-forms">{label}</Button>
    );
}