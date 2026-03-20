const Button = (props) => {
  return (
    <div className="bg-green-900 flex justify-center">
        <button className="cursor-pointer" type="submit">{props.work}</button>
    </div>
  )
}

export default Button
