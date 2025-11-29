const ToastMessage = ({ error, color }) => {
  return (
    <div className="toast" style={{backgroundColor: color}}>
      <p>{error} </p>
      <small>Texto desde el toast</small>
    </div>
  )
}

export { ToastMessage }