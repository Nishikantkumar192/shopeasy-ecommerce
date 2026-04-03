const Button = (props) => {
  return (
    <div className="flex justify-center p-2 rounded-md bg-gradient-to-r from-purple-700 to-pink-500 text-white">
        <button className="cursor-pointer w-full" type="submit">{props.work}</button>
    </div>
  )
}

export default Button