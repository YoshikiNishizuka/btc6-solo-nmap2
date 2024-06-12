
export default function Nearest(props){
    const { onClick } = props;
    return(
        <button id='nearest' onClick={onClick}>近い順検索</button>
    )
}