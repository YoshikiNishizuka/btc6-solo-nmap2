
export default function CurrentPostion(props){
    const { onClick } = props;
    return(
        <button id='nearest' onClick={onClick}>現在地へ移動</button>
    )
}