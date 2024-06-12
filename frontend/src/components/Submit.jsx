

export default function Submit(props){
  const { className, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      登録
    </button>
  );
}
