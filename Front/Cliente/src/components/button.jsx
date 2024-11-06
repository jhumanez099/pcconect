export default function Buttons({ color, fontSize, title, onClick, colorbutton, disabled, id }) {
    return (
        <button
            className="btn btn-primary button border-black"
            style={{ background: color, fontSize: fontSize, color: colorbutton }}
            onClick={onClick}
            disabled={disabled}
            id={id}
        >
            {title}
        </button>
    );
}