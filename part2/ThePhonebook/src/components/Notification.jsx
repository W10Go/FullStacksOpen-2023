const Notification = ({ message , tag }) => {
    if (message === null) {
        return null
    }
    
    let styleMessage = {color: 'green'}
    if(tag){
        styleMessage = {color: 'red'}
    }
    return (
    <div className='approved' style={styleMessage}>
        {message}
    </div>
    )
}
export default Notification